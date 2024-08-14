import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import * as THREE from "three";

interface CameraRigProps {
  children: React.ReactNode;
}

const CameraRig: React.FC<CameraRigProps> = ({ children }) => {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    // Set the initial position of the model
    let targetPosition = [0.1, 0, 2];
    if (isMobile) targetPosition = [0, 0, 2.5];
    else targetPosition = [0, 0, 2];

    // Set model camera position
    if (state.camera) {
      easing.damp3(state.camera.position, targetPosition, 0.25, delta);
    }

    // Set the model rotation smoothly
    if (group.current) {
      easing.dampE(
        group.current.rotation,
        [state.pointer.y / 2, -state.pointer.x / 1, 0],
        0.25,
        delta
      );
    }
  });

  return <group ref={group}>{children}</group>;
};

export default CameraRig;
