const Loader = () => {
  return (
    <div className="absolute bottom-4 left-4 z-[1200] flex items-center space-x-2 bg-gray-800/80 px-3 py-2 rounded-md">
      <div className="w-5 h-5 border-2 border-t-cyan-400 border-r-cyan-400 border-b-cyan-400 border-l-transparent rounded-full animate-spin"></div>
      <span className="text-sm text-cyan-300">Fetching data...</span>
    </div>
  );
};

export default Loader;
