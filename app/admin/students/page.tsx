'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Search,
  Filter,
  Download,
  Mail,
  Calendar,
  Loader2,
  ChevronRight,
  ShieldCheck,
  FileText,
  AlertCircle,
  Clock,
  Eye,
  CheckCircle2,
  XCircle
} from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import ConfirmModal from '@/components/ui/ConfirmModal'
import VerificationModal from '@/components/admin/VerificationModal'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function AdminStudents() {
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [requesting, setRequesting] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedYear, setSelectedYear] = useState<string>('All')
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [reviewFeedback, setReviewFeedback] = useState('')
  
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

  const handleRequestPerformance = async () => {
    if (!selectedStudent) return
    setRequesting(true)
    
    const { requestStudentPerformance } = await import('@/app/actions/admin')
    await requestStudentPerformance(selectedStudent.id)
    
    await fetchStudents()
    setRequesting(false)
    setIsRequestModalOpen(false)
    setSelectedStudent(null)
  }

  const handleVerifyAction = async (isApprove: boolean) => {
    if (!selectedStudent) return
    setVerifying(true)
    
    const { verifyStudent, rejectVerification } = await import('@/app/actions/admin')
    
    if (isApprove) {
      await verifyStudent(selectedStudent.id)
    } else {
      await rejectVerification(selectedStudent.id, reviewFeedback)
    }
    
    await fetchStudents()
    setVerifying(false)
    setIsVerifyModalOpen(false)
    setSelectedStudent(null)
    setReviewFeedback('')
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const availableYears = ['All', ...new Set(students.map(s => s.admission_year).filter(Boolean).sort((a, b) => b - a))]

  const filtered = students.filter(s => {
    const matchesSearch = s.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesYear = selectedYear === 'All' || s.admission_year?.toString() === selectedYear.toString()
    return matchesSearch && matchesYear
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-primary-900 dark:text-white mb-2 uppercase tracking-tighter">Student Database</h1>
          <p className="text-primary-700/60 dark:text-primary-300/60 font-medium">Verify documents and manage performance records for all scholars.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 rounded-xl text-primary-700 dark:text-primary-300 font-bold shadow-sm hover:bg-primary-50 transition-all">
            <Download size={18} />
            Export Data
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" size={20} />
          <input
            type="text"
            placeholder="Search scholars by name or email..."
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
              <option key={year} value={year}>{year === 'All' ? 'All Classes' : `Class of ${year}`}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-primary-900/20 rounded-[2.5rem] border border-primary-100 dark:border-primary-800 overflow-hidden shadow-sm min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 gap-4">
            <Loader2 size={40} className="text-primary-500 animate-spin" />
            <p className="text-sm font-bold text-primary-700/40 uppercase tracking-widest">Accessing Student Portal...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-20 text-center">
            <Users size={48} className="text-primary-100 mb-4" />
            <p className="text-primary-900 dark:text-white font-bold text-lg mb-1">Scholar list empty</p>
            <p className="text-primary-700/60 dark:text-primary-300/60 text-sm italic font-medium">No students match your search filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-primary-100 dark:border-primary-800 bg-primary-50/30">
                  <th className="px-8 py-6 text-xs font-bold text-primary-700/50 dark:text-primary-300/50 uppercase tracking-widest">Scholar Details</th>
                  <th className="px-8 py-6 text-xs font-bold text-primary-700/50 dark:text-primary-300/50 uppercase tracking-widest">Admission Info</th>
                  <th className="px-8 py-6 text-xs font-bold text-primary-700/50 dark:text-primary-300/50 uppercase tracking-widest">Verification</th>
                  <th className="px-8 py-6 text-xs font-bold text-primary-700/50 dark:text-primary-300/50 uppercase tracking-widest">Performance</th>
                  <th className="px-8 py-6 text-xs font-bold text-primary-700/50 dark:text-primary-300/50 uppercase tracking-widest text-right whitespace-nowrap">Actions Hub</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-100 dark:divide-primary-800 font-medium">
                {filtered.map((student) => (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-800 flex items-center justify-center text-primary-800 dark:text-primary-400 font-black shadow-sm group-hover:scale-110 transition-transform">
                          {student.full_name?.charAt(0) || 'S'}
                        </div>
                        <div>
                          <p className="font-bold text-primary-900 dark:text-white uppercase tracking-tight text-sm flex items-center gap-2">
                            {student.full_name}
                            {student.verification_status === 'verified' && <ShieldCheck size={14} className="text-emerald-500 fill-emerald-500/10" />}
                          </p>
                          <p className="text-[10px] text-primary-700/50 dark:text-primary-300/50 font-bold uppercase tracking-widest flex items-center gap-1 mt-0.5">
                            <Mail size={10} /> {student.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-50 dark:bg-primary-950 text-primary-800 dark:text-primary-300 border border-primary-100 dark:border-primary-800 rounded-lg text-[10px] font-black uppercase">
                        <Calendar size={12} />
                        {student.admission_year || 'N/A'}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                        student.verification_status === 'verified' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' :
                        student.verification_status === 'submitted' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-800 dark:text-primary-400 animate-pulse' :
                        student.verification_status === 'rejected' ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' :
                        'bg-gray-100 dark:bg-gray-800/30 text-gray-500'
                      )}>
                        {student.verification_status === 'verified' ? <CheckCircle2 size={12} /> : 
                         student.verification_status === 'submitted' ? <Clock size={12} /> : 
                         student.verification_status === 'rejected' ? <XCircle size={12} /> : 
                         <AlertCircle size={12} />}
                        {student.verification_status || 'PENDING'}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                        student.performance_status === 'verified' ? 'bg-emerald-100/50 text-emerald-700' :
                        student.performance_status === 'submitted' ? 'bg-primary-100/50 text-primary-900' :
                        student.performance_status === 'requested' ? 'bg-amber-100/50 text-amber-700 animate-pulse' :
                        'bg-gray-100/50 text-gray-500'
                      )}>
                        {student.performance_status || 'NONE'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {student.verification_status === 'submitted' && (
                          <button
                            onClick={() => {
                              setSelectedStudent(student)
                              setIsVerifyModalOpen(true)
                            }}
                            className="flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-xl text-[10px] font-black uppercase hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                          >
                            <Eye size={12} />
                            Review
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setSelectedStudent(student)
                            setIsRequestModalOpen(true)
                          }}
                          disabled={student.is_performance_requested}
                          className="px-4 py-2 bg-primary-800 text-white rounded-xl text-[10px] font-black uppercase hover:bg-primary-900 transition-all disabled:opacity-50 shadow-sm"
                        >
                          Request Perf.
                        </button>
                        <button className="p-2.5 bg-primary-50 dark:bg-primary-950 text-primary-800 rounded-xl transition-all hover:bg-primary-800 hover:text-white shadow-sm border border-primary-100 dark:border-primary-800">
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Performance Request Modal */}
      <ConfirmModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        onConfirm={handleRequestPerformance}
        isLoading={requesting}
        title="Request Performance Record"
        description={`Request academic records for ${selectedStudent?.full_name}. Priority alerts will appear on their dashboard.`}
        confirmText="Send Request"
        type="info"
      />

      {/* Verification Review Modal */}
      <VerificationModal
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
        onApprove={() => handleVerifyAction(true)}
        onReject={(feedback) => {
          setReviewFeedback(feedback)
          handleVerifyAction(false)
        }}
        student={selectedStudent}
        isLoading={verifying}
      />

      <div className="md:hidden p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 rounded-2xl">
        <p className="text-[10px] font-bold text-primary-700/60 uppercase text-center flex items-center justify-center gap-2 italic">
          <ShieldCheck size={12} />
          Scroll horizontally to access actions hub
        </p>
      </div>
    </div>
  )
}
