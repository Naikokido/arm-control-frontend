import { useState } from "react";

const tools = [
  "Electromagnet",
  "Extruder",
  "Large Opening Gripper",
  "Standard Gripper",
  "Screwdriver",
  "Vacuum Pump",
];

const ToolControl = () => {
  const [selectedTool, setSelectedTool] = useState(tools[0]);
  const [openForce, setOpenForce] = useState(50);
  const [closeForce, setCloseForce] = useState(50);

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

      {["Standard Gripper", "Large Opening Gripper"].includes(selectedTool) && (
        <>
          <div>
            <label className="block text-gray-700">Opening force</label>
            <input
              type="range"
              value={openForce}
              onChange={(e) => setOpenForce(parseInt(e.target.value))}
              min="0"
              max="100"
              className="w-full"
            />
            <div className="text-gray-500 text-right">{openForce}%</div>{" "}
            {/* Mostrar el valor de apertura */}
          </div>
          <div>
            <label className="block text-gray-700">Closing force</label>
            <input
              type="range"
              value={closeForce}
              onChange={(e) => setCloseForce(parseInt(e.target.value))}
              min="0"
              max="100"
              className="w-full"
            />
            <div className="text-gray-500 text-right">{closeForce}%</div>{" "}
            {/* Mostrar el valor de cierre */}
          </div>
        </>
      )}
    </div>
  );
};

export default ToolControl;
