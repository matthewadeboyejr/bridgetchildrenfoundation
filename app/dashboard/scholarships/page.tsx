'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  MapPin, 
  Calendar, 
  ArrowRight,
  GraduationCap
} from 'lucide-react'
import Link from 'next/link'

const scholarships = [
  {
    id: 'stem-2026',
    title: 'STEM Excellence Grant',
    description: 'Providing comprehensive funding and mentorship for talented students in junior and senior secondary schools focusing on science and technology.',
    deadline: 'April 30, 2026',
    location: 'Abuja, Nigeria',
    type: 'Full Scholarship',
    category: 'STEM'
  },
  {
    id: 'leaders-2026',
    title: 'Future Leaders Program',
    description: 'A scholarship designed for tertiary students who demonstrate exceptional leadership qualities and community engagement.',
    deadline: 'May 15, 2026',
    location: 'Lagos, Nigeria',
    type: 'Tuition + Stipend',
    category: 'Leadership'
  },
  {
    id: 'resilience-2026',
    title: 'Bridget Resilience Award',
    description: 'Supporting students who have shown exceptional determination and academic promise despite significant financial hardships.',
    deadline: 'June 01, 2026',
    location: 'Kano, Nigeria',
    type: 'Foundation Support',
    category: 'General'
  }
]

export default function ScholarshipsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-primary-900 dark:text-white mb-2 uppercase tracking-tighter">Available Scholarships</h1>
          <p className="text-primary-700/60 dark:text-primary-300/60">Find and apply for opportunities that match your academic goals.</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" size={20} />
        <input 
          type="text" 
          placeholder="Search by keyword, category, or location..."
          className="w-full pl-12 pr-4 py-4 bg-white dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 rounded-2xl focus:ring-2 focus:ring-primary-800 outline-none text-sm shadow-sm transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scholarships.map((s, index) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white dark:bg-primary-900/20 rounded-3xl border border-primary-100 dark:border-primary-800 p-8 hover:shadow-xl transition-all flex flex-col h-full"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-800/30 flex items-center justify-center text-primary-800">
                <GraduationCap size={24} />
              </div>
              <span className="px-3 py-1 bg-primary-50 dark:bg-primary-900/50 text-primary-800 dark:text-primary-300 text-xs font-bold rounded-full">
                {s.category}
              </span>
            </div>

            <h3 className="text-xl font-bold text-primary-900 dark:text-white mb-3 group-hover:text-primary-800 transition-colors">
              {s.title}
            </h3>
            <p className="text-primary-700/70 dark:text-primary-300/70 text-sm leading-relaxed mb-6 flex-grow font-medium">
              {s.description}
            </p>

            <div className="space-y-3 pt-6 border-t border-primary-50 dark:border-primary-800 mb-8">
              <div className="flex items-center gap-2 text-sm text-primary-700/50 dark:text-primary-300/50 font-medium">
                <MapPin size={16} />
                <span>{s.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-700/50 dark:text-primary-300/50 font-medium">
                <Calendar size={16} />
                <span>Deadline: {s.deadline}</span>
              </div>
            </div>

            <Link 
              href={`/dashboard/scholarships/${s.id}/apply`}
              className="w-full py-4 bg-primary-800 hover:bg-primary-900 text-white font-bold rounded-2xl transition-all shadow-lg shadow-primary-900/10 flex items-center justify-center gap-2"
            >
              Apply Now
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
