
import { offlineResponses, topicResponses } from './offlineResponses';
import { getCachedResponse } from './responseCache';

// Function to get appropriate offline response based on user message
export const getOfflineResponse = (userMessage: string): string => {
  // First check if we have a cached response for this or similar query
  const cachedResponse = getCachedResponse(userMessage);
  if (cachedResponse) {
    return cachedResponse;
  }

  // Check for topic-specific responses
  const lowerCaseMsg = userMessage.toLowerCase();
  
  // Try to identify the main topic of the question
  for (const [topic, response] of Object.entries(topicResponses)) {
    if (lowerCaseMsg.includes(topic)) {
      return response;
    }
  }
  
  // If no specific topic identified, check for general keywords
  if (lowerCaseMsg.includes('qui est') || lowerCaseMsg.includes('kamto') || lowerCaseMsg.includes('président')) {
    return offlineResponses[2];
  } else if (lowerCaseMsg.includes('programme') || lowerCaseMsg.includes('politique')) {
    return offlineResponses[1];
  } else if (lowerCaseMsg.includes('adhérer') || lowerCaseMsg.includes('devenir') || lowerCaseMsg.includes('militant')) {
    return offlineResponses[3];
  } else if (lowerCaseMsg.includes('valeur') || lowerCaseMsg.includes('principe')) {
    return offlineResponses[4];
  } else if (lowerCaseMsg.includes('élection') || lowerCaseMsg.includes('2018') || lowerCaseMsg.includes('présidentielle')) {
    return offlineResponses[5];
  } else if (lowerCaseMsg.includes('économie') || lowerCaseMsg.includes('économique')) {
    return offlineResponses[6];
  } else if (lowerCaseMsg.includes('éducation') || lowerCaseMsg.includes('école') || lowerCaseMsg.includes('université')) {
    return offlineResponses[7];
  } else if (lowerCaseMsg.includes('jeune') || lowerCaseMsg.includes('jeunesse')) {
    return offlineResponses[8];
  } else if (lowerCaseMsg.includes('étranger') || lowerCaseMsg.includes('international')) {
    return offlineResponses[9];
  }
  
  // Return a random general response if no specific match
  const randomIndex = Math.floor(Math.random() * offlineResponses.length);
  return offlineResponses[randomIndex];
};
