'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'

export const About = () => {
  return (
    <section className="py-24 bg-white dark:bg-primary-950 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          {/* Left: Image Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative pb-20 lg:pb-0"
          >
            <div className="aspect-[4/5] relative rounded-[4rem] overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[url('/founderImg.jpeg')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-primary-950/20" />
            </div>

            {/* Quote Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="lg:absolute lg:-bottom-8 lg:-left-8 lg:right-12 bg-primary-800 text-white p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl z-20 -mt-16 lg:mt-0 mx-4 lg:mx-0 relative"
            >
              <ProjectGraduationCap className="mb-4 opacity-20 hidden md:block" size={40} />
              <p className="text-sm md:text-lg font-medium italic leading-relaxed mb-6">
                &quot;The foundation is named in honor of my grandmother, Bridget, whose deep belief in the transformative power of education continues to inspire our mission.&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm md:text-base">IU</div>
                <div>
                  <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white">Dr. Isah Usman</p>
                  <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-primary-400 font-bold italic">Founder & Philanthropist</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Content Side */}
          <div className="lg:w-1/2 space-y-12">
            <div>
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-primary-400 mb-6 block">Our Identity & Mission</span>
              <h2 className="text-4xl md:text-6xl font-bold text-primary-900 dark:text-white mb-8 tracking-tighter uppercase leading-[0.9] italic">
                Bridging the Gap <br />
                For Future <span className="text-primary-500 not-italic font-black">Leaders.</span>
              </h2>
              <div className="space-y-6 text-primary-800/80 dark:text-primary-100/60 font-medium leading-relaxed">
                <p>
                  Bridget Foundation is a philanthropic initiative conceived and funded by <span className="text-primary-900 dark:text-white font-bold underline decoration-primary-500/30">Dr. Isah Usman</span>, driven by a strong commitment to expanding educational opportunities for talented students from disadvantaged backgrounds.
                </p>
                <p>
                  Founded in 2023, the foundation was established with a clear mission: To support academically gifted students who have the ability to excel but lack the financial resources to pursue their educational goals.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-primary-500 mb-4 italic">The Goal</h4>
                <p className="text-sm text-primary-800/70 dark:text-primary-100/40 leading-relaxed italic font-medium">
                  Goes beyond recognizing academic excellence; it also seeks to reward resilience, determination, and potential.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-primary-500 mb-4 italic">The Focus</h4>
                <p className="text-sm text-primary-800/70 dark:text-primary-100/40 leading-relaxed italic font-medium">
                  Scholarship support from secondary through tertiary education, emphasizing science and related disciplines.
                </p>
              </div>
            </div>

            {/* Impact Promise Card */}
            <div className="p-10 bg-primary-50 dark:bg-primary-900/40 rounded-[2.5rem] border border-primary-100 dark:border-primary-800">
              <p className="text-primary-800 dark:text-primary-100 italic font-medium leading-relaxed text-sm">
                &quot;Her legacy lives on through the opportunities created for young people whose dreams might otherwise remain out of reach.&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectGraduationCap({ size, className }: { size: number, className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  )
}
