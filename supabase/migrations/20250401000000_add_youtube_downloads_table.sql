
-- Create table for storing YouTube download records
CREATE TABLE IF NOT EXISTS youtube_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id TEXT NOT NULL,
  title TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  status TEXT NOT NULL DEFAULT 'pending',
  download_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add Row Level Security policies
ALTER TABLE youtube_downloads ENABLE ROW LEVEL SECURITY;

-- Allow users to view only their own downloads
CREATE POLICY "Users can view their own downloads" 
  ON youtube_downloads 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Allow users to insert their own downloads
CREATE POLICY "Users can add their own downloads" 
  ON youtube_downloads 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Allow service role and authenticated users to insert records
CREATE POLICY "Service can add download records for any user" 
  ON youtube_downloads 
  FOR INSERT 
  TO service_role 
  WITH CHECK (true);
