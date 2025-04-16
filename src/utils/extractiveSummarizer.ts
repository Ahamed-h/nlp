
/**
 * A simple extractive summarization algorithm using sentence ranking.
 * This implementation uses a variation of the TextRank algorithm.
 */

// Helper function to split text into sentences
const splitIntoSentences = (text: string): string[] => {
  // Simple regex to split text by sentence-ending punctuation
  return text
    .replace(/([.?!])\s*(?=[A-Z])/g, "$1|")
    .split("|")
    .map(sentence => sentence.trim())
    .filter(sentence => sentence.length > 10); // Filter out very short sentences
};

// Helper function to calculate word frequency
const calculateWordFrequency = (text: string): Record<string, number> => {
  // Convert text to lowercase and split into words
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  
  // Remove common stop words (simplified set)
  const stopWords = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'is', 'are', 'was', 'were',
    'be', 'have', 'has', 'had', 'do', 'does', 'did', 'in', 'on', 'at',
    'to', 'for', 'with', 'by', 'about', 'as', 'of', 'this', 'that'
  ]);
  
  // Calculate frequency of each non-stop word
  const wordFreq: Record<string, number> = {};
  words.forEach(word => {
    if (!stopWords.has(word)) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
  });
  
  return wordFreq;
};

// Helper function to score sentences
const scoreSentences = (sentences: string[], wordFreq: Record<string, number>): number[] => {
  return sentences.map(sentence => {
    const words = sentence.toLowerCase().match(/\b\w+\b/g) || [];
    let score = 0;
    
    words.forEach(word => {
      if (wordFreq[word]) {
        score += wordFreq[word];
      }
    });
    
    // Normalize by sentence length to avoid bias towards longer sentences
    return score / Math.max(words.length, 1);
  });
};

// Main function to generate extractive summary
export const generateExtractiveSummary = (text: string, compressionRatio: number = 0.3): string => {
  // 1. Split text into sentences
  const sentences = splitIntoSentences(text);
  
  // If there are very few sentences, return the original text
  if (sentences.length <= 3) {
    return text;
  }
  
  // 2. Calculate word frequency
  const wordFreq = calculateWordFrequency(text);
  
  // 3. Score each sentence
  const sentenceScores = scoreSentences(sentences, wordFreq);
  
  // 4. Create a copy of sentences with their indices
  const indexedSentences = sentences.map((sentence, index) => ({ 
    text: sentence, 
    score: sentenceScores[index],
    originalIndex: index
  }));
  
  // 5. Sort sentences by score in descending order
  indexedSentences.sort((a, b) => b.score - a.score);
  
  // 6. Select top sentences based on compression ratio
  const numSentencesToInclude = Math.max(1, Math.ceil(sentences.length * compressionRatio));
  const topSentences = indexedSentences.slice(0, numSentencesToInclude);
  
  // 7. Sort selected sentences by their original position
  topSentences.sort((a, b) => a.originalIndex - b.originalIndex);
  
  // 8. Return the summary as concatenated sentences
  return topSentences.map(s => s.text).join(' ');
};
