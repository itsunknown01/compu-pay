// "use client";

// import React, { useRef, useMemo } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls, Box, Sphere } from "@react-three/drei";
// import * as THREE from "three";

// interface RiskCubeProps {
//   position: [number, number, number];
//   severity: "high" | "medium" | "low";
// }

// function RiskCube({ position, severity }: RiskCubeProps) {
//   const meshRef = useRef<THREE.Mesh>(null);

//   const colorMap = {
//     high: "#ef4444",
//     medium: "#f97316",
//     low: "#eab308",
//   };

//   const intensityMap = {
//     high: 0.8,
//     medium: 0.5,
//     low: 0.3,
//   };

//   useFrame((state) => {
//     if (meshRef.current) {
//       const time = state.clock.getElapsedTime();
//       meshRef.current.rotation.x = time * 0.5;
//       meshRef.current.rotation.y = time * 0.3;

//       const pulse = Math.sin(time * 3) * 0.2 + 1;
//       meshRef.current.scale.setScalar(pulse);
//     }
//   });

//   return (
//     <group position={position}>
//       <Box ref={meshRef} args={[0.8, 0.8, 0.8]}>
//         <meshPhongMaterial
//           color={colorMap[severity]}
//           emissive={colorMap[severity]}
//           emissiveIntensity={intensityMap[severity]}
//           transparent
//           opacity={0.8}
//         />
//       </Box>
//       {}
//       <Box args={[1.2, 1.2, 1.2]}>
//         <meshBasicMaterial
//           color={colorMap[severity]}
//           transparent
//           opacity={0.1}
//           side={THREE.BackSide}
//         />
//       </Box>
//     </group>
//   );
// }

// function RiskGrid() {
//   const gridRef = useRef<THREE.Group>(null);

//   const risks = useMemo(
//     () =>
//       [
//         { pos: [-3, 2, 0], severity: "high", label: "Anomaly" },
//         { pos: [0, 2, 0], severity: "high", label: "Fraud" },
//         { pos: [3, 2, 0], severity: "medium", label: "Outlier" },
//         { pos: [-3, 0, 0], severity: "medium", label: "Pattern" },
//         { pos: [0, 0, 0], severity: "low", label: "Variance" },
//         { pos: [3, 0, 0], severity: "medium", label: "Drift" },
//         { pos: [-3, -2, 0], severity: "low", label: "Minor" },
//         { pos: [0, -2, 0], severity: "medium", label: "Issue" },
//         { pos: [3, -2, 0], severity: "high", label: "Critical" },
//       ] as const,
//     [],
//   );

//   useFrame((state) => {
//     if (gridRef.current) {
//       gridRef.current.rotation.y =
//         Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
//     }
//   });

//   const gridLines = useMemo(() => {
//     const lines: Array<{ start: THREE.Vector3; end: THREE.Vector3 }> = [];

//     for (let y = -2; y <= 2; y += 2) {
//       lines.push({
//         start: new THREE.Vector3(-3, y, 0),
//         end: new THREE.Vector3(3, y, 0),
//       });
//     }

//     for (let x = -3; x <= 3; x += 3) {
//       lines.push({
//         start: new THREE.Vector3(x, -2, 0),
//         end: new THREE.Vector3(x, 2, 0),
//       });
//     }

//     return lines;
//   }, []);

//   return (
//     <group ref={gridRef}>
//       {gridLines.map((line, i) => {
//         const points = [line.start, line.end];
//         const geometry = new THREE.BufferGeometry().setFromPoints(points);
//         return (
//           <line key={i} geometry={geometry}>
//             <lineBasicMaterial color="#3b82f6" transparent opacity={0.2} />
//           </line>
//         );
//       })}
//       {risks.map((risk, i) => (
//         <RiskCube
//           key={i}
//           position={risk.pos as [number, number, number]}
//           severity={risk.severity}
//         />
//       ))}
//     </group>
//   );
// }

// function ScanningPlane() {
//   const planeRef = useRef<THREE.Mesh>(null);

//   useFrame((state) => {
//     if (planeRef.current) {
//       const time = state.clock.getElapsedTime();
//       planeRef.current.position.y = -3 + ((time * 1.5) % 6);
//     }
//   });

//   return (
//     <mesh ref={planeRef} position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
//       <planeGeometry args={[10, 10, 1, 1]} />
//       <meshBasicMaterial
//         color="#06b6d4"
//         transparent
//         opacity={0.2}
//         side={THREE.DoubleSide}
//       />
//     </mesh>
//   );
// }

// function AlertParticles() {
//   const particlesRef = useRef<THREE.Group>(null);

//   useFrame((state) => {
//     if (particlesRef.current) {
//       const time = state.clock.getElapsedTime();
//       particlesRef.current.children.forEach((child, i) => {
//         const speed = 0.5 + (i % 3) * 0.3;
//         const offset = (i / 20) * Math.PI * 2;
//         const radius = 6;
//         const angle = time * speed + offset;

//         child.position.x = Math.cos(angle) * radius;
//         child.position.y = Math.sin(time + i * 0.3) * 4;
//         child.position.z = Math.sin(angle) * radius;
//       });
//     }
//   });

//   return (
//     <group ref={particlesRef}>
//       {Array.from({ length: 20 }, (_, i) => (
//         <Sphere key={i} args={[0.08, 8, 8]}>
//           <meshBasicMaterial
//             color={i % 2 === 0 ? "#ef4444" : "#f97316"}
//             transparent
//             opacity={0.6}
//           />
//         </Sphere>
//       ))}
//     </group>
//   );
// }

// export function RiskDetection3D() {
//   return (
//     <div className="w-full h-full">
//       <Canvas camera={{ position: [8, 4, 8], fov: 60 }}>
//         <color attach="background" args={["#0A0B0D"]} />
//         <ambientLight intensity={0.3} />
//         <pointLight position={[10, 10, 10]} intensity={1} color="#ef4444" />
//         <pointLight position={[-10, 10, 10]} intensity={0.8} color="#f97316" />
//         <spotLight
//           position={[0, 10, 0]}
//           angle={0.3}
//           penumbra={1}
//           intensity={0.5}
//           color="#06b6d4"
//         />

//         <RiskGrid />
//         <ScanningPlane />
//         <AlertParticles />

//         <OrbitControls
//           enableZoom={true}
//           enablePan={true}
//           enableRotate={true}
//           autoRotate={true}
//           autoRotateSpeed={0.5}
//           minDistance={8}
//           maxDistance={20}
//         />
//       </Canvas>
//     </div>
//   );
// }
