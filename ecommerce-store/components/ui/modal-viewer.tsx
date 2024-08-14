import React from "react";
import { Canvas } from "@react-three/fiber";
import { XR, createXRStore } from '@react-three/xr'
import { OrbitControls, Environment } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { TDSLoader } from "three/examples/jsm/loaders/TDSLoader";
import { useLoader } from "@react-three/fiber";
import CameraRig from "./cameraRig";

interface ModelViewerProps {
  modelPath: string;
}
const store = createXRStore()
const ModelViewer: React.FC<ModelViewerProps> = ({ modelPath }) => {
  const fileExtension = modelPath.split('.').pop()?.toLowerCase();

  // Load model conditionally based on the file extension
  let model;
  if (fileExtension === 'glb') {
    model = useLoader(GLTFLoader, modelPath).scene;
  } else if (fileExtension === '3ds') {
    model = useLoader(TDSLoader, modelPath);
  } else if (fileExtension === 'obj') {
    model = useLoader(OBJLoader, modelPath);
  } else {
    throw new Error('Unsupported file format');
  }
  
  return (
    <div style={{ width: '80vw', height: '80vh', margin: '0 auto' }}>
       <button onClick={() => store.enterAR()}>Enter AR</button>
      <Canvas>
      <XR store={store}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <CameraRig>
          <primitive object={model} scale={0.01} />
        </CameraRig>
        
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
        <Environment preset="sunset" />
        </XR>
      </Canvas>
    </div>
  );
};

export default ModelViewer;