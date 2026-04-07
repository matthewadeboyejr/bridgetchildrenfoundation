'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MobileNav } from '@/components/dashboard/MobileNav'
import { 
  BarChart3, 
  Users, 
  FileCheck, 
  GraduationCap, 
  Settings, 
  LogOut,
  Bell,
  Search
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

const adminNavItems = [
  { name: 'Dashboard', href: '/admin', icon: BarChart3 },
  { name: 'Applications', href: '/admin/applications', icon: FileCheck },
  { name: 'Students', href: '/admin/students', icon: Users },
  { name: 'Scholarships', href: '/admin/scholarships', icon: GraduationCap },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-primary-50 dark:bg-primary-950/20">
      <MobileNav items={adminNavItems} title="Admin Panel" />
      
      {/* Sidebar */}
      <aside className="w-72 h-screen fixed left-0 top-0 bg-white dark:bg-primary-950 border-r border-primary-100 dark:border-primary-900 hidden lg:flex flex-col z-40">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-2 mb-10">
            <div className="p-2 bg-primary-800 rounded-xl">
              <GraduationCap className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold text-primary-900 dark:text-white tracking-widest uppercase">
              Admin<span className="text-primary-500 italic">Panel</span>
            </span>
          </Link>

          <nav className="space-y-2">
            {adminNavItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group',
                    isActive 
                      ? 'bg-primary-800 text-white shadow-lg shadow-primary-900/10' 
                      : 'text-primary-700/60 dark:text-primary-300/60 hover:bg-primary-50 dark:hover:bg-primary-900/50 hover:text-primary-800'
                  )}
                >
                  <Icon size={20} className={cn(isActive ? 'text-white' : 'text-primary-400 group-hover:text-primary-800')} />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-primary-100 dark:border-primary-900">
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all text-left"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-72">
        <header className="h-20 bg-white/80 dark:bg-primary-950/80 backdrop-blur-md border-b border-primary-100 dark:border-primary-900 px-8 flex items-center justify-between sticky top-0 z-30 hidden lg:flex">
          <div className="relative w-96 hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" size={18} />
            <input 
              type="text" 
              placeholder="Search everything..."
              className="w-full pl-12 pr-4 py-2.5 bg-white dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 rounded-xl focus:ring-2 focus:ring-primary-800 outline-none text-sm transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 text-primary-700/60 dark:text-primary-300/60 hover:bg-primary-50 dark:hover:bg-primary-900/50 rounded-xl transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary-500 rounded-full border-2 border-white dark:border-primary-950" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-primary-100 dark:border-primary-900">
               <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-primary-900 dark:text-white">Admin Unit</p>
                  <p className="text-xs text-primary-700/50 dark:text-primary-300/50">Master Admin</p>
               </div>
               <div className="w-10 h-10 rounded-xl bg-primary-800 flex items-center justify-center text-white font-bold">
                  A
               </div>
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

