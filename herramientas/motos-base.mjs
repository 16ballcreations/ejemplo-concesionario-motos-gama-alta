// Datos de cada moto que se escriben a mano: panel, puntos sobre la moto, plano técnico y galería de contexto.
// La ficha técnica completa (con fuentes) se toma de fuentes/investigacion/motos.json al correr datos-motos.mjs.
// Ángulos: 0 = de frente, 90 = de lado con el frente a la derecha, 180 = de atrás, 270 = de lado con el frente a la izquierda.

const ICONOS = {
  cilindraje: '<path d="M10 4h12v6H10zM12 10v8h8v-8M16 18v5M12 23h8v5h-8z"/>',
  potencia: '<path d="M18 3L7 18h8l-2 11 12-16h-8z"/>',
  torque: '<path d="M26 16a10 10 0 1 1-3-7.1M26 4v6h-6"/><circle cx="16" cy="16" r="3"/>',
  tanque: '<path d="M8 28V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v22M6 28h16M20 11h3a2 2 0 0 1 2 2v9a2 2 0 0 0 4 0V12l-4-4M11 9h6"/>',
  llantas: '<circle cx="16" cy="16" r="12"/><circle cx="16" cy="16" r="3"/><path d="M16 4v9M16 19v9M4 16h9M19 16h9"/>',
  suspension: '<path d="M16 3v5M16 24v5M11 8h10v16H11zM11 12l10 3M11 16l10 3M11 20l10 3"/>',
  frenos: '<circle cx="16" cy="16" r="12"/><circle cx="16" cy="16" r="5"/><path d="M9 8l2 2M23 8l-2 2M9 24l2-2M23 24l-2-2"/>',
  peso: '<path d="M10 10h12l4 18H6zM13 10a3 3 0 0 1 6 0"/>',
  ruta: '<path d="M6 28c0-6 6-6 6-12S6 10 6 4M26 28c0-6-6-6-6-12s6-6 6-12M16 6v3M16 14v4M16 23v3"/>',
};

