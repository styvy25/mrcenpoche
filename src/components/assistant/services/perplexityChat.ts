
import { createPerplexityRequest, testPerplexityApiKey } from './perplexity/apiService';
import { getOfflineResponse } from './perplexity/offlineHandler';
import { cacheResponse, getCachedResponse, clearCache as clearResponseCache } from './perplexity/responseCache';

// Main function to get a response from Perplexity API
export const getPerplexityResponse = async (
  apiKey: string, 
  userMessage: string
): Promise<string> => {
  // Check if we're online
  if (!navigator.onLine) {
    console.log("Device is offline. Using fallback response.");
    return getOfflineResponse(userMessage);
  }

  // Try to get from cache first if request is similar to previous ones
  const cachedResponse = getCachedResponse(userMessage);
  if (cachedResponse) {
    console.log("Using cached response.");
    return cachedResponse;
  }

  // Valid API key check
  if (!apiKey || apiKey.trim().length < 10) {
    console.log("Invalid API key. Using fallback response.");
    return getOfflineResponse(userMessage);
  }

  const requestBody = createPerplexityRequest(userMessage);

  try {
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), 10000); // 10s timeout
    
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      signal: abortController.signal
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error('Perplexity API error:', response.status);
      return getOfflineResponse(userMessage);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Cache this response for offline use
    cacheResponse(userMessage, content);
    
    return content;
  } catch (error) {
    console.error('Error in Perplexity request:', error);
    return getOfflineResponse(userMessage);
  }
};

// Re-export functions from the caching module
export { clearResponseCache, getCachedResponse };

// Re-export the API testing function
export { testPerplexityApiKey };

// Function to refresh YouTube cache
export const refreshYouTubeCache = async (apiKey: string): Promise<boolean> => {
  if (!apiKey || !navigator.onLine) return false;
  
  try {
    const response = await fetch('https://www.googleapis.com/youtube/v3/search', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error refreshing YouTube cache:', error);
    return false;
  }
};
