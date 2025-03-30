
export interface ApiKeys {
  perplexity: string;
  youtube: string;
  stripe: string;
}

export interface ApiKeyStatus {
  perplexity: boolean;
  youtube: boolean;
  stripe: boolean;
}

export enum Feature {
  // Chat features
  CHAT = "chat",
  MAX_CHATS = "maxChats",
  VOICE_MESSAGES = "voiceMessages",
  ATTACHMENTS = "attachments",
  
  // Document features
  PDF_EXPORT = "pdfExport",
  CERTIFICATE = "certificate",
  
  // Analysis features
  YOUTUBE_ANALYSIS = "youtubeAnalysis",
  AI_ASSISTANT = "aiAssistant",
  
  // Premium features
  PREMIUM_MODULES = "premiumModules",
  PREMIUM_QUIZZES = "premiumQuizzes"
}

export enum Plan {
  FREE = "free",
  BASIC = "basic",
  PREMIUM = "premium"
}
