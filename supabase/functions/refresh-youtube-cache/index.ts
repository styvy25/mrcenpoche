
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

interface RequestBody {
  apiKey: string;
}

interface VideoInfo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
}

// Function to fetch popular MRC videos
async function fetchMRCVideos(apiKey: string): Promise<VideoInfo[]> {
  try {
    // Search for recent MRC videos
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=MRC+Cameroun&type=video&maxResults=10&relevanceLanguage=fr&key=${apiKey}`;
    const searchResponse = await fetch(searchUrl);
    
    if (!searchResponse.ok) {
      throw new Error(`YouTube API error: ${searchResponse.status}`);
    }
    
    const searchData = await searchResponse.json();
    
    if (!searchData.items || searchData.items.length === 0) {
      return [];
    }
    
    // Extract video information
    return searchData.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
      publishedAt: item.snippet.publishedAt
    }));
  } catch (error) {
    console.error("Error fetching MRC videos:", error);
    throw error;
  }
}

// Function to store videos in Supabase cache
async function storeVideosInCache(supabaseClient: any, videos: VideoInfo[]) {
  try {
    // Get existing videos to avoid duplicates
    const { data: existingVideos } = await supabaseClient
      .from('youtube_cache')
      .select('video_id');
    
    const existingIds = existingVideos ? existingVideos.map((v: any) => v.video_id) : [];
    
    // Filter out videos that already exist
    const newVideos = videos.filter(video => !existingIds.includes(video.id));
    
    if (newVideos.length === 0) {
      return { added: 0 };
    }
    
    // Insert new videos
    const { data, error } = await supabaseClient
      .from('youtube_cache')
      .insert(newVideos.map(video => ({
        video_id: video.id,
        title: video.title,
        description: video.description,
        thumbnail_url: video.thumbnail,
        published_at: video.publishedAt,
        cached_at: new Date().toISOString()
      })));
    
    if (error) {
      throw error;
    }
    
    return { added: newVideos.length };
  } catch (error) {
    console.error("Error storing videos in cache:", error);
    throw error;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );
    
    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized', message: 'User not authenticated' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { apiKey } = await req.json() as RequestBody;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'Missing API key' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log("Starting YouTube cache refresh...");
    
    // Fetch MRC videos from YouTube
    const videos = await fetchMRCVideos(apiKey);
    console.log(`Found ${videos.length} MRC videos on YouTube`);
    
    // Store videos in Supabase cache
    const cacheResult = await storeVideosInCache(supabaseClient, videos);
    console.log(`Added ${cacheResult.added} new videos to cache`);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'YouTube cache refreshed successfully',
        stats: {
          videosFound: videos.length,
          videosAdded: cacheResult.added
        }
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (err) {
    console.error("Error in YouTube cache refresh:", err);
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
