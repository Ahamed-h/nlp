
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { summarizeText, SummarizerResult } from '@/utils/summarizer';

const Index = () => {
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
    <div className="min-h-screen flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Text Summarizer</h1>
      
      <Card className="w-full max-w-3xl">
        <CardContent className="p-6 space-y-4">
          <Textarea 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter or paste your text here to summarize (minimum 50 characters)..."
            className="min-h-[200px] resize-y font-mono"
          />
          
          <Button 
            onClick={handleSummarize} 
            disabled={text.trim().length < 50 || isLoading}
            className="w-full"
          >
            {isLoading ? 'Summarizing...' : 'Summarize Text'}
          </Button>
          
          {result && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Summary:</h2>
              <div className="bg-muted/50 p-4 rounded-md">
                <p className="whitespace-pre-wrap">{result}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="mt-6 text-center text-sm text-muted-foreground">
        Created by Ahamed H, Aashif | {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default Index;
