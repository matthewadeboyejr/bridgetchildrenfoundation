-- Migration 000008: Student Verification System

-- 1. Enhance Profiles Table for Verification Tracking
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS verification_status text DEFAULT 'none' CHECK (verification_status IN ('none', 'pending', 'submitted', 'verified', 'rejected')),
ADD COLUMN IF NOT EXISTS verification_feedback text,
ADD COLUMN IF NOT EXISTS admission_year text;

-- 2. Update existing profiles
-- (Optional: set status to 'pending' if they have an admission letter but no status)
UPDATE public.profiles 
SET verification_status = 'submitted' 
WHERE admission_letter_url IS NOT NULL AND verification_status = 'none';

UPDATE public.profiles 
SET verification_status = 'pending' 
WHERE admission_letter_url IS NULL AND verification_status = 'none';
