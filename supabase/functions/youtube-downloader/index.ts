
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.31.0'

interface DownloadRequest {
  videoId: string;
  title: string;
  userId?: string;
}

serve(async (req) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers })
  }

  try {
    const { videoId, title, userId } = await req.json() as DownloadRequest

    // Create a Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables')
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Create a download record in the database
    if (userId) {
      const { error } = await supabase
        .from('youtube_downloads')
        .insert({
          video_id: videoId,
          title: title,
          user_id: userId,
          status: 'completed',
          download_date: new Date().toISOString()
        })

      if (error) {
        console.error('Error logging download:', error)
      }
    }

    // In a real implementation, we would handle video downloading here
    // For demo purposes, we'll return a mocked response with a link to the YouTube thumbnail
    // which will simulate a successful download
    
    const downloadUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    
    return new Response(
      JSON.stringify({
        success: true,
        downloadUrl,
        message: 'Download completed successfully'
      }),
      {
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    console.error('Error processing request:', error)
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        status: 400,
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        }
      }
    )
  }
})
