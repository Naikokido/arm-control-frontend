import React, { createContext, useContext, useState } from 'react';

interface Axis {
  J1: number;
  J2: number;
  J3: number;
  J4: number;
  J5: number;
  J6: number;
}

interface Coordinates {
  X: number;
  Y: number;
  Z: number;
  Pitch: number;
  Roll: number;
  Yaw: number;
}

// Definir el contexto
interface RobotContextType {
  axis: Axis;
  coords: Coordinates;
  selectedTool: string;
  cameraIp: string;
  robotIp: string;
  setAxis: (axis: Axis) => void;
  setCoords: (coords: Coordinates) => void;
  setSelectedTool: (tool: string) => void;
  setCameraIp: (ip: string) => void;
  setRobotIp: (ip: string) => void;
}

const RobotContext = createContext<RobotContextType | undefined>(undefined);

// Proveedor del contexto
export const RobotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [axis, setAxis] = useState<Axis>({ J1: 0, J2: 0, J3: 0, J4: 0, J5: 0, J6: 0 });
  const [coords, setCoords] = useState<Coordinates>({ X: 0, Y: 0, Z: 0, Pitch: 0, Roll: 0, Yaw: 0 });
  const [selectedTool, setSelectedTool] = useState('Electromagnet');
  const [cameraIp, setCameraIp] = useState('192.168.1.100');
  const [robotIp, setRobotIp] = useState('192.168.1.101');

  return (
    <RobotContext.Provider value={{ axis, coords, selectedTool, cameraIp, robotIp, setAxis, setCoords, setSelectedTool, setCameraIp, setRobotIp }}>
      {children}
    </RobotContext.Provider>
  );
};

// Hook para usar el contexto
export const useRobotContext = () => {
  const context = useContext(RobotContext);
  if (!context) {
    throw new Error('useRobotContext must be used within a RobotProvider');
  }
  return context;
};
