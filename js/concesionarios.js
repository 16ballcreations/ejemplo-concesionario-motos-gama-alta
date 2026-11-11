// Visítanos: la sede del concesionario con su mapa. En la demo, la dirección, el teléfono y el pin son de ejemplo.
// Para un cliente: cambiar SEDES (puede tener varias; el mapa se ajusta a todas).
(() => {
  const marca = window.MARCA || { nombre: 'Ápice', ciudad: 'Medellín' };
  const SEDES = [
    // Demo: dirección inventada en Laureles (comuna 11); el pin cae en el barrio, no en un negocio real
    { nombre: `Salón ${marca.nombre} Laureles`, ciudad: `Laureles, ${marca.ciudad}`, direccion: 'Dirección de ejemplo, sobre la Carrera 76',
      estado: 'abierta', nota: 'Entre los árboles de Laureles, con un tinto servido y la moto lista para que te sientes en ella y agendes la prueba de manejo.',
      horario: 'Lun a vie 9:00–19:00 · Sáb 9:00–18:00 · Dom y festivos 10:00–16:00, con cita', telefono: '300 000 0000 (demo)',
      lat: 6.2435, lng: -75.5970 },
  ];
  const ESTADOS = { abierta: 'Abierto hoy', pronto: 'Próximamente' };
  window.SEDES_CONCESIONARIO = SEDES; window.ESTADOS_SEDE = ESTADOS;

  const lista = document.getElementById('sedes');
  let mapa = null;

  function iniciarMapa() {
    if (!window.L) {
      document.getElementById('mapa').innerHTML = '<p class="mapa__aviso">El mapa no cargó. Revisa tu conexión.</p>';
      return;
    }
    mapa = L.map('mapa', { scrollWheelZoom: false, zoomControl: true }).setView([SEDES[0].lat, SEDES[0].lng], 14);
    // Demo: teselas de OpenStreetMap (en producción, un proveedor con clave propia)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapa);
    SEDES.forEach((s) => {
      const icono = L.divIcon({ className: `pin pin--${s.estado}`, html: '<span></span>', iconSize: [26, 26], iconAnchor: [13, 13] });
      L.marker([s.lat, s.lng], { icon: icono, title: s.nombre }).addTo(mapa)
        .bindPopup(`<b>${s.nombre}</b><br>${s.direccion}<br><small>Ubicación de ejemplo</small>`);
    });
    if (SEDES.length > 1) mapa.fitBounds(L.latLngBounds(SEDES.map((s) => [s.lat, s.lng])).pad(0.35), { maxZoom: 14 });
  }

  lista.innerHTML = SEDES.map((s) => `
    <li class="sede activa">
      <div class="sede__cabeza">
        <span class="estado estado--${s.estado}">${ESTADOS[s.estado]}</span>
        <b>${s.nombre}</b>
        <span>${s.direccion} · ${s.ciudad}</span>
      </div>
      ${s.nota ? `<p class="sede__nota">${s.nota}</p>` : ''}
      ${s.horario ? `<p class="sede__nota">${s.horario}</p>` : ''}
      <div class="sede__acciones">
        ${s.telefono ? `<span class="sede__tel">Cel. ${s.telefono}</span>` : ''}
        <button type="button" class="sede__agendar" data-asesor="" data-sede="${s.nombre}" data-abierta="true">Agendar visita</button>
      </div>
    </li>`).join('');

  // El mapa se arma cuando la sección se acerca a la pantalla
  const obs = new IntersectionObserver((entradas) => {
    if (entradas.some((e) => e.isIntersecting)) {
      obs.disconnect();
      iniciarMapa();
      setTimeout(() => mapa && mapa.invalidateSize(), 200);
    }
  }, { rootMargin: '300px' });
  obs.observe(document.getElementById('concesionarios'));
})();
