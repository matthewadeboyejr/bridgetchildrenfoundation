import { Navbar } from '@/components/landing/Navbar'
import { Hero } from '@/components/landing/Hero'
import { About } from '@/components/landing/About'
import { Solutions } from '@/components/landing/Solutions'
import { Scholarships } from '@/components/landing/Scholarships'
import { Impact } from '@/components/landing/Impact'
import { Footer } from '@/components/landing/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-primary-950">
      <Navbar />
      <Hero />
      <div >
        <About />
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
