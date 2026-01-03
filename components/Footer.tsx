import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Send, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand & Contact */}
          <div className="space-y-6">
            <h2 className="text-2xl font-heading font-bold text-white flex items-center gap-2">
              <span className="text-primary">HR</span> Mentorship
            </h2>
            <p className="text-sm leading-relaxed text-slate-400">
              Empowering HR professionals through personalized mentorship, cutting-edge resources, and a thriving community.
            </p>
            <div className="space-y-3">
              <a href="mailto:hrmentorshipgroup@gmail.com" className="block text-primary hover:underline font-bold text-lg">
                hrmentorshipgroup@gmail.com
              </a>
              <a href="tel:+2348025320606" className="block text-slate-400 hover:text-white transition font-bold text-lg">
                +234 802 532 0606
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/" className="hover:text-primary transition">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary transition">About Us</Link></li>
              <li><Link href="/team" className="hover:text-primary transition">Our Team</Link></li>
              <li><Link href="/resources" className="hover:text-primary transition">Learning Centre</Link></li>
              {/* Pulse Link set to # to prevent error */}
              <li><a href="#" className="hover:text-primary transition flex items-center gap-2"><FileIcon/> Download Pulse (Coming Soon)</a></li>
            </ul>
          </div>

          {/* Communities */}
          <div>
            <h3 className="text-white font-bold mb-6">Communities</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/contact" className="hover:text-primary transition">Contact Us</Link></li>
              <li><a href="https://t.me/hrmentorship" target="_blank" className="hover:text-primary transition flex items-center gap-2"><Send size={14}/> Main Community</a></li>
              <li><a href="https://t.me/hrjobalert" target="_blank" className="hover:text-primary transition flex items-center gap-2"><BriefcaseIcon/> Job Alerts Channel</a></li>
              <li><Link href="/blog" className="hover:text-primary transition">Blog</Link></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-white font-bold mb-6">Stay Connected</h3>
            <p className="text-sm text-slate-400 mb-6">Follow us on social media for updates.</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition"><Linkedin size={18}/></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition"><Twitter size={18}/></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition"><Instagram size={18}/></a>
              <a href="https://www.youtube.com/@OluyemiAdeosun" target="_blank" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition"><YoutubeIcon/></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-16 pt-8 text-center text-sm text-slate-500">
          <p>&copy; {currentYear} HR Mentorship. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function FileIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>; }
function BriefcaseIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>; }
function YoutubeIcon() { return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>; }
