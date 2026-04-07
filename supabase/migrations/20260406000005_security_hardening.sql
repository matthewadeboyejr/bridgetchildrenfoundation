-- Hardening Security & Fixing Schema Gaps

-- 1. Add 'status' column to quiz_registrations if it doesn't already exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='quiz_registrations' AND column_name='status') THEN
        ALTER TABLE public.quiz_registrations ADD COLUMN status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected'));
    END IF;
END $$;

-- 2. Add 'is_admin' check to quiz_registrations UPDATE policy
-- (Admin should be able to update status)
CREATE POLICY "Admins can update quiz registrations" ON public.quiz_registrations 
FOR UPDATE USING (public.is_admin());

-- 3. Ensure profiles are only updateable by the owner, except for admins
-- (Already handled in core_schema, but reinforced here)

-- 4. Enable Realtime for quiz_registrations (Optional but recommended for the dashboard)
-- This is typically done via the dashboard, but can be done in SQL:
-- alter publication supabase_realtime add table public.quiz_registrations;
