-- Fix RLS for quiz_registrations to allow students to see their own status
-- This allows the Applications page in the student dashboard to correctly filter and show accepted/pending records.

CREATE POLICY "Students can view own registration" ON public.quiz_registrations 
  FOR SELECT 
  USING (
    (auth.jwt() ->> 'email' = email)
  );

-- Optional: Ensure index on email for performance as this will be a frequent check
CREATE INDEX IF NOT EXISTS idx_quiz_registrations_email ON public.quiz_registrations(email);
