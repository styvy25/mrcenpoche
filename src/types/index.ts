
export type User = {
  id: string;
  email: string;
  subscription?: {
    plan: 'free' | 'premium';
    features: string[];
  };
};

export type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
  sender?: string;
  read?: boolean;
};

export enum PlanType {
  FREE = 'free',
  PREMIUM = 'premium'
}

export enum Feature {
  PDF_GENERATION = 'pdfGeneration',
  YOUTUBE_ANALYSIS = 'youtubeAnalysis',
  AI_CHAT = 'aiChat',
  PREMIUM_MODULES = 'premiumModules',
  MAX_CHATS = 'maxChats',
  VOICE_MESSAGES = 'voiceMessages',
  ATTACHMENTS = 'attachments',
  CHAT = 'chat'
}

export type VideoAnalysisResult = {
  success: boolean;
  title?: string;
  summary?: string;
  keyPoints?: string[];
  transcript?: string;
  error?: string;
};

export type PdfGenerationOptions = {
  includeTranscript?: boolean;
  includeSummary?: boolean;
  includeKeyPoints?: boolean;
};
