import { useState } from 'react';

const CalibrateRobot = () => {
  const [calibrationStatus, setCalibrationStatus] = useState<string | null>(null);
  const [isCalibrating, setIsCalibrating] = useState(false);

  // Función para calibrar el robot
  const calibrateRobot = async () => {
    setIsCalibrating(true);
    setCalibrationStatus("Calibrating...");

    try {
      const response = await fetch("http://localhost:5000/calibrate_robot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        setCalibrationStatus("Calibration successful.");
      } else {
        setCalibrationStatus(`Error: ${data.message}`);
      }
    } catch (error) {
      setCalibrationStatus("Calibration error. Please try again.");
      console.error("Error calibrating robot:", error);
    } finally {
      setIsCalibrating(false);
    }
  };

  return (
    <div className="bg-white shadow p-4 mb-4">
      <h2 className="text-lg font-semibold mb-2">Robot Calibration</h2>
      <button
        onClick={calibrateRobot}
        className={`px-4 py-2 rounded w-full ${isCalibrating ? "bg-gray-400" : "bg-blue-600 text-white"}`}
        disabled={isCalibrating}
      >
        {isCalibrating ? "Calibrating..." : "Calibrate Robot"}
      </button>

      {/* Mensaje de estado de calibración */}
      {calibrationStatus && (
        <p className={`mt-2 text-center ${calibrationStatus.includes("successful") ? "text-green-600" : "text-red-600"}`}>
          {calibrationStatus}
        </p>
      )}
    </div>
  );
};

export default CalibrateRobot;
