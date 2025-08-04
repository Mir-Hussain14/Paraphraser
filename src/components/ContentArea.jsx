
import { useState } from "react";
import ParaphraseButton from "./ParaphraseButton";

export default function ContentArea({ inputText, setInputText, outputText, darkMode }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Area */}
      <div
        className={`rounded-2xl p-6 ${darkMode ? "bg-black" : "bg-gray-100"}`}
      >
        <h2
          className={`text-xl font-semibold transition-colors duration-300 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Paste Content Here
        </h2>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="To rewrite text, enter or paste text here and press 'Paraphrase'."
          className={`w-full min-h-80 h-80 lg:h-96 font-light py-2 border-none focus:border-none outline-none focus:outline-none resize-vertical ${darkMode ? "text-gray-400 bg-black" : "text-black bg-gray-100"}`}
        />
        <div className="flex justify-end">
          {/* ParaphraseButton should trigger outputText update, not setInputText */}
          <ParaphraseButton onClick={() => window.dispatchEvent(new CustomEvent('paraphrase', { detail: inputText }))} />
        </div>
      </div>

      {/* Output Area */}
      <div
        className={`rounded-2xl p-6 ${darkMode ? "bg-black" : "bg-gray-100"}`}
      >
        <div className="flex items-center justify-between">
          <h2
            className={`text-xl font-semibold transition-colors duration-300 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Paraphrased Content
          </h2>
          {outputText && (
            <button
              className={`ml-2 px-4 py-1 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors duration-200
                ${copied ? "bg-lime-400 text-black" : darkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-gray-200 text-gray-900 hover:bg-gray-300"}`}
              onClick={() => {
                navigator.clipboard.writeText(outputText);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              title={copied ? "Copied!" : "Copy to clipboard"}
              disabled={copied}
            >
              {copied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block align-middle">
                    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block align-middle">
                    <rect x="9" y="9" width="13" height="13" rx="2" strokeWidth="2" stroke="currentColor" fill="none"/>
                    <rect x="3" y="3" width="13" height="13" rx="2" strokeWidth="2" stroke="currentColor" fill="none"/>
                  </svg>
                  Copy
                </>
              )}
            </button>
          )}
        </div>
        <div
          className={`w-full min-h-80 h-80 lg:h-96 py-2 font-light ${darkMode ? "text-gray-400 bg-black" : "text-black bg-gray-100"}`}
        >
          {outputText ? outputText : (
            <span className={`transition-colors duration-300 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}