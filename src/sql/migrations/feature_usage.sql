
-- Create table for feature usage tracking
CREATE TABLE IF NOT EXISTS public.feature_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  feature TEXT NOT NULL,
  count INTEGER DEFAULT 1 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(user_id, feature)
);

-- Create index for faster lookups by user_id
CREATE INDEX IF NOT EXISTS idx_feature_usage_user_id ON public.feature_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_feature_usage_feature ON public.feature_usage(feature);

-- Create RLS policies
ALTER TABLE public.feature_usage ENABLE ROW LEVEL SECURITY;

-- Policy for selecting records
CREATE POLICY select_feature_usage ON public.feature_usage
FOR SELECT 
USING (
  auth.uid() = user_id OR
  auth.jwt() ->> 'role' = 'admin'
);

-- Policy for inserting records
CREATE POLICY insert_feature_usage ON public.feature_usage
FOR INSERT
WITH CHECK (
  auth.uid() = user_id
);

-- Policy for updating records
CREATE POLICY update_feature_usage ON public.feature_usage
FOR UPDATE
USING (
  auth.uid() = user_id
);

-- Trigger to update the updated_at column
CREATE TRIGGER update_feature_usage_updated_at
BEFORE UPDATE ON public.feature_usage
FOR EACH ROW
EXECUTE PROCEDURE public.update_updated_at_column();
