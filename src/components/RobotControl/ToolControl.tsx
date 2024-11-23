import { useState, useEffect } from 'react';

const ToolControl = () => {
  const [isGripperOpen, setIsGripperOpen] = useState(false);
  const [isGripperConnected, setIsGripperConnected] = useState(false);

  // Verifica si el Gripper está conectado al cargar el componente
  useEffect(() => {
    const checkTool = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/robot/identify_tool`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        setIsGripperConnected(data.toolId === "Gripper"); // Activa si la herramienta es Gripper
      } catch (error) {
        console.error("Error identifying tool:", error);
      }
    };

    checkTool();
  }, []);

  // Función para abrir el Gripper
  const handleOpenGripper = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/robot/gripper_release`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Failed to open the gripper.");
      }

      setIsGripperOpen(true);
    } catch (error) {
      console.error("Error opening gripper:", error);
    }
  };

  // Función para cerrar el Gripper
  const handleCloseGripper = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/robot/gripper_grasp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Failed to close the gripper.");
      }

      setIsGripperOpen(false);
    } catch (error) {
      console.error("Error closing gripper:", error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl font-semibold">Tool: Gripper</h2>

      {isGripperConnected ? (
        <div className="flex space-x-4">
          <button
            onClick={handleOpenGripper}
            className={`p-2 text-white rounded ${isGripperOpen ? 'bg-gray-200' : 'bg-blue-600'}`}
            disabled={isGripperOpen}  // Botón de abrir deshabilitado si ya está abierto
          >
            Open Gripper
          </button>
          <button
            onClick={handleCloseGripper}
            className={`p-2 text-white rounded ${isGripperOpen ? 'bg-blue-600' : 'bg-gray-200'}`}
            disabled={!isGripperOpen}  // Botón de cerrar deshabilitado si ya está cerrado
          >
            Close Gripper
          </button>
        </div>
      ) : (
        <p className="text-red-500">Gripper not connected.</p>
      )}
    </div>
  );
};

export default ToolControl;
