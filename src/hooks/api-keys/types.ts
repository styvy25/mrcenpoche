
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

// Add the Feature enum to be exported
export enum Feature {
  AI_CHAT = "aiChat",
  PDF_EXPORT = "pdfExport",
  VIDEO_ANALYSIS = "videoAnalysis",
  DOCUMENT_GENERATOR = "documentGenerator",
  PREMIUM_MODULES = "premiumModules",
  QUIZ_ACCESS = "quizAccess",
  FORUM_ACCESS = "forumAccess"
}

// Add PlanType if not existing
export type PlanType = "free" | "premium" | "enterprise";

