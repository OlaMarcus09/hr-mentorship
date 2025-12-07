import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white">HR Mentorship</h3>
          <p className="text-slate-400 text-sm">
            Empowering HR professionals across Africa with the tools, connections, and knowledge to lead.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-white mb-4">Platform</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="/learning" className="hover:text-cyan-400">Learning Centre</Link></li>
            <li><Link href="/remote-hr" className="hover:text-cyan-400">Remote HR</Link></li>
            <li><Link href="/experts" className="hover:text-cyan-400">Experts Council</Link></li>
            <li><Link href="/blog" className="hover:text-cyan-400">Blog</Link></li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h4 className="font-semibold text-white mb-4">Community</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="/events" className="hover:text-cyan-400">Upcoming Events</Link></li>
            <li><Link href="/about" className="hover:text-cyan-400">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-cyan-400">Contact Support</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="font-semibold text-white mb-4">Connect</h4>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-cyan-400"><Linkedin className="h-5 w-5" /></Link>
            <Link href="#" className="hover:text-cyan-400"><Twitter className="h-5 w-5" /></Link>
            <Link href="#" className="hover:text-cyan-400"><Facebook className="h-5 w-5" /></Link>
            <Link href="#" className="hover:text-cyan-400"><Instagram className="h-5 w-5" /></Link>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} HR Mentorship. All rights reserved.
      </div>
    </footer>
  );
}
