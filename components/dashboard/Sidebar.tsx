'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  User,
  Settings,
  LogOut,
  GraduationCap
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

const navItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My Applications', href: '/dashboard/applications', icon: FileText },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
  { name: 'Scholarships', href: '/dashboard/scholarships', icon: GraduationCap },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export const Sidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <aside className="w-72 h-screen fixed left-0 top-0 bg-white dark:bg-primary-950 border-r border-primary-100 dark:border-primary-900 flex flex-col z-40">
      <div className="p-8">
        <Link href="/" className="flex items-center gap-2 mb-10">
          <div className="p-2 bg-primary-800 rounded-xl">
            <GraduationCap className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold text-primary-900 dark:text-white tracking-tight">
            Bridget<span className="text-primary-500 italic">Foundation</span>
          </span>
        </Link>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group',
                  isActive
                    ? 'bg-primary-800 text-white shadow-lg shadow-primary-900/20'
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

      <div className="mt-auto p-8 space-y-4">
        <div className="p-4 bg-primary-50 dark:bg-primary-900/30 rounded-2xl flex items-center gap-3 border border-primary-100 dark:border-primary-800">
          <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center text-primary-800 dark:text-primary-300 font-bold uppercase">
            SU
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-primary-900 dark:text-white truncate">Student User</p>
            <p className="text-xs text-primary-700/50 dark:text-primary-300/50 truncate">student@example.com</p>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}

