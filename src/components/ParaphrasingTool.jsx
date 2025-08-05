import { useState, useEffect } from "react"
import Header from "./Header"
import SettingsPanel from "./SettingsPanel"
import ModeSelector from "./ModeSelector"
import ContentArea from "./ContentArea"
import ParaphraseButton from "./ParaphraseButton"

export default function ParaphrasingTool() {
  const [activeMode, setActiveMode] = useState("Standard")
  const [darkMode, setDarkMode] = useState(false)
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [showSettings, setShowSettings] = useState(false)

  // Toggle dark mode class on root element
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  // Listen for custom 'paraphrase' event from ContentArea
  useEffect(() => {
    const handler = (e) => {
      if (e.detail && e.detail.trim()) {
        setOutputText(e.detail)
      }
    };
    window.addEventListener('paraphrase', handler);
    return () => window.removeEventListener('paraphrase', handler);
  }, [setOutputText]);

  return (
    <>
      <div className={`relative min-h-screen ${darkMode ? "bg-[#101214]" : "bg-white"}`}>
        {/* Header */}
        <Header showSettings={showSettings} setShowSettings={setShowSettings} darkMode={darkMode} />

        {/* Settings Panel - Popup */}
        {showSettings && (
          <>
            {/* Backdrop (no body color change) */}
            <div className="" onClick={() => setShowSettings(false)} />
            {/* Settings Panel */}
            <div className="absolute top-16 right-16 z-50">
              <SettingsPanel darkMode={darkMode} setDarkMode={setDarkMode} onClose={() => setShowSettings(false)} />
            </div>
          </>
        )}

        {/* Mode Selector */}
        <div className="px-8 lg:mt-4">
          <ModeSelector activeMode={activeMode} setActiveMode={setActiveMode} darkMode={darkMode} />
        </div>

        {/* Content Area */}
        <div className="mt-2 px-8">
          <ContentArea inputText={inputText} setInputText={setInputText} outputText={outputText} darkMode={darkMode} />
        </div>
      </div>
    </>
  )
}