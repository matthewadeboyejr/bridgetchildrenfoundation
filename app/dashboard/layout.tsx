'use client'

import React from 'react'
import { Sidebar, navItems } from '@/components/dashboard/Sidebar'
import { MobileNav } from '@/components/dashboard/MobileNav'
import { Search, Bell } from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-primary-50 dark:bg-primary-950/20">
      <Sidebar />
      <MobileNav items={navItems} />
      
      <div className="lg:pl-72">
        {/* Desktop Header */}
        <header className="h-20 bg-white/80 dark:bg-primary-950/80 backdrop-blur-md border-b border-primary-100 dark:border-primary-900 px-8 flex items-center justify-between sticky top-0 z-30 hidden lg:flex">
          <div className="relative w-96 hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" size={18} />
            <input 
              type="text" 
              placeholder="Search scholarships or applications..."
              className="w-full pl-12 pr-4 py-2.5 bg-white dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 rounded-xl focus:ring-2 focus:ring-primary-800 outline-none text-sm transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 text-primary-700/60 dark:text-primary-300/60 hover:bg-primary-50 dark:hover:bg-primary-900/50 rounded-xl transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary-500 rounded-full border-2 border-white dark:border-primary-950" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-primary-800 flex items-center justify-center text-white font-bold cursor-pointer hover:shadow-lg hover:shadow-primary-900/10 transition-all">
              S
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
