'use client'

import { Navbar } from '@/components/landing/Navbar'

import { Solutions } from '@/components/landing/Solutions'
import { Scholarships } from '@/components/landing/Scholarships'
import { Impact } from '@/components/landing/Impact'
import { Footer } from '@/components/landing/Footer'
import { motion } from 'framer-motion'

export default function ScholarshipsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-primary-950">
      <Navbar />
      <Scholarships />
      <Solutions />
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
