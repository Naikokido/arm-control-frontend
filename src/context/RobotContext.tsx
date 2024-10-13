import React, { createContext, useContext, useState } from 'react';

// Define el tipo de tu contexto
type RobotContextType = {
  axis: {
    J1: number;
    J2: number;
    J3: number;
    J4: number;
    J5: number;
    J6: number;
  };
  setAxis: (axis: { J1: number; J2: number; J3: number; J4: number; J5: number; J6: number }) => void;
  coords: {
    X: number;
    Y: number;
    Z: number;
    Pitch: number;
    Roll: number;
    Yaw: number;
  };
  setCoords: (coords: { X: number; Y: number; Z: number; Pitch: number; Roll: number; Yaw: number }) => void;
  selectedTool: string;
  setSelectedTool: (tool: string) => void;
  cameraIp: string;
  setCameraIp: (ip: string) => void;
  robotIp: string;
  setRobotIp: (ip: string) => void;
  isRadians: boolean;
  setIsRadians: (value: boolean) => void;
};

// Crea el contexto con el tipo definido arriba
const RobotContext = createContext<RobotContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
export const useRobotContext = () => {
  const context = useContext(RobotContext);
  if (!context) {
    throw new Error('useRobotContext debe ser usado dentro de un RobotProvider');
  }
  return context;
};

// Proveedor del contexto
export const RobotProvider = ({ children }: { children: React.ReactNode }) => {
  const [axis, setAxis] = useState({
    J1: 0,
    J2: 0,
    J3: 0,
    J4: 0,
    J5: 0,
    J6: 0,
  });

  const [coords, setCoords] = useState({
    X: 0,
    Y: 0,
    Z: 0,
    Pitch: 0,
    Roll: 0,
    Yaw: 0,
  });

  const [selectedTool, setSelectedTool] = useState("Electromagnet");
  const [cameraIp, setCameraIp] = useState("192.168.0.10");
  const [robotIp, setRobotIp] = useState("192.168.0.20");

  const [isRadians, setIsRadians] = useState(false);

  return (
    <RobotContext.Provider value={{
      axis,
      setAxis,
      coords,
      setCoords,  // Asegúrate de pasar setCoords aquí
      selectedTool,
      setSelectedTool,  // Asegúrate de pasar setSelectedTool aquí
      cameraIp,
      setCameraIp,  // Asegúrate de pasar setCameraIp aquí
      robotIp,
      setRobotIp,  // Asegúrate de pasar setRobotIp aquí
      isRadians,
      setIsRadians,
    }}>
      {children}
    </RobotContext.Provider>
  );
};
