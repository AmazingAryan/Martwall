import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { XR, createXRStore } from '@react-three/xr'
import { Box3, Mesh, Vector3, WebGLRenderer, Scene, PerspectiveCamera, MeshBasicMaterial, BufferGeometry } from "three";

const store = createXRStore();

interface ModelViewerProps {
  modelPath: string;
  color: string;
  image: string | undefined;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ modelPath, color, image }) => {
  const model = useLoader(GLTFLoader, modelPath).scene;

  useEffect(() => {
    // Scale and position the model
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
  }, [model]);

 

  return (
    <div style={{ width: '80vw', height: '80vh', margin: '0 auto' }}>

        <button onClick={() => store.enterAR()}>Enter AR</button>
        <Canvas>
        <XR store={store}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          {modelPath === 'shirt_baked.glb' ? (
            <primitive object={model} scale={5} />
          ) : (
            <primitive object={model} scale={5} />
          )}
          <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
          <Environment preset="sunset" />
          </XR>
        </Canvas>

    </div>
  );
};

export default ModelViewer;
