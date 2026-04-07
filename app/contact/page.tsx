'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  Loader2
} from 'lucide-react'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setFormState('success')
  }

  const contactInfos = [
    {
      icon: <Mail size={24} />,
      label: 'Email Support',
      value: 'info@bridgetfoundation.com',
      href: 'mailto:info@bridgetfoundation.com',
      color: 'bg-primary-50 text-primary-800'
    },
    {
      icon: <Phone size={24} />,
      label: 'Phone Line',
      value: '+234 800 BRIDGET',
      href: 'tel:+2348002743438',
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      icon: <MapPin size={24} />,
      label: 'Visit Us',
      value: 'Abuja, Nigeria',
      href: '#',
      color: 'bg-amber-50 text-amber-600'
    }
  ]

  const socials = [
    { icon: <Facebook size={20} />, href: '#' },
    { icon: <Twitter size={20} />, href: '#' },
    { icon: <Instagram size={20} />, href: '#' },
    { icon: <Linkedin size={20} />, href: '#' }
  ]

  return (
    <main className="min-h-screen bg-white dark:bg-primary-950 overflow-x-hidden pt-20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-200 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-100 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300 rounded-full text-xs font-black uppercase tracking-widest mb-6"
          >
            <MessageSquare size={14} />
            Contact Our Team
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-primary-900 dark:text-white uppercase tracking-tighter mb-6 leading-tight"
          >
            Bridge the Gap.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-800 to-emerald-600">Connect with Us.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-primary-700/60 dark:text-primary-300/60 text-lg md:text-xl max-w-2xl mx-auto font-medium"
          >
            Whether you are a prospective scholar, a potential partner, or just want to learn more about our mission, our team is here to support you.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-primary-900 dark:text-white uppercase tracking-tight">Direct Support</h3>
              <div className="grid grid-cols-1 gap-4">
                {contactInfos.map((info, idx) => (
                  <motion.a
                    key={idx}
                    href={info.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className="flex items-center gap-5 p-6 bg-white dark:bg-primary-900/10 border border-primary-100 dark:border-primary-800 rounded-[2rem] hover:bg-primary-50 transition-all group group"
                  >
                    <div className={`w-12 h-12 rounded-2xl ${info.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary-700/50 mb-1">{info.label}</p>
                      <p className="text-primary-900 dark:text-white font-bold">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-primary-900 dark:text-white uppercase tracking-tight">Connect Socially</h3>
              <div className="flex gap-4">
                {socials.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="w-14 h-14 bg-white dark:bg-primary-900/10 border border-primary-100 dark:border-primary-800 rounded-2xl flex items-center justify-center text-primary-600 dark:text-primary-400 hover:bg-primary-800 hover:text-white transition-all shadow-sm"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-primary-950 p-8 md:p-12 rounded-[3.5rem] border border-primary-100 dark:border-primary-800 shadow-2xl relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {formState !== 'success' ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary-700/50 px-2">Your Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                          className="w-full p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary-800 transition-all font-medium text-sm"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-primary-700/50 px-2">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
                          className="w-full p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary-800 transition-all font-medium text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-primary-700/50 px-2">Subject</label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="General Inquiry"
                        className="w-full p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 rounded-2xl outline-none focus:ring-2 focus:ring-primary-800 transition-all font-medium text-sm"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-primary-700/50 px-2">Your Message</label>
                      <textarea
                        required
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us how we can help..."
                        rows={6}
                        className="w-full p-6 bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 rounded-3xl outline-none focus:ring-2 focus:ring-primary-800 transition-all font-medium text-sm resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formState === 'submitting'}
                      className="w-full py-5 bg-primary-800 hover:bg-primary-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl shadow-primary-900/20 transition-all group disabled:opacity-70"
                    >
                      {formState === 'submitting' ? (
                        <>
                          <Loader2 className="animate-spin" size={18} />
                          Transmitting...
                        </>
                      ) : (
                        <>
                          <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          Send Message
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-20 text-center space-y-6"
                  >
                    <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle2 size={48} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-3xl font-black text-primary-900 dark:text-white uppercase tracking-tighter">Transmission Successful!</h3>
                      <p className="text-primary-700/60 dark:text-primary-300/60 font-medium">Your message has been bridge to our operations team. We will respond shortly.</p>
                    </div>
                    <button
                      onClick={() => setFormState('idle')}
                      className="inline-flex items-center gap-2 text-primary-800 font-bold hover:gap-4 transition-all uppercase text-[10px] tracking-widest"
                    >
                      Send another message
                      <ArrowRight size={14} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
