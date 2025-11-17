// placeholder for more advanced report generation
export function generateHtmlReport(lagezeichner, incidents, sections){
  const html = `<html><body><h1>Einsatzprotokoll</h1><p>Lagezeichner: ${lagezeichner}</p><ul>${incidents.map(i=>'<li>'+i.keyword+' - '+i.formattedAddress+'</li>').join('')}</ul></body></html>`;
  return html;
}
