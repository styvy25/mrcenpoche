
import { Json } from "@/integrations/supabase/types";

export interface PDFDocument {
  id: string;
  title: string;
  document_type: string;
  pdf_url: string;
  content: Json;
  status: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  file_url?: string;
  indexed?: boolean;
}

export interface CertificateProps {
  moduleName: string;
  completionDate: Date;
  userName?: string;
}
