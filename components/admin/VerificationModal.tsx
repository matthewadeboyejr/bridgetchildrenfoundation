'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  FileText,
  Loader2,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  CheckCircle2,
  XCircle
} from 'lucide-react'
import Link from 'next/link'

interface VerificationModalProps {
  isOpen: boolean
  onClose: () => void
  onApprove: () => void
  onReject: (feedback: string) => void
  student: any
  isLoading: boolean
}

export default function VerificationModal({
  isOpen,
  onClose,
  onApprove,
  onReject,
  student,
  isLoading
}: VerificationModalProps) {
  const [feedback, setFeedback] = useState('')

  if (!student) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={isLoading ? undefined : onClose}
            className="absolute inset-0 bg-primary-950/40 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white dark:bg-primary-900 rounded-[2.5rem] shadow-2xl border border-white/20 overflow-hidden"
          >
            <div className="p-8 md:p-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-primary-900 dark:text-white uppercase tracking-tighter">Verify Scholar</h3>
                    <p className="text-xs font-bold text-primary-700/50 uppercase tracking-widest">Document Authentication</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  disabled={isLoading}
                  className="p-2 hover:bg-primary-50 dark:hover:bg-primary-800 rounded-xl transition-colors"
                >
                  <X size={20} className="text-primary-400" />
                </button>
              </div>

              {/* Body */}
              <div className="space-y-6">
                <div className="p-6 bg-primary-50 dark:bg-primary-950/50 rounded-3xl border border-primary-100 dark:border-primary-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-primary-700/50 tracking-widest">Scholar Name</span>
                    <span className="text-sm font-bold text-primary-900 dark:text-white">{student.full_name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-primary-700/50 tracking-widest">Target Year</span>
                    <span className="text-sm font-bold text-primary-900 dark:text-white">Class of {student.admission_year || 'N/A'}</span>
                  </div>

                  <Link
                    href={student.admission_letter_url || '#'}
                    target="_blank"
                    className="flex items-center justify-center gap-3 w-full py-4 bg-white dark:bg-primary-800 border border-primary-100 dark:border-primary-700 rounded-2xl text-primary-800 dark:text-primary-200 font-bold hover:bg-primary-800 hover:text-white transition-all shadow-sm group"
                  >
                    <FileText size={18} className="text-primary-400 group-hover:text-white" />
                    Review Admission Letter
                    <ExternalLink size={14} className="opacity-50" />
                  </Link>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-primary-700/50 tracking-widest px-2">Rejection Feedback (Optional)</label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="e.g., Please upload a clearer image of your letter..."
                    className="w-full p-5 bg-white dark:bg-primary-950/50 border border-primary-100 dark:border-primary-800 rounded-3xl outline-none focus:ring-2 focus:ring-primary-800 dark:focus:ring-primary-400 text-sm min-h-[120px] transition-all resize-none"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mt-10">
                <button
                  onClick={() => onReject(feedback)}
                  disabled={isLoading}
                  className="flex-1 py-4 bg-red-50 text-red-600 rounded-2xl font-bold text-sm hover:bg-red-600 hover:text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <XCircle size={18} />
                  Reject
                </button>
                <button
                  onClick={onApprove}
                  disabled={isLoading}
                  className="flex-1 py-4 bg-primary-800 text-white rounded-2xl font-bold text-sm hover:bg-primary-900 transition-all disabled:opacity-50 shadow-xl shadow-primary-900/10 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 size={18} />
                      Verify Document
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
