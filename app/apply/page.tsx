'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import {
  User,
  Mail,
  Phone,
  School,
  BookOpen,
  ClipboardCheck,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

export default function ApplyQuizPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    school_name: '',
    current_class: '',
    interest_in_science: '',
    number_of_student_in_class: '',
    last_class_position: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  const classes = ['JSS1', 'JSS2', 'JSS3', 'SS1', 'SS2', 'SS3']
  const interestInScience = ['Yes', 'No']
  const classPositions = ['1st', '2nd', '3rd', 'Top 5', 'Top 10', 'Top 20', 'Others']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const { error: submitError } = await supabase
        .from('quiz_registrations')
        .insert([formData])

      if (submitError) throw submitError

      setIsSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <main className="min-h-screen bg-white dark:bg-primary-950 pt-32 pb-24">
      <Navbar />

      <div className="container mx-auto px-6 max-w-4xl mb-20">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-primary-400 mb-6 block">Academic Excellence</span>
            <h1 className="text-4xl md:text-6xl font-bold text-primary-900 dark:text-white mb-6 uppercase tracking-tighter italic leading-none">
              Quiz <span className="text-primary-500 not-italic font-black">Registration.</span>
            </h1>
            <p className="text-primary-700/60 dark:text-primary-300/60 font-medium max-w-xl mx-auto italic">
              Register below to participate in our qualifying quiz. Success in this assessment is the first step toward your Bridget Foundation scholarship.
            </p>
          </motion.div>
        </div>

        <section className="relative">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-primary-50 dark:bg-primary-900/10 rounded-[4rem] p-8 md:p-16 border border-primary-100 dark:border-primary-800 overflow-hidden relative"
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 dark:bg-primary-800/20 rounded-full blur-3xl -mr-32 -mt-32" />

                <form onSubmit={handleSubmit} className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary-700/50 dark:text-primary-300/50 ml-2">Full Name</label>
                    <div className="relative">
                      <User size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-primary-400" />
                      <input
                        required
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-white dark:bg-primary-950/50 border border-primary-100 dark:border-primary-800 rounded-2xl py-5 pl-14 pr-6 focus:ring-2 focus:ring-primary-800 outline-none text-sm transition-all "
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary-700/50 dark:text-primary-300/50 ml-2">Email Address</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-primary-400" />
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full bg-white dark:bg-primary-950/50 border border-primary-100 dark:border-primary-800 rounded-2xl py-5 pl-14 pr-6 focus:ring-2 focus:ring-primary-800 outline-none text-sm transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary-700/50 dark:text-primary-300/50 ml-2">Phone Number</label>
                    <div className="relative">
                      <Phone size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-primary-400" />
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+234 ..."
                        className="w-full bg-white dark:bg-primary-950/50 border border-primary-100 dark:border-primary-800 rounded-2xl py-5 pl-14 pr-6 focus:ring-2 focus:ring-primary-800 outline-none text-sm transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary-700/50 dark:text-primary-300/50 ml-2">School Name</label>
                    <div className="relative">
                      <School size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-primary-400" />
                      <input
                        required
                        type="text"
                        name="school_name"
                        value={formData.school_name}
                        onChange={handleChange}
                        placeholder="Bridget Secondary School"
                        className="w-full bg-white dark:bg-primary-950/50 border border-primary-100 dark:border-primary-800 rounded-2xl py-5 pl-14 pr-6 focus:ring-2 focus:ring-primary-800 outline-none text-sm transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary-700/50 dark:text-primary-300/50 ml-2">Current Class</label>
                    <div className="relative">
                      <BookOpen size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-primary-400" />
                      <select
                        required
                        name="current_class"
                        value={formData.current_class}
                        onChange={handleChange}
                        className="w-full bg-white dark:bg-primary-950/50 border border-primary-100 dark:border-primary-800 rounded-2xl py-5 pl-14 pr-6 focus:ring-2 focus:ring-primary-800 outline-none text-sm transition-all shadow-sm appearance-none"
                      >
                        <option value="">Select Level</option>
                        {classes.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary-700/50 dark:text-primary-300/50 ml-2">Interested in Science</label>
                    <div className="relative">
                      <BookOpen size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-primary-400" />
                      <select
                        required
                        name="interest_in_science"
                        value={formData.interest_in_science}
                        onChange={handleChange}
                        className="w-full bg-white dark:bg-primary-950/50 border border-primary-100 dark:border-primary-800 rounded-2xl py-5 pl-14 pr-6 focus:ring-2 focus:ring-primary-800 outline-none text-sm transition-all shadow-sm appearance-none"
                      >
                        <option value="">Select Level</option>
                        {interestInScience.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary-700/50 dark:text-primary-300/50 ml-2">Last Class Position</label>
                    <div className="relative">
                      <ClipboardCheck size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-primary-400" />
                      <select
                        required
                        name="last_class_position"
                        value={formData.last_class_position}
                        onChange={handleChange}
                        className="w-full bg-white dark:bg-primary-950/50 border border-primary-100 dark:border-primary-800 rounded-2xl py-5 pl-14 pr-6 focus:ring-2 focus:ring-primary-800 outline-none text-sm transition-all shadow-sm appearance-none"
                      >
                        <option value="">Select Position</option>
                        {classPositions.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary-700/50 dark:text-primary-300/50 ml-2">Total Students in Class</label>
                    <div className="relative">
                      <User size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-primary-400" />
                      <input
                        required
                        type="text"
                        name="number_of_student_in_class"
                        value={formData.number_of_student_in_class}
                        onChange={handleChange}
                        placeholder="e.g. 45"
                        className="w-full bg-white dark:bg-primary-950/50 border border-primary-100 dark:border-primary-800 rounded-2xl py-5 pl-14 pr-6 focus:ring-2 focus:ring-primary-800 outline-none text-sm transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="md:col-span-2 flex items-center gap-3 p-5 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-2xl border border-red-100 dark:border-red-900/30 text-xs font-bold"
                      >
                        <AlertCircle size={18} />
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="md:col-span-2 mt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto px-12 py-5 bg-primary-800 hover:bg-primary-900 disabled:opacity-50 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-2xl flex items-center justify-center gap-3 group"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Complete Registration
                          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                    <p className="mt-8 text-[10px] text-primary-700/40 dark:text-primary-300/40 font-bold uppercase tracking-widest animate-pulse">
                      Ensure all details are correct before submission.
                    </p>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50 dark:bg-emerald-950/20 rounded-[4rem] p-16 text-center border border-emerald-100 dark:border-emerald-900/30 shadow-2xl"
              >
                <div className="bg-emerald-100 dark:bg-emerald-900/30 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-10 shadow-xl shadow-emerald-500/10">
                  <CheckCircle2 size={48} className="text-emerald-600" />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-emerald-900 dark:text-emerald-100 mb-6 uppercase tracking-tight italic">
                  Registration <br /> Complete!
                </h2>
                <p className="text-emerald-800/60 dark:text-emerald-100/60 font-medium max-w-sm mx-auto mb-12 italic">
                  Great job, {formData.full_name.split(' ')[0]}! You are now registered for the Bridget Foundation Qualifying Quiz. Check your email for next steps.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-900 dark:text-emerald-100 hover:gap-4 transition-all"
                >
                  Return to Home
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>

      <Footer />
    </main>
  )
}
