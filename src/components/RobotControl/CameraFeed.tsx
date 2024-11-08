import WebSocketVideo from "./WebSocketVideo";

const CameraFeed = () => {
  return (
    <div className="flex items-center justify-center w-full h-0 pb-[56.25%] relative border border-gray-300 rounded-lg overflow-hidden bg-gray-800">
      {/* Placeholder for camera feed */}
      <div className="absolute inset-0  items-center justify-center w-full">
        <WebSocketVideo />
        {/* Simulated video placeholder */}
      </div>
    </div>
  );
};

export default CameraFeed;
