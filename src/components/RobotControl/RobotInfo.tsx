import { useRobotContext } from '../../context/RobotContext';

interface RobotInfoProps {
  controlMode: string;
}

const RobotInfo: React.FC<RobotInfoProps> = ({ controlMode }) => {
  const { coords, axis } = useRobotContext();

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold">Robot Info</h3>

      {controlMode === "ejes" ? (
        <>
          <h4 className="mt-4 font-semibold">Joints Values</h4>
          <p>J1: {axis.J1.toFixed(3)} rad</p>
          <p>J2: {axis.J2.toFixed(3)} rad</p>
          <p>J3: {axis.J3.toFixed(3)} rad</p>
          <p>J4: {axis.J4.toFixed(3)} rad</p>
          <p>J5: {axis.J5.toFixed(3)} rad</p>
          <p>J6: {axis.J6.toFixed(3)} rad</p>
        </>
      ) : (
        <>
          <h4 className="mt-4 font-semibold">Coordinate Values</h4>
          <p>X: {coords.X.toFixed(3)} m</p>
          <p>Y: {coords.Y.toFixed(3)} m</p>
          <p>Z: {coords.Z.toFixed(3)} m</p>
          <p>Pitch: {coords.Pitch.toFixed(3)} rad</p>
          <p>Roll: {coords.Roll.toFixed(3)} rad</p>
          <p>Yaw: {coords.Yaw.toFixed(3)} rad</p>
        </>
      )}

      <h4 className="mt-4 font-semibold">Selected Tool</h4>
      <p>Gripper</p>

    </div>
  );
};

export default RobotInfo;
