import { useEffect } from "react";
import { ARCanvas } from "react-three-mindts";
import ARGame from "../../feature/ARgame";

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
    <ARCanvas markerUrl="./kyutxr-card.mind">
      <ARGame />
    </ARCanvas>
  );
};
export default GamePage;
