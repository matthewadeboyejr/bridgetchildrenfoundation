'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  KeyRound, 
  Eye, 
  EyeOff, 
  Loader2, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isVerifying, setIsVerifying] = useState(true)

  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Check if the user is authenticated from the link
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setError('Invalid or expired invitation link. Please contact the administrator.')
      }
      setIsVerifying(false)
    }
    checkSession()
  }, [])

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password.length < 6) {
       setError('Password must be at least 6 characters long.')
       return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    const { error: updateError } = await supabase.auth.updateUser({
      password: password
    })

    if (updateError) {
      setError(updateError.message)
      setLoading(false)
    } else {
      // Fetch the role to determine the correct redirect
      const { data: { user } } = await supabase.auth.getUser()
      
      let redirectPath = '/dashboard'
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()
        
        if (profile?.role === 'admin') {
          redirectPath = '/admin'
        }
      }

      setSuccess(true)
      setTimeout(() => {
        router.push(redirectPath)
      }, 2000)
    }
  }

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-primary-50 dark:bg-primary-950 flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-4 text-center">
           <Loader2 className="w-12 h-12 text-primary-800 animate-spin" />
           <p className="text-sm font-bold text-primary-700/40 uppercase tracking-widest">Verifying Invitation...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary-50 dark:bg-primary-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-800 blur-[120px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary-500 blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/80 dark:bg-primary-900/80 backdrop-blur-2xl border border-white/20 dark:border-primary-800 rounded-[3rem] p-10 shadow-2xl space-y-8">
          <div className="text-center space-y-2">
            <div className="mx-auto w-20 h-20 rounded-3xl bg-primary-800 flex items-center justify-center text-white shadow-xl shadow-primary-900/20 mb-6">
               <ShieldCheck size={40} strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl font-black text-primary-900 dark:text-white tracking-widest uppercase mb-1">Set Your Password</h1>
            <p className="text-primary-700/60 dark:text-primary-300/60 text-sm font-medium">Welcome to Bridget Foundation! Please secure your account by choosing a password.</p>
          </div>

          {!success ? (
            <form onSubmit={handleSetPassword} className="space-y-6">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 rounded-2xl text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-tight text-center"
                >
                  {error}
                </motion.div>
              )}

              <div className="space-y-4">
                <div className="relative group">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400 group-focus-within:text-primary-800 transition-colors" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-white dark:bg-primary-950/50 border border-primary-100 dark:border-primary-800 rounded-2xl focus:ring-2 focus:ring-primary-800 outline-none text-sm transition-all"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-400 hover:text-primary-800 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <div className="relative group text-sm">
                   <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" size={20} />
                   <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white dark:bg-primary-950/50 border border-primary-100 dark:border-primary-800 rounded-2xl focus:ring-2 focus:ring-primary-800 outline-none text-sm transition-all"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary-800 text-white font-bold rounded-2xl shadow-xl shadow-primary-900/20 hover:bg-primary-900 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    Complete Registration
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                  </>
                )}
              </button>
            </form>
          ) : (
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="text-center py-6 space-y-4"
            >
               <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 mb-2">
                  <CheckCircle2 size={32} />
               </div>
               <h3 className="text-xl font-bold text-primary-900 dark:text-white uppercase tracking-tight">Account Secured!</h3>
               <p className="text-sm font-medium text-primary-700/60 dark:text-primary-300/60">Success! We are redirecting you to your dashboard.</p>
            </motion.div>
          )}

          <div className="pt-8 border-t border-primary-100 dark:border-primary-800 text-center">
            <p className="text-[10px] font-black text-primary-700/40 dark:text-primary-300/40 uppercase tracking-widest leading-loose">
              Bridget Foundation Scholarship Program <br /> 
              &copy; {new Date().getFullYear()} Security Protocol
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
