import { getIncidentsArray } from './storage.js';
let map, markersLayer;

export function initMap() {
  map = L.map('map').setView([49.123,8.404],13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19, attribution:'© OpenStreetMap contributors'}).addTo(map);
  markersLayer = L.layerGroup().addTo(map);

  // Re-render markers when storage state changes
  document.addEventListener('state-changed', () => {
    renderMapMarkers(getIncidentsArray());
  });

  // Click on map to reverse geocode and fill address in sidebar (simple)
  map.on('click', async (e) => {
    const node = document.getElementById('address');
    node.value = 'Suche...';
    const res = await reverseGeocode(e.latlng.lat, e.latlng.lng);
    if (res) {
      node.value = res.display_name || `${e.latlng.lat.toFixed(5)}, ${e.latlng.lng.toFixed(5)}`;
      // place temp marker
      addTempMarker(e.latlng.lat, e.latlng.lng);
      document.getElementById('auto-section').textContent = 'EA: (automatisch geprüft)';
    } else {
      node.value = '';
    }
  });

  // Initial render
  renderMapMarkers(getIncidentsArray());
}

export function renderMapMarkers(incidents) {
  markersLayer.clearLayers();
  incidents.forEach(i => {
    if (i.lat && i.lon) {
      const color = i.status === 'open' ? '#ef4444' : (i.status === 'dispatched' ? '#3b82f6' : '#f59e0b');
      const marker = L.circleMarker([i.lat, i.lon], { radius:8, color: color, fillColor: color, fillOpacity:0.9 });
      marker.bindPopup(`<b>${escapeHtml(i.keyword)}</b><br>${escapeHtml(i.formattedAddress)}<br>Status: ${i.status}`);
      marker.addTo(markersLayer);
    }
  });
}

export async function geocode(query){
  if(!query) return null;
  try {
    const resp = await fetch('https://nominatim.openstreetmap.org/search?format=json&limit=5&q='+encodeURIComponent(query));
    const data = await resp.json();
    return data && data[0] ? data[0] : null;
  } catch(e){
    console.error('geocode',e);
    return null;
  }
}

export async function reverseGeocode(lat, lon) {
  try {
    const resp = await fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat='+lat+'&lon='+lon);
    const data = await resp.json();
    return data || null;
  } catch(e){ console.error('reverseGeocode', e); return null; }
}

let tempMarker;
export function addTempMarker(lat, lon){
  if(tempMarker) markersLayer.removeLayer(tempMarker);
  tempMarker = L.marker([lat,lon]).addTo(markersLayer);
  setTimeout(()=>{ if(tempMarker) markersLayer.removeLayer(tempMarker); tempMarker=null; }, 8000);
}

function escapeHtml(str){ return String(str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
export { map };
