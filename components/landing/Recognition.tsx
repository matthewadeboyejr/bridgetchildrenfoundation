'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import { User, Award, ShieldCheck } from 'lucide-react'
import Image from 'next/image'

const founder = {
  name: 'Dr. Isah Usman',
  image: '/drusmas.png',
  role: 'Founder & Primary Sponsor',
  description: 'Conceived and funded by Dr. Isah Usman, the Bridget Foundation stands as a testament to his commitment to educational empowerment.'
}

const honorees = [
  {
    name: 'Mrs. Mbanenengen Ucha',
    image: '/mbanengen.jpeg',
    role: 'Notable Contributor'
  },
  {
    name: 'Miss Sonia Zainab Numbeve',
    image: '/sonia.jpeg',
    role: 'Notable Contributor'
  },
  {
    name: 'Mrs. RAMATU IGBUDU',
    image: '/ramatu.jpeg',
    role: 'Notable Contributor'
  },
  {
    name: 'Theophilus Sambe',
    image: null, // Placeholder
    role: 'Notable Contributor'
  },
  {
    name: 'Terna John Sule',
    image: '/terna.jpeg',
    role: 'Notable Contributor'
  }
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
}

export const Recognition = () => {
  return (
    <section className="py-24 bg-white dark:bg-primary-950 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-black uppercase tracking-[0.4em] text-primary-400 mb-6 block"
          >
            Support System
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-primary-900 dark:text-white mb-8 tracking-tighter uppercase leading-[0.95] italic"
          >
            Special <span className="text-primary-500 not-italic font-black">Recognition.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary-700/60 dark:text-primary-300/60 font-medium leading-relaxed italic"
          >
            We honor the leadership and the community members whose dedication has shaped the foundation&apos;s journey towards creating lasting impact through education.
          </motion.p>
        </div>

        {/* Featured Founder Section */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-primary-50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-800 rounded-[4rem] overflow-hidden group">
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <div className="lg:w-1/2 relative aspect-[4/5] lg:aspect-square overflow-hidden">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-950/20 to-transparent" />
                </div>
                <div className="lg:w-1/2 p-12 lg:pr-20 space-y-8">
                  <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary-500/10 border border-primary-500/20">
                    <ShieldCheck size={18} className="text-primary-500" />
                    <span className="text-xs font-black uppercase tracking-widest text-primary-500">Foundation Founder</span>
                  </div>
                  <div>
                    <h3 className="text-4xl lg:text-5xl font-black text-primary-900 dark:text-white tracking-tighter uppercase italic leading-none mb-4">
                      {founder.name}
                    </h3>
                    <p className="text-primary-800/70 dark:text-primary-100/40 text-lg italic leading-relaxed font-medium">
                      {founder.description}
                    </p>
                  </div>
                  <div className="pt-8 border-t border-primary-100 dark:border-primary-800">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-500 mb-2">Primary Recognition</p>
                    <p className="text-primary-900 dark:text-white font-bold">{founder.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Secondary Contributors Grid */}
        <div className="text-center mb-16">
          <h4 className="text-sm font-black uppercase tracking-[0.4em] text-primary-900 dark:text-white/40 mb-12">Notable Contributors</h4>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"
          >
            {honorees.map((person) => (
              <motion.div
                key={person.name}
                variants={itemVariants}
                className="group relative"
              >
                <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-primary-50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-800 transition-all hover:-translate-y-2 hover:shadow-xl active:scale-95">
                  {person.image ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={person.image}
                        alt={person.name}
                        fill
                        className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-950/40 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-primary-100/50 dark:bg-primary-800/20 text-primary-300 dark:text-primary-700 p-8 text-center">
                      <User size={60} strokeWidth={1} className="mb-4 opacity-50" />
                      <p className="text-[10px] font-black uppercase tracking-widest leading-tight">Image<br />Pending</p>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-2 mb-2 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                      <Award size={12} className="text-primary-500" />
                      <span className="text-[9px] font-black tracking-widest text-primary-500 uppercase">{person.role}</span>
                    </div>
                    <h3 className="text-base font-bold text-white dark:text-white leading-tight mb-1 group-hover:text-primary-200 transition-colors">
                      {person.name}
                    </h3>
                  </div>
                </div>

                {/* Decorative accent */}
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary-500/5 rounded-full blur-2xl group-hover:bg-primary-500/10 transition-all" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
