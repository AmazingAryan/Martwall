import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { Box3, Mesh, Vector3, WebGLRenderer, Scene, PerspectiveCamera, MeshBasicMaterial, BufferGeometry } from "three";

interface ModelViewerProps {
  modelPath: string;
  color: string;
  image: string | undefined;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ modelPath, color, image }) => {
  const model = useLoader(GLTFLoader, modelPath).scene;
  const [isAR, setIsAR] = useState(false);
  const rendererRef = useRef<WebGLRenderer | null>(null);

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

  useEffect(() => {
    if (isAR) {
      const renderer = new WebGLRenderer({ antialias: true, alpha: true });
      renderer.xr.enabled = true;
      renderer.setSize(window.innerWidth, window.innerHeight);
      rendererRef.current = renderer;

      const scene = new Scene();
      const camera = new PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.01,
        20
      );

      scene.add(model);

      const onXRSessionStarted = async (session: XRSession) => {
        renderer.xr.setSession(session);
        const animate = () => {
          renderer.setAnimationLoop(() => {
            renderer.render(scene, camera);
          });
        };
        animate();
      };

      if (navigator.xr) {
        navigator.xr.requestSession("immersive-ar", {
          requiredFeatures: ["local-floor", "bounded-floor"]
        }).then(onXRSessionStarted);
      }
    }
  }, [isAR, model]);

  const toggleARMode = () => {
    setIsAR((prev) => !prev);
  };

  return (
    <div style={{ width: '80vw', height: '80vh', margin: '0 auto' }}>
      <button onClick={toggleARMode}>
        {isAR ? 'Exit AR Mode' : 'Enter AR Mode'}
      </button>
      {!isAR && (
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          {modelPath === 'shirt_baked.glb' ? (
            <primitive object={model} scale={5} />
          ) : (
            <primitive object={model} scale={5} />
          )}
          <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
          <Environment preset="sunset" />
        </Canvas>
      )}
    </div>
  );
};

export default ModelViewer;
