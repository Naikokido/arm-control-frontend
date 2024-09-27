import React from 'react';

const RobotInfo = () => {
  const robotData = {
    Position: {
      Coords: { X: 0, Y: 0, Z: 0, Pitch:0, Roll:0, Yaw: 0 },
      Axis: { J1: 0, J2: 0, J3: 0, J4: 0, J5: 0, J6: 0 }
    },
    RoboticArm : {
      IP: '10.10.10.10',
      Name: 'Niryo Ned 2',
      Tool: 'Standard Gripper'
    },
    Camera: {
      IP: '192.168.1.100',
      Name: 'Camera1'
    }
  };

  return (
    <div className="grid gap-4">
      <h2 className="text-xl font-semibold">Robot info</h2>
      {Object.entries(robotData).map(([category, data]) => (
        <div key={category}>
          <h3 className="font-medium">{category}</h3>
          {Object.entries(data).map(([key, value]) => (
            <p key={key} className="text-gray-700">
              {key}: {typeof value === 'object' ? JSON.stringify(value) : value}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default RobotInfo;
