import './globals.css';
import type { Metadata } from 'next';
import { Inter, Calistoga } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import ChristmasSnow from "@/components/ChristmasSnow";
import Link from "next/link";
import { Linkedin, Twitter, Instagram, Youtube, Mail } from "lucide-react";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const calistoga = Calistoga({ weight: '400', subsets: ['latin'], variable: '--font-heading' });

export const metadata: Metadata = {
  title: 'HR Mentorship',
  description: 'Where HR Careers Grow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${calistoga.variable} font-sans antialiased bg-slate-50 dark:bg-slate-950 flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ChristmasSnow />
          <Navbar />
          
          <main className="flex-1 w-full">
            {children}
          </main>
          
          <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-16 px-6 mt-auto z-40 relative">
             <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 mb-12">
                
                {/* 1. Brand & Description */}
                <div className="md:col-span-1">
                   <h3 className="font-heading font-bold text-2xl text-slate-900 dark:text-white mb-4">HR Mentorship</h3>
                   <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                     A thriving HR community dedicated to learning, connection, and career growth.
                   </p>
                   {/* ADDED: Stay Connected Socials */}
                   <div className="flex gap-4">
                      <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 hover:bg-primary hover:text-white transition"><Linkedin size={18}/></a>
                      <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 hover:bg-primary hover:text-white transition"><Twitter size={18}/></a>
                      <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 hover:bg-primary hover:text-white transition"><Instagram size={18}/></a>
                      <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 hover:bg-primary hover:text-white transition"><Youtube size={18}/></a>
                      <a href="mailto:hello@hrmentorship.com" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 hover:bg-primary hover:text-white transition"><Mail size={18}/></a>
                   </div>
                </div>

                {/* 2. Quick Links */}
                <div>
                   <h4 className="font-bold text-slate-900 dark:text-white mb-4 uppercase text-sm tracking-wider">Quick Links</h4>
                   <ul className="space-y-3 text-slate-500 dark:text-slate-400">
                      <li><Link href="/" className="hover:text-primary transition">Home</Link></li>
                      <li><Link href="/about" className="hover:text-primary transition">About Us</Link></li>
                      <li><Link href="/team" className="hover:text-primary transition">Meet the Team</Link></li>
                      <li><Link href="/learning/resources" className="hover:text-primary transition">Learning Centre</Link></li>
                      <li><Link href="/gallery" className="hover:text-primary transition">Gallery</Link></li>
                   </ul>
                </div>

                {/* 3. Contact Info */}
                <div>
                   <h4 className="font-bold text-slate-900 dark:text-white mb-4 uppercase text-sm tracking-wider">Contact</h4>
                   <ul className="space-y-3 text-slate-500 dark:text-slate-400">
                      <li>Lagos, Nigeria</li>
                      <li><a href="mailto:hello@hrmentorship.com" className="hover:text-primary transition">hello@hrmentorship.com</a></li>
                      <li><Link href="/contact" className="hover:text-primary transition">Get in touch</Link></li>
                   </ul>
                </div>
             </div>

             <div className="max-w-7xl mx-auto border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-slate-400 text-sm">
                  © 2025 HR Mentorship. All rights reserved.
                </div>
                <div className="flex gap-6 text-slate-500 text-sm">
                   <Link href="#" className="hover:text-primary transition">Privacy Policy</Link>
                   <Link href="#" className="hover:text-primary transition">Terms of Service</Link>
                </div>
             </div>
          </footer>

        </ThemeProvider>
      </body>
    </html>
  );
}
