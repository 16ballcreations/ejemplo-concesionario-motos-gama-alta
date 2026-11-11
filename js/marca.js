// Marca del concesionario: el único lugar que se cambia para cada cliente.
// Los demás scripts leen window.MARCA; en index.html los textos con data-marca y los logos con data-marca-logo
// se llenan desde aquí (el HTML trae los mismos valores escritos para quien no corre JavaScript).
(() => {
  const MARCA = {
    nombre: 'Ápice',                          // nombre corto del concesionario
    descriptor: 'Salón de motos',             // lo que es, en dos o tres palabras
    lema: 'Cada curva tiene su punto exacto.',
    ciudad: 'Medellín',
    logo: 'media/marca/apice-logo-blanco.svg?v=202611111600',
    // Paleta (la misma de css/estilos.css :root): verde de carreras británico + oro champaña
    colores: {
      verdeHondo: '#0a2e24',   // fondos verdes profundos
      verde: '#0e4d3c',        // botones y énfasis sobre claro
      verdeMedio: '#17644f',   // hover del verde
      verdeTinte: '#e3ece6',   // velo claro
      oro: '#c9a96e',          // acentos y llamados sobre oscuro; tilde del logo
      oroLuz: '#e4cf9f',       // brillos del oro
      carbon: '#0b1210',       // tinta casi negra
      marfil: '#f6f5f0',       // papel de los paneles claros
    },
    proporcionLogo: 228 / 72,                 // ancho / alto del viewBox del logo (lo usa el letrero de la fachada)
    whatsapp: '',                             // demo: vacío, ningún canal envía nada
  };
  window.MARCA = MARCA;

  function aplicar() {
    document.title = `${MARCA.nombre} · ${MARCA.descriptor} · concesionario virtual`;
    document.querySelectorAll('[data-marca]').forEach((n) => {
      const v = MARCA[n.dataset.marca];
      if (v) n.textContent = v;
    });
    document.querySelectorAll('img[data-marca-logo]').forEach((img) => {
      img.src = MARCA.logo;
      if (img.alt) img.alt = MARCA.nombre;
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', aplicar);
  else aplicar();
})();
