
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.31.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Create a Supabase client with the Auth context of the function
const supabaseClient = createClient(
  // Supabase API URL - env var exported by default.
  Deno.env.get('SUPABASE_URL') ?? '',
  // Supabase API ANON KEY - env var exported by default.
  Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  // Create client with Auth context of the function
  {
    global: {
      headers: { Authorization: `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}` },
    },
  }
)

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { userId, content, options } = await req.json()
    console.log(`Processing PDF optimization for user: ${userId}`)

    // Log the processing
    const { data: logData, error: logError } = await supabaseClient
      .from('pdf_generation_logs')
      .insert({
        user_id: userId,
        generation_status: 'processing',
        template_id: options?.templateId || null
      })
      .select()
      .single()

    if (logError) {
      throw new Error(`Error logging PDF generation: ${logError.message}`)
    }

    // Check if user can generate PDF using our database function
    const { data: canGenerate, error: generateError } = await supabaseClient.rpc(
      'can_generate_pdf',
      { user_id: userId }
    )

    if (generateError) {
      throw new Error(`Error checking PDF generation limits: ${generateError.message}`)
    }

    if (!canGenerate) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Limite de génération de PDF atteinte. Passez à Premium pour plus.' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 403
        }
      )
    }

    // Record the PDF generation
    const { data: incrementResult, error: incrementError } = await supabaseClient.rpc(
      'increment_pdf_generations',
      { user_id: userId }
    )

    if (incrementError) {
      console.error('Error incrementing PDF generation count:', incrementError)
    }

    // This could be expanded to actually optimize the PDF content
    // For now, we'll just return success
    return new Response(
      JSON.stringify({ 
        success: true,
        data: {
          logId: logData.id,
          timestamp: new Date().toISOString(),
          optimizedContent: content
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error(`Error in optimize-pdf function:`, error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