export const BASE = {
  '450rr': {
    nombre: '450RR', familia: 'Sport', precio: '$ 36.490.000',
    valor: 36490000, bono: 3500000,
    piloto: { img: 'media/piloto/450rr-tablero.webp', ajuste: 'cover', titulo: 'TFT a color con telemetría',
      texto: 'Semimanillares de aluminio, modos SPORT y ECO, control de tracción y quickshifter para subir cambios. El celular se proyecta en la pantalla.',
      fuente: 'https://www.kovemoto.com/kove-450rr' },
    eyebrow: 'Sport · 4 cilindros · Mundial WorldSPB',
    slugCo: '450rr', fichaOficial: 'https://kovemotocolombia.co/api/ficha-tecnica/450rr',
    datos: [['Motor', '4 cilindros · 443 cc'], ['Potencia', '69,7 HP a 13.000 rpm'], ['Velocidad máx.', '220 km/h'], ['Peso', '165 kg']],
    colores: [
      { nombre: 'Negro', c: '#16191c' },
      { nombre: 'Blanco', c: '#eef0f1', nota: 'Demo: en la versión final la moto gira en blanco.' },
    ],
    modelo3d: true,
    giro: { tipo: 'video', ruta: 'media/giro/450rr', cuadros: 320, ancho: 960, alto: 600, inicio: 45 },
    rutaPiezas: 'media/giro/450rr-piezas',
    piezas: [
      { id: 'motor', titulo: '4 cilindros en línea · 443 cc', foto: 'motor',
        texto: 'Un tetracilíndrico que sube hasta 14.000 rpm: 69,7 HP, 39 Nm, inyección Bosch y embrague antirrebote.',
        vistas: { 0: null, 45: [43.8, 58.8], 90: [53.9, 60], 135: [61, 56.3], 180: null, 225: [39.1, 55], 270: [46.1, 60], 315: [55.5, 57.5] } },
      { id: 'frenos', titulo: 'Horquilla KYB y doble disco', foto: 'frenos',
        texto: 'Horquilla invertida KYB de 41 mm totalmente ajustable y doble disco de 300 mm con pinzas TAISKO de 4 pistones y ABS.',
        vistas: { 0: null, 45: [67.2, 66.3], 90: [77.3, 66.3], 135: [72.7, 60], 180: null, 225: [29.7, 62.5], 270: [21.1, 67.5], 315: [32, 65] } },
      { id: 'basculante', titulo: 'Basculante y suspensión trasera', foto: 'basculante',
        texto: 'Monoamortiguador KYB totalmente ajustable con depósito externo. Llanta trasera 160/60 ZR17 con radiales Maxxis.',
        vistas: { 0: null, 45: [31.3, 60], 90: [28.1, 61.3], 135: [37.5, 53.8], 180: [50, 60], 225: [57.8, 61.3], 270: [68.8, 62.5], 315: [68.8, 57.5] } },
      { id: 'tablero', titulo: 'Pantalla TFT a color', foto: 'tablero',
        texto: 'Velocidad, revoluciones, marcha y modos Sport y Eco, con telemetría para la pista y proyección del celular.',
        vistas: { 0: [50, 20], 45: [61.7, 23.8], 90: [64, 27.5], 135: [67.2, 20], 180: [50, 18.8], 225: [36.7, 22.5], 270: [30.5, 26.3], 315: [41.4, 21.3] } },
      { id: 'ramair', titulo: 'Toma Ram-Air', foto: 'ramair',
        texto: 'El aire entra por la nariz y llega con más presión al motor: suma hasta 3 CV por encima de 150 km/h.',
        vistas: { 0: [50, 40], 45: [68.8, 35], 90: [78.1, 41.3], 135: null, 180: null, 225: [26.6, 36.3], 270: [20.3, 40], 315: [30.5, 38.8] } },
    ],
    lamina: {
      specs: [['Motor', '4 cilindros en línea, DOHC, 16 válvulas'], ['Cilindraje', '443 cc'], ['Potencia', '69,73 HP @ 13.000 rpm'], ['Torque', '39 Nm @ 10.500 rpm'],
        ['Transmisión', '6 velocidades'], ['Peso', '165 kg'], ['Tanque', '15 L'], ['Vel. máxima', '220 km/h']],
      sello: 'Sport · Mundial<br>WorldSPB 2026', color: 'Negro',
      principal: { img: 'media/plano/tres-cuartos.webp', largo: '2.015 mm', alto: '1.090 mm' },
      vistas: [
        { titulo: 'Frente', img: 'media/plano/frente.webp', alta: true, cotas: [['h', 'left:0;right:0;bottom:-11%', '740 mm', 'ancho']] },
        { titulo: 'Lado', img: 'media/plano/lado.webp', lado: true, cotas: [['v', 'top:29.4%;bottom:0;left:-5%', '780–795 mm', 'asiento'], ['h', 'left:14.5%;right:14.5%;bottom:-11%', '1.385 mm', 'entre ejes'], ['h', 'left:0;right:0;bottom:calc(-11% - 44px)', '2.015 mm', 'largo']] },
        { titulo: 'Trasera', img: 'media/plano/trasera.webp', alta: true, cotas: [['h', 'left:0;right:0;bottom:-11%', '740 mm', 'ancho']] },
      ],
      extra: [['cilindraje', 'Cilindraje', '443 cc tetracilíndrico'], ['potencia', 'Máxima potencia', '69,73 HP @ 13.000 rpm'], ['torque', 'Torque máximo', '39 Nm @ 10.500 rpm'],
        ['tanque', 'Tanque', '15 L'], ['llantas', 'Llantas', '120/70 ZR17 · 160/60 ZR17 radiales MAXXIS'],
        ['suspension', 'Suspensión', 'KYB invertida Ø41 mm y mono con depósito externo, totalmente ajustables'], ['frenos', 'Frenos', 'Doble disco 300 mm TAISKO · disco 220 mm · ABS doble canal']],
      numero: '450RR-001',
    },
    galeria: [
      { img: 'media/galeria/450rr/450rr-3.webp', titulo: 'Suena como una superdeportiva', texto: 'Cuatro cilindros en línea de 443 cc que suben hasta 14.000 rpm. El carácter de una moto de pista en media cilindrada.', fuente: 'https://www.kovemoto.com/kove-450rr' },
      { img: 'media/galeria/450rr/2026-round03-worldspb-assen-saturday-5057.webp', titulo: 'En el Mundial desde su primer año', texto: 'Es la moto de KOVE en el nuevo Mundial de Sportbike 2026. En Assen, Beñat Fernández marcó 1\'42.190, anotado como récord en la hoja oficial.', fuente: 'https://resources.worldsbk.com/files/results/2026/NED/SPB/002/CLA/Results.pdf' },
      { img: 'media/galeria/450rr/450rr-9-1.webp', titulo: 'Equipo de pista de fábrica', texto: 'Quickshifter, control de salida, control de tracción, amortiguador de dirección y alerones, sin comprar nada aparte.', fuente: 'https://www.kovemoto.com/kove-450rr' },
      { img: 'media/galeria/450rr/450rr-12-scaled.webp', titulo: '165 kg en orden de marcha', texto: 'Más liviana que la mayoría de deportivas de cuatro cilindros de su clase: se siente en cada curva.', fuente: 'https://kovemotocolombia.co/es/modelos/450rr' },
      { img: 'media/galeria/450rr/450rr-13.webp', titulo: 'De la marca campeona del mundo', texto: 'En 2025 KOVE ganó su primer título mundial: Beñat Fernández, campeón de WorldSSP300 a los 17 años, sobre la bicilíndrica de la marca.', fuente: 'https://www.worldsbk.com/en/news/2025/BenatOn7op%20Rookie%20sensation%20Fernandez%20takes%202025%20WorldSSP300%20crown' },
    ],
  },

  'k1300r': {
    marca: 'BMW',
    nombre: 'K 1300 R',
    familia: 'Naked',
    precio: '', valor: 0, bono: 0,
    sinPrecio: 'Unidad de exhibición',
    notaPrecio: 'Precio a consultar con un asesor. Unidad usada, revisada y con historial.',
    notaColor: 'Unidad única: así está en la sala, con su decoración.',
    eyebrow: 'Naked · 4 cilindros · 1.293 cc',
    foto: 'media/salon/k1300r.webp',
    piloto: {
      img: 'media/piloto/k1300r-tablero.webp', ajuste: 'cover',
      titulo: 'Relojes análogos y tablero digital',
      texto: 'Velocímetro hasta 280 km/h, tacómetro con zona roja en 11.000 rpm y pantalla con marcha engranada, combustible y computador de viaje. Así la ves desde el asiento.',
      fuente: '',
    },
    datos: [['Motor', '4 cilindros · 1.293 cc'], ['Potencia', '173 HP a 9.250 rpm'], ['Torque', '140 Nm a 8.250 rpm'], ['Peso', '243 kg en orden de marcha']],
    colores: [{ nombre: 'Azul, blanco y rojo', c: '#22356e' }],
    modelo3d: false,
    giro: { tipo: 'splat', src: 'media/splat/k1300r.spz', matriz: [0.058968,0.001131,-0.025415,0,0.000767,-0.064208,-0.001076,0,-0.025428,0.000684,-0.058969,0,0.202824,-0.045808,-0.173819,1], inicio: 50, centroY: 0.55, distancia: 4.6 },
    // Fotos de las piezas: recortes de los videos del dueño (sin placa a la vista).
    // p3 = punto de la pieza en metros, en el marco de la moto: origen en el piso bajo el centro, Y arriba,
    // el largo sobre Z con la rueda delantera hacia −Z (eje delantero ≈ z −0,79, trasero ≈ z +0,79) y +X al lado derecho (el del escape).
    rutaPiezas: 'media/giro/k1300r-piezas',
    piezas: [
      { id: 'duolever', titulo: 'Suspensión delantera Duolever', foto: 'duolever', p3: [0.06, 0.62, -0.66],
        texto: 'En lugar de horquilla, dos brazos y un amortiguador central: la dirección va por un lado y la suspensión por otro. 115 mm de recorrido y una trompa que se mantiene firme cuando frenas.' },
      { id: 'frenos', titulo: 'Doble disco de 320 mm', foto: 'frenos', p3: [0.11, 0.37, -0.71],
        texto: 'Discos flotantes de 320 mm con pinzas fijas de 4 pistones adelante y uno de 265 mm atrás. ABS integral de BMW, de serie desde 2013.' },
      { id: 'faro', titulo: 'Doble faro y exploradoras', foto: 'faro', p3: [0, 0.86, -0.86],
        texto: 'La cara de la familia K: dos faros juntos y direccionales LED de fábrica. Esta unidad suma un par de exploradoras LED para la carretera de noche.' },
      { id: 'tablero', titulo: 'Relojes análogos y pantalla LCD', foto: 'tablero', p3: [0, 1.03, -0.6],
        texto: 'Velocímetro y tacómetro de aguja con una pantalla LCD en medio, que también muestra los ajustes del ESA II. Lo que ves desde el asiento antes de soltar el embrague.' },
      { id: 'motor', titulo: '4 cilindros en línea · 1.293 cc', foto: 'motor', p3: [0.2, 0.47, -0.15],
        texto: '173 HP a 9.250 rpm y 140 Nm a 8.250. Refrigerado por agua, 16 válvulas, cárter seco, y es parte del chasis: por eso lo ves entero.' },
      { id: 'quilla', titulo: 'Quilla con decoración de carreras', foto: 'quilla', p3: [0.16, 0.2, -0.32],
        texto: 'La quilla y los costados de esta unidad llevan logos de patrocinio de competencia. Es la única así: no la vas a encontrar en otra K 1300 R.' },
      { id: 'escape', titulo: 'Escape al costado derecho', foto: 'escape', p3: [0.21, 0.5, 0.52],
        texto: 'Silenciador alto y corto con protector de calor ranurado, para dejar a la vista la rueda trasera. Debajo del motor va un catalizador de tres vías regulado.' },
      { id: 'cardan', titulo: 'Cardán y Paralever', foto: 'cardan', p3: [-0.11, 0.33, 0.48],
        texto: 'Basculante monobrazo de aluminio con el eje cardán por dentro: nada de cadena que tensar ni engrasar. Relación final 2,91 y 135 mm de recorrido atrás.' },
      { id: 'parrilla', titulo: 'Parrilla trasera y luz LED', foto: 'parrilla', p3: [0, 0.93, 0.86],
        texto: 'Parrilla para baúl sobre la cola (accesorio de esta unidad) y, debajo, la luz trasera LED de fábrica. Lista para salir de viaje con pasajero.' },
    ],
    // Las imágenes del plano salen de la captura 3D con fondo transparente, recortadas al contorno de la moto.
    // Su alto incluye los espejos (≈ 1,30 m); BMW publica 1.095 mm sin espejos. En «Lado» el piso queda al 92 % del alto
    // (bajo las llantas hay sombra) y los ejes al 13,5 % y al 84 % del ancho.
    lamina: {
      specs: [['Motor', '4 cilindros en línea, DOHC, 16 válvulas'], ['Cilindraje', '1.293 cc'], ['Potencia', '173 HP @ 9.250 rpm'], ['Torque', '140 Nm @ 8.250 rpm'],
        ['Transmisión', '6 velocidades · cardán'], ['Peso', '243 kg en orden de marcha'], ['Medidas', '2.228 × 856 × 1.095 mm'], ['0–100 km/h', '2,9 s (medido por MOTORRAD)']],
      sello: 'Naked · BMW Motorrad<br>2009–2015', color: 'Azul, blanco y rojo',
      principal: { img: 'media/plano/k1300r-tres-cuartos.webp', largo: '2.228 mm', alto: '≈ 1.300 mm con espejos' },
      vistas: [
        { titulo: 'Frente', img: 'media/plano/k1300r-frente.webp', alta: true, cotas: [['h', 'left:0;right:0;bottom:-11%', '856 mm', 'ancho']] },
        { titulo: 'Lado', img: 'media/plano/k1300r-lado.webp', lado: true, cotas: [['v', 'top:29.5%;bottom:8%;left:-5%', '820 mm', 'asiento'], ['h', 'left:13.5%;right:16%;bottom:-11%', '1.585 mm', 'entre ejes'], ['h', 'left:0;right:0;bottom:calc(-11% - 44px)', '2.228 mm', 'largo']] },
        { titulo: 'Arriba', img: 'media/plano/k1300r-arriba.webp', cotas: [['h', 'left:0;right:0;bottom:-30px', '2.228 mm', 'largo']] },
      ],
      extra: [['cilindraje', 'Cilindraje', '1.293 cc · 80 × 64,3 mm · 13,0:1'], ['potencia', 'Máxima potencia', '173 HP (127 kW) @ 9.250 rpm'], ['torque', 'Torque máximo', '140 Nm @ 8.250 rpm'],
        ['tanque', 'Tanque', '19 L, unos 4 L de reserva'], ['llantas', 'Llantas', '120/70 ZR17 · 180/55 ZR17 (190/55 con ruedas deportivas)'],
        ['suspension', 'Suspensión', 'Duolever adelante (115 mm) y Paralever atrás (135 mm) · ESA II opcional'], ['frenos', 'Frenos', 'Doble disco flotante 320 mm, 4 pistones · disco 265 mm · ABS integral'],
        ['peso', 'Peso', '243 kg en orden de marcha · 217 kg en seco']],
      numero: 'K1300R-001',
    },
    // Fotos: cuadros de los videos del dueño, revisados uno a uno para que no se lea ninguna placa.
    galeria: [
      { img: 'media/galeria/k1300r/k1300r-lado.webp', titulo: '173 caballos que no piden permiso', texto: 'Cuatro cilindros en línea, 1.293 cc, 173 HP a 9.250 rpm y 140 Nm a 8.250. Abres el acelerador y la carretera se acorta.', fuente: 'https://www.totalmotorcycle.com/motorcycles/2013models/2013-BMW-K1300R?d=1' },
      { img: 'media/galeria/k1300r/k1300r-tres-cuartos.webp', titulo: 'De 0 a 100 en 2,9 segundos', texto: 'Así la midió la revista alemana MOTORRAD: 0–100 km/h en 2,9 s, 0–200 en 7,9 s y 270 km/h de punta. Muy pocas cosas con manubrio aceleran así.', fuente: 'https://www.motorradonline.de/naked-bike/test-bmw-k-1300-r-erster-test-der-neuen-k/' },
      { img: 'media/galeria/k1300r/k1300r-duolever.webp', titulo: 'Adelante no hay horquilla', texto: 'Hay Duolever: dos brazos y un amortiguador central que separan la dirección de la suspensión. Frenas a fondo con los discos de 320 mm y la trompa se mantiene en su sitio.', fuente: 'https://manuzoid.com.de/manuals/Y8OgP-BMW%20K%201300%20R%20Datenblatt' },
      { img: 'media/galeria/k1300r/k1300r-motor.webp', titulo: 'El corazón a la vista', texto: 'El bastidor puente de aluminio usa el motor como parte de la estructura, por eso lo ves entero: refrigerado por agua, 4 válvulas por cilindro, cárter seco y compresión de 13:1.', fuente: 'https://manuzoid.com.de/manuals/Y8OgP-BMW%20K%201300%20R%20Datenblatt' },
      { img: 'media/galeria/k1300r/k1300r-cardan.webp', titulo: 'Sin cadena, sin grasa en las manos', texto: 'La fuerza llega a la rueda por un eje cardán dentro del basculante monobrazo Paralever. Nada que tensar ni lubricar: solo rodar.', fuente: 'https://www.totalmotorcycle.com/photos/2009models/2009-BMW-K1300R.htm' },
      { img: 'media/galeria/k1300r/k1300r-tablero.webp', titulo: 'Se adelantó a su época', texto: 'En 2009 ya ofrecía suspensión ajustable con un botón (ESA II), control de tracción ASC y el Gearshift Assistant para subir cambios sin embrague y sin cerrar el acelerador, que BMW anunció como primicia mundial en una moto de serie.', fuente: 'https://www.motorradonline.de/naked-bike/test-bmw-k-1300-r-erster-test-der-neuen-k/' },
      { img: 'media/galeria/k1300r/k1300r-asiento.webp', titulo: 'Para dos y para ir lejos', texto: 'Asiento doble de una pieza a 820 mm, tanque de 19 litros y unos 358 km de autonomía en carretera según MOTORRAD. Llega el domingo y la pregunta es hasta dónde.', fuente: 'https://www.motorradonline.de/naked-bike/test-bmw-k-1300-r-erster-test-der-neuen-k/' },
    ],
    fichaNota: 'Datos de la hoja técnica oficial de BMW Motorrad (2009), comunicados de BMW Group y pruebas de prensa; cada dato enlaza su fuente. Donde las fuentes no coinciden se anota la diferencia. La unidad en sala puede tener accesorios distintos a los de fábrica.',
  },
};

// Filas de la investigación que no van en la ficha pública (en las motos de FICHA_COMPLETA se muestran todas)
export const FILAS_FUERA = /^(Aceite recomendado|Norma de emisiones|Versión A2|Cámara \(dash cam\)|Versión «Rally»|Familia 800X en el mundo|Intervalo de mantenimiento|Consumo medido en prueba|Navegación$|Peso en vacío)/;
export const FICHA_COMPLETA = new Set(['k1300r']);

export { ICONOS };
