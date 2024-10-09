import { useRobotContext } from '../../context/RobotContext';
import { FiWifi, FiSearch } from 'react-icons/fi';

const RobotConnection = () => {
  const { robotIp, setRobotIp } = useRobotContext();

  const handleIpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRobotIp(e.target.value);
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
        />
        <button className="bg-gray-800 text-white px-4 py-2 rounded">
          {robotIp}
        </button>
        <div className="flex space-x-2">
          <FiWifi className="text-gray-500 text-xl" />
          <FiSearch className="text-gray-500 text-xl" />
        </div>
      </div>

      <button className="mt-4 w-full bg-gray-800 text-white py-2 rounded">
        Connect to Robot
      </button>
    </div>
  );
};

export default RobotConnection;
