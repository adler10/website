import { getIncidentsArray, addSection, getSectionsArray, addIncident, updateIncident, removeIncident } from './storage.js';
import { geocode } from './map.js';
export function initUI(){
  setupAddressAutocomplete();
  setupKeywordSuggestions();
  renderIncidentList();
  setupModals();
}

export function showToast(message, isError=false, duration=4000){
  const el = document.createElement('div');
  el.className = 'p-3 rounded shadow mb-2 ' + (isError? 'bg-red-100 text-red-700':'bg-green-100 text-green-700');
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(()=> el.remove(), duration);
}

function setupAddressAutocomplete(){
  const addr = document.getElementById('address');
  const sug = document.getElementById('address-suggestions');
  let t;
  addr.addEventListener('input', (e) => {
    clearTimeout(t);
    const q = e.target.value.trim();
    if(!q){ sug.classList.add('hidden'); return; }
    t = setTimeout(async ()=>{
      const data = await geocode(q);
      if(!data){ sug.classList.add('hidden'); return; }
      sug.innerHTML = '<div class="p-2 cursor-pointer">'+ (data.display_name||'') +'</div>';
      sug.classList.remove('hidden');
      sug.querySelector('div').addEventListener('click', ()=>{
        addr.value = data.display_name;
        sug.classList.add('hidden');
      });
    }, 350);
  });
}

function setupKeywordSuggestions(){
  const kw = document.getElementById('keyword');
  const ks = document.getElementById('keyword-suggestions');
  kw.addEventListener('input', (e)=>{
    const v = e.target.value.toLowerCase();
    if(!v){ ks.classList.add('hidden'); document.getElementById('create-incident-btn').disabled = true; return; }
    // simple category suggestions via aao.js exposed global
    const matches = window.AAO_SUGGESTIONS ? window.AAO_SUGGESTIONS.filter(s=>s.toLowerCase().includes(v)).slice(0,10) : [];
    if(matches.length){
      ks.innerHTML = matches.map(m=>`<div class="p-2 cursor-pointer">${m}</div>`).join('');
      ks.classList.remove('hidden');
      ks.querySelectorAll('div').forEach(d=> d.addEventListener('click', ()=>{ kw.value=d.textContent; ks.classList.add('hidden'); document.getElementById('create-incident-btn').disabled=false; }));
    } else { ks.classList.add('hidden'); document.getElementById('create-incident-btn').disabled=false; }
  });
}

export function renderIncidentList(){
  const list = document.getElementById('incident-list');
  list.innerHTML = '';
  getIncidentsArray().forEach(i=>{
    const el = document.createElement('div');
    el.className = 'p-2 border rounded bg-gray-50';
    el.innerHTML = `<div class="flex justify-between"><div><strong>${escapeHtml(i.keyword)}</strong><div class="text-xs text-gray-600">${escapeHtml(i.formattedAddress)}</div></div>
      <div class="space-y-1 text-right">
        <button data-id="${i.id}" class="edit-btn text-blue-600 text-sm">Bearbeiten</button><br/>
        <button data-id="${i.id}" class="delete-btn text-red-600 text-sm">LÃ¶schen</button>
      </div></div>`;
    list.appendChild(el);
  });
  // attach handlers
  list.querySelectorAll('.edit-btn').forEach(b=> b.addEventListener('click', (e)=> openEditModal(e.target.dataset.id)));
  list.querySelectorAll('.delete-btn').forEach(b=> b.addEventListener('click', (e)=> { removeIncident(e.target.dataset.id); renderIncidentList(); }));
}

export function openCreateModal(){
  // simple focus behavior - in this minimal modular version we reuse the sidebar inputs
  document.getElementById('address').focus();
  showToast('FÃ¼lle Adresse & Stichwort, dann "Einsatz erstellen".', false, 3000);
}

export function openEditModal(id){
  const inc = getIncidentsArray().find(x=>x.id===id);
  if(!inc) return;
  // For brevity open a prompt-based editor
  const newKw = prompt('Stichwort', inc.keyword);
  if(newKw===null) return;
  const newAddr = prompt('Adresse', inc.formattedAddress);
  if(newAddr===null) return;
  // try geocode if changed
  (async ()=>{
    let lat = inc.lat, lon = inc.lon;
    if(newAddr !== inc.formattedAddress){
      const res = await geocode(newAddr);
      if(res){ lat = parseFloat(res.lat); lon = parseFloat(res.lon); }
    }
    updateIncident(id, { keyword: newKw, formattedAddress: newAddr, lat, lon });
    renderIncidentList();
    showToast('Einsatz aktualisiert', false);
  })();
}

function setupModals(){
  // Endshift modal (simple)
  document.addEventListener('open-endshift-modal', ()=> {
    const name = prompt('Lagezeichner (Nachname, Vorname)');
    if(!name) return;
    // create a simple HTML report and trigger download
    const incs = getIncidentsArray();
    const report = ['<h1>Einsatzprotokoll</h1>', '<ul>',
      ...incs.map(i=>`<li><b>${escapeHtml(i.keyword)}</b> - ${escapeHtml(i.formattedAddress)}</li>`),
      '</ul>'].join('\n');
    const blob = new Blob([report], { type:'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'Einsatzprotokoll_' + new Date().toISOString().slice(0,10) + '.html';
    document.body.appendChild(a); a.click(); a.remove();
    showToast('Bericht erstellt', false);
  });

  // EA modal placeholder
  document.addEventListener('open-ea-modal', () => {
    const name = prompt('Neuen EA-Namen (z.B. Hochstetten-Ost)');
    if(!name) return;
    const id = 'sec_' + Date.now().toString(36);
    addSection({ id, name, responsible: '', color: '#4f46e5' });
    showToast('EA erstellt', false);
  });
}

function escapeHtml(str){ return String(str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
