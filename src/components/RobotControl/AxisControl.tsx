import React, { useState } from 'react';

const axisConfig = [
  { name: 'Base Rotation', min: -168.9, max: 168.9 },
  { name: 'Shoulder', min: -104.8, max: 34.9 },
  { name: 'Elbow', min: -76.7, max: 90 },
  { name: 'Wrist (Rotation)', min: -120, max: 120 },
  { name: 'Wrist (Inclination)', min: -110, max: 110 },
  { name: 'Tool', min: -145, max: 145 },
];

const AxisControl = () => {
  // Cambiamos el estado inicial a valores de punto flotante.
  const [axisValues, setAxisValues] = useState(axisConfig.map(() => 0));

  const handleSliderChange = (index) => (event) => {
    const newAxisValues = [...axisValues];
    // Usamos parseFloat en vez de parseInt para obtener decimales.
    newAxisValues[index] = parseFloat(event.target.value);
    setAxisValues(newAxisValues);
  };

  return (
    <div className="grid gap-4">
      {axisConfig.map((axis, index) => (
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
            step="0.1"  // Esto permite un control más preciso con decimales
            className="w-full"
          />
          <div className="flex justify-between text-gray-500">
            <span>{axis.min}°</span>
            <span>{axisValues[index].toFixed(1)}°</span> {/* Mostrar valor con un decimal */}
            <span>{axis.max}°</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AxisControl;
