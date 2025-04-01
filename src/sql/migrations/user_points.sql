
-- Create table for user points
CREATE TABLE IF NOT EXISTS user_points (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  points INTEGER DEFAULT 0 NOT NULL,
  level INTEGER DEFAULT 1 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(user_id)
);

-- Create index for faster lookups by user_id
CREATE INDEX IF NOT EXISTS idx_user_points_user_id ON user_points(user_id);

-- Create RLS policies
ALTER TABLE user_points ENABLE ROW LEVEL SECURITY;

-- Policy for selecting records
CREATE POLICY select_user_points ON user_points
FOR SELECT 
USING (
  auth.uid() = user_id OR
  auth.jwt() ->> 'role' = 'admin'
);

-- Policy for inserting records
CREATE POLICY insert_user_points ON user_points
FOR INSERT
WITH CHECK (
  auth.uid() = user_id
);

-- Policy for updating records
CREATE POLICY update_user_points ON user_points
FOR UPDATE
USING (
  auth.uid() = user_id
);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update the updated_at column
CREATE TRIGGER update_user_points_updated_at
BEFORE UPDATE ON user_points
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();
