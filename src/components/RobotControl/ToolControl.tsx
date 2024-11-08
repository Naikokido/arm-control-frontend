import { useState } from 'react';
import { useRobotContext } from '../../context/RobotContext';

const tools = [
  "Gripper",
];

const ToolControl = () => {
  const { selectedTool, setSelectedTool } = useRobotContext();
  const [isGripperOpen, setIsGripperOpen] = useState(false);

  const handleGripperAction = async () => {
    try {
      const action = isGripperOpen ? "release" : "grasp";
      const response = await fetch(`http://localhost:5000/gripper_${action}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Failed to control the gripper.");
      }

      setIsGripperOpen(!isGripperOpen);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid gap-4">
      <h2 className="text-xl font-semibold">Tool Selector</h2>
      <select
        value={selectedTool}
        onChange={(e) => setSelectedTool(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      >
        {tools.map((tool) => (
          <option key={tool} value={tool}>
            {tool}
          </option>
        ))}
      </select>

      {["Gripper"].includes(selectedTool) && (
        <div>
          <button
            onClick={handleGripperAction}
            className={`p-2 mt-4 text-white rounded ${
              isGripperOpen ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {isGripperOpen ? "Open Gripper" : "Close Gripper"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ToolControl;
