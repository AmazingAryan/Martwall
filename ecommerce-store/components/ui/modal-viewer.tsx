import React from "react";
import '@google/model-viewer';

interface ModelViewerProps {
  modelPath: string;
  color: string;
  image: string | undefined;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ modelPath }) => {
  return (
    <div style={{ width: '80vw', height: '80vh', margin: '0 auto' }}>
      {/* model-viewer component */}
      <model-viewer
        src={modelPath}
        alt="A 3D model of a product"
        ar
        ar-modes="scene-viewer quick-look"
        environment-image="neutral"
        auto-rotate
        camera-controls
        style={{ width: '100%', height: '100%' }}
      >
      </model-viewer>
    </div>
  );
};

export default ModelViewer;
