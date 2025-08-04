import { Settings, Moon, LogOut, ChevronRight, X } from "lucide-react"

export default function SettingsPanel({ darkMode, setDarkMode, onClose }) {
  return (
    <div
      className={`rounded-lg shadow-lg border p-4 w-64 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      {/* Settings Header with Close Button */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onClose}
          className={`rounded-md p-1 transition-colors duration-200 ${
            darkMode
              ? "hover:bg-gray-700 text-gray-400 hover:text-gray-200"
              : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
          }`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Dark Mode Toggle */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Moon className={`w-4 h-4 transition-colors duration-300 ${darkMode ? "text-gray-300" : "text-gray-600"}`} />
          <span className={`transition-colors duration-300 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
            Dark Mode
          </span>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
            darkMode ? "bg-lime-400" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
              darkMode ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </div>
  )
}