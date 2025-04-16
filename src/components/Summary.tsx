
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck } from 'lucide-react';

interface SummaryProps {
  originalText: string;
  extractiveSummary: string;
  abstractiveSummary: string;
  summaryType: 'extractive' | 'abstractive' | 'both';
  processingTime: number;
  visible: boolean;
}

const Summary: React.FC<SummaryProps> = ({
  originalText,
  extractiveSummary,
  abstractiveSummary,
  summaryType,
  processingTime,
  visible
}) => {
  const [copied, setCopied] = React.useState<string | null>(null);
  
  if (!visible) return null;
  
  const calculateReduction = (originalText: string, summaryText: string) => {
    if (!originalText || !summaryText) return 0;
    const originalLength = originalText.length;
    const summaryLength = summaryText.length;
    return Math.round(((originalLength - summaryLength) / originalLength) * 100);
  };

  const extractiveReduction = calculateReduction(originalText, extractiveSummary);
  const abstractiveReduction = calculateReduction(originalText, abstractiveSummary);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Card className="w-full mt-8">
      <CardHeader>
        <CardTitle className="text-2xl text-nlp-blue flex justify-between items-center">
          <span>Summary Results</span>
          <Badge variant="outline" className="ml-2">
            Processed in {processingTime.toFixed(2)}s
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {summaryType === 'both' ? (
          <Tabs defaultValue="extractive">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="extractive">
                Extractive Summary
                <Badge variant="secondary" className="ml-2">
                  {extractiveReduction}% reduction
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="abstractive">
                Abstractive Summary
                <Badge variant="secondary" className="ml-2">
                  {abstractiveReduction}% reduction
                </Badge>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="extractive" className="mt-4">
              <div className="bg-muted/50 p-4 rounded-md relative">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute top-2 right-2"
                  onClick={() => handleCopy(extractiveSummary, 'extractive')}
                >
                  {copied === 'extractive' ? <ClipboardCheck size={16} /> : <Clipboard size={16} />}
                </Button>
                <p className="whitespace-pre-wrap">{extractiveSummary}</p>
              </div>
            </TabsContent>
            <TabsContent value="abstractive" className="mt-4">
              <div className="bg-muted/50 p-4 rounded-md relative">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute top-2 right-2"
                  onClick={() => handleCopy(abstractiveSummary, 'abstractive')}
                >
                  {copied === 'abstractive' ? <ClipboardCheck size={16} /> : <Clipboard size={16} />}
                </Button>
                <p className="whitespace-pre-wrap">{abstractiveSummary}</p>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">
                {summaryType === 'extractive' ? 'Extractive Summary' : 'Abstractive Summary'}
              </h3>
              <Badge variant="secondary">
                {summaryType === 'extractive' ? extractiveReduction : abstractiveReduction}% reduction
              </Badge>
            </div>
            <div className="bg-muted/50 p-4 rounded-md relative">
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute top-2 right-2"
                onClick={() => handleCopy(summaryType === 'extractive' ? extractiveSummary : abstractiveSummary, summaryType)}
              >
                {copied === summaryType ? <ClipboardCheck size={16} /> : <Clipboard size={16} />}
              </Button>
              <p className="whitespace-pre-wrap">
                {summaryType === 'extractive' ? extractiveSummary : abstractiveSummary}
              </p>
            </div>
          </div>
        )}
        
        <div className="mt-8">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">Original Text</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleCopy(originalText, 'original')}
            >
              {copied === 'original' ? <ClipboardCheck size={16} /> : <Clipboard size={16} />}
            </Button>
          </div>
          <div className="bg-muted/50 p-4 rounded-md max-h-[300px] overflow-y-auto">
            <p className="whitespace-pre-wrap">{originalText}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Summary;
