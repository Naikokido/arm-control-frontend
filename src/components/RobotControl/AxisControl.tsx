import { useRobotContext } from '../../context/RobotContext'; 
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { useState } from 'react';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';


const axisConfigDegrees = [
  { name: "Base", min: -168.965, max: 168.965 },
  { name: "Shoulder", min: -104.851, max: 34.95 },
  { name: "Elbow", min: -76.776, max: 89.954 },
  { name: "Forearm Rotation", min: -119.69, max: 119.69 },
  { name: "Wrist", min: -109.95, max: 110.122 },
  { name: "Hand Rotation", min: -144.958, max: 144.958 },
];

const axisConfigRadians = [
  { name: "Base ", min: -2.99, max: 2.99 },
  { name: "Shoulder", min: -1.83, max: 0.61 },
  { name: "Elbow", min: -1.34, max: 1.57 },
  { name: "Forearm Rotation", min: -2.09, max: 2.09 },
  { name: "Wrist", min: -1.92, max: 1.92 },
  { name: "Hand Rotations", min: -2.53, max: 2.53 },
];

type AxisKeys = 'J1' | 'J2' | 'J3' | 'J4' | 'J5' | 'J6';

const AxisControl = () => {
  const { axis, setAxis, isRadians, setIsRadians } = useRobotContext();
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null); // Usamos el contexto
  const roundToThreeDecimals = (value: number) => {
    return parseFloat(value.toFixed(3));
  };


  const moveAxisBackend = async (jointId: number, angle: number) => {
    try {
      // Genera una lista completa de ángulos basada en el estado actual de `axis`
      const angles = [
        roundToThreeDecimals(axis.J1 || 0),  // Valor de J1 o 0 si es la primera vez
        roundToThreeDecimals(axis.J2 || 0),  // Valor de J2 o 0 si es la primera vez
        roundToThreeDecimals(axis.J3 || 0),  // Valor de J3 o 0 si es la primera vez
        roundToThreeDecimals(axis.J4 || 0),  // Valor de J4 o 0 si es la primera vez
        roundToThreeDecimals(axis.J5 || 0),  // Valor de J5 o 0 si es la primera vez
        roundToThreeDecimals(axis.J6 || 0),  // Valor de J6 o 0 si es la primera vez
      ];
      
      // Asigna el nuevo valor solo al eje específico
      angles[jointId - 1] = roundToThreeDecimals(angle);
      
      // Realiza la petición al backend
      const response = await fetch("http://localhost:5000/move_axis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ angles }), // Enviamos la lista completa de ángulos
      });
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error moving axis:", error);
    }
  };
  
  const handleSliderChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const axisKey: AxisKeys = `J${index + 1}` as AxisKeys;
    const newAngle = parseFloat(event.target.value);
    const newAxisValues = { ...axis, [axisKey]: newAngle };
    setAxis(newAxisValues);

    if (debounceTimeout) clearTimeout(debounceTimeout);
    const timeout = setTimeout(() => {
      moveAxisBackend(index + 1, newAngle);
    }, 100); // Delay de 200 ms
    setDebounceTimeout(timeout);

  };

  const toggleUnits = () => {
    const conversionFactor = isRadians ? 180 / Math.PI : Math.PI / 180;
    setAxis({
      J1: roundToThreeDecimals(axis.J1 * conversionFactor),
      J2: roundToThreeDecimals(axis.J2 * conversionFactor),
      J3: roundToThreeDecimals(axis.J3 * conversionFactor),
      J4: roundToThreeDecimals(axis.J4 * conversionFactor),
      J5: roundToThreeDecimals(axis.J5 * conversionFactor),
      J6: roundToThreeDecimals(axis.J6 * conversionFactor),
    });
    setIsRadians(!isRadians);
  };



  // Reiniciar los ejes
  const resetAxis = async () => {
    try {
      const response = await fetch("http://localhost:5000/reset_axes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data.message);
  
      if (data.status === "success") {
        // Actualiza el estado con los valores obtenidos del backend
        const [J1, J2, J3, J4, J5, J6] = data.joints;
        setAxis({
          J1,
          J2,
          J3,
          J4,
          J5,
          J6,
        });
      }
    } catch (error) {
      console.error("Error resetting axes:", error);
    }
  };


  const currentConfig = isRadians ? axisConfigRadians : axisConfigDegrees;
  const [incrementValue] =useState (0.1)

  const handleIncrement = (index: number) => {
    const axisKey: AxisKeys = `J${index + 1}` as AxisKeys;
    const newAngle = roundToThreeDecimals(axis[axisKey] + incrementValue);
    const newAxisValues = { ...axis, [axisKey]: newAngle };
    setAxis(newAxisValues);
    moveAxisBackend(index + 1, newAngle);
  };

  const handleDecrement = (index: number) => {
    const axisKey: AxisKeys = `J${index + 1}` as AxisKeys;
    const newAngle = roundToThreeDecimals(axis[axisKey] - incrementValue);
    const newAxisValues = { ...axis, [axisKey]: newAngle };
    setAxis(newAxisValues);
    moveAxisBackend(index + 1, newAngle);
  };

  return (
    <div className="grid gap-4">
      <div className="flex items-center space-x-2">
        <span style={{ color: !isRadians ? 'blue' : 'gray', fontWeight: !isRadians ? 'normal' : 'normal' }}>
          Degrees
        </span>
        {isRadians ? (
          <ToggleOnIcon fontSize="large" style={{ color: 'gray', cursor: 'pointer' }} onClick={toggleUnits} />
        ) : (
          <ToggleOffIcon fontSize="large" style={{ color: 'gray', cursor: 'pointer' }} onClick={toggleUnits} />
        )}
        <span style={{ color: isRadians ? 'blue' : 'gray', fontWeight: isRadians ? 'normal' : 'normal' }}>
          Radians
        </span>
      </div>

      {currentConfig.map((config, index) => (
        <div key={config.name} className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-gray-700">J{index + 1}: {config.name}</label>
            <div className="flex space-x-2 ">
            <button onClick={() => handleDecrement(index)} title="Decrease value by 0.1">
                <RemoveCircleOutline className="mr-2 text-blue-600" fontSize="small" />
              </button>
              <button onClick={() => handleIncrement(index)} title="Increase value by 0.1">
                <AddCircleOutline className="mr-2 text-blue-600" fontSize="small" />
              </button>
            </div>
          </div>
          <input
            type="range"
            value={roundToThreeDecimals(axis[`J${index + 1}` as AxisKeys])}
            onChange={handleSliderChange(index)}
            min={config.min}
            max={config.max}
            step="0.01"
            className="w-full "
          />
          <div className="flex justify-between text-gray-500">
            <span>{roundToThreeDecimals(config.min)}{isRadians ? " rad" : "°"}</span>
            <span className="bg-gray-200 px-2 py-1 rounded-md">
              {roundToThreeDecimals(axis[`J${index + 1}` as AxisKeys])}{isRadians ? " rad" : "°"}
            </span>
            <span>{roundToThreeDecimals(config.max)}{isRadians ? " rad" : "°"}</span>
          </div>
        </div>
      ))}

      <button onClick={resetAxis} className="flex items-center justify-center px-4 py-2 bg-gray-200 text-black rounded mt-4">
        <HomeIcon className="mr-2 text-blue-600" />
        Go to home position
      </button>
    </div>
  );
};

export default AxisControl;
