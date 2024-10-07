import React from 'react';

interface RobotData {
  Position: {
    Coords: { X: number; Y: number; Z: number; Pitch: number; Roll: number; Yaw: number };
    Axis: { J1: number; J2: number; J3: number; J4: number; J5: number; J6: number };
  };
  RoboticArm: {
    IP: string;
    Name: string;
    Tool: string;
  };
  Camera: {
    IP: string;
    Name: string;
  };
}

const RobotInfo: React.FC = () => {
  const robotData: RobotData = {
    Position: {
      Coords: { X: 0, Y: 0, Z: 0, Pitch: 0, Roll: 0, Yaw: 0 },
      Axis: { J1: 0, J2: 0, J3: 0, J4: 0, J5: 0, J6: 0 },
    },
    RoboticArm: {
      IP: "10.10.10.10",
      Name: "Niryo Ned 2",
      Tool: "Standard Gripper",
    },
    Camera: {
      IP: "192.168.1.100",
      Name: "Camera1",
    },
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Robot Info</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(robotData).map(([category, data]) => (
          <div key={category} className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2">{category}</h3>
            <div className="space-y-1 text-sm text-gray-700">
              {Object.entries(data as Record<string, unknown>).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}:</strong>{" "}
                  {typeof value === "object" ? (
                    <span className="block ml-2 text-gray-600">
                      {Object.entries(value as Record<string, unknown>).map(
                        ([subKey, subValue]) => (
                          <span key={subKey} className="block">
                            <strong>{subKey}:</strong> {String(subValue)}
                          </span>
                        )
                      )}
                    </span>
                  ) : (
                    String(value)
                  )}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RobotInfo;
