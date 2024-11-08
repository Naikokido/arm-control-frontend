'use client';
import { useEffect, useState } from 'react';

const WebSocketVideo = () => {
  const [frame, setFrame] = useState('');

  useEffect(() => {
    // Cambia 'localhost' por la IP local de tu máquina
    const ws = new WebSocket('ws://192.168.159.33:8000/ws');
    // const ws2 = new WebSocket({`ws://${props.ipcamare}/ws`})
  
    ws.onopen = () => {
      console.log('Conectado al servidor WebSocket');
    };

    ws.onmessage = (event) => {
      // Recibir el frame en formato base64 y actualizar el estado
      setFrame(event.data);
    };

    ws.onclose = () => {
      console.log('Desconectado del servidor WebSocket');
    };

    return () => {
      if (ws) ws.close();
    };
  }, []);

  return (
    <div>
      <div>
        {frame && (
          <img
            src={`data:image/jpeg;base64,${frame}`}
            alt="Stream de video"
            className='w-full'
          />
        )}
      </div>
    </div>
  );
};

export default WebSocketVideo;