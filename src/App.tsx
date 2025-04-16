
import React, { useState } from "react";
import { summarizeText } from "./utils/summarizer";

const App = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = () => {
    if (text.trim().length < 50) return;
    
    setIsLoading(true);
    
    // Use setTimeout to simulate processing time and avoid blocking the UI
    setTimeout(() => {
      try {
        const summaryResult = summarizeText(text, 'extractive');
        setResult(summaryResult.extractiveSummary);
      } catch (error) {
        console.error('Error generating summary:', error);
      } finally {
        setIsLoading(false);
      }
    }, 500); // Artificial delay to show loading state
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Text Summarizer</h1>
      
      <div className="w-full max-w-3xl border rounded-lg shadow-sm p-4 md:p-6 bg-white">
        <div className="space-y-4">
          <textarea 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to summarize (minimum 50 characters)..."
            className="w-full min-h-[200px] p-3 border rounded resize-y"
          />
          
          <button 
            onClick={handleSummarize} 
            disabled={text.trim().length < 50 || isLoading}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {isLoading ? 'Summarizing...' : 'Summarize Text'}
          </button>
          
          {result && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Summary:</h2>
              <div className="bg-gray-50 p-4 rounded-md">
                <p>{result}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 text-sm text-gray-500 text-center">
        Created by Ahamed H, Aashif | {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default App;
