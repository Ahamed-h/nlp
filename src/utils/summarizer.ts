
export interface SummarizerResult {
  extractiveSummary: string;
  abstractiveSummary: string;
  processingTime: number;
}

// Simple extractive summarization
const generateExtractiveSummary = (text: string, compressionRatio: number = 0.3): string => {
  // Split text into sentences
  const sentences = text
    .replace(/([.?!])\s*(?=[A-Z])/g, "$1|")
    .split("|")
    .map(sentence => sentence.trim())
    .filter(sentence => sentence.length > 10);
  
  if (sentences.length <= 3) {
    return text;
  }
  
  // Calculate word frequency
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const stopWords = new Set(['a', 'an', 'the', 'and', 'or', 'but', 'is', 'are', 'was', 'were',
    'be', 'have', 'has', 'had', 'do', 'does', 'did', 'in', 'on', 'at',
    'to', 'for', 'with', 'by', 'about', 'as', 'of', 'this', 'that']);
  
  const wordFreq: Record<string, number> = {};
  words.forEach(word => {
    if (!stopWords.has(word)) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
  });
  
  // Score sentences
  const sentenceScores = sentences.map(sentence => {
    const sentenceWords = sentence.toLowerCase().match(/\b\w+\b/g) || [];
    let score = 0;
    
    sentenceWords.forEach(word => {
      if (wordFreq[word]) {
        score += wordFreq[word];
      }
    });
    
    return score / Math.max(sentenceWords.length, 1);
  });
  
  // Select top sentences
  const indexedSentences = sentences.map((sentence, index) => ({ 
    text: sentence, 
    score: sentenceScores[index],
    originalIndex: index
  }));
  
  indexedSentences.sort((a, b) => b.score - a.score);
  
  const numSentencesToInclude = Math.max(1, Math.ceil(sentences.length * compressionRatio));
  const topSentences = indexedSentences.slice(0, numSentencesToInclude);
  
  topSentences.sort((a, b) => a.originalIndex - b.originalIndex);
  
  return topSentences.map(s => s.text).join(' ');
};

// Simple abstractive summary (simplified version)
const generateAbstractiveSummary = (text: string): string => {
  // For simplicity, just return the first few sentences
  const sentences = text
    .replace(/([.?!])\s*(?=[A-Z])/g, "$1|")
    .split("|")
    .map(sentence => sentence.trim())
    .filter(sentence => sentence.length > 10);
  
  if (sentences.length <= 1) return text;
  
  return sentences.slice(0, Math.min(3, sentences.length)).join(' ');
};

export const summarizeText = (
  text: string,
  method: 'extractive' | 'abstractive' | 'both' = 'both'
): SummarizerResult => {
  const startTime = performance.now();
  
  let extractiveSummary = '';
  let abstractiveSummary = '';
  
  if (method === 'extractive' || method === 'both') {
    extractiveSummary = generateExtractiveSummary(text);
  }
  
  if (method === 'abstractive' || method === 'both') {
    abstractiveSummary = generateAbstractiveSummary(text);
  }
  
  const endTime = performance.now();
  const processingTime = (endTime - startTime) / 1000;
  
  return {
    extractiveSummary,
    abstractiveSummary,
    processingTime
  };
};
