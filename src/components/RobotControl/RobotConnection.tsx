import { useState } from 'react';
import { useRobotContext } from '../../context/RobotContext';

const RobotConnection = () => {
  const { robotIp, setRobotIp } = useRobotContext();
  const [connectionStatus, setConnectionStatus] = useState<string | null>(null); // Connection status message
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleIpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRobotIp(e.target.value);
    setConnectionStatus(null); // Reset the message when IP changes
  };

  // Function to send the IP to the backend and verify the connection
  const connectToRobot = async () => {
    setIsLoading(true);
    setConnectionStatus("Loading..."); // Show "Loading" when initiating the connection
    
    try {
      const response = await fetch("http://localhost:5000/set_robot_ip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ip_address: robotIp }),
      });
      
      const data = await response.json();
      if (response.ok) {
        setConnectionStatus("Connection successful");
      } else {
        setConnectionStatus(`Error: ${data.message}`);
      }
    } catch (error) {
      setConnectionStatus("Connection error: Please check the IP or network");
      console.error("Error connecting to robot:", error);
    } finally {
      setIsLoading(false); // End the loading state
    }
  };

  return (
    <div className="bg-white shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Robot Connection</h2>

      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={robotIp}
          onChange={handleIpChange}
          className="p-2 border border-gray-300 rounded w-full"
          placeholder="Enter robot IP address"
        />
        <button 
          onClick={connectToRobot} 
          className="bg-gray-800 text-white px-4 py-2 rounded"
          disabled={isLoading} // Disable button while loading
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

export default RobotConnection;
