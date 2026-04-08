'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

const TIMEOUT_MS = 10 * 60 * 1000 // 10 minutes in milliseconds

export function IdleTimeout() {
  const router = useRouter()
  const supabase = createClient()
  const [lastActivity, setLastActivity] = useState<number>(Date.now())

  useEffect(() => {
    // Only track once mounted in browser
    setLastActivity(Date.now())

    const updateActivity = () => {
      setLastActivity(Date.now())
    }

    // List of events to monitor for user activity
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart']

    events.forEach(event => {
      window.addEventListener(event, updateActivity, { passive: true })
    })

    const interval = setInterval(async () => {
      const isIdle = Date.now() - lastActivity > TIMEOUT_MS
      if (isIdle) {
        // User has been idle for too long, verify they are logged in before signing out
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          await supabase.auth.signOut()
          router.push('/login?message=Your session has expired due to inactivity.')
        }
      }
    }, 60000) // Check every minute

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, updateActivity)
      })
      clearInterval(interval)
    }
  }, [lastActivity, router, supabase])

  return null // Render nothing, purely background logic
}
