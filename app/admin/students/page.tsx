'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Search, 
  Filter, 
  Download,
  Mail,
  GraduationCap,
  Calendar,
  Loader2,
  ChevronRight
} from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

export default function AdminStudents() {
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedYear, setSelectedYear] = useState<string>('All')
  
  const supabase = createClient()

  const fetchStudents = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'student')
      .order('admission_year', { ascending: false })

    if (data) setStudents(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const availableYears = ['All', ...new Set(students.map(s => s.admission_year).filter(Boolean).sort((a, b) => b - a))]

  const filtered = students.filter(s => {
    const matchesSearch = s.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesYear = selectedYear === 'All' || s.admission_year?.toString() === selectedYear.toString()
    return matchesSearch && matchesYear
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-primary-900 dark:text-white mb-2 uppercase tracking-tighter">Student Management</h1>
          <p className="text-primary-700/60 dark:text-primary-300/60">View and manage all accepted students organized by admission year.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 rounded-xl text-primary-700 dark:text-primary-300 font-bold shadow-sm hover:bg-primary-50 transition-all">
            <Download size={18} />
            Export Students
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-primary-950/50 border border-primary-100 dark:border-primary-800 rounded-2xl focus:ring-2 focus:ring-primary-800 outline-none text-sm transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-primary-950/50 border border-primary-100 dark:border-primary-800 rounded-2xl px-4 py-2 shadow-sm">
          <Filter size={18} className="text-primary-400" />
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-transparent border-none outline-none text-sm font-bold text-primary-800 dark:text-primary-200 appearance-none pr-8 py-2"
          >
            {availableYears.map(year => (
              <option key={year} value={year}>{year === 'All' ? 'All Admission Years' : `Class of ${year}`}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-primary-900/20 rounded-[2.5rem] border border-primary-100 dark:border-primary-800 overflow-hidden shadow-sm min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 gap-4">
             <Loader2 size={40} className="text-primary-500 animate-spin" />
             <p className="text-sm font-bold text-primary-700/40 uppercase tracking-widest">Loading Student Database...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-20 text-center">
            <Users size={48} className="text-primary-100 mb-4" />
            <p className="text-primary-900 dark:text-white font-bold text-lg mb-1">No students found</p>
            <p className="text-primary-700/60 dark:text-primary-300/60 text-sm">No students matching the selected criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-primary-100 dark:border-primary-800">
                  <th className="px-8 py-6 text-xs font-bold text-primary-700/50 dark:text-primary-300/50 uppercase tracking-widest">Student</th>
                  <th className="px-8 py-6 text-xs font-bold text-primary-700/50 dark:text-primary-300/50 uppercase tracking-widest">Admission Year</th>
                  <th className="px-8 py-6 text-xs font-bold text-primary-700/50 dark:text-primary-300/50 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-100 dark:divide-primary-800">
                {filtered.map((student) => (
                  <motion.tr 
                    key={student.id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-800 flex items-center justify-center text-primary-800 font-extrabold shadow-sm group-hover:scale-110 transition-transform">
                          {student.full_name?.charAt(0) || 'S'}
                        </div>
                        <div>
                          <p className="font-bold text-primary-900 dark:text-white uppercase tracking-tight text-sm">{student.full_name}</p>
                          <p className="text-[10px] text-primary-700/50 dark:text-primary-300/50 font-bold uppercase tracking-widest flex items-center gap-1">
                            <Mail size={10} /> {student.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-50 dark:bg-primary-950 text-primary-800 dark:text-primary-300 border border-primary-100 dark:border-primary-800 rounded-lg text-[10px] font-black uppercase">
                        <Calendar size={12} />
                        {student.admission_year || 'Legacy'}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <button className="p-2.5 bg-primary-50 dark:bg-primary-950 text-primary-800 rounded-xl transition-all hover:bg-primary-800 hover:text-white shadow-sm flex items-center gap-2 ml-auto">
                          <span className="text-[10px] font-black uppercase">View Profile</span>
                          <ChevronRight size={14} />
                       </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
