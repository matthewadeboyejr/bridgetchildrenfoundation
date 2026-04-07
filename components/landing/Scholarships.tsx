'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Microscope, ArrowRight, GraduationCap } from 'lucide-react'
import Link from 'next/link'

export const Scholarships = () => {
  return (
    <section id="scholarships" className="py-24 bg-white dark:bg-primary-950">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
          <div className="max-w-2xl">
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-primary-400 mb-6 block">Foundation Initiatives</span>
            <h2 className="text-4xl md:text-6xl font-bold text-primary-900 dark:text-white tracking-tighter uppercase leading-[0.9] italic">
              Scholarship <br />
              Programs.
            </h2>
          </div>
          <div className="p-8 bg-primary-50 dark:bg-primary-900/40 rounded-[2.5rem] border border-primary-100 dark:border-primary-800 max-w-sm">
            <p className="text-xs font-bold text-primary-700/60 dark:text-primary-300/60 leading-relaxed italic">
              &quot;The Bridget Foundation is committed to identifying students who demonstrate exceptional academic ability and clear potential.&quot;
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-primary-900 rounded-[4rem] overflow-hidden group shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row items-stretch">
            {/* Image Side */}
            <div className="lg:w-1/2 relative min-h-[400px]">
              <div
                className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1698827624538-02ee6364cbd0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary-900/20" />
              <div className="absolute top-10 left-10 px-6 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-primary-900">
                Featured Program
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center text-white">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-primary-400">
                  <Microscope size={32} />
                </div>
                <span className="text-sm font-black uppercase tracking-[0.3em] text-primary-400">STEM Focus</span>
              </div>

              <h3 className="text-3xl md:text-5xl font-bold mb-8 uppercase tracking-tighter leading-tight italic">
                Science & Innovation <br /> Excellence Grant
              </h3>

              <p className="text-primary-100/60 text-lg font-medium leading-relaxed mb-12 italic">
                We place a particular emphasis on students pursuing studies in the sciences and related fields. This scholarship provides comprehensive support from secondary school through tertiary education.
              </p>

              <div className="flex flex-wrap items-center gap-8">
                <Link
                  href="/apply"
                  className="px-10 py-5 bg-white text-primary-900 hover:bg-primary-500 hover:text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl flex items-center gap-3"
                >
                  Register for Quiz
                  <ArrowRight size={18} />
                </Link>

                <div className="flex items-center gap-3 text-primary-400">
                  <GraduationCap size={24} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Applications Open</span>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative element */}
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mb-32" />
        </motion.div>
      </div>
    </section>
  )
}
