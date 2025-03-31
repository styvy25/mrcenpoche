
export interface PdfGenerationLog {
  id: string;
  user_id: string;
  template_id: string | null;
  generated_sections: string[] | null;
  generation_status: 'processing' | 'completed' | 'error';
  error_details: string | null;
  created_at: string;
}

export interface PdfDocument {
  id: string;
  title: string;
  file_url: string | null;
  document_type: string;
  created_at: string;
  indexed: boolean;
}

export type PdfGenerationOptions = {
  videoId?: string;
  title: string;
  analysis?: string;
  templateId?: string;
};
