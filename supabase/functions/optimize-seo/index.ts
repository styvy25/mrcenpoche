
// supabase/functions/optimize-seo/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

interface SEOOptimizationRequest {
  content: string;
  type: 'title' | 'description' | 'keywords' | 'content';
  targetPage?: string;
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

    if (userError) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized', message: 'User not authenticated' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { content, type, targetPage } = await req.json() as SEOOptimizationRequest;
    
    if (!content || !type) {
      return new Response(
        JSON.stringify({ error: 'Invalid request', message: 'Content and type are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Basic SEO optimization logic
    let optimizedContent = content;
    
    // Add keyword density improvement
    if (type === 'content') {
      // Basic word frequency analysis to identify potential keywords
      const words = content.toLowerCase().match(/\b\w{3,}\b/g) || [];
      const wordCount: Record<string, number> = {};
      
      words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
      });
      
      // Sort words by frequency
      const sortedWords = Object.entries(wordCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(entry => entry[0]);
      
      // Store these keywords for future reference
      if (user) {
        await supabaseClient
          .from('seo_optimizations')
          .upsert({
            user_id: user.id,
            page: targetPage || 'general',
            keywords: sortedWords,
            last_updated: new Date().toISOString()
          }, { onConflict: 'user_id, page' });
      }
      
      // Return optimized content with keyword information
      return new Response(
        JSON.stringify({
          success: true,
          optimizedContent,
          keywords: sortedWords,
          suggestions: [
            "Consider using these keywords in your headings",
            "Add these keywords to image alt texts",
            "Ensure these keywords appear in the first paragraph"
          ]
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Title optimization
    if (type === 'title') {
      // Ensure title length is optimal (50-60 characters)
      if (optimizedContent.length < 30) {
        return new Response(
          JSON.stringify({
            success: true,
            optimizedContent,
            suggestions: ["Consider making your title longer (50-60 characters is ideal)"]
          }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      } else if (optimizedContent.length > 60) {
        return new Response(
          JSON.stringify({
            success: true,
            optimizedContent: optimizedContent.substring(0, 57) + '...',
            suggestions: ["Your title is too long. We've shortened it to 60 characters."]
          }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      }
    }
    
    // Description optimization
    if (type === 'description') {
      // Ensure description length is optimal (150-160 characters)
      if (optimizedContent.length < 120) {
        return new Response(
          JSON.stringify({
            success: true,
            optimizedContent,
            suggestions: ["Consider making your description longer (150-160 characters is ideal)"]
          }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      } else if (optimizedContent.length > 160) {
        return new Response(
          JSON.stringify({
            success: true,
            optimizedContent: optimizedContent.substring(0, 157) + '...',
            suggestions: ["Your description is too long. We've shortened it to 160 characters."]
          }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        optimizedContent,
        suggestions: []
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
