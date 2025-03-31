
import { createPerplexityRequest, testPerplexityApiKey } from './perplexity/apiService';
import { getOfflineResponse } from './perplexity/offlineHandler';
import { cacheResponse, clearCache as clearResponseCache } from './perplexity/responseCache';

// Main function to get a response from Perplexity API
export const getPerplexityResponse = async (
  apiKey: string, 
  userMessage: string
): Promise<string> => {
  // Check if we're online
  if (!navigator.onLine) {
    console.log("Device is offline. Using fallback response.");
    // Return a response based on the user's question
    return getOfflineResponse(userMessage);
  }

  // Valid API key check
  if (!apiKey || apiKey.trim().length < 10) {
    console.log("Invalid API key. Using fallback response.");
    return getOfflineResponse(userMessage);
  }

  const requestBody = createPerplexityRequest(userMessage);

  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      console.error('Perplexity API error:', response.status);
      // If API key is invalid or expired, we'll use the offline response
      return getOfflineResponse(userMessage);
    }

    const data = await response.json();
    
    // Cache this response for offline use
    cacheResponse(userMessage, data.choices[0].message.content);
    
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error in Perplexity request:', error);
    return getOfflineResponse(userMessage);
  }
};

// Re-export functions from the caching module
export { clearResponseCache };

// Re-export the API testing function
export { testPerplexityApiKey };
