import { useState } from "react";
import ParaphraseButton from "./ParaphraseButton";
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun, Header, AlignmentType } from 'docx';
import { X } from "lucide-react";

export default function ContentArea({ inputText, setInputText, outputText, darkMode, loading }) {
  const [copied, setCopied] = useState(false);
  const [showExportPopup, setShowExportPopup] = useState(false);

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    
    // Add date in top right
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(getCurrentDate(), pageWidth - margin, 20, { align: 'right' });
    
    // Add title
    doc.setFontSize(20);
    doc.setTextColor(0);
    doc.setFont(undefined, 'bold');
    doc.text('Paraphrased Content', margin, 40);
    
    // Add line under title
    doc.setLineWidth(0.5);
    doc.line(margin, 45, pageWidth - margin, 45);
    
    // Add content
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(50);
    
    const splitContent = doc.splitTextToSize(outputText, contentWidth);
    doc.text(splitContent, margin, 60);
    
    doc.save(`Paraphrased_Content_${new Date().toISOString().split('T')[0]}.pdf`);
    setShowExportPopup(false);
  };

  const generateDOCX = async () => {
    const doc = new Document({
      sections: [{
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: getCurrentDate(),
                    size: 20,
                    color: "666666"
                  })
                ],
                alignment: AlignmentType.RIGHT
              })
            ]
          })
        },
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "Paraphrased Content",
                bold: true,
                size: 32,
                color: "000000"
              })
            ],
            spacing: { after: 400 }
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: outputText,
                size: 24,
                color: "333333"
              })
            ],
            spacing: { line: 276 }
          })
        ]
      }]
    });

    const buffer = await Packer.toBlob(doc);
    const url = URL.createObjectURL(buffer);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Paraphrased_Content_${new Date().toISOString().split('T')[0]}.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowExportPopup(false);
  };

  return (
    <>
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
            <ParaphraseButton
              onClick={() => {
                if (!loading && inputText.trim()) {
                  window.dispatchEvent(new CustomEvent('paraphrase', { detail: inputText }));
                }
              }}
              loading={loading}
            />
          </div>
        </div>

        {/* Output Area */}
        <div
          className={`rounded-2xl p-6 relative ${darkMode ? "bg-black" : "bg-gray-100"}`}
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
                  ${copied ? "bg-lime-400 text-black" : darkMode ? "bg-[#101214] text-white hover:bg-gray-700" : "bg-gray-200 text-gray-900 hover:bg-gray-300"}`}
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
          
          {/* Export Button */}
          {outputText && (
            <button
              onClick={() => setShowExportPopup(true)}
              className={`absolute bottom-4 right-4 p-3 rounded-xl flex items-center gap-2 bg-gray-200 cursor-pointer hover:bg-gray-300 transition`}
              title="Export Content"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export
            </button>
          )}
        </div>
      </div>

      {/* Export Popup */}
      {showExportPopup && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 relative">
            {/* Close button */}
            <button
              onClick={() => setShowExportPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Export your text</h2>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Download Docs File */}
              <button
                onClick={generateDOCX}
                className="flex flex-col cursor-pointer items-center p-6 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors group"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-3 group-hover:bg-gray-300 transition-colors">
                  <img src="/material-symbols-light_docs-outline-rounded.png" alt="DOCX Icon" width="32" height="32" />
                </div>
                <span className="text-sm font-medium text-gray-700 text-center">Download Docs File</span>
              </button>
              
              {/* Download PDF */}
              <button
                onClick={generatePDF}
                className="flex flex-col cursor-pointer items-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
              >
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-red-200 transition-colors">
                  <img src="/material-icon-theme_pdf.png" alt="PDF Icon" width="32" height="32" />
                </div>
                <span className="text-sm font-medium text-gray-700 text-center">Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}