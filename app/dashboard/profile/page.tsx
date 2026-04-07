'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, GraduationCap, MapPin, Camera, Save } from 'lucide-react'

export default function ProfilePage() {
  const [loading, setLoading] = useState(false)

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary-900 dark:text-white mb-2 uppercase tracking-tighter">My Profile</h1>
        <p className="text-primary-700/60 dark:text-primary-300/60">Manage your personal information and academic records.</p>
      </div>

      <div className="bg-white dark:bg-primary-900/20 rounded-[2.5rem] border border-primary-100 dark:border-primary-800 overflow-hidden shadow-sm">
        {/* Cover / Header */}
        <div className="h-32 bg-primary-800" />
        
        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-8 flex items-end gap-6">
            <div className="relative group">
              <div className="w-32 h-32 rounded-[2rem] bg-white dark:bg-primary-900 p-1 shadow-xl">
                <div className="w-full h-full rounded-[1.8rem] bg-primary-100 dark:bg-primary-800 flex items-center justify-center text-primary-800 dark:text-primary-300 text-4xl font-black">
                  SU
                </div>
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-primary-500 text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all">
                <Camera size={18} />
              </button>
            </div>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-primary-900 dark:text-white uppercase tracking-tight">Student User</h2>
              <p className="text-primary-700/60 dark:text-primary-300/60 font-medium">Secondary School Student</p>
            </div>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary-900 dark:text-primary-100 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" size={18} />
                <input 
                  type="text" 
                  defaultValue="Student User"
                  className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-primary-950/50 border border-primary-100 dark:border-primary-800 rounded-2xl focus:ring-2 focus:ring-primary-800 outline-none text-sm transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary-900 dark:text-primary-100 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" size={18} />
                <input 
                  type="email" 
                  defaultValue="student@example.com"
                  disabled
                  className="w-full pl-12 pr-4 py-3.5 bg-primary-50 dark:bg-primary-950/50 border border-primary-100 dark:border-primary-800 rounded-2xl text-sm transition-all opacity-60 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary-900 dark:text-primary-100 ml-1">Current Institution</label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" size={18} />
                <input 
                  type="text" 
                  placeholder="e.g. Abuja International School"
                  className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-primary-950/50 border border-primary-100 dark:border-primary-800 rounded-2xl focus:ring-2 focus:ring-primary-800 outline-none text-sm transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary-900 dark:text-primary-100 ml-1">Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" size={18} />
                <input 
                  type="text" 
                  placeholder="City, State"
                  className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-primary-950/50 border border-primary-100 dark:border-primary-800 rounded-2xl focus:ring-2 focus:ring-primary-800 outline-none text-sm transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-primary-900 dark:text-primary-100 ml-1">Short Bio</label>
              <textarea 
                rows={4}
                placeholder="Tell us about yourself and your educational goals..."
                className="w-full px-4 py-3.5 bg-white dark:bg-primary-950/50 border border-primary-100 dark:border-primary-800 rounded-2xl focus:ring-2 focus:ring-primary-800 outline-none text-sm transition-all resize-none shadow-sm"
              />
            </div>

            <div className="md:col-span-2 pt-4">
              <button 
                type="submit"
                className="flex items-center gap-2 px-8 py-3 bg-primary-800 hover:bg-primary-900 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-900/10"
              >
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
