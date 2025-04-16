
import { generateExtractiveSummary } from './extractiveSummarizer';
import { generateAbstractiveSummary } from './abstractiveSummarizer';

export interface SummarizerResult {
  extractiveSummary: string;
  abstractiveSummary: string;
  processingTime: number;
}

export const summarizeText = (
  text: string,
  method: 'extractive' | 'abstractive' | 'both' = 'both'
): SummarizerResult => {
  // Record start time
  const startTime = performance.now();
  
  // Generate summaries based on the selected method
  let extractiveSummary = '';
  let abstractiveSummary = '';
  
  if (method === 'extractive' || method === 'both') {
    extractiveSummary = generateExtractiveSummary(text);
  }
  
  if (method === 'abstractive' || method === 'both') {
    abstractiveSummary = generateAbstractiveSummary(text);
  }
  
  // Record end time and calculate processing time
  const endTime = performance.now();
  const processingTime = (endTime - startTime) / 1000; // Convert to seconds
  
  return {
    extractiveSummary,
    abstractiveSummary,
    processingTime
  };
};
