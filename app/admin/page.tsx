'use client'

import { createClient } from '@/utils/supabase/client'
import { acceptStudent, rejectStudent } from '@/app/actions/admin'
import {
  Users,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  FileCheck,
  GraduationCap,
  ArrowRight
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'


export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    accepted: 0,
    pending: 0,
  })
  const [recentRegistrations, setRecentRegistrations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [processingId, setProcessingId] = useState<string | null>(null)

  const supabase = createClient()

  const fetchDashboardData = async () => {
    setLoading(true)

    // 1. Total Count
    const { count: total } = await supabase
      .from('quiz_registrations')
      .select('*', { count: 'exact', head: true })

    // 2. Accepted Count
    const { count: accepted } = await supabase
      .from('quiz_registrations')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'accepted')

    // 3. Pending Count
    const { count: pending } = await supabase
      .from('quiz_registrations')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending')

    setStats({
      total: total || 0,
      accepted: accepted || 0,
      pending: pending || 0,
    })

    // 4. Recent Registrations (top 5)
    const { data: recent } = await supabase
      .from('quiz_registrations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)

    if (recent) setRecentRegistrations(recent)
    setLoading(false)
  }

  useEffect(() => {
    fetchDashboardData()

    // 5. Setup Real-time Subscription
    const channel = supabase
      .channel('admin-overview-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen for ALL events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'quiz_registrations'
        },
        (payload) => {
          // Whenever a change happens, re-fetch the dashboard data to keep counts accurate
          fetchDashboardData()
        }
      )
      .subscribe()

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const handleAction = async (id: string, action: 'accept' | 'reject') => {
    setProcessingId(id)
    try {
      if (action === 'accept') await acceptStudent(id)
      else await rejectStudent(id)
      await fetchDashboardData()
    } catch (err: any) {
      alert(err.message)
    } finally {
      setProcessingId(null)
    }
  }

  const adminStatsCards = [
    { label: 'Total Quiz Registrations', value: stats.total.toLocaleString(), icon: Users, color: 'text-primary-800', bg: 'bg-primary-100 dark:bg-primary-800/30' },
    { label: 'Verified Students', value: stats.accepted.toLocaleString(), icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
    { label: 'Pending Reviews', value: stats.pending.toLocaleString(), icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/30' },
    { label: 'Eligible for Phase 2', value: stats.accepted.toLocaleString(), icon: TrendingUp, color: 'text-primary-500', bg: 'bg-primary-50 dark:bg-primary-950/30' },
  ]

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-primary-900 dark:text-white mb-2 uppercase tracking-tighter">Admin Overview</h1>
        <p className="text-primary-700/60 dark:text-primary-300/60">Monitor and manage quiz registrations and candidate progress in real-time.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStatsCards.map((stat, index) => {
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
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-primary-900 dark:text-white">Recent Quiz Registrations</h3>
            <Link href="/admin/applications" className="text-sm font-bold text-primary-800 hover:underline">View All Registrants</Link>
          </div>

          <div className="bg-white dark:bg-primary-900/20 rounded-3xl border border-primary-100 dark:border-primary-800 overflow-hidden shadow-sm min-h-[300px]">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-primary-100 dark:border-primary-800">
                  <th className="px-6 py-4 text-xs font-bold text-primary-700/50 dark:text-primary-300/50 uppercase tracking-widest">Student</th>
                  <th className="px-6 py-4 text-xs font-bold text-primary-700/50 dark:text-primary-300/50 uppercase tracking-widest">School</th>
                  <th className="px-6 py-4 text-xs font-bold text-primary-700/50 dark:text-primary-300/50 uppercase tracking-widest">Class</th>
                  <th className="px-6 py-4 text-xs font-bold text-primary-700/50 dark:text-primary-300/50 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-100 dark:divide-primary-800 text-sm">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-20 text-center text-primary-500 font-bold uppercase tracking-widest animate-pulse">Loading Feed...</td>
                  </tr>
                ) : recentRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-20 text-center text-primary-500/40 font-bold uppercase tracking-widest">No Recent Registrations</td>
                  </tr>
                ) : recentRegistrations.map((row, i) => (
                  <tr key={row.id} className="hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-800 flex items-center justify-center text-xs font-bold text-primary-800">
                          {row.full_name.charAt(0)}
                        </div>
                        <span className="font-bold text-primary-900 dark:text-white uppercase tracking-tight">{row.full_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-primary-700/70 dark:text-primary-300/70 font-medium">{row.school_name}</td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-black text-primary-800 uppercase tracking-widest bg-primary-50 dark:bg-primary-950 px-2 py-0.5 rounded border border-primary-100 dark:border-primary-800">{row.current_class}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {processingId === row.id ? (
                          <div className="w-5 h-5 border-2 border-primary-800 border-t-transparent rounded-full animate-spin" />
                        ) : row.status === 'pending' ? (
                          <>
                            <button onClick={() => handleAction(row.id, 'accept')} className="p-2 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-emerald-600 rounded-lg transition-all"><CheckCircle2 size={16} /></button>
                            <button onClick={() => handleAction(row.id, 'reject')} className="p-2 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 rounded-lg transition-all"><XCircle size={16} /></button>
                          </>
                        ) : (
                          <span className={cn(
                            "text-[10px] font-black uppercase px-2 py-1 rounded-md",
                            row.status === 'accepted' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                          )}>{row.status}</span>
                        )}
                        <Link href={`/admin/applications`} className="p-2 hover:bg-primary-100 dark:hover:bg-primary-800 rounded-lg transition-all"><ArrowRight size={16} /></Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Mini Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-primary-900 dark:text-white">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-4">
            <button className="p-4 rounded-2xl bg-primary-800 text-white font-bold hover:bg-primary-900 hover:shadow-xl hover:shadow-primary-900/20 transition-all flex items-center justify-between group">
              <span>Post New Scholarship</span>
              <GraduationCap className="group-hover:rotate-12 transition-transform" />
            </button>
            <button className="p-4 rounded-2xl bg-white dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 text-primary-900 dark:text-white font-bold hover:bg-primary-50 transition-all flex items-center justify-between">
              <span>Export All Data (CSV)</span>
              <FileCheck className="text-primary-400" />
            </button>
          </div>

          <div className="p-6 bg-primary-800 rounded-4xl text-white shadow-xl shadow-primary-900/10">
            <h4 className="font-bold mb-2">Selection Phase 1 Ends In:</h4>
            <div className="text-3xl font-black mb-4 tracking-tighter">04:12:30:15</div>
            <p className="text-primary-100/70 text-xs font-medium uppercase tracking-widest">Days : Hours : Mins : Secs</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}
