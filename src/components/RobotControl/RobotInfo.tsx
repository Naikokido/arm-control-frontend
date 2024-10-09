import { useRobotContext } from '../../context/RobotContext';

const RobotInfo = () => {
  const { coords, axis, selectedTool, cameraIp, robotIp } = useRobotContext();

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold">Robot Info</h3>

      <h4 className="mt-4 font-semibold">Axis Values</h4>
      <p>J1: {axis.J1}°</p>
      <p>J2: {axis.J2}°</p>
      <p>J3: {axis.J3}°</p>
      <p>J4: {axis.J4}°</p>
      <p>J5: {axis.J5}°</p>
      <p>J6: {axis.J6}°</p>

      <h4 className="mt-4 font-semibold">Coordinate Values</h4>
      <p>X: {coords.X} mm</p>
      <p>Y: {coords.Y} mm</p>
      <p>Z: {coords.Z} mm</p>
      <p>Pitch: {coords.Pitch}°</p>
      <p>Roll: {coords.Roll}°</p>
      <p>Yaw: {coords.Yaw}°</p>

      <h4 className="mt-4 font-semibold">Selected Tool</h4>
      <p>{selectedTool}</p>

      <h4 className="mt-4 font-semibold">Connections</h4>
      <p>Camera IP: {cameraIp}</p>
      <p>Robot IP: {robotIp}</p>
    </div>
  );
};

export default RobotInfo;
