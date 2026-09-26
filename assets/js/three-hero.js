import * as THREE from 'three';
import { FontLoader }   from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

if (window.matchMedia('(min-width: 900px)').matches) init();

function init() {
  const wrap   = document.getElementById('hero-3d');
  const canvas = document.getElementById('hero-canvas');
  if (!wrap || !canvas) return;

  const W = () => wrap.clientWidth;
  const H = () => wrap.clientHeight;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W(), H());

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, W() / H(), 0.1, 100);
  camera.position.set(0.4, 0.6, 5.5);
  camera.lookAt(0, 0, 0);

  const clock = new THREE.Clock();

  /* ---- lights ---- */
  scene.add(new THREE.AmbientLight(0x080810, 2));

  const spot = new THREE.SpotLight(0xffffff, 60, 24, Math.PI / 5, 0.45, 1.2);
  spot.position.set(5, 3, 5);
  spot.target.position.set(0, 0, 0);
  scene.add(spot);
  scene.add(spot.target);

  const fill = new THREE.PointLight(0xffffff, 8, 14);
  fill.position.set(-3, -1, 3);
  scene.add(fill);

  /* ---- animated gradient material via shader injection ----
     onBeforeCompile lets us inject GLSL into MeshStandardMaterial so the
     gradient colour replaces `diffuse` while all PBR lighting still applies. */
  const matUniforms = {
    uTime:      { value: 0 },
    uHalfWidth: { value: 1.2 }, // updated once font/geometry is ready
  };

  const mat = new THREE.MeshStandardMaterial({ metalness: 0.15, roughness: 0.55 });
  mat.customProgramCacheKey = () => 'gradient-tag';

  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime      = matUniforms.uTime;
    shader.uniforms.uHalfWidth = matUniforms.uHalfWidth;

    // Pass local-space position through to the fragment shader
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>',
        `#include <common>
        varying vec3 vLocalPos;`)
      .replace('#include <begin_vertex>',
        `#include <begin_vertex>
        vLocalPos = position;`);

    // Inject gradient function and replace diffuse colour
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>',
        `#include <common>
        uniform float uTime;
        uniform float uHalfWidth;
        varying vec3 vLocalPos;

        vec3 gradientColor() {
          // Shift x position by time to animate; wrap with mod for seamless loop
          float t = mod(vLocalPos.x / (uHalfWidth * 2.0) + 0.5 + uTime * 0.18, 1.0);
          vec3 c0 = vec3(0.486, 0.361, 1.000); // #7c5cff purple
          vec3 c1 = vec3(0.133, 0.827, 0.933); // #22d3ee cyan
          vec3 c2 = vec3(0.957, 0.447, 0.714); // #f472b6 pink
          if (t < 0.45) return mix(c0, c1, t / 0.45);
          if (t < 0.70) return mix(c1, c2, (t - 0.45) / 0.25);
          return mix(c2, c0, (t - 0.70) / 0.30);
        }`)
      .replace(
        'vec4 diffuseColor = vec4( diffuse, opacity );',
        'vec4 diffuseColor = vec4( gradientColor(), opacity );'
      );
  };

  /* ---- text geometry ---- */
  new FontLoader().load(
    'https://cdn.jsdelivr.net/npm/three@0.168.0/examples/fonts/droid/droid_sans_mono_regular.typeface.json',
    (font) => {
      const geo = new TextGeometry('</>', {
        font,
        size:           1.15,
        depth:          0.38,
        curveSegments:  14,
        bevelEnabled:   true,
        bevelThickness: 0.07,
        bevelSize:      0.03,
        bevelSegments:  8,
      });

      geo.computeBoundingBox();
      const bb = geo.boundingBox;
      geo.translate(
        -(bb.max.x + bb.min.x) / 2,
        -(bb.max.y + bb.min.y) / 2,
        -(bb.max.z + bb.min.z) / 2,
      );

      // Exact half-width so gradient spans the full text width
      matUniforms.uHalfWidth.value = (bb.max.x - bb.min.x) / 2;

      scene.add(new THREE.Mesh(geo, mat));
    }
  );

  /* ---- scroll → spotlight position ---- */
  let scrollProg = 0;
  window.addEventListener('scroll', () => {
    scrollProg = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
  }, { passive: true });

  /* ---- resize ---- */
  new ResizeObserver(() => {
    renderer.setSize(W(), H());
    camera.aspect = W() / H();
    camera.updateProjectionMatrix();
  }).observe(wrap);

  /* ---- render loop ---- */
  (function frame() {
    requestAnimationFrame(frame);

    matUniforms.uTime.value = clock.getElapsedTime();

    const angle = scrollProg * Math.PI;
    spot.position.x = Math.cos(angle) * 6;
    spot.position.y = 2 + Math.sin(angle) * 3;
    spot.position.z = 5;
    fill.position.x = -Math.cos(angle) * 4;
    fill.position.y = -Math.sin(angle) * 2;

    renderer.render(scene, camera);
  })();
}
