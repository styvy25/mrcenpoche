
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface VideoDetails {
  id: string;
  title: string;
  description: string;
  transcript?: string;
  publishedAt?: string;
  thumbnailUrl?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Create Supabase client using Auth headers
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    {
      global: {
        headers: { Authorization: req.headers.get('Authorization')! },
      },
    }
  );

  try {
    const { action, videoId, query, keyType } = await req.json();
    
    // Get the user's API key from Supabase
    const { data: userData, error: userError } = await supabaseClient.auth.getUser();
    
    if (userError || !userData.user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized. Please log in." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch the user's API key from the api_keys_config table
    const { data: keyData, error: keyError } = await supabaseClient
      .from('api_keys_config')
      .select('youtube_key')
      .eq('user_id', userData.user.id)
      .single();

    if (keyError || !keyData?.youtube_key) {
      return new Response(
        JSON.stringify({ 
          error: "YouTube API key not configured", 
          message: "Please set up your YouTube API key in the settings" 
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const youtubeApiKey = keyData.youtube_key;

    switch (action) {
      case 'search':
        const searchResponse = await searchVideos(youtubeApiKey, query);
        return new Response(
          JSON.stringify(searchResponse),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
        
      case 'getVideoDetails':
        const videoDetails = await getVideoDetails(youtubeApiKey, videoId);
        return new Response(
          JSON.stringify(videoDetails),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );

      case 'getTranscript':
        const transcript = await getVideoTranscript(youtubeApiKey, videoId);
        return new Response(
          JSON.stringify({ transcript }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
        
      default:
        return new Response(
          JSON.stringify({ error: "Invalid action" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
  } catch (error) {
    console.error("Error in YouTube service:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// Function to search for videos
async function searchVideos(apiKey: string, query: string = "MRC Cameroun"): Promise<any> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&maxResults=10&type=video&key=${apiKey}`
    );
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium.url,
      publishedAt: item.snippet.publishedAt
    }));
  } catch (error) {
    console.error("Error searching videos:", error);
    throw error;
  }
}

// Function to get video details
async function getVideoDetails(apiKey: string, videoId: string): Promise<VideoDetails> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${apiKey}`
    );
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      throw new Error("Video not found");
    }
    
    const videoData = data.items[0];
    
    return {
      id: videoId,
      title: videoData.snippet.title,
      description: videoData.snippet.description,
      publishedAt: videoData.snippet.publishedAt,
      thumbnailUrl: videoData.snippet.thumbnails.high.url
    };
  } catch (error) {
    console.error("Error getting video details:", error);
    throw error;
  }
}

// Function to get video transcript (Note: This is a placeholder as YouTube API doesn't directly provide transcripts)
async function getVideoTranscript(apiKey: string, videoId: string): Promise<string> {
  // In a real implementation, you would need to use a third-party service or additional API
  // This is a placeholder that would need to be replaced with actual transcript retrieval
  return "Cette transcription est un exemple. Une intégration avec un service de transcription comme AssemblyAI serait nécessaire pour obtenir de vraies transcriptions.";
}
