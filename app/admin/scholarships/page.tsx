'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Search, 
  Settings2, 
  Calendar, 
  Users, 
  Edit2,
  Trash2,
  GraduationCap
} from 'lucide-react'

const scholarships = [
  { id: '1', title: 'STEM Excellence Grant', deadline: 'Apr 30, 2026', applicants: 450, status: 'active' },
  { id: '2', title: 'Future Leaders Program', deadline: 'May 15, 2026', applicants: 210, status: 'active' },
  { id: '3', title: 'Bridget Resilience Award', deadline: 'Jun 01, 2026', applicants: 588, status: 'active' },
  { id: '4', title: 'Arts & Humanities Grant', deadline: 'Feb 01, 2026', applicants: 120, status: 'closed' },
]

export default function AdminScholarships() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-primary-900 dark:text-white mb-2 uppercase tracking-tighter">Scholarship Programs</h1>
          <p className="text-primary-700/60 dark:text-primary-300/60">Create, edit, and manage all foundation scholarship offerings.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary-800 text-white rounded-xl font-bold shadow-lg shadow-primary-900/10 hover:bg-primary-900 transition-all">
          <Plus size={20} />
          Create New Program
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" size={20} />
          <input 
            type="text" 
            placeholder="Search programs by title or description..."
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 rounded-2xl focus:ring-2 focus:ring-primary-800 outline-none text-sm shadow-sm transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {scholarships.map((s, index) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-primary-900/20 rounded-[2rem] border border-primary-100 dark:border-primary-800 p-8 hover:shadow-xl transition-all group flex flex-col md:flex-row md:items-center justify-between gap-8"
          >
            <div className="flex items-center gap-6">
              <div className={cn(
                "w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-2xl font-black",
                s.status === 'active' ? "bg-primary-100 text-primary-800 dark:bg-primary-900/40" : "bg-primary-50 text-primary-300 dark:bg-primary-950/40"
              )}>
                <GraduationCap size={32} />
              </div>
              <div>
                 <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-bold text-primary-900 dark:text-white uppercase tracking-tight group-hover:text-primary-800 transition-colors">{s.title}</h3>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                      s.status === 'active' ? "bg-emerald-100 text-emerald-600" : "bg-primary-50 text-primary-400"
                    )}>
                      {s.status}
                    </span>
                 </div>
                 <div className="flex flex-wrap gap-6 mt-4">
                    <div className="flex items-center gap-2 text-sm text-primary-700/50 dark:text-primary-300/50 font-medium">
                       <Calendar size={16} />
                       <span>Deadline: {s.deadline}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-primary-700/50 dark:text-primary-300/50 font-medium">
                       <Users size={16} />
                       <span>{s.applicants} Total Applicants</span>
                    </div>
                 </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
               <button className="flex items-center gap-2 px-6 py-3 bg-primary-50 dark:bg-primary-950 text-primary-800 dark:text-white font-bold rounded-xl border border-primary-100 dark:border-primary-800 hover:bg-primary-800 hover:text-white transition-all text-sm shadow-sm">
                  <Edit2 size={16} />
                  Edit Program
               </button>
               <button className="p-3 text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all">
                  <Trash2 size={20} />
               </button>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="p-10 bg-primary-800 rounded-[3rem] text-white flex flex-col items-center text-center shadow-xl shadow-primary-900/10">
         <div className="w-16 h-16 bg-white dark:bg-primary-900 rounded-2xl flex items-center justify-center mb-6 text-primary-800 shadow-sm">
            <Settings2 size={32} />
         </div>
         <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">Configure Selection Workflow</h4>
         <p className="text-primary-100/80 text-sm font-medium max-w-md mb-8">
            Adjust the automated screening rules and manual review stages for the upcoming 2026 selection cycle.
         </p>
         <button className="px-8 py-4 bg-white text-primary-800 rounded-2xl font-black uppercase tracking-widest hover:bg-primary-50 transition-all shadow-lg">
            Open Workflow Settings
         </button>
      </div>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}
