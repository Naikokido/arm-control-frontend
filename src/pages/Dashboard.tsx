import { useState } from "react";
import AxisControl from "../components/RobotControl/AxisControl";
import CoordinateControl from "../components/RobotControl/CoordinateControl";
import ToolControl from "../components/RobotControl/ToolControl";
import CameraFeed from "../components/RobotControl/CameraFeed";
import RobotInfo from "../components/RobotControl/RobotInfo";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import CalibrateRobot from "../components/RobotControl/CalibrateRobot";

const Dashboard = () => {
  const [controlMode, setControlMode] = useState("ejes");

  const handleControlModeChange = (newValue: string) => {
    setControlMode(newValue);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1">
              <div className="bg-white shadow p-4">
                <div className="flex justify-center space-x-4">
                  <button
                    className={`px-4 py-2 rounded ${
                      controlMode === "ejes"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => handleControlModeChange("ejes")}
                  >
                    Joints Control
                  </button>

                  <button
                    className={`px-4 py-2 rounded ${
                      controlMode === "coordenadas"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => handleControlModeChange("coordenadas")}
                  >
                    Coordinate Control
                  </button>
                </div>
              </div>

              <div className="bg-white shadow p-4 mt-4">
                {controlMode === "ejes" ? (
                  <AxisControl />
                ) : (
                  <CoordinateControl />
                )}
              </div>
              <div className="bg-white shadow p-4 mt-4">
                <ToolControl />
              </div>
            </div>

            {/* Calibrate Robot y Camera Feed */}
            <div className="col-span-2">
              <div className="bg-white shadow p-4 mb-4">
                <CalibrateRobot />
              </div>
              <div className="bg-white shadow p-4 relative w-full">
                <CameraFeed />
              </div>
            </div>

            {/* Robot Info */}
            <div className="col-span-1 mt-4">
              <div className="bg-white shadow p-4 mt-4">
                <RobotInfo controlMode={controlMode} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;
