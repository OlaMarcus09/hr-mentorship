import './globals.css';
import type { Metadata } from 'next';
import { Inter, Calistoga } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import ChristmasSnow from "@/components/ChristmasSnow";
import Link from "next/link";
import { Linkedin, Twitter, Instagram, Youtube, Mail, Send, AtSign, FileText, Briefcase } from "lucide-react";

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
  // Social Links
  const socials = {
    telegram: "https://t.me/+aZTvBGln2eY2OTI0",
    jobs: "https://t.me/+J3p0vFDlmHBjZmQ0",
    youtube: "https://youtube.com/@oluyemiadeosun?si=UU8PyQrNmf7J4nn3",
    twitter: "https://x.com/HRMentorship007?t=cP-usqrwT66Y7bT2QjM0qA&s=09",
    linkedin: "https://www.linkedin.com/company/108456760/admin/dashboard/",
    instagram: "https://www.instagram.com/hr_mentorship?igsh=MTRpNGNlOGl3eTMzNw==",
    threads: "https://www.threads.com/@hr_mentorship",
    pulse: "/PULSE.pdf" // Ensure PULSE.pdf is in the public folder
  };

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
                      <li><Link href="/team" className="hover:text-primary transition">Our Team</Link></li>
                      <li><Link href="/learning/resources" className="hover:text-primary transition">Learning Centre</Link></li>
                      <li><a href={socials.pulse} download className="hover:text-primary transition flex items-center gap-2"><FileText size={14}/> Download Pulse</a></li>
                   </ul>
                </div>

                {/* 3. Support & Communities */}
                <div>
                   <h4 className="font-bold text-slate-900 dark:text-white mb-6">Communities</h4>
                   <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                      <li><Link href="/contact" className="hover:text-primary transition">Contact Us</Link></li>
                      <li><a href={socials.telegram} target="_blank" className="hover:text-primary transition flex items-center gap-2"><Send size={14}/> Main Community</a></li>
                      <li><a href={socials.jobs} target="_blank" className="hover:text-primary transition flex items-center gap-2"><Briefcase size={14}/> Job Alerts Channel</a></li>
                      <li><Link href="/blog" className="hover:text-primary transition">Blog</Link></li>
                   </ul>
                </div>

                {/* 4. Stay Connected */}
                <div>
                   <h4 className="font-bold text-slate-900 dark:text-white mb-6">Stay Connected</h4>
                   <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                     Follow us on social media for updates.
                   </p>
                   
                   <div className="flex flex-wrap gap-3">
                      <a href={socials.linkedin} target="_blank" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 hover:text-white hover:bg-[#0077b5] transition"><Linkedin size={18}/></a>
                      <a href={socials.twitter} target="_blank" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 hover:text-white hover:bg-black transition"><Twitter size={18}/></a>
                      <a href={socials.instagram} target="_blank" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 hover:text-white hover:bg-[#E1306C] transition"><Instagram size={18}/></a>
                      <a href={socials.youtube} target="_blank" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 hover:text-white hover:bg-[#FF0000] transition"><Youtube size={18}/></a>
                      <a href={socials.threads} target="_blank" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 hover:text-white hover:bg-black transition"><AtSign size={18}/></a>
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
