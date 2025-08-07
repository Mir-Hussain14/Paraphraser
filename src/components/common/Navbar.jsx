import React, { useState } from 'react'
import Header from "./Header"
import SettingsPanel from "./SettingsPanel";

export const Navbar = ( {darkMode, setDarkMode}) => {
  const [showSettings, setShowSettings] = useState(false)
  return (
    <>
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
    </>
  )
}
