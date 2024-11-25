import { useRobotContext } from '../../context/RobotContext'; 
import { useState, useEffect } from 'react';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';

const axisConfigRadians = [
  { name: "Base", min: -2.99, max: 2.99 },
  { name: "Shoulder", min: -1.83, max: 0.61 },
  { name: "Elbow", min: -1.34, max: 1.57 },
  { name: "Forearm Rotation", min: -2.09, max: 2.09 },
  { name: "Wrist", min: -1.92, max: 1.92 },
  { name: "Hand Rotation", min: -2.53, max: 2.53 },
];

type AxisKeys = 'J1' | 'J2' | 'J3' | 'J4' | 'J5' | 'J6';

const AxisControl = () => {
  const { axis, setAxis } = useRobotContext();
  const [gamepad, setGamepad] = useState<Gamepad | null>(null);
  const [gamepadDebounceTimeout, setGamepadDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
  const [lastSentJoints, setLastSentJoints] = useState<number[]>([0, 0, 0, 0, 0, 0])
  
  const DEBOUNCE_TIME = 200; // Tiempo de inactividad en milisegundos
  const SENSITIVITY_THRESHOLD = 0.01; // Umbral para detectar cambios significativos

  const { setCoords } = useRobotContext();
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  // Función para redondear a tres decimales
  const roundToThreeDecimals = (value: number) => parseFloat(value.toFixed(3));

  // Función para mover los ejes en el backend
  const moveAxisBackend = async (jointId: number, angle: number) => {
    try {
      const angles = [
        roundToThreeDecimals(axis.J1 || 0),
        roundToThreeDecimals(axis.J2 || 0),
        roundToThreeDecimals(axis.J3 || 0),
        roundToThreeDecimals(axis.J4 || 0),
        roundToThreeDecimals(axis.J5 || 0),
        roundToThreeDecimals(axis.J6 || 0),
      ];

      // Asigna el nuevo valor solo al eje específico
      angles[jointId - 1] = roundToThreeDecimals(angle);

      const response = await fetch("http://localhost:5000/api/robot/move_axis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ angles }),
      });
      const data = await response.json();

      // Redondeo de coordenadas a tres decimales
      if (data.cords) {
        const [X, Y, Z, Pitch, Roll, Yaw] = data.cords.map((value: number) => roundToThreeDecimals(value));
        setCoords({ X, Y, Z, Pitch, Roll, Yaw });
      }

      console.log(data.message);
    } catch (error) {
      console.error("Error moving axis:", error);
    }
  };

  // Control del slider
  const handleSliderChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const axisKey: AxisKeys = `J${index + 1}` as AxisKeys;
    const newAngle = parseFloat(event.target.value);
    const newAxisValues = { ...axis, [axisKey]: roundToThreeDecimals(newAngle) };
    setAxis(newAxisValues);

    if (debounceTimeout) clearTimeout(debounceTimeout);
    const timeout = setTimeout(() => {
      moveAxisBackend(index + 1, newAngle);
    }, 100);
    setDebounceTimeout(timeout);
  };

  // Función para resetear los ejes
  const resetAxis = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/robot/reset_axes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.joints) {
        const [J1, J2, J3, J4, J5, J6] = data.joints;
        const [X, Y, Z, Pitch, Roll, Yaw] = data.cords.map((value: number) => roundToThreeDecimals(value));
        setCoords({ X, Y, Z, Pitch, Roll, Yaw });
        setAxis({ J1, J2, J3, J4, J5, J6 });
      }
    } catch (error) {
      console.error("Error resetting axes:", error);
    }
  };

  useEffect(() => {
    const onGamepadConnected = (event: GamepadEvent) => {
      setGamepad(event.gamepad);
      console.log('Gamepad conectado:', event.gamepad);
    };

    const onGamepadDisconnected = (event: GamepadEvent) => {
      setGamepad(null);
      console.log('Gamepad desconectado:', event.gamepad);
    };

    window.addEventListener('gamepadconnected', onGamepadConnected);
    window.addEventListener('gamepaddisconnected', onGamepadDisconnected);

    return () => {
      window.removeEventListener('gamepadconnected', onGamepadConnected);
      window.removeEventListener('gamepaddisconnected', onGamepadDisconnected);
    };
  }, []);

  // Función para mover los ejes en el backend
  const move_Axis_Backend = async (angles: number[]) => {
    try {
      // Iterar sobre cada ángulo y enviar el jointId y el ángulo al backend
      angles.forEach(async (angle, index) => {
        await moveAxisBackend(index + 1, angle); // Enviar jointId (1 a 6) y el ángulo correspondiente
      });
    } catch (error) {
      // eslint-disable-next-line no-irregular-whitespace
      console.error("Error moving axis:", error);
  // eslint-disable-next-line no-irregular-whitespace
    }
  };


  // Verificar si los nuevos valores son significativamente diferentes
  const hasSignificantChange = (newAngles: number[], lastAngles: number[]) => {
    return newAngles.some((value, index) => Math.abs(value - lastAngles[index]) > SENSITIVITY_THRESHOLD);
  };


  // Efecto para actualizar los sliders en función del gamepad
  useEffect(() => {
    let animationFrameId: number;

    const updateSlidersFromGamepad = () => {
      const gamepads = navigator.getGamepads();
      const currentGamepad = gamepads[gamepad?.index || 0];

      if (currentGamepad) {
        const SENSITIVITY = 0.001;
        const DEADZONE = 0.3;

        const newAxisValues = { ...axis };
        let hasChanges = false;

        const axes = currentGamepad.axes;

        if (Math.abs(axes[1]) > DEADZONE) {
          newAxisValues.J1 += axes[1] * SENSITIVITY;
          hasChanges = true;
        }
        if (Math.abs(axes[2]) > DEADZONE) {
          newAxisValues.J2 += axes[2] * SENSITIVITY;
          hasChanges = true;
        }
        if (Math.abs(axes[3]) > DEADZONE) {
          newAxisValues.J3 += axes[3] * SENSITIVITY;
          hasChanges = true;
        }
        if (Math.abs(axes[4]) > DEADZONE) {
          newAxisValues.J4 += axes[4] * SENSITIVITY;
          hasChanges = true;
        }

        if (hasChanges) {
          setAxis(newAxisValues);

          // Generar el array de ángulos redondeados
          const angles = [
            roundToThreeDecimals(newAxisValues.J1),
            roundToThreeDecimals(newAxisValues.J2),
            roundToThreeDecimals(newAxisValues.J3),
            roundToThreeDecimals(newAxisValues.J4),
            roundToThreeDecimals(newAxisValues.J5),
            roundToThreeDecimals(newAxisValues.J6),
          ];

          // Verificar si hay un cambio significativo antes de enviar al backend
          if (hasSignificantChange(angles, lastSentJoints)) {
            setLastSentJoints(angles);
            
            if (gamepadDebounceTimeout) clearTimeout(gamepadDebounceTimeout);

            const timeout = setTimeout(() => {
              move_Axis_Backend(angles);
            }, DEBOUNCE_TIME);

            setGamepadDebounceTimeout(timeout);
          }
        }
      }

      animationFrameId = requestAnimationFrame(updateSlidersFromGamepad);
    };

    if (gamepad) {
      updateSlidersFromGamepad();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (gamepadDebounceTimeout) clearTimeout(gamepadDebounceTimeout);
    };
  }, [gamepad, axis]);
