'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  LogOut, 
  GraduationCap 
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { createClient } from '@/utils/supabase/client'

interface NavItem {
  name: string
  href: string
  icon: any
}

interface MobileNavProps {
  items: NavItem[]
  title?: string
  logo?: React.ReactNode
}

export const MobileNav = ({ items, title = "Bridget Foundation", logo }: MobileNavProps) => {
  const [profile, setProfile] = useState<any>(null)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from('profiles')
        .select('full_name, email')
        .eq('id', user.id)
        .single()
      
      setProfile(data)
    }
    fetchProfile()
  }, [])

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'ST'
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden h-20 bg-white/80 dark:bg-primary-950/80 backdrop-blur-md border-b border-primary-100 dark:border-primary-900 px-6 flex items-center justify-between sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <div className="p-1.5 bg-primary-800 rounded-lg">
            <GraduationCap className="text-white" size={18} />
          </div>
          <span className="text-lg font-bold text-primary-900 dark:text-white tracking-tight">
            Bridget<span className="text-primary-500 italic">Foundation</span>
          </span>
        </Link>
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 text-primary-800 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/50 rounded-xl transition-all"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-primary-950/40 backdrop-blur-sm z-50 lg:hidden"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-4/5 max-w-sm bg-white dark:bg-primary-950 border-r border-primary-100 dark:border-primary-900 z-60 flex flex-col lg:hidden shadow-2xl"
            >
              <div className="p-8 overflow-y-auto flex-1">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary-800 rounded-xl">
                      <GraduationCap className="text-white" size={20} />
                    </div>
                    <span className="text-xl font-bold text-primary-900 dark:text-white uppercase tracking-tight">
                      {title.split(" ")[0]}<span className="text-primary-500 italic font-medium">{title.split(" ")[1] || ""}</span>
                    </span>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-primary-400 hover:text-primary-800 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <nav className="space-y-2">
                  {items.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          'flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all group',
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

              <div className="mt-auto p-8 border-t border-primary-100 dark:border-primary-900 space-y-4">
                {profile && (
                  <div className="p-4 bg-primary-50 dark:bg-primary-900/30 rounded-2xl flex items-center gap-3 border border-primary-100 dark:border-primary-800">
                    <div className="w-10 h-10 rounded-full bg-primary-800 flex items-center justify-center text-white font-bold uppercase shrink-0">
                      {getInitials(profile.full_name)}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-bold text-primary-900 dark:text-white truncate">{profile.full_name}</p>
                      <p className="text-xs text-primary-700/50 dark:text-primary-300/50 truncate">{profile.email}</p>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all text-left"
                >
                  <LogOut size={20} />
                  Sign Out
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
