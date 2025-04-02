
-- Create table for virtual meetings
CREATE TABLE IF NOT EXISTS public.virtual_meetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  duration TEXT NOT NULL,
  location TEXT NOT NULL,
  organizer TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('upcoming', 'completed')),
  attendees INTEGER NOT NULL DEFAULT 0,
  description TEXT,
  recording TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for training scenarios
CREATE TABLE IF NOT EXISTS public.training_scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  level INTEGER NOT NULL,
  image TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  locked BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_id UUID REFERENCES auth.users(id)
);

-- Functions for updating timestamps
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updating timestamp
DROP TRIGGER IF EXISTS update_virtual_meetings_timestamp ON public.virtual_meetings;
CREATE TRIGGER update_virtual_meetings_timestamp
BEFORE UPDATE ON public.virtual_meetings
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

DROP TRIGGER IF EXISTS update_training_scenarios_timestamp ON public.training_scenarios;
CREATE TRIGGER update_training_scenarios_timestamp
BEFORE UPDATE ON public.training_scenarios
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Enable RLS on tables
ALTER TABLE public.virtual_meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_scenarios ENABLE ROW LEVEL SECURITY;

-- Virtual meetings policies
CREATE POLICY "Virtual meetings are viewable by everyone"
ON public.virtual_meetings
FOR SELECT
TO public
USING (true);

-- Training scenarios policies
CREATE POLICY "Training scenarios are viewable by everyone"
ON public.training_scenarios
FOR SELECT
TO public
USING (true);

CREATE POLICY "Users can update their own training progress"
ON public.training_scenarios
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
