'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ChevronLeft, 
  Upload, 
  CheckCircle2, 
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ApplicationForm() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [refId, setRefId] = useState('')

  const handleNext = () => setStep(s => s + 1)
  const handleBack = () => setStep(s => s - 1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setRefId(`APP-STEM-${Math.floor(Math.random() * 9000) + 1000}`)
      setStep(4) // Success step
    }, 2000)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20">
      <Link 
        href="/dashboard/scholarships"
        className="inline-flex items-center gap-2 text-sm font-bold text-primary-700/60 dark:text-primary-300/60 hover:text-primary-800 transition-colors"
      >
        <ChevronLeft size={16} />
        Back to Scholarships
      </Link>

      <div className="bg-white dark:bg-primary-900/20 rounded-[2.5rem] border border-primary-100 dark:border-primary-800 p-8 md:p-12 shadow-sm">
        {step < 4 && (
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-primary-900 dark:text-white mb-4 uppercase tracking-tighter">Application Form</h1>
            <div className="flex items-center gap-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-4 flex-1">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all",
                    step >= s ? "bg-primary-800 text-white" : "bg-primary-50 dark:bg-primary-950 text-primary-400"
                  )}>
                    {s}
                  </div>
                  {s < 3 && <div className={cn("h-1 flex-1 rounded-full", step > s ? "bg-primary-800" : "bg-primary-100 dark:bg-primary-800")} />}
                </div>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-bold text-primary-900 dark:text-white mb-6 uppercase tracking-tight">Academic Information</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary-900 dark:text-primary-100 ml-1">Current CGPA / Grade Average</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 4.5/5.0 or 85%"
                    className="w-full px-4 py-4 bg-white dark:bg-primary-950/50 border border-primary-100 dark:border-primary-800 rounded-2xl focus:ring-2 focus:ring-primary-800 outline-none text-sm transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary-900 dark:text-primary-100 ml-1">Proposed Course of Study</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Computer Science"
                    className="w-full px-4 py-4 bg-white dark:bg-primary-950/50 border border-primary-100 dark:border-primary-800 rounded-2xl focus:ring-2 focus:ring-primary-800 outline-none text-sm transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary-900 dark:text-primary-100 ml-1">Briefly explain your academic achievements</label>
                  <textarea 
                    rows={4}
                    placeholder="Highlight your best grades or awards..."
                    className="w-full px-4 py-4 bg-white dark:bg-primary-950/50 border border-primary-100 dark:border-primary-800 rounded-2xl focus:ring-2 focus:ring-primary-800 outline-none text-sm transition-all resize-none shadow-sm"
                  />
                </div>
              </div>
              <button 
                type="button"
                onClick={handleNext}
                className="w-full py-4 bg-primary-800 hover:bg-primary-900 text-white font-bold rounded-2xl transition-all shadow-lg shadow-primary-900/10"
              >
                Next Step
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-bold text-primary-900 dark:text-white mb-6 uppercase tracking-tight">Personal Statement</h2>
              <p className="text-sm text-primary-700/60 dark:text-primary-300/60 mb-6 font-medium">Why do you deserve this scholarship? How will it impact your future? (Min 300 words)</p>
              <textarea 
                rows={12}
                placeholder="Write your story here..."
                className="w-full px-6 py-6 bg-white dark:bg-primary-950/50 border border-primary-100 dark:border-primary-800 rounded-2xl focus:ring-2 focus:ring-primary-800 outline-none text-sm transition-all resize-none leading-relaxed shadow-sm font-medium"
              />
              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={handleBack}
                  className="flex-1 py-4 bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300 font-bold rounded-2xl transition-all"
                >
                  Back
                </button>
                <button 
                  type="button"
                  onClick={handleNext}
                  className="flex-2 py-4 bg-primary-800 hover:bg-primary-900 text-white font-bold rounded-2xl transition-all shadow-lg shadow-primary-900/10"
                >
                  Next Step
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <h2 className="text-xl font-bold text-primary-900 dark:text-white mb-6 uppercase tracking-tight">Documents & Confirmation</h2>
              
              <div className="space-y-4">
                {[
                  'Identity Document (National ID/Passport)',
                  'Academic Transcripts',
                  'Letter of Recommendation',
                  'Proof of Financial Need'
                ].map((doc, i) => (
                  <div key={i} className="group p-6 border-2 border-dashed border-primary-100 dark:border-primary-800 rounded-2xl hover:border-primary-500 dark:hover:border-primary-500 transition-all cursor-pointer bg-primary-50/30 dark:bg-primary-950/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white dark:bg-primary-950 rounded-xl shadow-sm text-primary-500">
                          <Upload size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-primary-900 dark:text-white">{doc}</p>
                          <p className="text-xs text-primary-700/50 dark:text-primary-300/50 font-medium">PDF, PNG, JPG (Max 5MB)</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-primary-500">Select File</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={handleBack}
                  className="flex-1 py-4 bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300 font-bold rounded-2xl transition-all"
                  disabled={isSubmitting}
                >
                  Back
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-2 py-4 bg-primary-800 hover:bg-primary-900 text-white font-bold rounded-2xl transition-all shadow-lg shadow-primary-900/10 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-950/40 rounded-full flex items-center justify-center mx-auto mb-8 text-emerald-600">
                <CheckCircle2 size={48} strokeWidth={3} />
              </div>
              <h2 className="text-3xl font-bold text-primary-900 dark:text-white mb-4 uppercase tracking-tighter">Application Submitted!</h2>
              <p className="text-primary-700/60 dark:text-primary-300/60 mb-10 max-w-sm mx-auto font-medium">
                Your application for the <strong>STEM Excellence Grant</strong> has been received. Our team will review it and notify you of the status.
              </p>
              <div className="flex flex-col gap-4">
                <Link 
                  href="/dashboard"
                  className="py-4 bg-primary-800 hover:bg-primary-900 text-white font-bold rounded-2xl transition-all shadow-lg shadow-primary-900/10"
                >
                  Return to Dashboard
                </Link>
                <div className="p-4 bg-primary-50 dark:bg-primary-950 rounded-2xl flex items-center gap-3 border border-primary-100 dark:border-primary-800">
                  <AlertCircle size={20} className="text-primary-500" />
                  <p className="text-xs text-primary-700/70 dark:text-primary-300/70 text-left font-medium">
                    Ref ID: {refId} - Keep this for your records.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </form>
      </div>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}

