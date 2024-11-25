import React, { useState } from 'react';
import { useRobotContext } from '../../context/RobotContext';
import HomeIcon from '@mui/icons-material/Home';

const CoordinateControl = () => {
  const { coords, setCoords } = useRobotContext();
  const { setAxis } = useRobotContext();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Función para enviar las coordenadas completas al backend
  const moveToCoordinatesBackend = async () => {
    try {
      const coordinates = [
        coords.X || 0,
        coords.Y || 0,
        coords.Z || 0,
        coords.Pitch || 0,
        coords.Roll || 0,
        coords.Yaw || 0,
      ];

      const response = await fetch("http://localhost:5000/api/robot/move_coordinates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coordinates }),
      });

      const data = await response.json();
      const { joints } = data;

      if (data) {
        const [J1, J2, J3, J4, J5, J6] = joints;
        setAxis({ J1, J2, J3, J4, J5, J6 });
      }

      setStatusMessage(data.message);
    } catch (error) {
      setStatusMessage("Error moving to coordinates. Please try again.");
      console.error("Error moving to coordinates:", error);
    }
  };

  // Límites de los inputs
  const limits = {
    X: { min: 0.1, max: 0.8 },
    Y: { min: -0.2, max: 0.2 },
    Z: { min: 0.1, max: 0.6 },
    Pitch: { min: -1.5, max: 1.5 },
    Roll: { min: -1.5, max: 1.5 },
    Yaw: { min: -1.5, max: 1.5 },
  };

  // Función para manejar el cambio de inputs con validación de límites
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let numericValue = parseFloat(value);

    // Validar si el valor es un número
    if (!isNaN(numericValue)) {
      // Aplicar los límites correspondientes
      const { min, max } = limits[name as keyof typeof limits];
      if (numericValue < min) numericValue = min;
      if (numericValue > max) numericValue = max;

      // Actualizar el estado si está dentro de los límites
      setCoords((prevCoords) => ({
        ...prevCoords,
        [name]: numericValue,
      }));
    } else if (value === "") {
      // Permitir borrar el valor
      setCoords((prevCoords) => ({
        ...prevCoords,
        [name]: 0,
      }));
    }
  };

  const resetCoordinates = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/robot/reset_coordinates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const data = await response.json();
      console.log(data.message);
  
      if (data.cords) {  // Verificar si la pose está en la respuesta
        const [J1,J2,J3,J4,J5,J6] = data.joints
        const [X, Y, Z, Pitch, Roll, Yaw] = data.cords.map ((value: number) =>parseFloat(value.toFixed(3)));  // Desestructurar la pose
        setCoords({
          X,
          Y,
          Z,
          Pitch,
          Roll,
          Yaw,
        });
        setAxis({ J1, J2, J3, J4, J5, J6 });
      }
  
      setStatusMessage(data.message);  // Mostrar el mensaje de éxito o error
    } catch (error) {
      console.error("Error resetting coordinates:", error);
      setStatusMessage("Error resetting coordinates. Please try again.");
    }
  };
  

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Columna 1: X, Y, Z */}
        <div className="space-y-2">
          <label className="block text-gray-700">X (m)</label>
          <input
            type="number"
            name="X"
            placeholder="X"
            step="0.01"
            onChange={handleInputChange}
            value={coords.X}
            className="p-2 border border-gray-300 rounded"
          />
          <label className="block text-gray-700">Y (m)</label>
          <input
            type="number"
            name="Y"
            placeholder="Y"
            step="0.01"
            onChange={handleInputChange}
            value={coords.Y}
            className="p-2 border border-gray-300 rounded"
          />
          <label className="block text-gray-700">Z (m)</label>
          <input
            type="number"
            name="Z"
            placeholder="Z"
            step="0.01"
            onChange={handleInputChange}
            value={coords.Z}
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Columna 2: Pitch, Roll, Yaw */}
        <div className="space-y-2">
          <label className="block text-gray-700">Pitch (rad)</label>
          <input
            type="number"
            name="Pitch"
            placeholder="Pitch"
            step="0.01"
            onChange={handleInputChange}
            value={coords.Pitch}
            className="p-2 border border-gray-300 rounded"
          />
          <label className="block text-gray-700">Roll (rad)</label>
          <input
            type="number"
            name="Roll"
            placeholder="Roll"
            step="0.01"
            onChange={handleInputChange}
            value={coords.Roll}
            className="p-2 border border-gray-300 rounded"
          />
          <label className="block text-gray-700">Yaw (rad)</label>
          <input
            type="number"
            name="Yaw"
            placeholder="Yaw"
            step="0.01"
            onChange={handleInputChange}
            value={coords.Yaw}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      <button onClick={moveToCoordinatesBackend} className="px-4 py-2 bg-gray-200 text-black rounded mt-4">
        Move to Coordinates
      </button>
      <button onClick={resetCoordinates} className="flex items-center justify-center px-4 py-2 bg-gray-200 text-black rounded mt-4">
        <HomeIcon className="mr-2 text-blue-600" />
        Go to home position
      </button>

      {statusMessage && <p className="mt-4 text-center">{statusMessage}</p>}
    </div>
  );
};

export default CoordinateControl;
