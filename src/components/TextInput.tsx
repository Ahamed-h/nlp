
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TextInputProps {
  text: string;
  onTextChange: (text: string) => void;
  onSummarize: () => void;
  summaryType: 'extractive' | 'abstractive' | 'both';
  onSummaryTypeChange: (type: 'extractive' | 'abstractive' | 'both') => void;
  isLoading: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  text,
  onTextChange,
  onSummarize,
  summaryType,
  onSummaryTypeChange,
  isLoading,
}) => {
  const handleSummarize = () => {
    if (text.trim().length > 50) {
      onSummarize();
    }
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      onTextChange(clipboardText);
    } catch (error) {
      console.error('Failed to paste from clipboard:', error);
    }
  };

  const handleClear = () => {
    onTextChange('');
  };

  const handleSampleText = () => {
    onTextChange(`Natural language processing (NLP) is a subfield of linguistics, computer science, and artificial intelligence concerned with the interactions between computers and human language, in particular how to program computers to process and analyze large amounts of natural language data. The goal is a computer capable of "understanding" the contents of documents, including the contextual nuances of the language within them. The technology can then accurately extract information and insights contained in the documents as well as categorize and organize the documents themselves.

Challenges in natural language processing frequently involve speech recognition, natural language understanding, and natural language generation. Natural language processing has its roots in the 1950s. Already in 1950, Alan Turing published an article titled "Computing Machinery and Intelligence" which proposed what is now called the Turing test as a criterion of intelligence, though at the time that was not articulated as a problem separate from artificial intelligence.

The premise of symbolic NLP is well-summarized by John Searle's Chinese room experiment: Given a collection of rules (e.g., a Chinese phrasebook, with questions and matching answers), the computer emulates natural language understanding (or other NLP tasks) by applying those rules to the data it is confronted with. Modern NLP algorithms are based on machine learning, especially statistical machine learning. The paradigm of machine learning is different from that of most prior attempts at language processing in that the learning procedures used during machine learning automatically focus on the most common cases, whereas when writing rules by hand it is often not at all obvious where the effort should be directed.`);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="text" className="text-lg font-medium">Input Text</Label>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handlePaste}
                >
                  Paste
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSampleText}
                >
                  Sample Text
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleClear}
                >
                  Clear
                </Button>
              </div>
            </div>
            <Textarea 
              id="text"
              value={text} 
              onChange={(e) => onTextChange(e.target.value)}
              placeholder="Enter or paste your text here to summarize (minimum 50 characters)..."
              className="min-h-[200px] resize-y font-mono"
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <Label className="text-lg font-medium mb-2 block">Summary Method</Label>
                <RadioGroup 
                  value={summaryType} 
                  onValueChange={(value) => onSummaryTypeChange(value as 'extractive' | 'abstractive' | 'both')}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="extractive" id="extractive" />
                    <Label htmlFor="extractive">Extractive</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="abstractive" id="abstractive" />
                    <Label htmlFor="abstractive">Abstractive</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="both" />
                    <Label htmlFor="both">Both</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Button 
                onClick={handleSummarize} 
                disabled={text.trim().length < 50 || isLoading}
                className="bg-nlp-blue hover:bg-nlp-dark-blue"
              >
                {isLoading ? 'Summarizing...' : 'Summarize Text'}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TextInput;
