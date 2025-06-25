import "./App.css";

import { ARCanvas, ARMarker } from "@artcom/react-three-arjs";
import useWebsocket from "./hooks/useWebsocket";
import Stage from "./components/object/Stage";
import Player from "./components/object/Player";

function App() {
  const { stage, player, onOff, isConnected } = useWebsocket("test");
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
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-3, 2, 1]} intensity={0.4} />
        {stage !== null && onOff !== null && (
          <Stage grid={stage.stage} isOnOff={onOff.data} />
        )}
        {player && (
          <Player position={player?.position} rotation={player?.rotation} />
        )}
      </ARMarker>
    </ARCanvas>
  );
}

export default App;