;

  

  // Incremento y decremento con límites
  const handleIncrement = (index: number) => {
    const axisKey: AxisKeys = `J${index + 1}` as AxisKeys;
    const config = axisConfigRadians[index];
    const newAngle = roundToThreeDecimals(Math.min(axis[axisKey] + 0.1, config.max));
    const newAxisValues = { ...axis, [axisKey]: newAngle };
    setAxis(newAxisValues);
    moveAxisBackend(index + 1, newAngle);
  };

  const handleDecrement = (index: number) => {
    const axisKey: AxisKeys = `J${index + 1}` as AxisKeys;
    const config = axisConfigRadians[index];
    const newAngle = roundToThreeDecimals(Math.max(axis[axisKey] - 0.1, config.min));
    const newAxisValues = { ...axis, [axisKey]: newAngle };
    setAxis(newAxisValues);
    moveAxisBackend(index + 1, newAngle);
  };

  return (
    <div className="grid gap-4">
      {axisConfigRadians.map((config, index) => (
        <div key={config.name} className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-gray-700">J{index + 1}: {config.name}</label>
            <div className="flex space-x-2">
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
            className="w-full"
          />
          <div className="flex justify-between text-gray-500">
            <span>{roundToThreeDecimals(config.min)} rad</span>
            <span className="bg-gray-200 px-2 py-1 rounded-md">
              {roundToThreeDecimals(axis[`J${index + 1}` as AxisKeys])} rad
            </span>
            <span>{roundToThreeDecimals(config.max)} rad</span>
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

