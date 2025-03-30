// Improved caching of responses for offline use with size limit and expiry
type CacheRecord = {
  answer: string;
  timestamp: number;
};

interface Cache {
  [key: string]: CacheRecord;
}

// Response cache to store question-answer pairs
let responseCache: Cache = {};
const CACHE_MAX_SIZE = 100; // Maximum number of items to store
const CACHE_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

// Load cache from localStorage on init
const loadCache = (): void => {
  try {
    const cachedData = localStorage.getItem('mrc_assistant_cache');
    if (cachedData) {
      responseCache = JSON.parse(cachedData);
      
      // Clean expired entries
      const now = Date.now();
      Object.keys(responseCache).forEach(key => {
        if (now - responseCache[key].timestamp > CACHE_EXPIRY_MS) {
          delete responseCache[key];
        }
      });
    }
  } catch (error) {
    console.error('Error loading response cache:', error);
    responseCache = {};
  }
};

// Initialize cache when this module is imported
loadCache();

// Enhanced caching mechanism with more intelligent storage
export const cacheResponse = (question: string, answer: string): void => {
  try {
    // Normalize the question by removing punctuation and converting to lowercase
    const normalizedQuestion = question.toLowerCase().replace(/[^\w\s]/g, '');
    
    // Extract keywords (words with more than 3 characters)
    const keywords = normalizedQuestion.split(' ')
      .filter(word => word.length > 3)
      .join(' ');
    
    // Store using keywords as key for better fuzzy matching later
    if (keywords.length > 0) {
      responseCache[keywords] = {
        answer,
        timestamp: Date.now()
      };
    }
    
    // Also store the full normalized question for exact matches
    responseCache[normalizedQuestion] = {
      answer,
      timestamp: Date.now()
    };
    
    // Keep cache size reasonable by removing oldest entries
    const entries = Object.entries(responseCache);
    if (entries.length > CACHE_MAX_SIZE) {
      // Sort by timestamp (oldest first)
      entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
      
      // Remove oldest entries to keep under max size
      const toRemove = entries.length - CACHE_MAX_SIZE;
      entries.slice(0, toRemove).forEach(([key]) => {
        delete responseCache[key];
      });
    }
    
    // Save to localStorage for persistence
    localStorage.setItem('mrc_assistant_cache', JSON.stringify(responseCache));
  } catch (error) {
    console.error('Error caching response:', error);
  }
};

export const getCachedResponse = (question: string): string | null => {
  try {
    // If cache is empty, reload from localStorage
    if (Object.keys(responseCache).length === 0) {
      loadCache();
    }
    
    const normalizedQuestion = question.toLowerCase().replace(/[^\w\s]/g, '');
    
    // Try exact match first
    if (responseCache[normalizedQuestion]) {
      return responseCache[normalizedQuestion].answer;
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
        return responseCache[key].answer;
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
