// Handles caching of responses for offline use
type CacheRecord = Record<string, string>;

// Response cache to store question-answer pairs
let responseCache: CacheRecord = {};

// Enhanced caching mechanism with more intelligent storage
export const cacheResponse = (question: string, answer: string): void => {
  try {
    // Get existing cache or initialize new one
    const cache = JSON.parse(localStorage.getItem('mrc_assistant_cache') || '{}');
    
    // Normalize the question by removing punctuation and converting to lowercase
    const normalizedQuestion = question.toLowerCase().replace(/[^\w\s]/g, '');
    
    // Extract keywords (words with more than 3 characters)
    const keywords = normalizedQuestion.split(' ')
      .filter(word => word.length > 3)
      .join(' ');
    
    // Store using keywords as key for better fuzzy matching later
    if (keywords.length > 0) {
      cache[keywords] = answer;
    }
    
    // Also store the full normalized question for exact matches
    cache[normalizedQuestion] = answer;
    
    // Keep cache size reasonable (max 100 entries)
    const keys = Object.keys(cache);
    if (keys.length > 100) {
      // Remove oldest entries
      const keysToRemove = keys.slice(0, keys.length - 100);
      keysToRemove.forEach(key => delete cache[key]);
    }
    
    localStorage.setItem('mrc_assistant_cache', JSON.stringify(cache));
    
    // Update in-memory cache too
    responseCache = cache;
  } catch (error) {
    console.error('Error caching response:', error);
  }
};

export const getCachedResponse = (question: string): string | null => {
  try {
    // Try to get from in-memory cache first (faster)
    if (Object.keys(responseCache).length === 0) {
      // If in-memory cache is empty, load from localStorage
      responseCache = JSON.parse(localStorage.getItem('mrc_assistant_cache') || '{}');
    }
    
    const normalizedQuestion = question.toLowerCase().replace(/[^\w\s]/g, '');
    
    // Try exact match first
    if (responseCache[normalizedQuestion]) {
      return responseCache[normalizedQuestion];
    }
    
    // Extract significant words for fuzzy matching
    const words = normalizedQuestion.split(' ').filter(word => word.length > 3);
    
    // Look for partial matches based on keywords
    for (const key of Object.keys(responseCache)) {
      const keyWords = key.split(' ');
      
      // Count matching significant words
      const matchingWords = words.filter(word => keyWords.includes(word)).length;
      
      // If more than 60% of significant words match, consider it a hit
      if (matchingWords > 0 && matchingWords / words.length > 0.6) {
        return responseCache[key];
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error retrieving cached response:', error);
    return null;
  }
};

// Clear the response cache
export const clearCache = (): void => {
  localStorage.removeItem('mrc_assistant_cache');
  responseCache = {};
  console.log("Perplexity response cache cleared");
};
