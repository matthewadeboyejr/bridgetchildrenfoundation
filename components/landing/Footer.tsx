'use client'

import React from 'react'
import Link from 'next/link'
import { GraduationCap, Mail, Phone, MapPin, Twitter, Linkedin, Facebook, ArrowRight, User } from 'lucide-react'

export const Footer = () => {
  return (
    <footer id="contact" className="bg-primary-950 text-white selection:bg-primary-500 selection:text-white pb-12">
      {/* Top CTA Section */}
      <div className="container mx-auto px-6 py-20 relative overflow-hidden">
         <div className="bg-primary-800 rounded-[4rem] p-12 md:p-24 relative overflow-hidden text-center group">
            <div className="relative z-10">
               <span className="text-[11px] font-black uppercase tracking-[0.4em] text-primary-400 mb-8 block font-medium opacity-80">Empowering The Next Generation</span>
               <h2 className="text-4xl md:text-7xl font-bold mb-12 tracking-tighter uppercase leading-[0.9] italic">
                  Nurturing Leaders <br />
                  Through Scientific <br />
                  Excellence.
               </h2>
               <div className="flex flex-wrap justify-center gap-6">
                  <Link 
                    href="/login"
                    className="px-10 py-5 bg-white text-primary-800 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl hover:bg-primary-500 hover:text-white flex items-center gap-2"
                  >
                    <User size={18} className="fill-current" />
                    Student Access
                  </Link>
                  <Link 
                    href="#scholarships"
                    className="px-10 py-5 bg-transparent border-2 border-white/20 text-white rounded-2xl font-black uppercase tracking-widest transition-all hover:border-white flex items-center gap-2"
                  >
                    View Programs
                    <ArrowRight size={18} />
                  </Link>
               </div>
            </div>
            
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl transition-all group-hover:bg-white/10" />
         </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-8 group">
              <div className="p-2 bg-primary-800 rounded-xl group-hover:rotate-12 transition-transform">
                <GraduationCap className="text-white" size={28} />
              </div>
              <span className="text-3xl font-bold tracking-tighter uppercase italic">
                Bridget<span className="text-primary-500">Foundation</span>
              </span>
            </Link>
            <p className="text-primary-100/40 text-xs font-medium leading-relaxed mb-8 italic">
              A philanthropic initiative conceived and funded by Dr. Isah Usman, dedicated to expanding educational opportunities since 2023.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg hover:bg-primary-500 transition-all"><Twitter size={18} /></a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg hover:bg-primary-500 transition-all"><Linkedin size={18} /></a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg hover:bg-primary-500 transition-all"><Facebook size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-primary-400 italic">Quick Links</h4>
            <ul className="space-y-4 text-primary-100/60 font-bold uppercase tracking-widest text-[10px]">
              <li><Link href="#about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="#scholarships" className="hover:text-white transition-colors">Program Details</Link></li>
              <li><Link href="#impact" className="hover:text-white transition-colors">Impact Analysis</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Portal Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-primary-400 italic">Foundation</h4>
            <ul className="space-y-4 text-primary-100/60 font-bold uppercase tracking-widest text-[10px]">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Selection Process</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Official Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-primary-400 italic">Get in Touch</h4>
            <ul className="space-y-6 text-primary-100/60 font-medium text-xs">
              <li className="flex items-start gap-4">
                <MapPin size={18} className="text-primary-500 shrink-0" />
                <span className="italic">Abuja Headquarters, <br /> Nigeria</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={18} className="text-primary-500 shrink-0" />
                <span className="font-bold">info@bridgetfoundation.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-primary-100/20">
          <p>© {new Date().getFullYear()} Bridget Foundation. Funded by Dr. Isah Usman Initiative.</p>
          <div className="flex gap-8 italic">
            <span>The Power of Education</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
