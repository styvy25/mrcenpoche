
-- Création de la table pdf_generation_logs pour les logs de génération
CREATE TABLE IF NOT EXISTS public.pdf_generation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users,
  template_id UUID NULL,
  generated_sections TEXT[] NULL,
  generation_status TEXT NOT NULL,
  error_details TEXT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Ajouter RLS pour la sécurité
ALTER TABLE public.pdf_generation_logs ENABLE ROW LEVEL SECURITY;

-- Créer politique pour permettre aux utilisateurs de voir leurs propres logs
CREATE POLICY "Users can view their own pdf generation logs" 
  ON public.pdf_generation_logs 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Créer politique pour permettre aux utilisateurs d'insérer leurs propres logs
CREATE POLICY "Users can insert their own pdf generation logs" 
  ON public.pdf_generation_logs 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);
