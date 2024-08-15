import React from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath'; 
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import { Material, Mesh, NormalBufferAttributes, Object3DEventMap, MeshStandardMaterial } from 'three';
import { BufferGeometry } from 'three/src/Three';

interface ShirtProps {
  model: any;
  color: string;
  logo: string | undefined;
}

const Shirt: React.FC<ShirtProps> = ({ model, color, logo }) => {
  const { nodes, materials } = useGLTF(model) as any;
  const logoTexture = useTexture(logo || "");

  useFrame((state, delta) => {
    // Smoothly update the color of the material
    easing.dampC(materials.lambert1.color, color, 0.25, delta);
  });

  return (
    <mesh
      castShadow
      geometry={nodes.model.geometry}
      material={materials.lambert1}
      material-roughness={1}
      dispose={null}
    >
      <Decal
        position={[0, 0.04, 0.15]}
        rotation={[0, 0, 0]}
        scale={0.15}
        map={logoTexture}
        map-anisotropy={16}
        depthTest={false}
      />
    </mesh>
  );
};

export default Shirt;
