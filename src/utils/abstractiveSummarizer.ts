
/**
 * A simplified abstractive summarization implementation.
 * In a real-world scenario, this would use a pre-trained model like BART or T5.
 * For this demo, we'll implement a simpler approach that preserves the main points.
 */

// Helper function to extract keywords using TF-IDF-like approach
const extractKeywords = (text: string, maxKeywords: number = 10): string[] => {
  // Convert to lowercase and split into words
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  
  // Remove common stop words (simplified set)
  const stopWords = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'is', 'are', 'was', 'were',
    'be', 'have', 'has', 'had', 'do', 'does', 'did', 'in', 'on', 'at',
    'to', 'for', 'with', 'by', 'about', 'as', 'of', 'this', 'that',
    'it', 'its', 'they', 'them', 'their', 'we', 'our', 'you', 'your'
  ]);
  
  // Calculate word frequency
  const wordFreq: Record<string, number> = {};
  words.forEach(word => {
    if (!stopWords.has(word) && word.length > 2) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
  });
  
  // Sort words by frequency
  const sortedWords = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0]);
  
  return sortedWords.slice(0, maxKeywords);
};

// Helper function to find sentences containing keywords
const findKeywordSentences = (text: string, keywords: string[]): string[] => {
  // Split text into sentences (simplified)
  const sentences = text
    .replace(/([.?!])\s*(?=[A-Z])/g, "$1|")
    .split("|")
    .map(sentence => sentence.trim())
    .filter(sentence => sentence.length > 10);
  
  // Find sentences that contain keywords
  const keywordSentences = sentences.filter(sentence => {
    const lowerSentence = sentence.toLowerCase();
    return keywords.some(keyword => lowerSentence.includes(keyword));
  });
  
  return keywordSentences;
};

// Main function to generate abstractive summary
export const generateAbstractiveSummary = (text: string): string => {
  // Extract important keywords
  const keywords = extractKeywords(text, 8);
  
  // Find sentences with keywords
  const keywordSentences = findKeywordSentences(text, keywords);
  
  // For a real abstractive summary, we would use an NLP model here
  // Instead, we'll create a simpler version that highlights main points
  
  // Get first and last paragraphs (often contain key information)
  const paragraphs = text.split(/\n\s*\n/);
  let introSentence = "";
  let conclusionSentence = "";
  
  if (paragraphs.length > 0) {
    const firstParagraph = paragraphs[0].trim();
    const firstSentences = firstParagraph
      .replace(/([.?!])\s*(?=[A-Z])/g, "$1|")
      .split("|");
    if (firstSentences.length > 0) {
      introSentence = firstSentences[0].trim();
    }
    
    const lastParagraph = paragraphs[paragraphs.length - 1].trim();
    const lastSentences = lastParagraph
      .replace(/([.?!])\s*(?=[A-Z])/g, "$1|")
      .split("|");
    if (lastSentences.length > 0) {
      conclusionSentence = lastSentences[lastSentences.length - 1].trim();
    }
  }
  
  // Create a restructured summary
  let summary = "";
  
  if (introSentence) {
    summary += introSentence + " ";
  }
  
  // Add key sentences (limit to avoid too much repetition)
  const maxKeySentences = Math.min(3, keywordSentences.length);
  const selectedKeySentences = keywordSentences.slice(0, maxKeySentences);
  summary += selectedKeySentences.join(" ");
  
  if (conclusionSentence && conclusionSentence !== introSentence) {
    summary += " " + conclusionSentence;
  }
  
  return summary.trim();
};
