import React from 'react';
import { useRobotContext } from '../../context/RobotContext';  // Importa el contexto

const CoordinateControl = () => {
  const { coords, setCoords } = useRobotContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCoords({
      ...coords,
      [name]: Number(value),
    });
  };

  const resetCoordinates = () => {
    setCoords({
      X: 0,
      Y: 0,
      Z: 0,
      Pitch: 0,
      Roll: 0,
      Yaw: 0,
    });
  };

  return (
    <div className="grid gap-4">
      {/* Controles para los ejes en la primera fila */}
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="block text-gray-700">X (mm)</label>
          <input
            type="number"
            name="X"
            placeholder="X"
            min="-2949"  
            max="2949"   
            value={coords.X}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-gray-700">Y (mm)</label>
          <input
            type="number"
            name="Y"
            placeholder="Y"
            min="-2090"  
            max="610"    
            value={coords.Y}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-gray-700">Z (mm)</label>
          <input
            type="number"
            name="Z"
            placeholder="Z"
            min="-1340"   
            max="1570"    
            value={coords.Z}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      {/* Controles para Pitch, Roll y Yaw */}
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="block text-gray-700">Pitch (°)</label>
          <input
            type="number"
            name="Pitch"
            placeholder="Pitch"
            min="-2089"  
            max="2089"   
            value={coords.Pitch}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-gray-700">Roll (°)</label>
          <input
            type="number"
            name="Roll"
            placeholder="Roll"
            min="-1919"   
            max="1922"    
            value={coords.Roll}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-gray-700">Yaw (°)</label>
          <input
            type="number"
            name="Yaw"
            placeholder="Yaw"
            min="-2530"   
            max="2530"    
            value={coords.Yaw}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      {/* Botón para resetear las coordenadas */}
      <button onClick={resetCoordinates} className="px-4 py-2 bg-red-600 text-white rounded mt-4">
        Reset Coordinates
      </button>
    </div>
  );
};

export default CoordinateControl;
