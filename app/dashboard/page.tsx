'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  FileText,
  GraduationCap,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  User,
  Zap,
  ShieldCheck,
  XCircle
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { format, formatDistanceToNow } from 'date-fns'

export default function StudentDashboard() {
  const [profile, setProfile] = useState<any>(null)
  const [stats, setStats] = useState<any[]>([])
  const [recentApps, setRecentApps] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // 1. Fetch Profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      setProfile(profileData)

      // 2. Fetch Applications (linked by email)
      const { data: applications } = await supabase
        .from('quiz_registrations')
        .select('id, school_name, created_at, status')
        .eq('email', user.email)
        .order('created_at', { ascending: false })

      if (applications) {
        setRecentApps(applications.slice(0, 5)) // Top 5 for overview
        
        const total = applications.length
        const approved = applications.filter(a => a.status === 'accepted').length
        const pending = applications.filter(a => a.status === 'pending').length

        setStats([
          { label: 'Total Applications', value: total.toString(), icon: FileText, color: 'text-primary-800', bg: 'bg-primary-100 dark:bg-primary-800/20' },
          { label: 'Scholarships Active', value: approved.toString(), icon: GraduationCap, color: 'text-primary-500', bg: 'bg-primary-50 dark:bg-primary-950/30' },
          { label: 'Pending Review', value: pending.toString(), icon: Clock, color: 'text-dark-gray', bg: 'bg-gray-100 dark:bg-gray-800/30' },
          { label: 'Approved', value: approved.toString(), icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
        ])
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) return <div className="p-8 text-primary-700/50">Loading Dashboard...</div>

  return (
    <div className="space-y-10">
      {/* Rejection Alert: Admission Letter */}
      {profile?.verification_status === 'rejected' && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 rounded-3xl bg-red-50 dark:bg-red-950/20 border-2 border-red-100 dark:border-red-900 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm"
        >
          <div className="flex items-center gap-4 text-center md:text-left text-red-600">
            <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
              <XCircle size={24} />
            </div>
            <div>
              <p className="text-lg font-bold uppercase tracking-tight">Verification Rejected</p>
              <p className="text-red-700/70 dark:text-red-400/70 text-sm font-medium italic underline underline-offset-4 decoration-red-200">
                {profile.verification_feedback || 'Your admission letter was not verified. Please re-upload a clear copy.'}
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/profile"
            className="px-6 py-2.5 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-all shrink-0 flex items-center gap-2 shadow-lg shadow-red-900/10"
          >
            Re-upload Now
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      )}

      {/* Pending Action: Admission Letter (Show only if status is none or pending) */}
      {(profile?.verification_status === 'none' || profile?.verification_status === 'pending') && !profile?.admission_letter_url && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-3xl bg-white dark:bg-primary-900/40 border-2 border-dashed border-primary-200 dark:border-primary-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm group hover:border-primary-400 transition-all cursor-pointer"
          onClick={() => router.push('/dashboard/profile')}
        >
          <div className="flex items-center gap-4 text-center md:text-left text-primary-800 dark:text-primary-300">
            <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-800/50 flex items-center justify-center group-hover:bg-primary-800 group-hover:text-white transition-all">
              <FileText size={24} className="group-hover:text-white transition-all" />
            </div>
            <div>
              <p className="text-lg font-bold text-primary-900 dark:text-white uppercase tracking-tight">Admission Letter Pending</p>
              <p className="text-primary-700/60 dark:text-primary-300/60 text-sm font-medium italic underline underline-offset-4 decoration-primary-200 decoration-1">Your official admission letter is missing. Please upload it to complete verification.</p>
            </div>
          </div>
          <Link
            href="/dashboard/profile"
            className="px-6 py-2.5 bg-primary-800 text-white rounded-xl font-bold text-sm hover:bg-primary-900 transition-all shrink-0 flex items-center gap-2 shadow-lg shadow-primary-900/10"
          >
            Upload Document
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      )}

      {/* Performance Request Alert */}
      {profile?.is_performance_requested && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 rounded-3xl bg-primary-800 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-primary-900/20 border border-primary-700"
        >
          <div className="flex items-center gap-4 text-white">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <Zap size={24} className="text-white animate-pulse" />
            </div>
            <div>
              <p className="text-lg font-bold uppercase tracking-tight">Performance Update Required</p>
              <p className="text-primary-100 text-sm opacity-80 font-medium italic underline underline-offset-4 decoration-primary-600">The administration has requested your latest academic records for review.</p>
            </div>
          </div>
          <Link
            href="/dashboard/performance"
            className="px-6 py-2.5 bg-white text-primary-900 rounded-xl font-bold text-sm hover:bg-primary-50 transition-all shrink-0 flex items-center gap-2"
          >
            Update now
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      )}

      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-primary-900 dark:text-white mb-2 uppercase tracking-tighter flex items-center gap-3">
            Welcome back, {profile?.full_name?.split(' ')[0] || 'Scholar'}!
            {profile?.verification_status === 'verified' && (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900 rounded-full text-[10px] font-black tracking-widest animate-in fade-in zoom-in duration-500">
                <ShieldCheck size={14} className="fill-emerald-500/10" />
                VERIFIED
              </span>
            )}
          </h1>
          <p className="text-primary-700/60 dark:text-primary-300/60 max-w-sm">Let&apos;s reach your academic goals today.</p>
        </div>
        <Link
          href="/dashboard/scholarships"
          className="flex items-center gap-2 px-6 py-3 bg-primary-800 hover:bg-primary-900 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-900/10"
        >
          Explore Scholarships
          <ArrowRight size={18} />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-3xl bg-white dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 shadow-sm"
            >
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4", stat.bg)}>
                <Icon size={24} className={stat.color} />
              </div>
              <div className="text-2xl font-bold text-primary-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-sm font-bold text-primary-700/50 dark:text-primary-300/50 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Applications */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-primary-900 dark:text-white">Recent Applications</h3>
            <Link href="/dashboard/applications" className="text-sm font-bold text-primary-800 hover:underline">View All</Link>
          </div>

          <div className="bg-white dark:bg-primary-900/20 rounded-3xl border border-primary-100 dark:border-primary-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-primary-100 dark:border-primary-800">
                    <th className="px-6 py-4 text-xs font-bold text-primary-700/50 dark:text-primary-300/50 uppercase tracking-widest">Scholarship</th>
                    <th className="px-6 py-4 text-xs font-bold text-primary-700/50 dark:text-primary-300/50 uppercase tracking-widest">Date Applied</th>
                    <th className="px-6 py-4 text-xs font-bold text-primary-700/50 dark:text-primary-300/50 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary-100 dark:divide-primary-800">
                  {recentApps.length > 0 ? (
                    recentApps.map((app) => (
                      <tr key={app.id} className="hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-bold text-primary-900 dark:text-white">{app.school_name}</p>
                          <p className="text-xs text-primary-700/50 dark:text-primary-300/50 font-medium">Application #{app.id.slice(0, 8).toUpperCase()}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-primary-700/70 dark:text-primary-300/70 font-medium">
                          {format(new Date(app.created_at), 'MMM dd, yyyy')}
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "px-3 py-1 text-xs font-bold rounded-full",
                            app.status === 'accepted' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' :
                            app.status === 'pending' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' :
                            'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                          )}>
                            {app.status === 'accepted' ? 'Approved' : app.status === 'pending' ? 'Pending' : 'Rejected'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link href="/dashboard/applications" className="p-2 hover:bg-primary-100 dark:hover:bg-primary-800 rounded-lg transition-all inline-block">
                            <ArrowRight size={18} className="text-primary-400" />
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center">
                        <p className="text-primary-700/50 font-medium italic">No recent applications found.</p>
                        <Link href="/dashboard/scholarships" className="text-primary-800 font-bold text-sm hover:underline mt-2 inline-block">Start an application &rarr;</Link>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Notifications / Alerts / Timeline */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-primary-900 dark:text-white">Timeline</h3>
          <div className="space-y-4">
            {recentApps.length > 0 ? (
              recentApps.map((app, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 shadow-sm relative overflow-hidden group">
                  <div className={cn(
                    "w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-110",
                    app.status === 'accepted' ? "bg-emerald-500" : "bg-primary-800"
                  )}>
                    {app.status === 'accepted' ? <CheckCircle2 size={18} /> : <FileText size={18} />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary-900 dark:text-white">
                      {app.status === 'accepted' ? 'Application Approved' : 'Application Submitted'}
                    </p>
                    <p className="text-xs text-primary-700/50 dark:text-primary-300/50 font-medium italic">
                      {formatDistanceToNow(new Date(app.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 shadow-sm">
                <div className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center bg-primary-100 text-primary-800">
                  <AlertCircle size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-primary-900 dark:text-white">Welcome to Bridget</p>
                  <p className="text-xs text-primary-700/50 dark:text-primary-300/50 font-medium italic">Just joined</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}
