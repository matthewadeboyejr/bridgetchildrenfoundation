
'use client'


import { motion } from 'framer-motion'
import {
  FileText,
  ExternalLink,
  Search,
  Filter,
  MoreVertical,
  Loader2
} from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'

interface Application {
  id: string
  school_name: string
  created_at: string
  status: 'pending' | 'accepted' | 'rejected'
  id_short: string
}

const statusStyles = {
  pending: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  accepted: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  rejected: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const supabase = createClient()

  useEffect(() => {
    async function fetchApplications() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('quiz_registrations')
        .select('id, school_name, created_at, status')
        .eq('email', user.email)
        .order('created_at', { ascending: false })

      if (data) {
        setApplications(data.map(app => ({
          ...app,
          id_short: app.id.slice(0, 8).toUpperCase()
        })) as Application[])
      }
      setLoading(false)
    }

    fetchApplications()
  }, [])

  const filteredApps = applications.filter(app =>
    app.school_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.id_short.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
            placeholder="Search by ID or school name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 rounded-2xl focus:ring-2 focus:ring-primary-800 outline-none text-sm shadow-sm transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-4 bg-white dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 rounded-2xl text-primary-700 dark:text-primary-300 font-bold shadow-sm hover:bg-primary-50 transition-all">
          <Filter size={20} />
          Filter
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-20 text-primary-700/50">
          <Loader2 className="animate-spin mb-4" size={40} />
          <p className="font-bold uppercase tracking-widest text-xs">Loading Applications...</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-primary-900/20 rounded-[2.5rem] border border-primary-100 dark:border-primary-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-primary-100 dark:border-primary-800">
                  <th className="px-8 py-6 text-xs font-bold text-primary-700/50 dark:text-primary-300/50 uppercase tracking-widest">Scholarship / School</th>
                  <th className="px-8 py-6 text-xs font-bold text-primary-700/50 dark:text-primary-300/50 uppercase tracking-widest">Date Applied</th>
                  <th className="px-8 py-6 text-xs font-bold text-primary-700/50 dark:text-primary-300/50 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-6 text-xs font-bold text-primary-700/50 dark:text-primary-300/50 uppercase tracking-widest text-right">Reference</th>
                  <th className="px-8 py-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-100 dark:divide-primary-800">
                {filteredApps.length > 0 ? (
                  filteredApps.map((app, index) => (
                    <motion.tr
                      key={app.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors group"
                    >
                      <td className="px-8 py-6">
                        <p className="font-bold text-primary-900 dark:text-white group-hover:text-primary-800 transition-colors uppercase tracking-tight">{app.school_name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <FileText size={14} className="text-primary-400" />
                          <span className="text-xs text-primary-700/50 dark:text-primary-300/50 font-medium tracking-tight">QUIZ REGISTRATION</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm text-primary-700/70 dark:text-primary-300/70 font-medium">
                        {format(new Date(app.created_at), 'MMM dd, yyyy')}
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${statusStyles[app.status]}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <span className="font-mono text-sm font-bold text-primary-800 dark:text-white bg-primary-100 dark:bg-primary-950 px-3 py-1 rounded-lg">
                          #{app.id_short}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button className="p-2.5 hover:bg-primary-100 dark:hover:bg-primary-800 rounded-xl transition-all">
                          <MoreVertical size={20} className="text-primary-400" />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center text-primary-700/50">
                      <p className="font-bold uppercase tracking-widest text-xs">No applications found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between p-8 bg-primary-800 rounded-4xl text-white shadow-xl shadow-primary-900/10 overflow-hidden relative group">
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

