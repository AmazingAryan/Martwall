import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";

interface ModelViewerProps {
  modelPath: string;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ modelPath }) => {
  const gltf = useLoader(GLTFLoader, modelPath);

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <primitive object={gltf.scene} scale={10} />
      <OrbitControls />
      <Environment preset="sunset" />
    </Canvas>
  );
};

export default ModelViewer;
