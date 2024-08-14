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
  
    // Set the target position to center the model
    let targetPosition: [number, number, number] = [5, 10, 10]; // Adjust Z value for depth
  
    // Adjust target position based on screen size
    if (isMobile) {
      targetPosition = [1, 1, 1]; // Increase Z value slightly for mobile
    } else if (isBreakpoint) {
      targetPosition = [0, 0, 5.5]; // Slight adjustment for mid-size screens
    } else {
      targetPosition = [-1, 20, -10]; // Default target position for desktop
    }
  
    // Set model camera position
    if (state.camera) {
      easing.damp3(state.camera.position, targetPosition, 0.25, delta);
    }
  
    // Set the model rotation smoothly
    if (group.current) {
      // Adjust rotation to fix upside-down issue
  
      easing.dampE(
        group.current.rotation,
        [state.pointer.y / 1, -state.pointer.x / 1, 1],
        0.25,
        delta
      );
    }
  });

  return <group ref={group}>{children}</group>;
};

export default CameraRig;
