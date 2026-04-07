'use server'

import { createClient } from '@/utils/supabase/server'
import { createAdminClient } from '@/utils/supabase/admin'
import { revalidatePath } from 'next/cache'

async function ensureAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error('Unauthorized')
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
    
  if (profile?.role !== 'admin') {
    throw new Error('Permission denied: Administrator role required')
  }
}

export async function acceptStudent(registrationId: string) {
  await ensureAdmin()
  const supabase = createAdminClient()

  // 1. Get the registration details
  const { data: registration, error: fetchError } = await supabase
    .from('quiz_registrations')
    .select('*')
    .eq('id', registrationId)
    .single()

  if (fetchError || !registration) {
    throw new Error('Could not find registration')
  }

  // 2. Invite the user to the platform
  // Using the admission year from the current date
  const admissionYear = new Date().getFullYear()
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  
  const { data: inviteData, error: inviteError } = await supabase.auth.admin.inviteUserByEmail(
    registration.email,
    {
      redirectTo: `${siteUrl}/reset-password`,
      data: {
        full_name: registration.full_name,
        admission_year: admissionYear
      }
    }
  )

  if (inviteError) {
    throw new Error(`Invitation failed: ${inviteError.message}`)
  }

  // 3. Update the registration status
  const { error: updateError } = await supabase
    .from('quiz_registrations')
    .update({ status: 'accepted' })
    .eq('id', registrationId)

  if (updateError) {
    throw new Error('Status update failed')
  }

  revalidatePath('/admin/applications')
  revalidatePath('/admin/students')
  return { success: true }
}

export async function rejectStudent(registrationId: string) {
  await ensureAdmin()
  const supabase = createAdminClient()

  // Update the registration status to rejected
  const { error } = await supabase
    .from('quiz_registrations')
    .update({ status: 'rejected' })
    .eq('id', registrationId)

  if (error) {
    throw new Error('Rejection failed')
  }

  revalidatePath('/admin/applications')
  return { success: true }
}
