'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Users, GraduationCap, Globe, Zap } from 'lucide-react'

const stats = [
  { label: 'Scholarships Awarded', value: '500+', icon: <GraduationCap size={24} /> },
  { label: 'Communities Impacted', value: '10+', icon: <Globe size={24} /> },
  { label: 'Student Success Rate', value: '98%', icon: <Zap size={24} /> },
  { label: 'Active Beneficiaries', value: '1000+', icon: <Users size={24} /> },
]

export const Impact = () => {
  return (
    <section id="impact" className="py-24 bg-white dark:bg-primary-950 overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 space-y-8"
          >
            <div>
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-primary-400 mb-6 block">Our Community Promise</span>
              <h2 className="text-4xl md:text-6xl font-bold text-primary-900 dark:text-white mb-8 tracking-tighter uppercase leading-[0.95] italic">
                Nurturing <span className="text-primary-500 not-italic font-black">Leaders</span> <br /> & Innovators.
              </h2>
              <p className="text-primary-700/60 dark:text-primary-300/60 font-medium leading-relaxed max-w-lg italic">
                By investing in education, Bridget Foundation aims to nurture the next generation of leadership who will positively impact their communities and society.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="p-8 rounded-4xl bg-primary-50/50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-800 transition-all hover:-translate-y-1 hover:shadow-xl group">
                  <div className="text-primary-500 mb-6 group-hover:scale-110 transition-transform">{stat.icon}</div>
                  <div className="text-4xl font-black text-primary-900 dark:text-white mb-2 tracking-tighter tabular-nums">{stat.value}</div>
                  <div className="text-[10px] font-black text-primary-700/50 dark:text-primary-300/50 uppercase tracking-[0.2em]">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="aspect-4/5 relative rounded-[4rem] overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-primary-800/20 z-10" />
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=2071')] bg-cover bg-center" />
              <div className="absolute bottom-10 left-10 right-10 z-20 bg-white/90 dark:bg-primary-900/90 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/20 shadow-2xl">
                <p className="text-primary-900 dark:text-white font-bold text-xl italic mb-6 leading-relaxed">
                  &quot;This scholarship didn&apos;t just pay my fees; it gave me the confidence to aim for the stars.&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-800" />
                  <div>
                    <span className="block text-sm font-black uppercase tracking-tight text-primary-900 dark:text-white underline decoration-primary-500 decoration-2">Student Recipient</span>
                    <span className="text-[10px] font-bold text-primary-500 uppercase tracking-widest">Class of 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
