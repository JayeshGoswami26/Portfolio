"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * 3D katana — choreographed scroll companion. The blade travels between
 * per-section waypoints: vertical beside the manifesto, horizontal over the
 * stack, tucked left for work, diagonal for the journey/about, laid flat
 * behind the contact headline. Renders BEHIND content (fixed canvas, z 2).
 */
export default function KatanaCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;

    const scene = new THREE.Scene();
    const FOV = 35;
    const CAMZ = 7;
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);
    camera.position.set(0, 0, CAMZ);

    // lights — bright steel so the dark blade reads on black
    scene.add(new THREE.HemisphereLight(0xd8d2ee, 0x14101e, 1.3));
    const key = new THREE.DirectionalLight(0xffffff, 3.2);
    key.position.set(4, 6, 6);
    scene.add(key);
    const key2 = new THREE.DirectionalLight(0xece6ff, 2.0);
    key2.position.set(-5, -2, 5);
    scene.add(key2);
    const rim = new THREE.DirectionalLight(0xc8372d, 2.8);
    rim.position.set(-4, 3, -4);
    scene.add(rim);
    const edge = new THREE.PointLight(0xc9bde6, 5.0, 30);
    edge.position.set(1.5, -2.5, 4);
    scene.add(edge);
    const back = new THREE.PointLight(0x745cb6, 3.5, 30);
    back.position.set(-2, 4, -2);
    scene.add(back);

    const pivot = new THREE.Group();
    scene.add(pivot);
    const spin = new THREE.Group();
    pivot.add(spin);
    let model: THREE.Group | null = null;

    // visible world height at z=0
    const visH = 2 * Math.tan((FOV * Math.PI) / 360) * CAMZ; // ~4.41
    let aspect = 1;
    const hw = () => (visH * aspect) / 2; // half visible width

    new GLTFLoader().load(
      "/models/katana.glb",
      (gltf) => {
        model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        model.scale.setScalar((visH * 0.84) / maxDim); // full blade fits the viewport
        model.traverse((o) => {
          if (o instanceof THREE.Mesh && o.material) {
            const mat = o.material as THREE.MeshStandardMaterial;
            mat.envMapIntensity = 1.6;
            if ("metalness" in mat) mat.metalness = Math.min(1, (mat.metalness ?? 0.6) + 0.25);
            if ("roughness" in mat) mat.roughness = Math.max(0.05, (mat.roughness ?? 0.5) - 0.2);
          }
        });
        model.rotation.x = -Math.PI / 2; // blade length along screen Y, tip up
        spin.add(model);
      },
      undefined,
      (err) => console.error("katana load error", err)
    );

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      aspect = w / h;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: 0, y: 0 };
    const tgt = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    interface Waypoint {
      x: number;
      y: number;
      lean: number;
      scale: number;
      op: number;
    }

    /* waypoints per section — x/y world units, lean = screen tilt (0 = vertical, PI/2 = horizontal) */
    const WAY: Record<string, () => Waypoint> = {
      manifesto: () => ({ x: hw() * 0.6, y: 0, lean: 0.1, scale: 1.0, op: 1.0 }),
      stack: () => ({ x: 0, y: visH * 0.3, lean: Math.PI / 2, scale: 0.94, op: 1.0 }),
      work: () => ({ x: -hw() * 0.74, y: 0, lean: -0.07, scale: 0.85, op: 0.9 }),
      experience: () => ({ x: hw() * 0.64, y: 0, lean: 0.38, scale: 0.92, op: 1.0 }),
      about: () => ({ x: -hw() * 0.68, y: 0.2, lean: -0.3, scale: 0.85, op: 0.9 }),
      contact: () => ({ x: 0, y: -visH * 0.05, lean: Math.PI / 2, scale: 1.06, op: 1.0 }),
    };
    const IDS = ["manifesto", "stack", "work", "experience", "about", "contact"];
    let lastKey = "manifesto";

    function targetState(): Waypoint {
      const hero = document.querySelector(".hero");
      if (hero) {
        const hr = hero.getBoundingClientRect();
        // hidden until the hero is nearly scrolled through
        if (hr.bottom > window.innerHeight * 1.5) {
          return { x: hw() * 0.6, y: -visH, lean: 0.1, scale: 1, op: 0 };
        }
      }
      const midY = window.innerHeight * 0.5;
      for (const id of IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= midY && r.bottom >= midY) {
          lastKey = id;
          break;
        }
      }
      return WAY[lastKey]();
    }

    const cur = { x: 2.2, y: -visH, lean: 0.1, scale: 1, op: 0 };
    const clock = new THREE.Clock();
    let rafId = 0;

    function tick() {
      rafId = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();
      tgt.x = lerp(tgt.x, mouse.x, 0.05);
      tgt.y = lerp(tgt.y, mouse.y, 0.05);

      const target = targetState();
      cur.x = lerp(cur.x, target.x, 0.045);
      cur.y = lerp(cur.y, target.y, 0.045);
      cur.lean = lerp(cur.lean, target.lean, 0.05);
      cur.scale = lerp(cur.scale, target.scale, 0.05);
      cur.op = lerp(cur.op, clamp(target.op), 0.06);

      canvas!.style.opacity = cur.op.toFixed(3);

      if (model) {
        pivot.position.x = cur.x + tgt.x * 0.18;
        pivot.position.y = cur.y + Math.sin(t * 0.9) * 0.09;
        pivot.rotation.z = cur.lean + Math.sin(t * 0.6) * 0.03 + tgt.x * 0.05;
        pivot.rotation.x = tgt.y * 0.14;
        pivot.scale.setScalar(cur.scale);
        // glint: continuous slow roll around the blade axis + scroll-linked turn
        spin.rotation.y = t * 0.35 + (window.scrollY || 0) * 0.0022;
        camera.position.x = lerp(camera.position.x, tgt.x * 0.3, 0.04);
        camera.lookAt(0, 0, 0);
      }
      renderer.render(scene, camera);
    }
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="katana-canvas" aria-hidden="true" />;
}
