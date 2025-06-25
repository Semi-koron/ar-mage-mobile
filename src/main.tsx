import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ARCanvas } from "@artcom/react-three-arjs";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ARCanvas
      sourceType="webcam"
      onCameraStreamReady={() => console.log("Camera ready")}
      onCameraStreamError={() => console.error("Camera error")}
      onCreated={({ gl }) => {
        gl.setSize(window.innerWidth, window.innerHeight);
      }}
    >
      <App />
    </ARCanvas>
  </StrictMode>
);
