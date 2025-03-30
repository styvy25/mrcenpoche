
/**
 * Extracts YouTube video ID from different URL formats
 */
export const extractVideoId = (url: string): string | null => {
  // Handle youtu.be links
  const shortMatch = /youtu\.be\/([a-zA-Z0-9_-]{11})/.exec(url);
  if (shortMatch) return shortMatch[1];
  
  // Handle youtube.com links
  const regularMatch = /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/.exec(url);
  if (regularMatch) return regularMatch[1];
  
  // Handle embed links
  const embedMatch = /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/.exec(url);
  if (embedMatch) return embedMatch[1];
  
  // Handle already provided IDs (11 characters)
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
  
  return null;
};
