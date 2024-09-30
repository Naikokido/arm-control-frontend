import { useState } from "react";

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

const AxisControl = () => {
  const [axisValues, setAxisValues] = useState(axisConfigDegrees.map(() => 0));
  const [isRadians, setIsRadians] = useState(false); // Estado para alternar entre grados y radianes

  const handleSliderChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newAxisValues = [...axisValues];
      newAxisValues[index] = parseFloat(event.target.value);
      setAxisValues(newAxisValues);
    };

  const toggleUnits = () => {
    setIsRadians(!isRadians);
    // Convertir los valores actuales entre grados y radianes
    const conversionFactor = isRadians ? 180 / Math.PI : Math.PI / 180;
    setAxisValues(
      axisValues.map((value) =>
        parseFloat((value * conversionFactor).toFixed(3))
      ) // Convertimos el string devuelto por toFixed a número
    );
  };

  const currentConfig = isRadians ? axisConfigRadians : axisConfigDegrees;

  return (
    <div className="grid gap-4">
      <button
        onClick={toggleUnits}
        className="px-4 py-2 bg-gray-800 text-white rounded"
      >
        Toggle to {isRadians ? "Degrees" : "Radians"}
      </button>
      {currentConfig.map((axis, index) => (
        <div key={axis.name} className="space-y-2">
          <label className="block text-gray-700">
            J{index + 1}: {axis.name}
          </label>
          <input
            type="range"
            value={axisValues[index]}
            onChange={handleSliderChange(index)}
            min={axis.min}
            max={axis.max}
            step="0.01" // Precisión ajustada para radianes
            className="w-full"
          />
          <div className="flex justify-between text-gray-500">
            <span>
              {axis.min}
              {isRadians ? " rad" : "°"}
            </span>
            <span>
              {axisValues[index]}
              {isRadians ? " rad" : "°"}
            </span>{" "}
            {/* Mostrar valor en grados o radianes */}
            <span>
              {axis.max}
              {isRadians ? " rad" : "°"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AxisControl;
