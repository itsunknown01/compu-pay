"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface NeuronProps {
  position: [number, number, number];
  size: number;
  color: string;
  active: boolean;
}

function Neuron({ position, size, color, active }: NeuronProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && active) {
      const time = state.clock.getElapsedTime();
      const material = meshRef.current.material as THREE.Material;
      material.opacity = 0.6 + Math.sin(time * 4) * 0.4;
    }
  });

  return (
    <group position={position}>
      <Sphere ref={meshRef} args={[size, 16, 16]}>
        <meshPhongMaterial
          color={color}
          transparent
          opacity={active ? 0.8 : 0.4}
          emissive={color}
          emissiveIntensity={active ? 0.5 : 0.1}
        />
      </Sphere>
      {active && (
        <Sphere args={[size * 1.8, 16, 16]}>
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.1}
            side={THREE.BackSide}
          />
        </Sphere>
      )}
    </group>
  );
}

function NeuralLayer({
  yPos,
  count,
  color,
  activeIndices,
}: {
  yPos: number;
  count: number;
  color: string;
  activeIndices: number[];
}) {
  const neurons = useMemo(() => {
    const spacing = 2;
    const width = (count - 1) * spacing;
    return Array.from({ length: count }, (_, i) => ({
      x: -width / 2 + i * spacing,
      z: (Math.random() - 0.5) * 1,
      active: activeIndices.includes(i),
    }));
  }, [count, activeIndices]);

  return (
    <>
      {neurons.map((neuron, i) => (
        <Neuron
          key={i}
          position={[neuron.x, yPos, neuron.z]}
          size={0.25}
          color={color}
          active={neuron.active}
        />
      ))}
    </>
  );
}

function SynapseConnections() {
  const linesRef = useRef<THREE.Group>(null);

  const layers = useMemo(
    () => [
      { y: -3, count: 8, color: "#3b82f6", active: [1, 3, 5, 7] },
      { y: -1, count: 6, color: "#06b6d4", active: [0, 2, 4] },
      { y: 1, count: 6, color: "#06b6d4", active: [1, 3, 5] },
      { y: 3, count: 4, color: "#10b981", active: [0, 2] },
    ],
    [],
  );

  useFrame((state) => {
    if (linesRef.current) {
      const time = state.clock.getElapsedTime();
      linesRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Line) {
          const material = child.material as THREE.LineBasicMaterial;
          material.opacity = 0.2 + Math.sin(time * 2 + i * 0.1) * 0.1;
        }
      });
    }
  });

  const connections = useMemo(() => {
    const conns: Array<{ start: THREE.Vector3; end: THREE.Vector3 }> = [];

    for (let layerIdx = 0; layerIdx < layers.length - 1; layerIdx++) {
      const layer1 = layers[layerIdx];
      const layer2 = layers[layerIdx + 1];

      const spacing1 = 2;
      const width1 = (layer1.count - 1) * spacing1;
      const spacing2 = 2;
      const width2 = (layer2.count - 1) * spacing2;

      for (let i = 0; i < layer1.count; i++) {
        for (let j = 0; j < layer2.count; j++) {
          if (Math.random() > 0.3) {
            
            const x1 = -width1 / 2 + i * spacing1;
            const x2 = -width2 / 2 + j * spacing2;
            conns.push({
              start: new THREE.Vector3(x1, layer1.y, 0),
              end: new THREE.Vector3(x2, layer2.y, 0),
            });
          }
        }
      }
    }

    return conns;
  }, [layers]);

  return (
    <group ref={linesRef}>
      {connections.map((conn, i) => {
        const points = [conn.start, conn.end];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return (
          
          <line key={i} {...({ geometry } as any)}>
            <lineBasicMaterial color="#3b82f6" transparent opacity={0.2} />
          </line>
        );
      })}
      {layers.map((layer, i) => (
        <NeuralLayer
          key={i}
          yPos={layer.y}
          count={layer.count}
          color={layer.color}
          activeIndices={layer.active}
        />
      ))}
    </group>
  );
}

function DataPulse() {
  const pulseRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (pulseRef.current) {
      const time = state.clock.getElapsedTime();
      pulseRef.current.position.y = -3 + ((time * 2) % 6);
      const material = pulseRef.current.material as THREE.Material;
      material.opacity = Math.sin(time * 4) * 0.3 + 0.4;
    }
  });

  return (
    <Sphere ref={pulseRef} args={[0.3, 16, 16]} position={[0, -3, 0]}>
      <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} />
    </Sphere>
  );
}

function BrainStructure() {
  const brainRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (brainRef.current) {
      brainRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={brainRef}>
      {}
      <Sphere args={[2, 32, 32]} position={[-1.2, 0, 0]}>
        <MeshDistortMaterial
          color="#1e293b"
          distort={0.4}
          speed={1}
          roughness={0.8}
          transparent
          opacity={0.3}
          wireframe
        />
      </Sphere>
      {}
      <Sphere args={[2, 32, 32]} position={[1.2, 0, 0]}>
        <MeshDistortMaterial
          color="#1e293b"
          distort={0.4}
          speed={1}
          roughness={0.8}
          transparent
          opacity={0.3}
          wireframe
        />
      </Sphere>
    </group>
  );
}

export function AIBrain3D() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <color attach="background" args={["#0A0B0D"]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#06b6d4" />
        <pointLight position={[-10, 10, -10]} intensity={0.8} color="#3b82f6" />
        <pointLight position={[0, -10, 0]} intensity={0.5} color="#10b981" />

        <BrainStructure />
        <SynapseConnections />
        <DataPulse />

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.3}
          minDistance={10}
          maxDistance={25}
        />
      </Canvas>
    </div>
  );
}
