'use server'

import { createAdminClient } from '@/utils/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function inviteUser(formData: FormData) {
  const email = formData.get('email') as string
  const fullName = formData.get('full_name') as string
  const role = formData.get('role') as string || 'student'

  if (!email || !fullName) {
    return { error: 'Email and Full Name are required' }
  }

  const supabaseAdmin = createAdminClient()

  // 1. Invite the user
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
    data: { full_name: fullName },
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/login`
  })

  if (authError) {
    return { error: authError.message }
  }

  // 2. Pre-provision the profile with the correct role
  // Supabase Auth usually creates the profile via a trigger, but we want to ensure the role is set correctly immediately
  if (authData.user) {
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .update({ 
        full_name: fullName, 
        role: role,
        // If it's a student, we might want to set verification_status to 'none'
        verification_status: role === 'student' ? 'none' : null
      })
      .eq('id', authData.user.id)

    if (profileError) {
       // If update fails (maybe profile hasn't been created yet by trigger), we can try to upsert
       const { error: upsertError } = await supabaseAdmin
         .from('profiles')
         .upsert({
           id: authData.user.id,
           email: email,
           full_name: fullName,
           role: role,
           verification_status: role === 'student' ? 'none' : null
         })
       
       if (upsertError) return { error: 'User invited but profile role setup failed: ' + upsertError.message }
    }
  }

  revalidatePath('/admin/users')
  return { success: true }
}
