import { useEffect } from "react";
import ARGame from "../../feature/ARgame";
import { ARCanvas } from "@artcom/react-three-arjs";

const GamePage = () => {
  useEffect(() => {
    // This effect runs once when the component mounts
    console.log("GamePage component mounted");
    return () => {
      // #arjs-videoであるvideo要素を削除する
      const videoElement: HTMLVideoElement | null =
        document.querySelector("#arjs-video");
      if (videoElement) {
        videoElement.remove();
        console.log("Video element removed");
      }

      // カメラストリームを停止する
      const stream = videoElement?.srcObject as MediaStream;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        console.log("Camera stream stopped");
      }
    };
  }, []);
  return (
    <ARCanvas
      sourceType="webcam"
      cameraParametersUrl="/data/camera_para.dat"
      onCameraStreamReady={() => console.log("Camera ready")}
      onCameraStreamError={() => console.error("Camera error")}
      onCreated={({ gl }) => {
        gl.setSize(window.innerWidth, window.innerHeight);
        const canvas = document.querySelector("canvas");
        if (canvas) {
          canvas.style.marginLeft = "0";
        }
      }}
    >
      <ARGame />
    </ARCanvas>
  );
};
export default GamePage;
