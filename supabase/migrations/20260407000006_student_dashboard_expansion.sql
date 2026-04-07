-- Migration 000006: Student Dashboard Expansion

-- 1. Enhance Profiles Table for Academic Tracking
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_performance_requested boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS performance_status text DEFAULT 'none' CHECK (performance_status IN ('none', 'requested', 'submitted', 'verified')),
ADD COLUMN IF NOT EXISTS admission_letter_url text,
ADD COLUMN IF NOT EXISTS cgpa_scale numeric DEFAULT 5.0;

-- 2. Create Performance Records Table
CREATE TABLE IF NOT EXISTS public.performance_records (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  level text NOT NULL, -- e.g. "100L", "200L"
  semester integer NOT NULL, -- 1 or 2
  courses jsonb NOT NULL DEFAULT '[]', -- Array of { code: string, title: string, grade: string, units: number }
  gpa numeric,
  cgpa numeric,
  scale numeric DEFAULT 5.0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  -- Prevent duplicate records for same level/semester for a student
  UNIQUE(student_id, level, semester)
);

-- 3. Enable RLS on Performance Records
ALTER TABLE public.performance_records ENABLE ROW LEVEL SECURITY;

-- Students can view/manage their own records
CREATE POLICY "Students can manage own records" ON public.performance_records
FOR ALL USING (auth.uid() = student_id);

-- Admins can view all records
CREATE POLICY "Admins can view all records" ON public.performance_records
FOR SELECT USING (public.is_admin());

-- 4. Storage Bucket Setup (Handled via Dashboard, but policy here)
-- Note: Assuming "student-documents" bucket is created.
-- Add policies for admission letters:
-- (Supabase Storage policies are distinct, but I'll add a reminder here)

-- 5. Helper Function for Performance Updates
CREATE OR REPLACE FUNCTION public.update_performance_status()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.profiles 
  SET performance_status = 'submitted', 
      is_performance_requested = false
  WHERE id = NEW.student_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_performance_submitted
  AFTER INSERT OR UPDATE ON public.performance_records
  FOR EACH ROW EXECUTE PROCEDURE public.update_performance_status();
