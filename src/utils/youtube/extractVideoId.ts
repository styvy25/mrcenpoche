
/**
 * Extracts the YouTube video ID from a URL
 */
export const extractVideoId = (url: string): string | null => {
  if (!url) return null;
  
  // Regular expression patterns for different YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/watch\?.*v=|youtube\.com\/watch\?.*&v=)([^#\&\?\n]+)/,
    /youtube\.com\/shorts\/([^#\&\?\n]+)/,
    /youtube\.com\/live\/([^#\&\?\n]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
};
