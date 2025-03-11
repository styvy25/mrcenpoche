
// API Key related types
export interface ApiKeyStatus {
  perplexity: boolean;
  youtube: boolean;
  stripe: boolean;
}

export interface ApiKeys {
  perplexity: string;
  youtube: string;
  stripe: string;
}
