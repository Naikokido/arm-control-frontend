import React, { useState } from 'react';
import { FiWifi, FiSearch } from 'react-icons/fi';

const CameraConnection = () => {
  const [cameraIp, setCameraIp] = useState('192.168.1.100');

  const handleIpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCameraIp(e.target.value);
  };

  return (
    <div className="bg-white shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Camera Connection</h2>

      {/* Input para seleccionar IP */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={cameraIp}
          onChange={handleIpChange}
          className="p-2 border border-gray-300 rounded w-full"
        />
        <button className="bg-gray-800 text-white px-4 py-2 rounded">
          {cameraIp}
        </button>
        <div className="flex space-x-2">
          <FiWifi className="text-gray-500 text-xl" />
          <FiSearch className="text-gray-500 text-xl" />
        </div>
      </div>

      {/* Botón para conectar */}
      <button className="mt-4 w-full bg-gray-800 text-white py-2 rounded">
        Connect to Camera
      </button>
    </div>
  );
};

export default CameraConnection;
