import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function RobotModel({ mouseX, mouseY }) {
  const headPivotRef = useRef();
  const armLRef = useRef();
  const armRRef = useRef();
  const foreArmLRef = useRef();
  const foreArmRRef = useRef();
  const torsoRef = useRef();
  const robotRef = useRef();
  const headX = useRef(0);
  const headY = useRef(0);
  const glowRef = useRef();

  const mats = useMemo(() => ({
    body:   new THREE.MeshStandardMaterial({ color: 0x1a3a5c, metalness: 0.8, roughness: 0.25 }),
    accent: new THREE.MeshStandardMaterial({ color: 0x008cff, metalness: 1, roughness: 0.05, emissive: new THREE.Color(0x004488), emissiveIntensity: 0.8 }),
    glow:   new THREE.MeshStandardMaterial({ color: 0x00eeff, emissive: new THREE.Color(0x00ccff), emissiveIntensity: 2 }),
    dark:   new THREE.MeshStandardMaterial({ color: 0x0d2340, metalness: 0.9, roughness: 0.2 }),
    mid:    new THREE.MeshStandardMaterial({ color: 0x2a5080, metalness: 0.85, roughness: 0.2 }),
  }), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // ✅ Suivi tête — mouseY capturé avec - donc on l'utilise directement
    headX.current += (mouseX.current * 0.4 - headX.current) * 0.06;
    headY.current += (mouseY.current * 0.25 - headY.current) * 0.06;
    if (headPivotRef.current) {
      headPivotRef.current.rotation.y = headX.current;
      headPivotRef.current.rotation.x = -headY.current; // ✅ inversion finale ici
    }

    // Respiration torse
    if (torsoRef.current) {
      torsoRef.current.position.y = Math.sin(t * 0.9) * 0.04;
    }

    // ✅ Bras gauche — mouvement naturel, part de l'épaule gauche vers le bas
    if (armLRef.current) {
      armLRef.current.rotation.z = 0.25 + Math.sin(t * 0.5 + 1.0) * 0.15;
      armLRef.current.rotation.x = Math.sin(t * 0.4 + 0.5) * 0.08;
    }
    if (foreArmLRef.current) {
      foreArmLRef.current.rotation.z = -0.1 + Math.sin(t * 0.6 + 2.0) * 0.15;
      foreArmLRef.current.rotation.x = 0;
    }

    // ✅ Bras droit — mouvement symétrique naturel, décalé en phase
    if (armRRef.current) {
      armRRef.current.rotation.z = -(0.25 + Math.sin(t * 0.5 + 2.5) * 0.15);
      armRRef.current.rotation.x = Math.sin(t * 0.4 + 2.0) * 0.08;
    }
    if (foreArmRRef.current) {
      foreArmRRef.current.rotation.z = 0.1 - Math.sin(t * 0.6 + 0.5) * 0.15;
      foreArmRRef.current.rotation.x = 0;
    }

    // Légère rotation idle corps
    if (robotRef.current) {
      robotRef.current.rotation.y = Math.sin(t * 0.25) * 0.06;
    }

    // Pulse réacteur/yeux
    if (glowRef.current) {
      glowRef.current.material.emissiveIntensity = 1.5 + Math.sin(t * 3) * 0.5;
    }
  });

  const B = (w, h, d) => new THREE.BoxGeometry(w, h, d);
  const C = (rt, rb, h, s = 10) => new THREE.CylinderGeometry(rt, rb, h, s);
  const S = (r, s = 12) => new THREE.SphereGeometry(r, s, s);

  return (
    <group ref={robotRef} position={[0, -0.8, 0]}>
      <group ref={torsoRef}>
        <mesh geometry={B(1.2, 1.4, 0.6)} material={mats.body} />
        <mesh geometry={B(0.75, 0.55, 0.08)} material={mats.dark} position={[0, 0.12, 0.32]} />
        <mesh ref={glowRef} geometry={S(0.14, 10)} material={mats.glow} position={[0, 0.12, 0.36]} />
        <mesh geometry={B(0.06, 1.3, 0.06)} material={mats.accent} position={[-0.5, 0, 0.28]} />
        <mesh geometry={B(0.06, 1.3, 0.06)} material={mats.accent} position={[0.5, 0, 0.28]} />
        <mesh geometry={B(0.5, 0.08, 0.52)} material={mats.accent} position={[0, -0.62, 0]} />
        <mesh geometry={B(1.05, 0.32, 0.55)} material={mats.dark} position={[0, -0.86, 0]} />

        <mesh geometry={C(0.14, 0.17, 0.28)} material={mats.mid} position={[0, 0.84, 0]} />

        <group ref={headPivotRef} position={[0, 0.84, 0]}>
          <group position={[0, 0.38, 0]}>
            <mesh geometry={B(0.78, 0.72, 0.65)} material={mats.body} />
            <mesh geometry={B(0.62, 0.22, 0.06)} material={mats.accent} position={[0, 0.06, 0.35]} />
            <mesh geometry={S(0.09, 8)} material={mats.glow} position={[-0.19, 0.08, 0.35]} />
            <mesh geometry={S(0.09, 8)} material={mats.glow} position={[0.19, 0.08, 0.35]} />
            <mesh geometry={B(0.3, 0.04, 0.04)} material={mats.accent} position={[0, -0.15, 0.33]} />
            <mesh geometry={B(0.09, 0.35, 0.14)} material={mats.accent} position={[-0.42, 0, 0]} />
            <mesh geometry={B(0.09, 0.35, 0.14)} material={mats.accent} position={[0.42, 0, 0]} />
            <mesh geometry={C(0.03, 0.04, 0.2)} material={mats.mid} position={[0.2, 0.5, 0]} />
            <mesh geometry={S(0.07, 8)} material={mats.glow} position={[0.2, 0.62, 0]} />
          </group>
        </group>

        <mesh geometry={S(0.26, 12)} material={mats.accent} position={[-0.82, 0.5, 0]} />
        <mesh geometry={S(0.26, 12)} material={mats.accent} position={[0.82, 0.5, 0]} />

        <group ref={armLRef} position={[-0.82, 0.5, 0]}>
          <mesh geometry={B(0.26, 0.75, 0.26)} material={mats.body} position={[-0.12, -0.48, 0]} />
          <mesh geometry={S(0.16, 8)} material={mats.mid} position={[-0.12, -0.9, 0]} />
          <group ref={foreArmLRef} position={[-0.12, -0.9, 0]}>
            <mesh geometry={B(0.22, 0.7, 0.22)} material={mats.dark} position={[0, -0.4, 0]} />
            <mesh geometry={B(0.05, 0.55, 0.05)} material={mats.accent} position={[0.1, -0.4, 0.1]} />
            <mesh geometry={B(0.24, 0.26, 0.14)} material={mats.body} position={[0, -0.82, 0]} />
          </group>
        </group>

        <group ref={armRRef} position={[0.82, 0.5, 0]}>
          <mesh geometry={B(0.26, 0.75, 0.26)} material={mats.body} position={[0.12, -0.48, 0]} />
          <mesh geometry={S(0.16, 8)} material={mats.mid} position={[0.12, -0.9, 0]} />
          <group ref={foreArmRRef} position={[0.12, -0.9, 0]}>
            <mesh geometry={B(0.22, 0.7, 0.22)} material={mats.dark} position={[0, -0.4, 0]} />
            <mesh geometry={B(0.05, 0.55, 0.05)} material={mats.accent} position={[-0.1, -0.4, 0.1]} />
            <mesh geometry={B(0.24, 0.26, 0.14)} material={mats.body} position={[0, -0.82, 0]} />
          </group>
        </group>
      </group>

      <group position={[-0.32, -1.05, 0]}>
        <mesh geometry={B(0.32, 0.75, 0.32)} material={mats.body} position={[0, -0.38, 0]} />
        <mesh geometry={S(0.2, 10)} material={mats.mid} position={[0, -0.78, 0]} />
        <mesh geometry={B(0.26, 0.7, 0.28)} material={mats.dark} position={[0, -1.18, 0]} />
        <mesh geometry={B(0.28, 0.07, 0.3)} material={mats.accent} position={[0, -0.78, 0.14]} />
        <mesh geometry={B(0.3, 0.16, 0.45)} material={mats.body} position={[0, -1.6, 0.1]} />
      </group>
      <group position={[0.32, -1.05, 0]}>
        <mesh geometry={B(0.32, 0.75, 0.32)} material={mats.body} position={[0, -0.38, 0]} />
        <mesh geometry={S(0.2, 10)} material={mats.mid} position={[0, -0.78, 0]} />
        <mesh geometry={B(0.26, 0.7, 0.28)} material={mats.dark} position={[0, -1.18, 0]} />
        <mesh geometry={B(0.28, 0.07, 0.3)} material={mats.accent} position={[0, -0.78, 0.14]} />
        <mesh geometry={B(0.3, 0.16, 0.45)} material={mats.body} position={[0, -1.6, 0.1]} />
      </group>
    </group>
  );
}

function RobotScene() {
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.current = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY.current = (e.clientY / window.innerHeight - 0.5) * 2; // ✅ sans inversion
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0.5, 5.5], fov: 42 }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={2} />
      <directionalLight position={[2, 5, 4]} intensity={4} color="#ffffff" />
      <pointLight position={[0, 1, 4]} intensity={6} color="#008cff" />
      <pointLight position={[-3, 2, 3]} intensity={3} color="#4488ff" />
      <pointLight position={[3, 0, 2]} intensity={2} color="#00ffff" />
      <RobotModel mouseX={mouseX} mouseY={mouseY} />
    </Canvas>
  );
}

export default RobotScene;