'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  FileText,
  ExternalLink,
  Search,
  Filter,
  MoreVertical
} from 'lucide-react'
import Link from 'next/link'

const applications = [
  {
    id: 'APP-1002',
    scholarship: 'STEM Excellence Grant',
    date: 'Mar 12, 2026',
    status: 'under_review',
    ref: 'STEM-1002'
  },
  {
    id: 'APP-1001',
    scholarship: 'Future Leaders Program',
    date: 'Feb 28, 2026',
    status: 'pending',
    ref: 'LEAD-1001'
  }
]

const statusStyles = {
  pending: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  under_review: 'bg-primary-100 text-primary-800 dark:bg-primary-800/30 dark:text-primary-300',
  approved: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  rejected: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
}

export default function ApplicationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary-900 dark:text-white mb-2 uppercase tracking-tighter">My Applications</h1>
        <p className="text-primary-700/60 dark:text-primary-300/60">Track the status and progress of your scholarship applications.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" size={20} />
          <input
            type="text"
            placeholder="Search by reference ID or scholarship name..."
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 rounded-2xl focus:ring-2 focus:ring-primary-800 outline-none text-sm shadow-sm transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-4 bg-white dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 rounded-2xl text-primary-700 dark:text-primary-300 font-bold shadow-sm hover:bg-primary-50 transition-all">
          <Filter size={20} />
          Filter
        </button>
      </div>

      <div className="bg-white dark:bg-primary-900/20 rounded-[2.5rem] border border-primary-100 dark:border-primary-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-primary-100 dark:border-primary-800">
                <th className="px-8 py-6 text-xs font-bold text-primary-700/50 dark:text-primary-300/50 uppercase tracking-widest">Scholarship</th>
                <th className="px-8 py-6 text-xs font-bold text-primary-700/50 dark:text-primary-300/50 uppercase tracking-widest">Date Applied</th>
                <th className="px-8 py-6 text-xs font-bold text-primary-700/50 dark:text-primary-300/50 uppercase tracking-widest">Status</th>
                <th className="px-8 py-6 text-xs font-bold text-primary-700/50 dark:text-primary-300/50 uppercase tracking-widest text-right">Reference</th>
                <th className="px-8 py-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-100 dark:divide-primary-800">
              {applications.map((app, index) => (
                <motion.tr
                  key={app.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors group"
                >
                  <td className="px-8 py-6">
                    <p className="font-bold text-primary-900 dark:text-white group-hover:text-primary-800 transition-colors uppercase tracking-tight">{app.scholarship}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <FileText size={14} className="text-primary-400" />
                      <span className="text-xs text-primary-700/50 dark:text-primary-300/50 font-medium">Full Application Pack</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm text-primary-700/70 dark:text-primary-300/70 font-medium">{app.date}</td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${statusStyles[app.status as keyof typeof statusStyles]}`}>
                      {app.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <span className="font-mono text-sm font-bold text-primary-800 dark:text-white bg-primary-100 dark:bg-primary-950 px-3 py-1 rounded-lg">
                      {app.ref}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2.5 hover:bg-primary-100 dark:hover:bg-primary-800 rounded-xl transition-all">
                      <MoreVertical size={20} className="text-primary-400" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between p-8 bg-primary-800 rounded-[2rem] text-white shadow-xl shadow-primary-900/10 overflow-hidden relative group">
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">Need Help with your application?</h3>
          <p className="text-primary-100/80 text-sm font-medium">Join our weekly mentorship sessions for tips on successful scholarship applications.</p>
        </div>
        <button className="relative z-10 px-6 py-3 bg-white text-primary-800 rounded-xl font-bold hover:bg-primary-50 transition-all flex items-center gap-2 shadow-lg">
          Learn More
          <ExternalLink size={18} />
        </button>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-white/10 transition-all" />
      </div>
    </div>
  )
}

