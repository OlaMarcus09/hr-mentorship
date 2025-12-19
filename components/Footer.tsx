import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 overflow-hidden rounded-md border border-slate-200 dark:border-slate-800">
                <img 
                   src="https://res.cloudinary.com/dmqjicpcc/image/upload/v1765218297/1001440111_dztflg.jpg" 
                   alt="Logo" 
                   className="h-full w-full object-cover"
                />
              </div>
              <span className="text-xl font-bold font-heading text-slate-900 dark:text-white">HR Mentorship</span>
            </Link>
            <p className="text-slate-500 leading-relaxed max-w-sm mb-6">
              A thriving HR community dedicated to learning, connection, and career growth — supporting professionals across Nigeria and beyond.
            </p>
            <div className="flex gap-4">
              <a href="#" className="bg-white dark:bg-slate-900 p-2 rounded-full border hover:border-primary hover:text-primary transition"><Linkedin size={18}/></a>
              <a href="#" className="bg-white dark:bg-slate-900 p-2 rounded-full border hover:border-primary hover:text-primary transition"><Instagram size={18}/></a>
              <a href="#" className="bg-white dark:bg-slate-900 p-2 rounded-full border hover:border-primary hover:text-primary transition"><Twitter size={18}/></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link href="/" className="hover:text-primary transition">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary transition">About Us</Link></li>
              <li><Link href="/learning" className="hover:text-primary transition">Learning Centre</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition">Blog</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition">Gallery</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm text-slate-500">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-primary mt-0.5" />
                <span>hello@hrmentorship.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-primary mt-0.5" />
                <span>+234 800 123 4567</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5" />
                <span>Lagos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} HR Mentorship. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
