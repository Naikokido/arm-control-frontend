import React, { useState } from 'react';

const CoordinateControl = () => {
  // Estado para almacenar las coordenadas y ángulos
  const [coordinates, setCoordinates] = useState({
    x: 0,
    y: 0,
    z: 0,
    pitch: 0,
    roll: 0,
    yaw: 0
  });

  // Maneja cambios en las entradas
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCoordinates({
      ...coordinates,
      [name]: Number(value)
    });
  };

  return (
    <div className="grid gap-4">
      

      {/* Controles para X, Y y Z en la primera fila */}
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="block text-gray-700">X (mm)</label>
          <input
            type="number"
            name="x"
            placeholder="X"
            min="-300"
            max="300"
            value={coordinates.x}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-gray-700">Y (mm)</label>
          <input
            type="number"
            name="y"
            placeholder="Y"
            min="-250"
            max="250"
            value={coordinates.y}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-gray-700">Z (mm)</label>
          <input
            type="number"
            name="z"
            placeholder="Z"
            min="0"
            max="440"
            value={coordinates.z}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      {/* Controles para Pitch, Roll y Yaw en la segunda fila */}
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="block text-gray-700">Pitch (°)</label>
          <input
            type="number"
            name="pitch"
            placeholder="Pitch"
            min="-90"
            max="90"
            value={coordinates.pitch}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-gray-700">Roll (°)</label>
          <input
            type="number"
            name="roll"
            placeholder="Roll"
            min="-180"
            max="180"
            value={coordinates.roll}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-gray-700">Yaw (°)</label>
          <input
            type="number"
            name="yaw"
            placeholder="Yaw"
            min="-180"
            max="180"
            value={coordinates.yaw}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      <button className="px-4 py-2 bg-gray-800 text-white rounded mt-4">Move to Coordinates</button>
    </div>
  );
};

export default CoordinateControl;
