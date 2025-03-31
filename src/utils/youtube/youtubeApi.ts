
import { useState } from 'react';
import { VideoAnalysisResult } from '@/types';

export const useYoutubeApi = () => {
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Analyzes a YouTube video using provided API keys
   */
  const analyzeVideo = async (
    videoId: string,
    youtubeApiKey: string,
    perplexityApiKey: string
  ): Promise<VideoAnalysisResult> => {
    setIsLoading(true);
    
    try {
      // First get video details from YouTube API
      const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${youtubeApiKey}&part=snippet,contentDetails`;
      const videoResponse = await fetch(videoDetailsUrl);
      const videoData = await videoResponse.json();
      
      if (!videoData.items || videoData.items.length === 0) {
        throw new Error('Video not found');
      }
      
      const videoDetails = videoData.items[0].snippet;
      const title = videoDetails.title;
      const description = videoDetails.description;
      
      // Analyze with Perplexity
      const perplexityResponse = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${perplexityApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: 'You are a professional analyst specialized in summarizing videos.'
            },
            {
              role: 'user',
              content: `Analyze this YouTube video: ${title}\n\nDescription: ${description}\n\nProvide a comprehensive analysis with these sections: 1) Summary (3-4 sentences), 2) 5-7 Key Points (bullet points), 3) Political implications (if any).`
            }
          ],
          temperature: 0.2,
          max_tokens: 1500,
        }),
      });
      
      const perplexityData = await perplexityResponse.json();
      
      if (!perplexityData.choices || perplexityData.choices.length === 0) {
        throw new Error('Analysis failed');
      }
      
      const analysis = perplexityData.choices[0].message.content;
      
      // Extract sections using regex
      const summaryMatch = analysis.match(/Summary[:\s]+([\s\S]+?)(?=Key Points|$)/i);
      const keyPointsMatch = analysis.match(/Key Points[:\s]+([\s\S]+?)(?=Political implications|$)/i);
      
      // Parse key points into an array
      const keyPointsText = keyPointsMatch ? keyPointsMatch[1].trim() : '';
      const keyPoints = keyPointsText
        .split(/\n+/)
        .map(line => line.replace(/^[•\-*]\s*/, '').trim())
        .filter(line => line.length > 0);
      
      return {
        success: true,
        title,
        summary: summaryMatch ? summaryMatch[1].trim() : '',
        keyPoints,
        transcript: description
      };
    } catch (error) {
      console.error('Error in analyzeVideo:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    analyzeVideo
  };
};
