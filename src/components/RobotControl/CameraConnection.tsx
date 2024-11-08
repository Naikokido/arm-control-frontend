import { useState } from 'react';
import { useRobotContext } from '../../context/RobotContext';

const CameraConnection = () => {
  const { cameraIp, setCameraIp } = useRobotContext();
  const [connectionStatus, setConnectionStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleIpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCameraIp(e.target.value);
    setConnectionStatus(null); // Reset the message when IP changes
  };

  // Function to send the IP to the backend and verify the camera connection
  const connectToCamera = async () => {
    setIsLoading(true);
    setConnectionStatus("Loading...");

    try {
      const response = await fetch("http://localhost:5000/set_camera_ip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ip_address: cameraIp }),
      });

      const data = await response.json();
      if (response.ok) {
        setConnectionStatus("Connection successful");
      } else {
        setConnectionStatus(`Error: ${data.message}`);
      }
    } catch (error) {
      setConnectionStatus("Connection error: Please check the IP or network");
      console.error("Error connecting to camera:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Camera Connection</h2>

      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={cameraIp}
          onChange={handleIpChange}
          className="p-2 border border-gray-300 rounded w-full"
          placeholder="Enter camera IP address"
        />
        <button 
          onClick={connectToCamera} 
          className="bg-gray-800 text-white px-4 py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Connecting..." : "Connect"}
        </button>
      </div>

      {/* Connection status message */}
      {connectionStatus && (
        <p className={`mt-4 text-center ${connectionStatus === "Connection successful" ? "text-green-600" : "text-red-600"}`}>
          {connectionStatus}
        </p>
      )}
    </div>
  );
};

export default CameraConnection;
