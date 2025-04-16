
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TextInput from '@/components/TextInput';
import Summary from '@/components/Summary';
import { summarizeText, SummarizerResult } from '@/utils/summarizer';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [text, setText] = useState('');
  const [summaryType, setSummaryType] = useState<'extractive' | 'abstractive' | 'both'>('both');
  const [result, setResult] = useState<SummarizerResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const handleSummarize = () => {
    if (text.trim().length < 50) return;
    
    setIsLoading(true);
    
    // Use setTimeout to simulate processing time and avoid blocking the UI
    setTimeout(() => {
      try {
        const summaryResult = summarizeText(text, summaryType);
        setResult(summaryResult);
        setShowSummary(true);
      } catch (error) {
        console.error('Error generating summary:', error);
      } finally {
        setIsLoading(false);
      }
    }, 500); // Artificial delay to show loading state
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container max-w-5xl">
          <div className="space-y-4 mb-8">
            <h2 className="text-2xl font-bold">How it works</h2>
            <Card className="p-4">
              <Tabs defaultValue="extractive">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="extractive">Extractive Summarization</TabsTrigger>
                  <TabsTrigger value="abstractive">Abstractive Summarization</TabsTrigger>
                </TabsList>
                <TabsContent value="extractive" className="p-4">
                  <p className="text-muted-foreground">
                    <strong>Extractive summarization</strong> identifies and extracts key sentences from the original text 
                    to form a summary. It works by ranking sentences based on importance (using algorithms like TextRank) 
                    and selecting the highest-scoring ones. This method preserves the original wording but may lack flow.
                  </p>
                </TabsContent>
                <TabsContent value="abstractive" className="p-4">
                  <p className="text-muted-foreground">
                    <strong>Abstractive summarization</strong> generates new sentences that capture the essence of the original text. 
                    It creates a paraphrased version that may use different words while preserving the core meaning. This approach 
                    produces more natural-sounding summaries but requires deeper language understanding.
                  </p>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
          
          <TextInput 
            text={text}
            onTextChange={setText}
            onSummarize={handleSummarize}
            summaryType={summaryType}
            onSummaryTypeChange={setSummaryType}
            isLoading={isLoading}
          />
          
          {result && (
            <Summary 
              originalText={text}
              extractiveSummary={result.extractiveSummary}
              abstractiveSummary={result.abstractiveSummary}
              summaryType={summaryType}
              processingTime={result.processingTime}
              visible={showSummary}
            />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
