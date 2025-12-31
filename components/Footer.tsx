import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
             <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-primary font-bold text-xl">HR</div>
                <span className="text-xl font-heading font-bold text-white">HR Mentorship</span>
             </Link>
             <p className="text-sm leading-relaxed mb-6">
               A globally trusted community for nurturing exceptional HR leaders — where mentorship ignites growth and connection inspires possibility.
             </p>
             <div className="flex gap-4">
                <a href="https://twitter.com/HRMentorship007" target="_blank" className="hover:text-white transition"><Twitter size={20}/></a>
                <a href="https://instagram.com/hr_mentorship" target="_blank" className="hover:text-white transition"><Instagram size={20}/></a>
                <a href="https://www.linkedin.com/company/hr-mentorship" target="_blank" className="hover:text-white transition"><Linkedin size={20}/></a>
             </div>
          </div>

          {/* Quick Links */}
          <div>
             <h3 className="text-white font-bold mb-6">Quick Links</h3>
             <ul className="space-y-4 text-sm">
                <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
                <li><Link href="/team" className="hover:text-white transition">Our Team</Link></li>
                <li><Link href="/resources" className="hover:text-white transition">Learning Resources</Link></li>
                <li><Link href="/gallery" className="hover:text-white transition">Gallery</Link></li>
                <li><Link href="/join" className="hover:text-white transition">Join Community</Link></li>
             </ul>
          </div>

          {/* Programs */}
          <div>
             <h3 className="text-white font-bold mb-6">Programs</h3>
             <ul className="space-y-4 text-sm">
                <li><Link href="#" className="hover:text-white transition">Weekly Learning Series</Link></li>
                <li><Link href="#" className="hover:text-white transition">Mentorship & Coaching</Link></li>
                <li><Link href="#" className="hover:text-white transition">HR Book Club</Link></li>
                <li><Link href="#" className="hover:text-white transition">Job Placement Support</Link></li>
                <li><Link href="#" className="hover:text-white transition">Regional Chapters</Link></li>
             </ul>
          </div>

          {/* Contact */}
          <div>
             <h3 className="text-white font-bold mb-6">Contact Us</h3>
             <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                   <Phone size={18} className="text-primary shrink-0 mt-1"/>
                   <span>+234 802 532 0606</span>
                </li>
                <li className="flex items-start gap-3">
                   <Mail size={18} className="text-primary shrink-0 mt-1"/>
                   <a href="mailto:hrmentorshipgroup@gmail.com" className="hover:text-white transition">hrmentorshipgroup@gmail.com</a>
                </li>
                <li className="flex items-start gap-3">
                   <MapPin size={18} className="text-primary shrink-0 mt-1"/>
                   <span>Lagos | Abuja | Port Harcourt | Ibadan | Northern Nigeria</span>
                </li>
             </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
           <p>&copy; {new Date().getFullYear()} HR Mentorship. All rights reserved.</p>
           <div className="flex gap-6">
              <Link href="#" className="hover:text-white">Privacy Policy</Link>
              <Link href="#" className="hover:text-white">Terms of Service</Link>
           </div>
        </div>
      </div>
    </footer>
  );
}
