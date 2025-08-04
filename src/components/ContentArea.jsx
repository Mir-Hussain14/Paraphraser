import ParaphraseButton from "./ParaphraseButton";

export default function ContentArea({ inputText, setInputText, outputText, darkMode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Area */}
      <div
        className={`rounded-2xl p-6 transition-colors duration-300 ${darkMode ? "bg-gray-200" : "bg-gray-100"}`}
      >
        <h2
          className={`text-xl font-semibold transition-colors duration-300 ${
            darkMode ? "text-black" : "text-gray-900"
          }`}
        >
          Paste Content Here
        </h2>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="To rewrite text, enter or paste text here and press 'Paraphrase'."
          className={`w-full h-64 font-light lg:h-80 py-2 border-none focus:border-none outline-none focus:outline-none`}
        />
        <div className="flex justify-end">
        <ParaphraseButton/>
        </div>
      </div>

      {/* Output Area */}
      <div
        className={`rounded-2xl p-6 transition-colors duration-300 ${darkMode ? "bg-gray-200" : "bg-gray-100"}`}
      >
        <h2
          className={`text-xl font-semibold transition-colors duration-300 ${
            darkMode ? "text-black" : "text-gray-900"
          }`}
        >
          Paraphrased Content
        </h2>
        <div
          className={`w-full h-64 lg:h-80 py-2`}
        >
          {outputText || (
            <span className={`transition-colors duration-300 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}