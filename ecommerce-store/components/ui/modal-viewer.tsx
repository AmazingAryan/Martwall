import React from "react";
import { Canvas } from "@react-three/fiber";
import { XR, createXRStore } from '@react-three/xr'
import { OrbitControls, Environment } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { TDSLoader } from "three/examples/jsm/loaders/TDSLoader";
import { useLoader } from "@react-three/fiber";
import { Box3, Mesh, Vector3 } from "three";
import CameraRig from "./cameraRig";
import Shirt from "./shirt";

interface ModelViewerProps {
  modelPath: string;
  color: string;
  image: string | undefined;
}
const store = createXRStore()
const ModelViewer: React.FC<ModelViewerProps> = ({ modelPath, color, image }) => {
  const model = useLoader(GLTFLoader, modelPath).scene; 

  model.scale.set(1, 1, 1);
  model.position.set(0, -1, 0);
  model.traverse((child) => {
    if ((child as Mesh).isMesh) {
      const mesh = child as Mesh;
      const bbox = new Box3().setFromObject(mesh);
      const size = bbox.getSize(new Vector3());
      const maxDimension = Math.max(size.x, size.y, size.z);
      const scale = 1 / maxDimension;
      mesh.scale.set(scale, scale, scale);
    }
  });

  return (
    <div style={{ width: '80vw', height: '80vh', margin: '0 auto' }}>
       <button onClick={() => store.enterAR()}>Enter AR</button>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {modelPath === 'shirt_baked.glb' ? (
          <Shirt model={model} color={color} logo={image} />
        ) : (
          <primitive object={model} scale={5} />
        )}
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
        <Environment preset="sunset" />
        
      </Canvas>
    </div>
  );
};

export default ModelViewer;
