
export enum Feature {
  PDF_EXPORT = "PDF_EXPORT",
  AI_CHAT = "AI_CHAT",
  VIDEO_ANALYSIS = "VIDEO_ANALYSIS",
  PREMIUM_MODULES = "PREMIUM_MODULES"
}

export interface ApiKeys {
  perplexity?: string;
  youtube?: string;
  stripe?: string;
}

export interface ApiKeyStatus {
  perplexity: boolean;
  youtube: boolean;
  stripe: boolean;
}

export interface ApiKeysStorage {
  api_keys: ApiKeys;
}
