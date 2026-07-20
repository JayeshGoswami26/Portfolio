"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Interactive 3D katana — drag to rotate with inertia, gentle idle spin.
 * Used inside a .katana-stage on the case-study and contact pages.
 */
export default function KatanaViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

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

    // bright steel lighting so the dark blade reads on black
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
    const visH = 2 * Math.tan((FOV * Math.PI) / 360) * CAMZ;

    new GLTFLoader().load(
      "/models/katana.glb",
      (gltf) => {
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        model.scale.setScalar((visH * 0.8) / maxDim);
        model.traverse((obj) => {
          const mesh = obj as THREE.Mesh;
          if (mesh.isMesh && mesh.material) {
            const mat = mesh.material as THREE.MeshStandardMaterial;
            mat.envMapIntensity = 1.6;
            if ("metalness" in mat) mat.metalness = Math.min(1, (mat.metalness ?? 0.6) + 0.25);
            if ("roughness" in mat) mat.roughness = Math.max(0.05, (mat.roughness ?? 0.5) - 0.2);
          }
        });
        model.rotation.x = -Math.PI / 2; // blade along screen Y
        spin.add(model);
        pivot.rotation.z = 0.35;
        canvas.classList.add("ready");
      },
      undefined,
      (err) => console.error("katana load error", err)
    );

    function resize() {
      if (!canvas) return;
      const w = canvas.clientWidth || 600;
      const h = canvas.clientHeight || 600;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener("resize", resize);

    /* drag to rotate with inertia */
    let dragging = false;
    let px = 0;
    let py = 0;
    let vx = 0;
    let vy = 0;
    let idle = 0;

    const onDown = (e: PointerEvent) => {
      canvas.setPointerCapture(e.pointerId);
      dragging = true;
      px = e.clientX;
      py = e.clientY;
      vx = 0;
      vy = 0;
      canvas.classList.add("grabbing");
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      vx = (e.clientX - px) * 0.008;
      vy = (e.clientY - py) * 0.006;
      spin.rotation.y += vx;
      pivot.rotation.x += vy;
      pivot.rotation.x = Math.max(-1.1, Math.min(1.1, pivot.rotation.x));
      px = e.clientX;
      py = e.clientY;
      idle = 0;
    };
    const onUp = () => {
      dragging = false;
      canvas.classList.remove("grabbing");
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    const clock = new THREE.Clock();
    let rafId = 0;
    function tick() {
      rafId = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();
      if (!dragging) {
        // inertia decay, then gentle idle spin
        spin.rotation.y += vx;
        pivot.rotation.x += vy;
        pivot.rotation.x = Math.max(-1.1, Math.min(1.1, pivot.rotation.x));
        vx *= 0.95;
        vy *= 0.95;
        idle++;
        if (idle > 90) {
          spin.rotation.y += 0.004;
          pivot.rotation.x = lerp(pivot.rotation.x, 0, 0.02);
        }
      }
      pivot.position.y = Math.sin(t * 0.9) * 0.08;
      pivot.rotation.z = 0.35 + Math.sin(t * 0.6) * 0.03;
      renderer.render(scene, camera);
    }
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="katana-viewer"
      aria-label="Interactive 3D katana — drag to rotate"
    />
  );
}
