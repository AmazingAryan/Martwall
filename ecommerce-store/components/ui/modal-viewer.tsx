import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import CameraRig from "./cameraRig";

interface ModelViewerProps {
  modelPath: string;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ modelPath }) => {
  const gltf = useLoader(GLTFLoader, modelPath);

  return (
    <div style={{ width: '80vw', height: '80vh', margin: '0 auto' }}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <CameraRig>
          <primitive object={gltf.scene} scale={3} />
        </CameraRig>
        
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
