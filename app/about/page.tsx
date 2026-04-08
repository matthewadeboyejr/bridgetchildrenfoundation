'use client'

import { Navbar } from '@/components/landing/Navbar'

import { Solutions } from '@/components/landing/Solutions'
import { Scholarships } from '@/components/landing/Scholarships'
import { Impact } from '@/components/landing/Impact'
import { Footer } from '@/components/landing/Footer'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-primary-950">
      <Navbar />
      <div id="about">
        <section className="py-24 bg-white dark:bg-primary-950 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-24">
              {/* Left: Image Side */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="lg:w-1/2 relative"
              >
                <div className="aspect-[4/5] relative rounded-[4rem] overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-[url('/')] bg-cover bg-center" />
                  <div className="absolute inset-0 bg-primary-950/20" />
                </div>

                {/* Quote Overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="absolute bottom-10 -left-10 right-10 bg-primary-800 text-white p-12 rounded-[3rem] shadow-2xl"
                >
                  <ProjectGraduationCap className="mb-6 opacity-20" size={48} />
                  <p className="text-lg md:text-xl font-medium italic leading-relaxed mb-8">
                    &quot;The foundation is named in honor of my grandmother, Bridget, whose deep belief in the transformative power of education continues to inspire our mission.&quot;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-lg">IU</div>
                    <div>
                      <p className="text-sm font-black uppercase tracking-widest">Dr. Isah Usman</p>
                      <p className="text-xs uppercase tracking-widest text-primary-400 font-bold italic">Founder & Philanthropist</p>
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
                      Established in 2023, the foundation was created with a clear mission: to support academically gifted students who lack the financial means to pursue their educational aspirations.
                    </p>
                    <p>
                      The foundation focuses on providing scholarships for students from secondary school through tertiary education, with a particular emphasis on those pursuing studies in the sciences and related fields. By investing in education, the Bridget Children Foundation For Quality Education aims to nurture future leaders, innovators, and professionals who will contribute positively to their communities and society at large.

                    </p>
                    <p>
                      At the heart of the foundation is a rigorous and evolving selection process designed to identify bright, intelligent, and highly motivated students within the community. The goal is not only to reward academic excellence but also to recognize determination, resilience, and potential.

                    </p>
                    <p>
                      The Bridget Children Foundation For Quality Education is named in honor of Dr. Usman’s grandmother, Bridget, whose deep appreciation for education and belief in its transformative power continues to inspire the foundation’s mission. Her legacy lives on through the opportunities created for young people whose dreams might otherwise remain out of reach.
                      Through education, mentorship, and opportunity, the Bridget Children Foundation For Quality Education seeks to empower the next generation and create lasting impact in the communities it serves.
                    </p>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </section>
        <section>
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
        </section>


      </div>
      <Solutions />
      <div id="scholarships">
        <Scholarships />
      </div>
      <Impact />
      <Footer />
    </main>
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
