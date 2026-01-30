"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Sphere,
  MeshDistortMaterial,
  Float,
} from "@react-three/drei";
import * as THREE from "three";

interface Node3DProps {
  position: [number, number, number];
  color: string;
  size: number;
}

function Node3D({ position, color, size }: Node3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[size, 32, 32]} position={position}>
        <MeshDistortMaterial
          color={color}
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
      {}
      <Sphere args={[size * 1.5, 32, 32]} position={position}>
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
    </Float>
  );
}

function Connections() {
  const linesRef = useRef<THREE.Group>(null);

  const nodes = useMemo(
    () => [
      { pos: [0, 0, 0], color: "#06b6d4", size: 0.6, label: "AI Core" },
      { pos: [-3, 2, -1], color: "#ef4444", size: 0.4, label: "Risk 1" },
      { pos: [0, 3, 0], color: "#ef4444", size: 0.35, label: "Risk 2" },
      { pos: [3, 2, 1], color: "#ef4444", size: 0.4, label: "Risk 3" },
      { pos: [-4, 0, 0], color: "#3b82f6", size: 0.38, label: "Data 1" },
      { pos: [4, 0, 0], color: "#3b82f6", size: 0.38, label: "Data 2" },
      {
        pos: [-2.5, -2.5, -1.5],
        color: "#3b82f6",
        size: 0.38,
        label: "Data 3",
      },
      { pos: [2.5, -2.5, 1.5], color: "#3b82f6", size: 0.38, label: "Data 4" },
      { pos: [-2, -3, 0], color: "#10b981", size: 0.35, label: "Compliance 1" },
      { pos: [2, -3, 0], color: "#10b981", size: 0.35, label: "Compliance 2" },
    ],
    [],
  );

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={linesRef}>
      {nodes.slice(1).map((node, i) => {
        const start = new THREE.Vector3(0, 0, 0);
        const end = new THREE.Vector3(
          ...(node.pos as [number, number, number]),
        );
        const points = [start, end];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        return (
          
          <line key={i} {...({ geometry } as any)}>
            <lineBasicMaterial color="#3b82f6" transparent opacity={0.3} />
          </line>
        );
      })}
      {nodes.map((node, i) => (
        <Node3D
          key={i}
          position={node.pos as [number, number, number]}
          color={node.color}
          size={node.size}
        />
      ))}
    </group>
  );
}

function OrbitingParticles() {
  const particlesRef = useRef<THREE.Group>(null);
  const particleCount = 50;

  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      angle: (i / particleCount) * Math.PI * 2,
      radius: 6 + Math.random() * 2,
      speed: 0.5 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.getElapsedTime();
      particlesRef.current.children.forEach((child, i) => {
        const particle = particles[i];
        const angle = particle.angle + time * particle.speed;
        child.position.x = Math.cos(angle) * particle.radius;
        child.position.y = Math.sin(time * 0.5 + particle.offset) * 2;
        child.position.z = Math.sin(angle) * particle.radius;
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((_, i) => (
        <Sphere key={i} args={[0.05, 8, 8]}>
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.6} />
        </Sphere>
      ))}
    </group>
  );
}

export function PayrollNetwork3D() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
        <color attach="background" args={["#0A0B0D"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.5}
          color="#06b6d4"
        />

        <Connections />
        <OrbitingParticles />

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
          minDistance={8}
          maxDistance={20}
        />
      </Canvas>
    </div>
  );
}
