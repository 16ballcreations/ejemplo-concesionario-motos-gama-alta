# Ápice · Salón de motos: concesionario virtual (demo)

Demo de [16 Ball Creations](https://16ballcreations.com) de un **concesionario virtual para concesionarios independientes
de motos de alta gama** (multimarca, no la red oficial de un fabricante): se entra a la tienda bajando (video movido por
el scroll), se recorre el salón y cada moto se mira como en persona, con piezas, plano técnico, cotización, prueba de
manejo, asesor y la sede.

La promesa para el concesionario: su salón abierto las 24 horas, cada moto vista como en persona y los contactos directo
a sus asesores.

> **Demo.** «Ápice» es un concesionario ficticio: el nombre, la dirección, el teléfono y los asesores son de ejemplo.
> No está afiliada a KOVE ni a BMW; sus marcas solo identifican las motos que se muestran, y sus logos, fotos y datos
> técnicos son de sus dueños. El panel «Hablar con un asesor» y la prueba de manejo no envían nada: solo muestran avisos
> de demo. La página lleva `noindex`.

## Cambiar la marca para un cliente

- `js/marca.js` es el único lugar con el nombre, el descriptor, el lema, la ciudad y el logo del concesionario
  (`window.MARCA`). En `index.html` los textos con `data-marca` y los logos con `data-marca-logo` se llenan desde ahí; el
  HTML trae los mismos valores escritos para quien no corre JavaScript (y el `<title>` y las etiquetas Open Graph, que
  hay que cambiar a mano).
- Logo: `media/marca/apice-logo-blanco.svg` (logotipo de texto dibujado con trazos, sin fuentes). Si cambia la proporción
  del logo, actualizar `proporcionLogo` en `js/marca.js`: el letrero de la fachada se dimensiona con ella.
- La sede de «Visítanos» está en `SEDES` de `js/concesionarios.js` (puede tener varias; la prueba de manejo las lista).

## El recorrido

- La entrada son 190 cuadros (`media/entrada`) del video de transición fachada → salón; el letrero de la fachada está
  vacío en el video y el logo se pone encima (`#letrero`, colocado por `js/entrada.js`). El primero y el último cuadro
  salen de las imágenes 2K de las que se hizo el video: `py -3 herramientas/exportar-entrada.py` (fuentes en
  `fuentes/entrada-v3`, fuera del repo). La fachada, el salón y la entrada se generaron con IA (Artlist).
- Al terminar el video el salón queda de fondo (desenfocado) y aparecen dos motos, una a cada lado del centro, cada una
  sobre un pedestal dibujado con CSS y mirando hacia el centro: la **BMW K 1300 R** (unidad de exhibición, sin precio
  publicado: «precio a consultar») y la **KOVE 450RR**. Posiciones, tamaños y precios en `MOTOS` de `js/entrada.js`;
  la proporción de cada foto en `PROP`. Las fotos están en `media/salon` (fondo transparente, 3/4 mirando al centro).
  En el teléfono la galería pasa a una moto al centro con la otra asomada.
- La K 1300 R es la moto del dueño de 16BC capturada en 3D con Gaussian splatting (`media/splat`, visor en
  `js/visor-splat.js`). La 450RR gira con 320 cuadros (`media/giro/450rr`) normalizados con `herramientas/exportar-giro.py`.
- El modelo 3D de la 450RR (`media/3d/450rr.glb`, visor en `js/visor3d.js`) es una prueba generada con IA desde una foto
  oficial; se deja a tamaño real con `node herramientas/escalar-glb.mjs <entrada.glb> <salida.glb> 2.015`.
- El PDF del plano técnico (`media/plano/kove-450rr-plano-tecnico.pdf`) es una hoja carta vertical ocupada entera por la
  lámina de la página: con el servidor corriendo, `node herramientas/pdf-plano.mjs` (`PAPEL=a4` para A4).

Para verlo en local: `node herramientas/servir.mjs 4391`.

## Datos de las motos

- `js/motos-datos.js` se genera con `node herramientas/datos-motos.mjs`: une lo escrito a mano en
  `herramientas/motos-base.mjs` (panel, puntos sobre la moto, plano técnico y galería «Por qué elegirla») con la ficha
  investigada y con fuentes de `fuentes/investigacion/motos.json` (fuera del repo).
- Fotos de la galería: fabricantes y prensa, reducidas con `herramientas/redimensionar.mjs`. Uso de demostración, con
  aviso de no afiliación.

## Barra de compra

- `js/compra.js`: «Cotizar» abre el resumen (moto, color, precio y, si la moto lo tiene, el bono de ejemplo) y el
  simulador de cuotas, sin pedir datos. La tasa es ilustrativa (`TASA`, 1,8 % mes vencido). «Compartir» copia un enlace
  `#cotizar=<moto>-<color>-<inicial>-<plazo>-<bono>` que abre la misma cotización.
- Una moto sin precio (`valor` vacío en sus datos) no tiene simulador: el botón pasa a «Consultar precio» y abre el
  asesor con la moto ya nombrada. La prueba de manejo y «Hablar con un asesor» siguen igual.
- «Prueba de manejo» lista las sedes de `js/concesionarios.js`; «Visítanos» lleva a la sección de la sede. En la demo
  nada se envía.
- Vista del piloto: botón «Piloto» sobre la moto, con la foto del tablero (`piloto` en `motos-base.mjs`, fotos en
  `media/piloto`).
