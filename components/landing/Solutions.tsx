'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ClipboardList, BrainCircuit, Trophy, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const steps = [
  {
    title: "Registration",
    desc: "Interested students from disadvantaged backgrounds register via our secure student portal and provide initial academic markers.",
    icon: <ClipboardList size={24} />,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=610"
  },
  {
    title: "Competitive Quiz",
    desc: "Candidates participate in a rigorous, time-bound academic quiz designed to test cognitive ability and scientific aptitude.",
    icon: <BrainCircuit size={24} />,
    image: "https://images.unsplash.com/photo-1567057420215-0afa9aa9253a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D"
  },
  {
    title: "Excellence Selection",
    desc: "Only those who excel in the assessment and demonstrate exceptional academic potential are moved to the final selection phase.",
    icon: <Trophy size={24} />,
    image: "https://images.unsplash.com/photo-1536337005238-94b997371b40?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
]

export const Solutions = () => {
  return (
    <section className="py-24 bg-primary-800 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl -mr-48 -mt-48" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-10">
          <div className="max-w-2xl">
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-primary-400 mb-6 block">The Pathway to Support</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter uppercase leading-[0.9] italic">
              Selection <br />
              Process.
            </h2>
          </div>
          <p className="text-primary-100/60 font-medium max-w-sm italic text-sm leading-relaxed">
            Our process is built on fairness and the pursuit of excellence, identifying the brightest minds who lack the means to reach their potential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-primary-900 rounded-[2.5rem] overflow-hidden group hover:shadow-2xl hover:shadow-black/20 transition-all border border-white/5"
            >
              <div className="relative aspect-video overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="absolute inset-0 bg-primary-900/40" />
                <div className="absolute -bottom-6 left-10 w-14 h-14 bg-primary-800 text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-primary-500 transition-all">
                  {item.icon}
                </div>
              </div>

              <div className="p-10 pt-12 text-left">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-black text-primary-500">Step 0{i + 1}</span>
                  <div className="h-px w-8 bg-primary-100 dark:bg-primary-800" />
                </div>
                <h3 className="text-xl font-bold text-primary-900 dark:text-white mb-4 uppercase tracking-tighter">{item.title}</h3>
                <p className="text-primary-700/60 dark:text-primary-300/60 text-xs font-medium leading-relaxed mb-8 italic">
                  {item.desc}
                </p>
                <Link href="/apply" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary-800 dark:text-primary-300 hover:text-primary-500 transition-all group-hover:gap-4">
                  Get Started
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
