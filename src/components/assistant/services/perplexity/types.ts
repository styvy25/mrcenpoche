
// Common types for Perplexity API interactions
export interface PerplexityMessage {
  role: string;
  content: string;
}

export interface PerplexityRequestOptions {
  model?: string;
  temperature?: number;
  max_tokens?: number;
  return_images?: boolean;
  return_related_questions?: boolean;
  search_domain_filter?: string[];
  search_recency_filter?: string;
  frequency_penalty?: number;
  presence_penalty?: number;
}

export interface PerplexityRequest {
  model: string;
  messages: PerplexityMessage[];
  temperature: number;
  max_tokens: number;
}
