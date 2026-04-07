'use client'

import {
  Search,
  Eye,
  Download,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  Phone,
  School,
  GraduationCap,
  ChevronRight
} from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { acceptStudent, rejectStudent } from '@/app/actions/admin'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ConfirmModal from '@/components/ui/ConfirmModal'

export default function AdminApplications() {
  const [registrations, setRegistrations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [processingId, setProcessingId] = useState<string | null>(null)

  // Modal State
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean,
    studentId: string | null,
    action: 'accept' | 'reject'
  }>({
    isOpen: false,
    studentId: null,
    action: 'accept'
  })

  const [errorModal, setErrorModal] = useState<{
    isOpen: boolean,
    message: string
  }>({
    isOpen: false,
    message: ''
  })

  const supabase = createClient()

  const fetchRegistrations = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('quiz_registrations')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) setRegistrations(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchRegistrations()
  }, [])

  const triggerConfirm = (id: string, action: 'accept' | 'reject') => {
    setConfirmModal({
      isOpen: true,
      studentId: id,
      action
    })
  }

  const handleAction = async () => {
    const { studentId, action } = confirmModal
    if (!studentId) return

    setConfirmModal(prev => ({ ...prev, isOpen: false }))
    setProcessingId(studentId)

    try {
      if (action === 'accept') {
        await acceptStudent(studentId)
      } else {
        await rejectStudent(studentId)
      }
      await fetchRegistrations()
    } catch (err: any) {
      setErrorModal({
        isOpen: true,
        message: err.message || 'An unexpected error occurred during the invitation process.'
      })
    } finally {
      setProcessingId(null)
    }
  }

  const filtered = registrations.filter(r =>
    r.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.school_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-primary-900 dark:text-white mb-2 uppercase tracking-tighter">Quiz Registry</h1>
          <p className="text-primary-700/60 dark:text-primary-300/60">Review and manage students registered for the qualifying quiz.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 rounded-xl text-primary-700 dark:text-primary-300 font-bold shadow-sm hover:bg-primary-50 transition-all">
            <Download size={18} />
            Export Registry
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" size={20} />
          <input
            type="text"
            placeholder="Search by student name, school, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-primary-950/50 border border-primary-100 dark:border-primary-800 rounded-2xl focus:ring-2 focus:ring-primary-800 outline-none text-sm transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-primary-900/20 rounded-[2.5rem] border border-primary-100 dark:border-primary-800 overflow-hidden shadow-sm min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 gap-4">
            <Loader2 size={40} className="text-primary-500 animate-spin" />
            <p className="text-sm font-bold text-primary-700/40 uppercase tracking-widest">Fetching Registrations...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-20 text-center">
            <p className="text-primary-900 dark:text-white font-bold text-lg mb-1">No registrations found</p>
            <p className="text-primary-700/60 dark:text-primary-300/60 text-sm">Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-primary-100 dark:border-primary-800">
                  <th className="px-8 py-6 text-xs font-bold text-primary-700/50 dark:text-primary-300/50 uppercase tracking-widest">Student</th>
                  <th className="px-8 py-6 text-xs font-bold text-primary-700/50 dark:text-primary-300/50 uppercase tracking-widest">School</th>
                  <th className="px-8 py-6 text-xs font-bold text-primary-700/50 dark:text-primary-300/50 uppercase tracking-widest">Class / Rank</th>
                  <th className="px-8 py-6 text-xs font-bold text-primary-700/50 dark:text-primary-300/50 uppercase tracking-widest text-center">Status</th>
                  <th className="px-8 py-6 text-xs font-bold text-primary-700/50 dark:text-primary-300/50 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-100 dark:divide-primary-800">
                {filtered.map((r) => (
                  <motion.tr
                    key={r.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-800 flex items-center justify-center text-primary-800 font-extrabold shadow-sm">
                          {r.full_name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-primary-900 dark:text-white uppercase tracking-tight group-hover:text-primary-800 transition-colors text-sm">{r.full_name}</p>
                          <p className="text-[10px] text-primary-700/50 dark:text-primary-300/50 font-bold uppercase tracking-widest">{r.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-bold text-primary-900 dark:text-white group-hover:text-primary-800 transition-colors uppercase tracking-tight">{r.school_name}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-primary-800 uppercase tabular-nums">{r.current_class}</span>
                        <span className="text-[10px] text-primary-500 font-bold uppercase tracking-widest">{r.last_class_position} of {r.number_of_student_in_class}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className={cn(
                        "px-3 py-1 text-[10px] font-black rounded-lg border uppercase tracking-widest inline-flex items-center gap-1.5",
                        r.status === 'pending' ? "bg-amber-50 text-amber-700 border-amber-100" :
                          r.status === 'accepted' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                            "bg-red-50 text-red-700 border-red-100"
                      )}>
                        {r.status === 'pending' && <Clock size={10} />}
                        {r.status === 'accepted' && <CheckCircle2 size={10} />}
                        {r.status === 'rejected' && <XCircle size={10} />}
                        {r.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {processingId === r.id ? (
                          <Loader2 size={18} className="text-primary-500 animate-spin mr-4" />
                        ) : r.status === 'pending' ? (
                          <>
                            <button
                              onClick={() => triggerConfirm(r.id, 'accept')}
                              className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                            >
                              <CheckCircle2 size={18} />
                            </button>
                            <button
                              onClick={() => triggerConfirm(r.id, 'reject')}
                              className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                            >
                              <XCircle size={18} />
                            </button>
                          </>
                        ) : null}
                        <button
                          onClick={() => setSelectedStudent(r)}
                          className="p-2.5 bg-primary-50 dark:bg-primary-950 text-primary-800 rounded-xl transition-all hover:bg-primary-800 hover:text-white shadow-sm"
                        >
                          <Eye size={18} />
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

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-primary-950/40 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-primary-900 w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl border border-white/20"
          >
            <div className="p-10 space-y-8">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-3xl bg-primary-100 dark:bg-primary-800 flex items-center justify-center text-3xl font-black text-primary-800 shadow-inner">
                    {selectedStudent.full_name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-primary-900 dark:text-white tracking-tighter uppercase">{selectedStudent.full_name}</h2>
                    <p className="text-primary-500 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                      Candidate ID: <span className="bg-primary-50 dark:bg-primary-950 px-2 py-0.5 rounded border border-primary-100 dark:border-primary-800">{selectedStudent.id.slice(0, 8)}</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="p-2 bg-primary-50 dark:bg-primary-950 text-primary-400 rounded-full hover:bg-primary-100"
                >
                  <XCircle size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-primary-700/40 dark:text-primary-300/40 uppercase tracking-widest flex items-center gap-2">
                      <Phone size={12} /> Contact Details
                    </p>
                    <p className="font-bold text-primary-900 dark:text-white">{selectedStudent.email}</p>
                    <p className="text-sm font-medium text-primary-700/60 dark:text-primary-300/60">{selectedStudent.phone || 'No phone provided'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-primary-700/40 dark:text-primary-300/40 uppercase tracking-widest flex items-center gap-2">
                      <School size={12} /> Institution
                    </p>
                    <p className="font-bold text-primary-900 dark:text-white uppercase tracking-tight">{selectedStudent.school_name}</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-primary-700/40 dark:text-primary-300/40 uppercase tracking-widest flex items-center gap-2">
                      <GraduationCap size={12} /> Academic Standing
                    </p>
                    <p className="font-bold text-primary-900 dark:text-white">{selectedStudent.current_class}</p>
                    <p className="text-sm font-medium text-primary-700/60 dark:text-primary-300/60">
                      Rank: <span className="text-primary-800 font-bold">{selectedStudent.last_class_position}</span> of {selectedStudent.number_of_student_in_class} students
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-primary-700/40 dark:text-primary-300/40 uppercase tracking-widest flex items-center gap-2">
                      Science Interest
                    </p>
                    <span className={cn(
                      "px-3 py-1 text-[10px] font-black rounded-lg border uppercase",
                      selectedStudent.interest_in_science === 'Yes' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-gray-50 text-gray-500 border-gray-100"
                    )}>
                      {selectedStudent.interest_in_science}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-primary-100 dark:border-primary-800 flex gap-4">
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="grow py-4 bg-primary-50 dark:bg-primary-950 text-primary-800 font-bold rounded-2xl hover:bg-primary-100 transition-all"
                >
                  Close Registry View
                </button>
                {selectedStudent.status === 'pending' && (
                  <button
                    onClick={() => { triggerConfirm(selectedStudent.id, 'accept'); setSelectedStudent(null); }}
                    className="grow py-4 bg-primary-800 text-white font-bold rounded-2xl hover:bg-primary-900 shadow-xl shadow-primary-900/10 transition-all flex items-center justify-center gap-2"
                  >
                    Approve for Quiz <ChevronRight size={18} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Global Confirm Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={handleAction}
        type={confirmModal.action === 'accept' ? 'success' : 'danger'}
        title={confirmModal.action === 'accept' ? 'Approve Student?' : 'Reject Student?'}
        description={
          confirmModal.action === 'accept'
            ? "This will generate an official admission letter and invite the student to the platform."
            : "This will mark the application as rejected and notify the student."
        }
        confirmText={confirmModal.action === 'accept' ? 'Yes, Approve' : 'Yes, Reject'}
      />

      <ConfirmModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, message: '' })}
        onConfirm={() => setErrorModal({ isOpen: false, message: '' })}
        title="Action Failed"
        description={errorModal.message}
        confirmText="Understood"
        type="danger"
        cancelText=""
      />
    </div>
  )
}

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}
