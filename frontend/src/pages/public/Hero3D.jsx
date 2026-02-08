import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/models/building.glb");
  return (
    <primitive
      object={scene}
      scale={1.4}
      position={[0, -1.2, 0]}
      rotation={[0, Math.PI / 8, 0]}
    />
  );
}

useGLTF.preload("/models/building.glb");

const Hero3D = () => {
  return (
    <Canvas
      camera={{ position: [4, 2, 6], fov: 45 }}
      dpr={[1, 1.5]}
    >
      {/* Light */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />

      {/* Environment */}
      <Environment preset="city" />

      {/* Model */}
      <Suspense fallback={null}>
        <Model />
      </Suspense>

      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.8}
      />
    </Canvas>
  );
};

export default Hero3D;
