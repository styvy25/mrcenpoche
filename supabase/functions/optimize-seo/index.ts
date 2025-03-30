
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.31.0'
import { JSDOM } from 'https://esm.sh/jsdom@22.1.0'
import { extract } from 'https://esm.sh/article-parser@7.0.0'

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
    // Get the request body
    const { action, url } = await req.json()
    console.log(`Received request for action: ${action}, url: ${url}`)

    // Check if the URL exists in the scrape log
    const { data: logData, error: logError } = await supabaseClient
      .from('scrape_log')
      .select('*')
      .eq('url', url)
      .single()

    if (logError && logError.code !== 'PGRST116') {
      throw new Error(`Error checking scrape log: ${logError.message}`)
    }

    // If we've already scraped this URL and it was successful, return the existing data
    if (logData && logData.status === 'success') {
      console.log(`URL ${url} already scraped, returning cached data`)
      return new Response(
        JSON.stringify({ message: 'URL already scraped', data: logData }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Log the scraping attempt
    await supabaseClient
      .from('scrape_log')
      .upsert({ url, status: 'processing' })

    if (action === 'scrape_website') {
      const content = await scrapeWebsite(url)
      return new Response(
        JSON.stringify({ success: true, data: content }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } else if (action === 'analyze_pdf') {
      const metadata = await analyzePDF(url)
      return new Response(
        JSON.stringify({ success: true, data: metadata }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } else if (action === 'generate_seo') {
      const seo = await generateSEO(url)
      return new Response(
        JSON.stringify({ success: true, data: seo }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } else {
      throw new Error(`Unknown action: ${action}`)
    }
  } catch (error) {
    console.error(`Error in optimize-seo function:`, error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

async function scrapeWebsite(url: string) {
  try {
    console.log(`Scraping website: ${url}`)
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`)
    }
    
    const html = await response.text()
    const dom = new JSDOM(html)
    const document = dom.window.document
    
    // Extract main content, this might need adjustment based on the website structure
    const title = document.querySelector('title')?.textContent || 'No title found'
    const article = await extract(url)
    
    // Get all links to PDF files
    const pdfLinks = Array.from(document.querySelectorAll('a'))
      .filter(a => a.href && a.href.toLowerCase().endsWith('.pdf'))
      .map(a => ({
        url: new URL(a.href, url).href,
        text: a.textContent?.trim() || 'PDF Document'
      }))
    
    // Store the content in the database
    const { data, error } = await supabaseClient
      .from('mrc_content')
      .insert({
        title,
        content: article?.content || document.body.textContent || '',
        content_type: 'webpage',
        url,
        source: 'scrape',
        publication_date: new Date().toISOString().split('T')[0],
        keywords: extractKeywords(article?.content || document.body.textContent || ''),
        category: guessCategory(title, article?.content || document.body.textContent || '')
      })
      .select()
      .single()
    
    if (error) {
      throw new Error(`Error storing content: ${error.message}`)
    }
    
    // Update the scrape log
    await supabaseClient
      .from('scrape_log')
      .update({ status: 'success' })
      .eq('url', url)
    
    return { data, pdfLinks }
  } catch (error) {
    // Log the error
    await supabaseClient
      .from('scrape_log')
      .update({ 
        status: 'error',
        error_message: error.message
      })
      .eq('url', url)
    
    throw error
  }
}

async function analyzePDF(url: string) {
  try {
    console.log(`Analyzing PDF: ${url}`)
    // Here you would use a PDF parsing library to extract text and metadata
    // For this example, we'll just create a placeholder
    
    const filename = url.split('/').pop() || 'document.pdf'
    const title = filename.replace('.pdf', '').replace(/-|_/g, ' ')
    
    // Store the PDF metadata in the database
    const { data, error } = await supabaseClient
      .from('pdf_documents')
      .insert({
        title,
        description: `PDF document from ${url}`,
        file_url: url,
        document_type: 'legal_text',
        author: 'Unknown',
        publication_date: new Date().toISOString().split('T')[0],
        keywords: extractKeywords(title),
        category: guessCategory(title, ''),
        is_legal_text: true,
        is_mrc_document: url.includes('mrcparty.net')
      })
      .select()
      .single()
    
    if (error) {
      throw new Error(`Error storing PDF metadata: ${error.message}`)
    }
    
    // Update the scrape log
    await supabaseClient
      .from('scrape_log')
      .update({ status: 'success' })
      .eq('url', url)
    
    return data
  } catch (error) {
    // Log the error
    await supabaseClient
      .from('scrape_log')
      .update({ 
        status: 'error',
        error_message: error.message
      })
      .eq('url', url)
    
    throw error
  }
}

async function generateSEO(url: string) {
  try {
    console.log(`Generating SEO for: ${url}`)
    
    let contentId = null
    let pdfId = null
    let content = null
    
    // Check if it's a PDF URL
    if (url.toLowerCase().endsWith('.pdf')) {
      const { data, error } = await supabaseClient
        .from('pdf_documents')
        .select('*')
        .eq('file_url', url)
        .single()
      
      if (error) {
        throw new Error(`Error finding PDF document: ${error.message}`)
      }
      
      pdfId = data.id
      content = {
        title: data.title,
        description: data.description,
        keywords: data.keywords
      }
    } else {
      const { data, error } = await supabaseClient
        .from('mrc_content')
        .select('*')
        .eq('url', url)
        .single()
      
      if (error) {
        throw new Error(`Error finding content: ${error.message}`)
      }
      
      contentId = data.id
      content = {
        title: data.title,
        content: data.content,
        keywords: data.keywords
      }
    }
    
    // Generate metadata
    const metaTitle = content.title
    const metaDescription = content.description || truncate(content.content, 160)
    
    // Store SEO metadata
    const { data, error } = await supabaseClient
      .from('seo_metadata')
      .insert({
        content_id: contentId,
        pdf_id: pdfId,
        meta_title: metaTitle,
        meta_description: metaDescription,
        canonical_url: url,
        og_title: metaTitle,
        og_description: metaDescription,
        twitter_title: metaTitle,
        twitter_description: metaDescription,
        structured_data: JSON.stringify({
          "@context": "https://schema.org",
          "@type": pdfId ? "DigitalDocument" : "WebPage",
          "name": metaTitle,
          "description": metaDescription,
          "url": url
        })
      })
      .select()
      .single()
    
    if (error) {
      throw new Error(`Error storing SEO metadata: ${error.message}`)
    }
    
    return data
  } catch (error) {
    console.error(`Error generating SEO:`, error)
    throw error
  }
}

// Helper functions
function extractKeywords(text: string): string[] {
  if (!text) return []
  
  // This is a simple keyword extraction
  // In a real implementation, you would use NLP techniques
  const words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/)
  const wordCount = {}
  
  words.forEach(word => {
    if (word.length > 3 && !['avec', 'pour', 'dans', 'cette', 'votre', 'notre'].includes(word)) {
      wordCount[word] = (wordCount[word] || 0) + 1
    }
  })
  
  return Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(entry => entry[0])
}

function guessCategory(title: string, content: string): string {
  const text = (title + ' ' + content).toLowerCase()
  
  if (text.includes('élection') || text.includes('vote') || text.includes('scrutin')) {
    return 'elections'
  }
  if (text.includes('loi') || text.includes('code') || text.includes('juridique')) {
    return 'legal'
  }
  if (text.includes('parti') || text.includes('politique') || text.includes('dirigeant')) {
    return 'politics'
  }
  
  return 'general'
}

function truncate(text: string, maxLength: number): string {
  if (!text) return ''
  if (text.length <= maxLength) return text
  
  return text.substring(0, maxLength - 3) + '...'
}
