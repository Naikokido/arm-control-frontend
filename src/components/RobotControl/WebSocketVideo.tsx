'use client';
import { useEffect, useState } from 'react';

interface WebSocketVideoProps {
  onVideoStatusChange: (status: boolean) => void;
}

const WebSocketVideo: React.FC<WebSocketVideoProps> = ({ onVideoStatusChange }) => {
  const [frame, setFrame] = useState('');

  useEffect(() => {
    const ws = new WebSocket('ws://172.16.98.183:8000/ws');
    
    ws.onopen = () => {
      console.log('Conectado al servidor WebSocket');
    };

    ws.onmessage = (event) => {
      setFrame(event.data);
      onVideoStatusChange(true); // Cambia el estado cuando recibe video
    };

    ws.onclose = () => {
      console.log('Desconectado del servidor WebSocket');
      onVideoStatusChange(false); // Actualiza el estado cuando se desconecta
    };

    return () => {
      ws.close();
    };
  }, [onVideoStatusChange]);

  return (
    <div>
      {frame && (
        <img
          src={`data:image/jpeg;base64,${frame}`}
          alt="Stream de video"
          className="w-full"
        />
      )}
    </div>
  );
};

export default WebSocketVideo;
