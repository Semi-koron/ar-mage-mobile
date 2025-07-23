import { useEffect, useState, useRef } from "react";
import type {
  StageData,
  PlayerData,
  GimickData,
  DataMessage,
} from "../types/websocket";

const useWebsocket = (roomId: string) => {
  const [stage, setStage] = useState<StageData | null>(null);
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [onOff, setOnOff] = useState<boolean | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(
    null
  );
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!roomId) return;

    // WebSocket の URL

    const baseUrl = import.meta.env.VITE_WS_BASE_URL || "localhost:8080";
    const protocol = import.meta.env.VITE_WS_PROTOCOL || "ws";
    const socket = new WebSocket(`${protocol}://${baseUrl}/mobile/${roomId}`);
    socketRef.current = socket;

    // 接続成功
    socket.onopen = () => {
      console.log(`✅ Connected to room: ${roomId}`);
      setIsConnected(true);
    };

    // メッセージ受信
    socket.onmessage = (event) => {
      try {
        const data: DataMessage = event.data;
        switch (data.type) {
          case "stage":
            setStage(data.content as StageData);
            console.log("📬 Stage data updated:", data.content);
            break;
          case "player":
            setPlayer(data.content as PlayerData);
            console.log("📬 Player data updated:", data.content);
            break;
          case "gimick":
            const gimickData = data.content as GimickData;
            switch (gimickData.gimick) {
              case "onOff":
                setOnOff(gimickData.data);
                console.log("📬 Gimick data updated:", gimickData);
            }
            break;
          default:
            console.warn("⚠️ Unknown message type:", data.type);
        }
      } catch (error) {
        console.error(
          "❌ Error parsing message:",
          error,
          "Message:",
          event.data
        );
      }
    };

    // エラー処理
    socket.onerror = (error) => {
      console.error("❌ WebSocket Error:", error);
    };

    // 切断処理
    socket.onclose = (event) => {
      console.warn(`⚠️ WebSocket closed: ${event.code}, ${event.reason}`);
      setIsConnected(false);
    };

    // クリーンアップ（コンポーネントがアンマウントされたとき）
    return () => {
      console.log(`🔌 Disconnecting from room: ${roomId}`);
      socket.close();
    };
  }, [roomId]); // roomId が変更されるたびに WebSocket 接続を再作成

  // カメラ許可リクエスト
  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      setCameraPermission(true);
      sendCameraOnRequest();
    } catch (error) {
      console.error("❌ Camera permission denied:", error);
      setCameraPermission(false);
    }
  };

  // カメラONリクエスト送信
  const sendCameraOnRequest = () => {
    const message = JSON.stringify({
      type: "camera",
      content: { status: "on" },
      from: "mobile",
    });
    sendMessage(message);
  };

  // メッセージ送信
  const sendMessage = (message: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    } else {
      console.warn("❌ WebSocket is not open");
    }
  };

  return {
    stage,
    player,
    onOff,
    sendMessage,
    isConnected,
    cameraPermission,
    requestCameraPermission,
    sendCameraOnRequest,
  };
};

export default useWebsocket;
