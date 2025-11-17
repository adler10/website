import { renderMapMarkers } from './map.js';
const LS_INC = 'localDispatchIncidents_v2';
const LS_SECT = 'localDispatchSections_v2';

let incidents = new Map();
let sections = new Map();

export function loadState() {
  try {
    const rawInc = localStorage.getItem(LS_INC);
    const rawSec = localStorage.getItem(LS_SECT);
    if (rawInc) {
      JSON.parse(rawInc).forEach(i => incidents.set(i.id, i));
    }
    if (rawSec) {
      JSON.parse(rawSec).forEach(s => sections.set(s.id, s));
    }
    // Update map markers
    renderMapMarkers(Array.from(incidents.values()));
  } catch (e) {
    console.error('loadState', e);
  }
}

export function saveState() {
  try {
    localStorage.setItem(LS_INC, JSON.stringify(Array.from(incidents.values())));
    localStorage.setItem(LS_SECT, JSON.stringify(Array.from(sections.values())));
    window.dispatchEvent(new Event('storage'));
    document.dispatchEvent(new CustomEvent('state-changed'));
    // rerender map
    renderMapMarkers(Array.from(incidents.values()));
  } catch (e) {
    console.error('saveState', e);
  }
}

export function getIncidentsArray() { return Array.from(incidents.values()).sort((a,b)=> new Date(b.createdAt)-new Date(a.createdAt)); }
export function getSectionsArray() { return Array.from(sections.values()); }

export function addIncident(inc) { incidents.set(inc.id, inc); saveState(); }
export function updateIncident(id, patch) {
  const inc = incidents.get(id);
  if (!inc) return false;
  Object.assign(inc, patch);
  incidents.set(id, inc);
  saveState();
  return true;
}
export function removeIncident(id) { incidents.delete(id); saveState(); }

export function addSection(sec) { sections.set(sec.id, sec); saveState(); }
export function updateSection(id, patch){ const s = sections.get(id); if(!s) return; Object.assign(s,patch); sections.set(id,s); saveState(); }
export function removeSection(id){ sections.delete(id); saveState(); }

export function findContainingSection(lat, lon) {
  // Basic point-in-polygon not implemented (needs polygons). Placeholder returns null.
  return null;
}
