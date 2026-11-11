// Moto en Gaussian splatting para el detalle: se carga solo cuando se abre una moto con giro.tipo = 'splat'.
// Usa three.js y Spark (renderizador de splats) desde el CDN, con el importmap de index.html.
// La moto gira sola hasta que la tocan; se arrastra para girarla y se pellizca o usa la rueda para acercarla.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { SplatMesh, SparkRenderer } from '@sparkjsdev/spark';

// En teléfonos (pantalla táctil) se usa la versión liviana del splat: menos memoria de GPU y menos descarga
export const esMovil = () => window.matchMedia('(pointer: coarse)').matches;
export const urlSplat = (giro) => (esMovil() && giro.srcMovil ? giro.srcMovil : giro.src);

export function crear(lienzo, giro, avisos = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas: lienzo, antialias: false, alpha: true, preserveDrawingBuffer: false });
  let activo = true;
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, esMovil() ? 1.5 : 2));
  // si el teléfono tira el contexto gráfico (memoria, AR, segundo plano), se avisa para montar un lienzo nuevo
  lienzo.addEventListener('webglcontextlost', (e) => { e.preventDefault(); activo = false; avisos.perdido && avisos.perdido(); }, { once: true });
  const escena = new THREE.Scene();
  escena.add(new SparkRenderer({ renderer }));
  const camara = new THREE.PerspectiveCamera(30, 1, 0.05, 50);

  const controles = new OrbitControls(camara, lienzo);
  controles.target.set(0, giro.centroY ?? 0.55, 0);
  controles.enableDamping = true;
  controles.dampingFactor = 0.08;
  controles.enablePan = false;
  controles.minDistance = giro.cercaMin ?? 1.6;
  controles.maxDistance = giro.lejosMax ?? 7;
  controles.minPolarAngle = THREE.MathUtils.degToRad(35);
  controles.maxPolarAngle = THREE.MathUtils.degToRad(92);   // no se mete bajo el piso
  controles.autoRotate = true;
  controles.autoRotateSpeed = -0.9;

  // Vista inicial: tres cuartos delanteros, un poco desde arriba
  const azInicial = THREE.MathUtils.degToRad(giro.inicio ?? 45);
  const dist = giro.distancia ?? 4.6;
  camara.position.set(Math.sin(azInicial) * dist, (giro.centroY ?? 0.55) + dist * 0.28, Math.cos(azInicial) * dist);
  controles.update();

  const moto = new SplatMesh({ url: urlSplat(giro) });
  if (giro.matriz) { moto.matrixAutoUpdate = false; moto.matrix.fromArray(giro.matriz); }
  escena.add(moto);
  moto.initialized.then(() => avisos.listo && avisos.listo()).catch((e) => avisos.error && avisos.error(e));

  let tocado = false;
  const tocar = () => { if (!tocado) { tocado = true; controles.autoRotate = false; avisos.tocado && avisos.tocado(); } };
  controles.addEventListener('start', tocar);

  function medir() {
    const w = lienzo.clientWidth, h = lienzo.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camara.aspect = w / h;
    // en pantallas angostas la moto necesita más distancia para caber a lo largo
    camara.fov = w / h < 0.9 ? 42 : 30;
    camara.updateProjectionMatrix();
  }
  const obs = new ResizeObserver(medir); obs.observe(lienzo); medir();

  renderer.setAnimationLoop(() => {
    if (!activo) return;
    controles.update();
    renderer.render(escena, camara);
    if (avisos.angulo) {
      const v = camara.position.clone().sub(controles.target);
      avisos.angulo((THREE.MathUtils.radToDeg(Math.atan2(v.x, v.z)) + 360) % 360);
    }
  });

  // Pieza en 3D (metros, Y arriba, frente hacia −Z) → posición en % del lienzo y opacidad.
  // Se apaga cuando queda del otro lado de la moto: se compara su normal aproximada (desde el eje de la moto) con la cámara.
  const p = new THREE.Vector3(), eje = new THREE.Vector3(), aCam = new THREE.Vector3();
  function proyectar(p3) {
    p.set(p3[0], p3[1], p3[2]);
    eje.set(0, p3[1], THREE.MathUtils.clamp(p3[2], -0.55, 0.55));
    const n = p.clone().sub(eje);
    // piezas del eje central en las puntas (tablero, faro, parrilla): miran hacia su extremo
    if (n.length() <= 0.06 && Math.abs(p3[2]) > 0.4) n.set(0, 0, Math.sign(p3[2]));
    aCam.copy(camara.position).sub(p).normalize();
    let o = 1;
    if (n.length() > 0.06) {
      const d = n.normalize().dot(aCam);
      o = THREE.MathUtils.clamp((d + 0.05) / 0.25, 0, 1);
    }
    const s = p.clone().project(camara);
    if (s.z > 1) o = 0;
    return { x: (s.x + 1) * 50, y: (1 - s.y) * 50, o };
  }

  return {
    proyectar,
    pausar(si) { activo = !si; },
    girar(grados) {
      tocar();
      const v = camara.position.clone().sub(controles.target).applyAxisAngle(new THREE.Vector3(0, 1, 0), THREE.MathUtils.degToRad(grados));
      camara.position.copy(controles.target).add(v);
    },
    destruir() {
      activo = false; obs.disconnect(); renderer.setAnimationLoop(null);
      controles.dispose(); moto.dispose?.(); renderer.dispose();
      try { renderer.forceContextLoss(); } catch { /* ya perdido */ }
    },
  };
}
