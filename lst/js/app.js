import './aao.js';
import { initMap, map, geocode, reverseGeocode, addTempMarker } from './map.js';
import { loadState, saveState, getIncidentsArray, addIncident, updateIncident, removeIncident } from './storage.js';
import { renderIncidentList, openCreateModal, openEditModal, showToast, initUI } from './ui.js';
import { sectionsInit } from './sections.js';

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  initMap();
  initUI();
  sectionsInit();
  loadState();
  renderIncidentList();

  // Wire up main create button
  document.getElementById('create-incident-btn').addEventListener('click', async () => {
    const address = document.getElementById('address').value.trim();
    const keyword = document.getElementById('keyword').value.trim();
    if (!address || !keyword) { showToast('Adresse und Stichwort benötigt', true); return; }

    // try geocode if no lat stored
    let loc = await geocode(address);
    if (!loc) {
      showToast('Adresse nicht gefunden', true);
      return;
    }
    const incident = {
      id: 'inc_' + Date.now().toString(36),
      keyword, formattedAddress: loc.display_name, lat: parseFloat(loc.lat), lon: parseFloat(loc.lon),
      status: 'open', notes: '', createdAt: new Date().toISOString(), sectionId: null
    };
    addIncident(incident);
    saveState();
    renderIncidentList();
    showToast('Einsatz erstellt', false);
  });

  // Open create modal
  document.getElementById('open-create-incident').addEventListener('click', () => {
    openCreateModal();
  });

  // Manage EA
  document.getElementById('manage-ea').addEventListener('click', () => {
    // Basic EA modal open implemented in ui.js
    document.dispatchEvent(new CustomEvent('open-ea-modal'));
  });

  // End shift -> report
  document.getElementById('end-shift').addEventListener('click', () => {
    document.dispatchEvent(new CustomEvent('open-endshift-modal'));
  });

  // Map click to add quick marker and fill address (pin-mode simple)
  document.getElementById('map').addEventListener('click', (e) => { /* map handled in map.js */ });

  // redraw map markers based on storage changes
  document.addEventListener('state-changed', () => {
    renderIncidentList();
    // map will render markers via storage listener in map.js
  });});
