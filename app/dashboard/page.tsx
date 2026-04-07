'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  GraduationCap, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  User
} from 'lucide-react'
import Link from 'next/link'

const stats = [
  { label: 'Total Applications', value: '1', icon: FileText, color: 'text-primary-800', bg: 'bg-primary-100 dark:bg-primary-800/20' },
  { label: 'Scholarships Active', value: '0', icon: GraduationCap, color: 'text-primary-500', bg: 'bg-primary-50 dark:bg-primary-950/30' },
  { label: 'Pending Review', value: '1', icon: Clock, color: 'text-dark-gray', bg: 'bg-gray-100 dark:bg-gray-800/30' },
  { label: 'Approved', value: '0', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
]

export default function StudentDashboard() {
  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-primary-900 dark:text-white mb-2 uppercase tracking-tighter">Welcome back, Alex!</h1>
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
                    <tr className="hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-primary-900 dark:text-white">STEM Excellence Grant</p>
                        <p className="text-xs text-primary-700/50 dark:text-primary-300/50 font-medium">Secondary Education</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-primary-700/70 dark:text-primary-300/70 font-medium">Mar 12, 2026</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-bold rounded-full">
                          Pending
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 hover:bg-primary-100 dark:hover:bg-primary-800 rounded-lg transition-all">
                          <ArrowRight size={18} className="text-primary-400" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
             </div>
          </div>
        </div>

        {/* Notifications / Alerts */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-primary-900 dark:text-white">Timeline</h3>
          <div className="space-y-4">
            {[
              { title: 'Application Submitted', date: '2 hours ago', icon: <FileText size={18} />, color: 'bg-primary-800' },
              { title: 'Profile Updated', date: '1 day ago', icon: <User size={18} />, color: 'bg-primary-500' },
              { title: 'Welcome to Bridget', date: '2 days ago', icon: <AlertCircle size={18} />, color: 'bg-primary-800' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 shadow-sm">
                <div className={cn("w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-white", item.color)}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-primary-900 dark:text-white">{item.title}</p>
                  <p className="text-xs text-primary-700/50 dark:text-primary-300/50 font-medium">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}
