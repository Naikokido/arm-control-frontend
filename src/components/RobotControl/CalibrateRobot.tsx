import { useEffect, useState } from 'react';
import { GpsFixedRounded } from '@mui/icons-material';

const CalibrateRobot = () => {
  const [calibrationStatus, setCalibrationStatus] = useState<string | null>(null);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [isCalibrated, setIsCalibrated] = useState(false);

  // Función para calibrar el robot
  const calibrateRobot = async () => {
    setIsCalibrating(true);
    setCalibrationStatus("Calibrating...");

    try {
      const response = await fetch("http://localhost:5000/api/robot/calibrate_robot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        setCalibrationStatus("Calibration successful.");
        setIsCalibrated(true);
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

  useEffect(() => {
    // Verifica si el robot está calibrado al cargar el componente
    const checkCalibrationStatus = async () => {
      try {
        const response = await fetch("http://localhost:5000/check_calibration_status", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        const data = await response.json();
        if (response.ok && data.calibrated) {
          setIsCalibrated(true);
          setCalibrationStatus("Robot is calibrated.");
        } else {
          setCalibrationStatus("Calibration required.");
        }
      } catch (error) {
        console.error("Error checking calibration status:", error);
      }
    };

    checkCalibrationStatus();
  }, []);

  return (
    <div className="bg-white shadow p-4 mb-4">
      <h2 className="text-lg font-semibold mb-2">Robot Calibration</h2>
      <button
        onClick={calibrateRobot}
        className={`flex px-4 py-2 items-center justify-center rounded w-full ${
          isCalibrated
            ? "bg-gray-400 cursor-not-allowed"
            : `bg-blue-600 text-white ${!isCalibrating ? "animate-pulse" : ""}`
        }`}
        disabled={isCalibrated || isCalibrating}
      >
        <GpsFixedRounded className='mr-2' fontSize='small'/>
        {isCalibrated ? "Robot is calibrated" : isCalibrating ? "Calibrating..." : "Calibration needed"}
      </button>

      {calibrationStatus && (
        <p
          className={`mt-2 text-center ${
            calibrationStatus.includes("successful") || calibrationStatus.includes("calibrated")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {calibrationStatus}
        </p>
      )}
    </div>
  );
};

export default CalibrateRobot;
