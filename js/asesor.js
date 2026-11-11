// "Hablar con un asesor": panel con los canales del concesionario. En la demo no envía nada.
(() => {
  const dialogo = document.getElementById('asesor');
  const texto = document.getElementById('asesor-texto');
  const estado = document.getElementById('asesor-demo');
  const BASE = 'Una persona del salón te resuelve dudas, te cotiza y agenda tu prueba de manejo.';
  const DEMO = 'Demo: en la versión final cada opción abre el canal real del concesionario.';
  let moto = '', cotizacion = '';

  // "450RR" → "KOVE 450RR": la marca de cada moto sale de los datos del salón o de la ficha
  function conMarca(nombre) {
    if (!nombre) return '';
    const salon = (window.SALON_MOTOS || []).find((m) => m.nombre === nombre);
    const ficha = Object.values(window.KOVE_MOTOS || {}).find((m) => m.nombre === nombre);
    const marca = (salon && salon.marca) || (ficha && ficha.marca) || '';
    return marca && !nombre.startsWith(marca) ? `${marca} ${nombre}` : nombre;
  }

  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-asesor]');
    if (!b) return;
    moto = conMarca(b.dataset.asesor || '');
    const sede = b.dataset.sede || '';
    cotizacion = b.dataset.cotizacion || '';
    texto.textContent = cotizacion
      ? `El asesor recibe tu cotización ya armada (${cotizacion}) y te acompaña en el estudio de crédito.`
      : sede
      ? `Te comunicamos con el equipo de ${sede} para que elijas día y hora. ${BASE}`
      : moto
        ? `El asesor sabrá que te interesa la ${moto}, así no empiezas de cero. ${BASE}`
        : BASE;
    estado.textContent = DEMO;
    dialogo.showModal();
  });

  dialogo.addEventListener('click', (e) => {
    const c = e.target.closest('[data-canal]');
    if (c) {
      const mensaje = cotizacion ? `«Hola, quiero esta cotización: ${cotizacion}»`
        : moto ? `«Hola, me interesa la ${moto}»` : '«Hola, quiero hablar con un asesor»';
      const canal = c.dataset.canal;
      // "Agendar visita" lleva a Visítanos
      if (canal === 'Visita' && !texto.textContent.startsWith('Te comunicamos')) {
        dialogo.close();
        if (document.body.classList.contains('en-detalle')) document.getElementById('volver').click();
        setTimeout(() => document.getElementById('concesionarios').scrollIntoView({ behavior: 'smooth' }), 350);
        return;
      }
      estado.textContent = canal === 'WhatsApp'
        ? `Demo: aquí se abriría el WhatsApp del concesionario con el mensaje ${mensaje}.`
        : canal === 'Videollamada'
          ? 'Demo: aquí se conectaría la videollamada con el primer asesor disponible.'
          : 'Demo: aquí se abriría la agenda del salón para elegir día y hora.';
      return;
    }
    // clic en el fondo oscuro cierra
    if (e.target === dialogo) dialogo.close();
  });
})();
