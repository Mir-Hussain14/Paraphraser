export default function ParaphraseButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-lime-300 hover:bg-lime-400 text-gray-900 font-medium px-8 py-3 rounded-2xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-1 ms-auto"
    >
      Paraphrase
    </button>
  )
}