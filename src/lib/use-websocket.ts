"use client";

import { useEffect, useRef } from "react";

export function useWebSocket(onMessage?: (data: any) => void) {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let wsUrl = "";
    if (typeof window !== "undefined") {
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      wsUrl = `${protocol}//${window.location.host}/api/ws`;
    } else {
      return;
    }

    let socket: WebSocket | null = null;
    let isSubscribed = true;

    function connect() {
      if (!isSubscribed) return;
      try {
        socket = new WebSocket(wsUrl);
        wsRef.current = socket;

        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (onMessage) onMessage(data);
          } catch (err) {
            // ignore
          }
        };

        socket.onclose = () => {
          // Reconnect after delay
          if (isSubscribed) {
            setTimeout(connect, 3000);
          }
        };

        socket.onerror = () => {
          socket?.close();
        };
      } catch (e) {
        if (isSubscribed) {
          setTimeout(connect, 5000);
        }
      }
    }

    connect();

    return () => {
      isSubscribed = false;
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [onMessage]);

  const sendMessage = (data: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    }
  };

  return { sendMessage };
}
