import './globals.css';
import type { Metadata } from 'next';
import { Inter, Calistoga } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import ChristmasSnow from "@/components/ChristmasSnow";
import Link from "next/link";
import { Linkedin, Twitter, Instagram, Youtube, Mail, Send } from "lucide-react";

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
             <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12">
                
                {/* 1. Brand */}
                <div className="md:col-span-1">
                   <h3 className="font-heading font-bold text-2xl text-slate-900 dark:text-white mb-4">HR Mentorship</h3>
                   <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                     Empowering HR professionals through personalized mentorship, cutting-edge resources, and a thriving community.
                   </p>
                   <a href="mailto:info@hrmentorship.org" className="text-sm font-bold text-primary hover:underline block mb-2">info@hrmentorship.org</a>
                   <p className="text-sm text-slate-500">+234 (800) 123 4567</p>
                </div>

                {/* 2. Quick Links */}
                <div>
                   <h4 className="font-bold text-slate-900 dark:text-white mb-6">Quick Links</h4>
                   <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                      <li><Link href="/" className="hover:text-primary transition">Home</Link></li>
                      <li><Link href="/about" className="hover:text-primary transition">About Us</Link></li>
                      <li><Link href="/learning/resources" className="hover:text-primary transition">Programs</Link></li>
                      <li><Link href="/team" className="hover:text-primary transition">Mentors</Link></li>
                      <li><Link href="/gallery" className="hover:text-primary transition">Success Stories</Link></li>
                   </ul>
                </div>

                {/* 3. Support */}
                <div>
                   <h4 className="font-bold text-slate-900 dark:text-white mb-6">Support</h4>
                   <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                      <li><Link href="/contact" className="hover:text-primary transition">Contact Us</Link></li>
                      <li><Link href="#" className="hover:text-primary transition">FAQ</Link></li>
                      <li><Link href="/blog" className="hover:text-primary transition">Blog</Link></li>
                      <li><Link href="#" className="hover:text-primary transition">Community</Link></li>
                   </ul>
                </div>

                {/* 4. Stay Connected (UPDATED) */}
                <div>
                   <h4 className="font-bold text-slate-900 dark:text-white mb-6">Stay Connected</h4>
                   <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                     Subscribe to get updates on new programs and HR insights.
                   </p>
                   
                   <div className="flex gap-2 mb-6">
                      <input type="email" placeholder="Enter your email" className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-1 focus:ring-primary" />
                      <button className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition">
                        Subscribe
                      </button>
                   </div>
                   
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Follow us on social media</p>
                   <div className="flex gap-3">
                      <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 hover:text-white hover:bg-primary transition"><Linkedin size={18}/></a>
                      <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 hover:text-white hover:bg-primary transition"><Twitter size={18}/></a>
                      <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 hover:text-white hover:bg-primary transition"><Instagram size={18}/></a>
                      <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 hover:text-white hover:bg-primary transition"><Youtube size={18}/></a>
                      <a href="https://t.me/hrmentorship" target="_blank" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 hover:text-white hover:bg-[#229ED9] transition"><Send size={18}/></a>
                   </div>
                </div>
             </div>

             <div className="max-w-7xl mx-auto border-t border-slate-100 dark:border-slate-800 pt-8 text-center md:text-left text-slate-400 text-sm">
                © 2025 HR Mentorship. All rights reserved.
             </div>
          </footer>

        </ThemeProvider>
      </body>
    </html>
  );
}
