
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
  text?: string; // Make text optional to reconcile Message types
  senderName?: string;
  senderAvatar?: string;
  senderId?: string;
  mediaUrl?: string;
  mediaType?: 'photo' | 'audio' | 'video' | 'file';
  media?: {
    type: 'image' | 'audio' | 'video' | 'file';
    url: string;
    name?: string;
  };
};

export enum PlanType {
  FREE = 'free',
  PREMIUM = 'premium'
}

// Ensure Feature is properly exported
export enum Feature {
  PDF_GENERATION = 'pdfGeneration',
  YOUTUBE_ANALYSIS = 'youtubeAnalysis',
  AI_CHAT = 'aiChat',
  PREMIUM_MODULES = 'premiumModules',
  MAX_CHATS = 'maxChats',
  VOICE_MESSAGES = 'voiceMessages',
  ATTACHMENTS = 'attachments',
  CHAT = 'chat',
  PDF_EXPORT = 'pdfExport' // Add missing PDF_EXPORT feature
}

export type VideoAnalysisResult = {
  success: boolean;
  title?: string;
  summary?: string;
  keyPoints?: string[];
  transcript?: string;
  error?: string;
  videoId?: string; // Add videoId property to fix YouTubeAnalysisPDF error
  analysis?: string; // Add analysis property
};

export type PdfGenerationOptions = {
  includeTranscript?: boolean;
  includeSummary?: boolean;
  includeKeyPoints?: boolean;
};
