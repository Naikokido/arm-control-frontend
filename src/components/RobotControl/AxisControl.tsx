import { useRobotContext } from '../../context/RobotContext'; 
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';

const axisConfigDegrees = [
  { name: "Base Rotation", min: -168.965, max: 168.965 },
  { name: "Shoulder", min: -104.851, max: 34.95 },
  { name: "Elbow", min: -76.776, max: 89.954 },
  { name: "Wrist (Rotation)", min: -119.69, max: 119.69 },
  { name: "Wrist (Inclination)", min: -109.95, max: 110.122 },
  { name: "Tool", min: -144.958, max: 144.958 },
];

const axisConfigRadians = [
  { name: "Base Rotation", min: -2.949, max: 2.949 },
  { name: "Shoulder", min: -1.83, max: 0.61 },
  { name: "Elbow", min: -1.34, max: 1.57 },
  { name: "Wrist (Rotation)", min: -2.089, max: 2.089 },
  { name: "Wrist (Inclination)", min: -1.919, max: 1.922 },
  { name: "Tool", min: -2.53, max: 2.53 },
];

type AxisKeys = 'J1' | 'J2' | 'J3' | 'J4' | 'J5' | 'J6';

const AxisControl = () => {
  const { axis, setAxis, isRadians, setIsRadians } = useRobotContext(); // Usamos el contexto
  
  const handleSliderChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const axisKey: AxisKeys = `J${index + 1}` as AxisKeys;
    const newAxisValues = { ...axis, [axisKey]: parseFloat(event.target.value) };
    setAxis(newAxisValues);
  };

  const toggleUnits = () => {
    const conversionFactor = isRadians ? 180 / Math.PI : Math.PI / 180;
    setAxis({
      J1: parseFloat((axis.J1 * conversionFactor).toFixed(3)),
      J2: parseFloat((axis.J2 * conversionFactor).toFixed(3)),
      J3: parseFloat((axis.J3 * conversionFactor).toFixed(3)),
      J4: parseFloat((axis.J4 * conversionFactor).toFixed(3)),
      J5: parseFloat((axis.J5 * conversionFactor).toFixed(3)),
      J6: parseFloat((axis.J6 * conversionFactor).toFixed(3)),
    });
    setIsRadians(!isRadians); // Actualiza el estado de las unidades
  };

  const resetAxis = () => {
    setAxis({
      J1: 0,
      J2: 0,
      J3: 0,
      J4: 0,
      J5: 0,
      J6: 0,
    });
  };

  const currentConfig = isRadians ? axisConfigRadians : axisConfigDegrees;

  return (
    <div className="grid gap-4">
      <div className="flex items-center space-x-2"> 
        <span
          style={{ color: !isRadians ? 'blue' : 'gray', fontWeight: !isRadians ? 'normal' : 'normal' }}
        >
          Degrees
        </span>
        {isRadians ? (
          <ToggleOnIcon
            fontSize="large"
            style={{ color: 'gray', cursor: 'pointer' }}
            onClick={toggleUnits}
          />
        ) : (
          <ToggleOffIcon
            fontSize="large"
            style={{ color: 'gray', cursor: 'pointer' }}
            onClick={toggleUnits}
          />
        )}
        <span
          style={{ color: isRadians ? 'blue' : 'gray', fontWeight: isRadians ? 'normal' : 'normal' }}
        >
          Radians
        </span>
      </div>

      {/* Sliders para los ejes */}
      {currentConfig.map((config, index) => (
        <div key={config.name} className="space-y-2">
          <label className="block text-gray-700">
            J{index + 1}: {config.name}
          </label>
          <input
            type="range"
            value={axis[`J${index + 1}` as AxisKeys]}
            onChange={handleSliderChange(index)}
            min={config.min}
            max={config.max}
            step="0.01"
            className="w-full"
          />
          <div className="flex justify-between text-gray-500">
            <span>{config.min}{isRadians ? " rad" : "°"}</span>
            <span>{axis[`J${index + 1}` as AxisKeys]}{isRadians ? " rad" : "°"}</span>
            <span>{config.max}{isRadians ? " rad" : "°"}</span>
          </div>
        </div>
      ))}

      {/* Botón para resetear los ejes */}
      <button onClick={resetAxis} className="px-4 py-2 bg-red-600 text-white rounded mt-4">
        Reset Axis
      </button>
    </div>
  );
};

export default AxisControl;
