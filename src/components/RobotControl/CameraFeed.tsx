import WebSocketVideo from "./WebSocketVideo";

const CameraFeed = () => {
  return (
    <div className="flex items-center justify-center w-full h-0 pb-[56.25%] relative border border-gray-300 rounded-lg overflow-hidden bg-gray-300">
      {/* Placeholder for camera feed */}
      <div className="absolute inset-0  items-center justify-center w-full">
        <WebSocketVideo onVideoStatusChange={function (): void {
          throw new Error("Function not implemented.");
        } } />
        {/* Simulated video placeholder */}
      </div>
    </div>
  );
};

export default CameraFeed;
