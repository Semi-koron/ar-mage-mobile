import { useState } from "react";
import "./App.css";

import { ARCanvas, ARMarker } from "@artcom/react-three-arjs";

function App() {
  return (
    <ARCanvas
      gl={{
        antialias: false,
        powerPreference: "default",
      }}
      onCameraStreamReady={() => console.log("Camera stream ready")}
      onCameraStreamError={() => console.error("Camera stream error")}
      onCreated={({ gl }) => {
        gl.setSize(window.innerWidth, window.innerHeight);
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* AR Marker with Barcode */}
      <ARMarker
        params={{ smooth: true }}
        type={"pattern"}
        patternUrl={"data/patt.hiro"}
        onMarkerFound={() => {
          console.log("Marker Found");
        }}
      >
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={"green"} />
        </mesh>
      </ARMarker>
    </ARCanvas>
  );
}

export default App;
