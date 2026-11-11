// Barra de compra de la moto a detalle: cotizar (resumen + simulador de cuotas + compartir),
// prueba de manejo y Visítanos. En la demo no se envía nada: cada acción dice qué pasaría en la versión final.
// Una moto sin precio publicado (unidad de exhibición o usada) no tiene simulador: «Consultar precio» abre el asesor.
(() => {
  const $ = (s) => document.querySelector(s);
  const det = () => window.__koveDetalle;
  const pesos = (n) => '$ ' + Math.round(n).toLocaleString('es-CO');
  const titulo = (m) => `${m.marca || 'KOVE'} ${m.nombre}`;
  const conPrecio = (m) => !!m && Number(m.valor) > 0;
  const colorDe = (m, i) => (m.colores && (m.colores[i] || m.colores[0])) || { nombre: '', c: 'transparent' };
  const TASA = 0.018;            // mes vencido, ilustrativa (23,9 % E.A.)
  const ANCLA = '#cotizar=';

  // ---- Cotizar ----
  const dialogo = $('#cotizar');
  const inicial = $('#s-inicial');
  const conBono = $('#s-bono');
  const estado = $('#cotizar-estado');
  const plazo = () => Number((document.querySelector('input[name="plazo"]:checked') || {}).value || 36);
  const bonoDe = (m) => Number(m.bono) || 0;

  function calcular() {
    const m = det().moto;
    if (!conPrecio(m)) return;
    const base = m.valor - (conBono.checked ? bonoDe(m) : 0);
    const pct = Number(inicial.value);
    const cuotaInicial = base * pct / 100;
    const financiado = base - cuotaInicial;
    const n = plazo();
    const cuota = financiado * TASA / (1 - Math.pow(1 + TASA, -n));
    $('#s-inicial-v').textContent = `${pct} % · ${pesos(cuotaInicial)}`;
    $('#s-cuota').textContent = pesos(cuota);
    $('#s-detalle').textContent = `Financias ${pesos(financiado)} a ${n} meses`;
    const color = colorDe(m, det().color).nombre;
    $('#enviar-cotizacion').dataset.asesor = m.nombre;
    $('#separar').dataset.asesor = m.nombre;
    $('#enviar-cotizacion').dataset.cotizacion =
      `${titulo(m)}${color ? ' ' + color.toLowerCase() : ''}, inicial del ${pct} %, ${n} meses, cuota estimada de ${pesos(cuota)}`;
    estado.textContent = '';
  }

  function llenarResumen() {
    const d = det(), m = d.moto, c = colorDe(m, d.color);
    $('#resumen-eyebrow').textContent = m.eyebrow || '';
    $('#cotizar-titulo').textContent = titulo(m);
    $('#resumen-color').textContent = c.nombre;
    $('#resumen-color').parentElement.hidden = !c.nombre;
    $('#resumen-muestra').style.background = c.c;
    const f = $('#resumen-foto');
    f.src = d.foto(45); f.alt = c.nombre ? `${titulo(m)} en ${c.nombre.toLowerCase()}` : titulo(m);
    const bono = bonoDe(m);
    $('#r-precio').textContent = pesos(m.valor);
    $('#r-bono').textContent = '− ' + pesos(bono);
    $('#r-bono').parentElement.hidden = !bono;
    $('.simulador__bono').hidden = !bono;
    if (!bono) conBono.checked = false;
    $('#r-total').textContent = pesos(m.valor - (conBono.checked ? bono : 0));
  }

  function abrirCotizar(valores) {
    if (!det() || !conPrecio(det().moto)) return;
    if (valores) {
      inicial.value = valores.inicial;
      const r = document.querySelector(`input[name="plazo"][value="${valores.plazo}"]`);
      if (r) r.checked = true;
      conBono.checked = valores.bono;
    }
    llenarResumen();
    calcular();
    dialogo.showModal();
    dialogo.querySelector('.cotizar__cuerpo').scrollTop = 0;
  }

  // Con precio: «Cotizar y simular cuotas». Sin precio: «Consultar precio», que abre el asesor (js/asesor.js lee data-asesor)
  const botonCotizar = $('#abrir-cotizar');
  function ajustarCompra() {
    const m = det() && det().moto;
    if (!m) return;
    if (conPrecio(m)) {
      botonCotizar.innerHTML = 'Cotizar<span> y simular cuotas</span>';
      delete botonCotizar.dataset.asesor;
    } else {
      botonCotizar.textContent = 'Consultar precio';
      botonCotizar.dataset.asesor = m.nombre;
    }
  }
  document.addEventListener('kove:detalle', () => setTimeout(ajustarCompra, 0));
  botonCotizar.addEventListener('click', () => { ajustarCompra(); if (conPrecio(det().moto)) abrirCotizar(); });
  $('#cerrar-cotizar').addEventListener('click', () => dialogo.close());
  dialogo.addEventListener('click', (e) => { if (e.target === dialogo) dialogo.close(); });
  dialogo.addEventListener('close', () => {
    if (location.hash.startsWith(ANCLA)) history.replaceState(null, '', location.pathname + location.search);
  });
  inicial.addEventListener('input', calcular);
  conBono.addEventListener('change', () => { llenarResumen(); calcular(); });
  document.querySelectorAll('input[name="plazo"]').forEach((r) => r.addEventListener('change', calcular));

  // Compartir: un enlace que abre esta misma cotización
  $('#compartir').addEventListener('click', async () => {
    const d = det();
    const enlace = location.origin + location.pathname + location.search + ANCLA +
      [d.id, d.color, inicial.value, plazo(), conBono.checked ? 1 : 0].join('-');
    const texto = `Mira esta cotización de la ${titulo(d.moto)}`;
    if (navigator.share && matchMedia('(pointer: coarse)').matches) {
      try { await navigator.share({ title: texto, text: texto, url: enlace }); return; } catch { /* cancelado */ }
    }
    try {
      await navigator.clipboard.writeText(enlace);
      estado.textContent = 'Enlace copiado. Pégalo en WhatsApp o donde quieras: abre esta misma cotización.';
    } catch {
      estado.textContent = enlace;
    }
  });

  // Llegada desde un enlace compartido
  if (location.hash.startsWith(ANCLA)) {
    const [id, color, ini, pl, bono] = location.hash.slice(ANCLA.length).split('-');
    window.addEventListener('load', () => {
      if (!window.KOVE_MOTOS || !window.KOVE_MOTOS[id]) return;
      document.dispatchEvent(new CustomEvent('kove:detalle', { detail: { id } }));
      setTimeout(() => {
        if (!conPrecio(det().moto)) return;
        det().elegirColor(Number(color) || 0);
        const pct = Math.min(80, Math.max(10, Math.round((Number(ini) || 30) / 5) * 5));
        abrirCotizar({ inicial: pct, plazo: Number(pl) || 36, bono: bono !== '0' });
      }, 450);
    });
  }

  // ---- Prueba de manejo ----
  const prueba = $('#prueba');
  const pruebaDemo = $('#prueba-demo');
  const DEMO_PRUEBA = 'Demo: en la versión final se piden nombre y celular, y la solicitud llega al concesionario.';
  const sedes = () => window.SEDES_CONCESIONARIO || [];
  function abrirPrueba() {
    const m = det().moto;
    const estados = window.ESTADOS_SEDE || {};
    $('#prueba-titulo').textContent = `Maneja la ${titulo(m)}`;
    $('#prueba-sedes').innerHTML = sedes().map((s, i) => `
      <label><input type="radio" name="sede" value="${i}"${i ? '' : ' checked'}>
        <span><b>${s.nombre}</b><small>${s.direccion} · ${s.ciudad}</small><i class="estado estado--${s.estado}">${estados[s.estado] || ''}</i></span></label>`).join('');
    pruebaDemo.textContent = DEMO_PRUEBA;
    prueba.showModal();
  }
  $('#abrir-prueba').addEventListener('click', abrirPrueba);
  prueba.addEventListener('click', (e) => { if (e.target === prueba) prueba.close(); });
  $('#prueba-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const s = sedes()[Number(new FormData(e.target).get('sede'))];
    const franja = new FormData(e.target).get('franja');
    const moto = titulo(det().moto);
    pruebaDemo.textContent = !s ? DEMO_PRUEBA
      : `Demo: la solicitud para manejar la ${moto} llegaría a ${s.nombre}, que te confirmaría día y hora ${franja}.`;
  });

  // ---- Visítanos: del detalle a la sede ----
  $('#ver-sedes').addEventListener('click', () => {
    det().cerrar();
    setTimeout(() => $('#concesionarios').scrollIntoView({ behavior: 'smooth' }), 350);
  });
})();
