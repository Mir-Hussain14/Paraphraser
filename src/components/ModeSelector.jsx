export default function ModeSelector({ activeMode, setActiveMode, darkMode }) {
  const modes = [
    "Standard",
    "Fluency",
    "Humanize",
    "Formal",
    "Academic",
    "Simple",
  ];

  return (
    <div className="flex flex-col space-y-4 font-light">
      <div className="flex items-center space-x-6">
        <span
          className={`text-sm font-medium px-8 py-2 border rounded-full transition-colors duration-300 ${
            darkMode ? "text-gray-200" : "text-black"
          }`}
        >
          Modes:
        </span>
        <div className="hidden lg:flex space-x-6 relative">
          {modes.map((mode) => (
            <button
              key={mode}
              onClick={() => setActiveMode(mode)}
              className={`relative pb-4 text-sm transition-colors duration-300 self-start cursor-pointer
                ${darkMode
                  ? activeMode === mode
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                  : activeMode === mode
                    ? "text-black"
                    : "text-gray-400 hover:text-black"}`}
            >
              {mode}
              {/* Underline */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 ease-in-out
                  ${darkMode
                    ? activeMode === mode
                      ? "bg-white opacity-100 scale-x-100"
                      : "bg-gray-400 opacity-0 scale-x-0"
                    : activeMode === mode
                      ? "bg-black opacity-100 scale-x-100"
                      : "bg-gray-400 opacity-0 scale-x-0"}`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Mobile: Dropdown */}
      <div className="block lg:hidden">
        <select
          value={activeMode}
          onChange={(e) => setActiveMode(e.target.value)}
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 transition-colors duration-300 ${
            darkMode
              ? "bg-gray-800 border-gray-600 text-gray-200"
              : "bg-white border-gray-300 text-gray-700"
          }`}
        >
          {modes.map((mode) => (
            <option key={mode} value={mode}>
              {mode}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
