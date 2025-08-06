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
  const [loading, setLoading] = useState(false);

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
    const handler = async (e) => {
      if (e.detail && e.detail.trim()) {
        setLoading(true);
        setOutputText("");
        try {
          const response = await fetch("http://35.193.25.179:8000/paraphraser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              input_text: e.detail,
              mode: activeMode.toLowerCase()
            })
          });
          const data = await response.json();
          setOutputText(data.paraphrased_text || "Error: No paraphrased text returned.");
        } catch (err) {
          setOutputText("Error: Unable to paraphrase. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };
    window.addEventListener('paraphrase', handler);
    return () => window.removeEventListener('paraphrase', handler);
  }, [setOutputText, activeMode]);

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
          <ContentArea
            inputText={inputText}
            setInputText={setInputText}
            outputText={outputText}
            darkMode={darkMode}
            loading={loading}
          />
        </div>
      </div>
    </>
  )
}