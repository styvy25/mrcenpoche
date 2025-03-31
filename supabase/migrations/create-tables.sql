
-- Créer la table pour le journal des analyses
CREATE TABLE IF NOT EXISTS public.scrape_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('success', 'error', 'processing')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  error_message TEXT
);

-- Activer la sécurité au niveau des lignes
ALTER TABLE public.scrape_log ENABLE ROW LEVEL SECURITY;

-- Créer une politique pour permettre à tous les utilisateurs de lire les journaux
CREATE POLICY "Allow public read access to scrape logs" ON public.scrape_log
  FOR SELECT
  USING (true);

-- Créer une politique pour permettre aux utilisateurs authentifiés d'insérer des journaux
CREATE POLICY "Allow authenticated users to insert scrape logs" ON public.scrape_log
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Créer la table pour les métadonnées SEO
CREATE TABLE IF NOT EXISTS public.seo_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID REFERENCES public.mrc_content(id),
  pdf_id UUID REFERENCES public.pdf_documents(id),
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  canonical_url TEXT NOT NULL,
  og_title TEXT,
  og_description TEXT,
  twitter_title TEXT,
  twitter_description TEXT,
  structured_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Activer la sécurité au niveau des lignes
ALTER TABLE public.seo_metadata ENABLE ROW LEVEL SECURITY;

-- Créer une politique pour permettre à tous les utilisateurs de lire les métadonnées
CREATE POLICY "Allow public read access to SEO metadata" ON public.seo_metadata
  FOR SELECT
  USING (true);

-- Créer une politique pour permettre aux utilisateurs authentifiés d'insérer des métadonnées
CREATE POLICY "Allow authenticated users to insert SEO metadata" ON public.seo_metadata
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');
