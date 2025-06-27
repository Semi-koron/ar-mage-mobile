import { ARMarker } from "@artcom/react-three-arjs";
import { useParams } from "react-router-dom";
import Player from "../../object/Player";
import Stage from "../../object/Stage";
import useWebsocket from "../../../hooks/useWebsocket";

const ARGame = () => {
  const param = useParams();

  const { stage, player, onOff } = useWebsocket(param.roomCode || "test");
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* AR Marker with Barcode */}
      <ARMarker
        params={{ smooth: true }}
        type={"pattern"}
        patternUrl={"/data/patt.hiro"}
        onMarkerFound={() => {
          console.log("Marker Found");
        }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-3, 2, 1]} intensity={0.4} />
        {stage !== null && (
          <Stage grid={stage.stage} isOnOff={onOff === null ? false : onOff} />
        )}
        {player && (
          <Player position={player?.position} rotation={player?.rotation} />
        )}
      </ARMarker>
    </>
  );
};

export default ARGame;
