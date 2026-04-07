'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Users, GraduationCap } from 'lucide-react'
import Link from 'next/link'

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col pt-20">
      <div className="flex flex-col lg:flex-row flex-1">
        {/* Left Side: Content */}
        <div className="lg:w-[50%] bg-primary-800 flex items-center px-6 md:px-12 lg:px-24 py-20 relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-block px-4 py-1.5 bg-white/10 rounded-full mb-8"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Founded in 2023</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter uppercase leading-[0.9] italic"
            >
              Empowering <br />
              The Next <span className="text-primary-500 font-black not-italic">Generation.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-primary-100/60 font-medium mb-12 max-w-md italic leading-relaxed"
            >
              Nurturing academically gifted students through comprehensive scholarships and mentorship, fueled by a legacy of belief in education.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-6"
            >
              <Link
                href="/apply"
                className="px-10 py-5 bg-primary-500 hover:bg-white hover:text-primary-800 text-white rounded-xl font-black uppercase tracking-widest transition-all shadow-xl shadow-black/20"
              >
                Register for Quiz
              </Link>
              <button className="flex items-center gap-4 group">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-primary-800 text-white transition-all">
                  <Play size={20} className="fill-current" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-white border-b border-white/20 pb-1 group-hover:border-white transition-all">
                  Dr. Usman&apos;s Vision
                </span>
              </button>
            </motion.div>
          </div>

          {/* Abstract background element */}
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl -ml-48 -mb-48" />
        </div>

        {/* Right Side: Image */}
        <div className="lg:flex-1 relative min-h-[400px]">
          <div className="absolute inset-0 bg-[url('/heroImg.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-primary-900/10" />

          {/* Brand Mark Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
            <GraduationCap size={400} className="text-white" />
          </div>
        </div>
      </div>

      {/* Overlapping Feature Cards */}
      <div className="container mx-auto px-6 -mt-16 relative z-20 pb-20 lg:pb-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Our Heritage",
              desc: "Named in honor of Bridget, whose belief in education inspires our mission.",
              icon: <Users size={24} />,
              label: "Foundation",
              href: "/about"
            },
            {
              title: "STEM Focus",
              desc: "Special emphasis on students pursuing studies in science and related disciplines.",
              icon: <ArrowRight size={24} />,
              label: "Academic",
              href: "/about"
            },
            {
              title: "Lasting Impact",
              desc: "Nurturing the next generation of leaders and community innovators.",
              icon: <GraduationCap size={24} />,
              label: "Outcomes",
              href: "/about"
            }
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              className="bg-white dark:bg-primary-900 p-10 rounded-[2.5rem] shadow-2xl shadow-primary-900/5 group cursor-pointer border border-primary-50/50 dark:border-primary-800 hover:-translate-y-2 transition-all"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-400">{card.label}</span>
                <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-950 flex items-center justify-center text-primary-800 group-hover:bg-primary-800 group-hover:text-white transition-all">
                  {card.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-primary-900 dark:text-white mb-4 uppercase tracking-tighter">{card.title}</h3>
              <p className="text-primary-700/60 dark:text-primary-300/60 text-sm font-medium leading-relaxed mb-6 italic">
                {card.desc}
              </p>
              <Link href={card.href} className="text-xs font-black uppercase tracking-widest text-primary-800 dark:text-primary-300 border-b-2 border-primary-100 dark:border-primary-800 pb-1 group-hover:border-primary-500 transition-all">
                Learn More
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
//https://images.unsplash.com/photo-1567057419565-4349c49d8a04?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D