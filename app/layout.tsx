import './globals.css'
import type { Metadata } from 'next'
import { Inter, Bricolage_Grotesque } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-heading' })

export const metadata: Metadata = {
  title: 'HR Mentorship',
  description: 'Empowering HR professionals through personalized mentorship, cutting-edge resources, and a thriving community.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${bricolage.variable} font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white`}>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
