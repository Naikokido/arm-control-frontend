const CameraFeed = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full border border-gray-300 rounded">
      <div className="w-10 h-10 bg-gray-800 flex items-center justify-center rounded-full mb-4">
        <span className="text-white text-2xl">?</span>
      </div>
      <p className="text-gray-500">No signal</p>
    </div>
  );
};

export default CameraFeed;
