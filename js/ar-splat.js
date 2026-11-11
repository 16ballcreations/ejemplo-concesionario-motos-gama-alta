// Realidad aumentada con la moto en Gaussian splatting (WebXR, Chrome para Android).
// Un anillo marca el piso detectado; con un toque la moto queda puesta a tamaño real, mirando hacia quien la ve.
// Otro toque la mueve. En iPhone (sin WebXR AR) se usa el AR nativo con la malla (js/visor3d.js).
import * as THREE from 'three';
import { SplatMesh, SparkRenderer } from '@sparkjsdev/spark';

export async function soportado() {
  try { return !!(navigator.xr && await navigator.xr.isSessionSupported('immersive-ar')); }
  catch { return false; }
}

export async function iniciar(giro, textos = {}) {
  // Capa sobre la cámara: instrucciones y botón para salir (dom-overlay)
  const capa = document.createElement('div');
  capa.className = 'ar-capa';
  capa.innerHTML = `<button type="button" class="ar-capa__salir">✕ Salir</button>
    <p class="ar-capa__texto">${textos.buscar || 'Mueve el teléfono despacio apuntando al piso.'}</p>`;
  document.body.appendChild(capa);
  const texto = capa.querySelector('.ar-capa__texto');

  const lienzo = document.createElement('canvas');
  const renderer = new THREE.WebGLRenderer({ canvas: lienzo, alpha: true, antialias: false });
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  renderer.xr.setReferenceSpaceType('local');

  const escena = new THREE.Scene();
  escena.add(new SparkRenderer({ renderer }));
  const camara = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.02, 40);

  // Anillo que sigue al piso detectado
  const anillo = new THREE.Mesh(
    new THREE.RingGeometry(0.16, 0.2, 48).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial({ color: 0xc9a96e, transparent: true, opacity: 0.9 }));
  anillo.matrixAutoUpdate = false; anillo.visible = false;
  escena.add(anillo);

  // La moto: grupo que se pone en el piso; adentro, el splat con su matriz (metros, piso en y = 0, frente a −Z)
  const moto = new THREE.Group(); moto.visible = false;
  const splat = new SplatMesh({ url: giro.src });
  if (giro.matriz) { splat.matrixAutoUpdate = false; splat.matrix.fromArray(giro.matriz); }
  moto.add(splat);
  // Sombra de contacto: elipse oscura y difusa bajo la moto
  const sombra = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 2.6).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({
    map: sombraTextura(), transparent: true, depthWrite: false, opacity: 0.55 }));
  sombra.position.y = 0.003;
  moto.add(sombra);
  escena.add(moto);
  let lista = false;
  splat.initialized.then(() => { lista = true; if (!moto.visible) texto.textContent = textos.buscar || 'Mueve el teléfono despacio apuntando al piso.'; })
    .catch(() => { texto.textContent = 'No se pudo cargar la moto.'; });
  texto.textContent = 'Cargando la moto…';

  const sesion = await navigator.xr.requestSession('immersive-ar', {
    requiredFeatures: ['hit-test'], optionalFeatures: ['dom-overlay', 'local-floor'], domOverlay: { root: capa },
  });
  await renderer.xr.setSession(sesion);
  const espacioVista = await sesion.requestReferenceSpace('viewer');
  const fuente = await sesion.requestHitTestSource({ space: espacioVista });

  const salir = () => sesion.end();
  capa.querySelector('.ar-capa__salir').addEventListener('click', (e) => { e.stopPropagation(); salir(); });

  const pos = new THREE.Vector3(), q = new THREE.Quaternion(), esc = new THREE.Vector3();
  sesion.addEventListener('select', () => {
    if (!anillo.visible || !lista) return;
    anillo.matrix.decompose(pos, q, esc);
    moto.position.copy(pos);
    // que mire hacia quien la ve, en tres cuartos (el frente de la moto es −Z)
    const cam = renderer.xr.getCamera();
    const dx = cam.position.x - pos.x, dz = cam.position.z - pos.z;
    moto.rotation.set(0, Math.atan2(-dx, -dz) + THREE.MathUtils.degToRad(35), 0);
    moto.visible = true;
    texto.textContent = textos.puesta || 'Camina alrededor. Toca otro punto del piso para moverla.';
  });

  renderer.setAnimationLoop((t, cuadro) => {
    if (cuadro) {
      const r = cuadro.getHitTestResults(fuente);
      const ref = renderer.xr.getReferenceSpace();
      if (r.length) {
        const p = r[0].getPose(ref);
        anillo.visible = true; anillo.matrix.fromArray(p.transform.matrix);
        if (!moto.visible && lista) texto.textContent = textos.tocar || 'Toca la pantalla para poner la moto aquí.';
      } else anillo.visible = false;
    }
    renderer.render(escena, camara);
  });

  await new Promise((fin) => sesion.addEventListener('end', fin));
  renderer.setAnimationLoop(null);
  fuente.cancel?.();
  splat.dispose?.(); renderer.dispose();
  capa.remove();
}

function sombraTextura() {
  // círculo difuminado; el plano de 1,1 × 2,6 m lo estira en elipse a lo largo de la moto
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d');
  const gr = g.createRadialGradient(64, 64, 6, 64, 64, 64);
  gr.addColorStop(0, 'rgba(0,0,0,0.8)'); gr.addColorStop(0.5, 'rgba(0,0,0,0.35)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}
