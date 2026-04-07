'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, AnimatePresence } from 'framer-motion'
import { GraduationCap, Menu, X, Search, User, ClipboardCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50)
    })
  }, [scrollY])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Scholarships', href: '/scholarships' },
    { name: 'About Us', href: '/about' },
    // { name: 'Our Impact', href: '#impact' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4',
        isScrolled ? 'bg-white dark:bg-primary-950 shadow-xl py-3' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="p-2 bg-primary-800 rounded-xl group-hover:rotate-12 transition-all">
            <ProjectGraduationCap className="text-white" size={24} />
          </div>
          <span className={cn(
            "text-2xl font-black tracking-tighter transition-colors",
            isScrolled ? "text-primary-900 dark:text-white" : "text-primary-900 dark:text-white"
          )}>
            Bridget<span className="text-primary-500">Foundation</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-bold uppercase tracking-widest transition-all hover:text-primary-500",
                isScrolled ? "text-primary-900 dark:text-primary-100" : "text-primary-900 dark:text-white"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Icons & Button */}
        <div className="hidden md:flex items-center gap-6">
          <button className={cn(
            "p-2 hover:bg-primary-50 dark:hover:bg-primary-900 rounded-lg transition-all",
            isScrolled ? "text-primary-900 dark:text-white" : "text-primary-900 dark:text-white"
          )}>
            <Search size={20} />
          </button>

          <Link
            href="/apply"
            className={cn(
              "flex items-center gap-2 px-6 py-3 bg-primary-800 hover:bg-primary-900 text-white text-xs font-black uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg shadow-primary-900/10",
              isScrolled ? "" : ""
            )}
          >
            <ClipboardCheck size={16} />
            Register for Quiz
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-primary-900 dark:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-6 right-6 mt-4 bg-white dark:bg-primary-900 rounded-4xl border border-primary-100 dark:border-primary-800 p-8 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-primary-900 dark:text-primary-100 text-lg font-black uppercase tracking-widest hover:text-primary-500 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-primary-100 dark:border-primary-800" />
              <Link
                href="/apply"
                className="bg-primary-800 text-white text-center font-black uppercase tracking-widest py-4 rounded-2xl shadow-lg flex items-center justify-center gap-3"
                onClick={() => setIsOpen(false)}
              >
                <ClipboardCheck size={18} />
                Register for Quiz
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
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
