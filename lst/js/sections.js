import { getSectionsArray } from './storage.js';
export function sectionsInit(){
  // placeholder: ensure at least one section exists
  if(getSectionsArray().length===0){
    const id = 'sec_default';
    const s = { id, name:'Standard-EA', responsible:'EAL', color:'#4f46e5' };
    window.dispatchEvent(new CustomEvent('add-default-section', { detail: s }));
  }
}
