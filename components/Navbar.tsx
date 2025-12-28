"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const links = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Team", href: "/team" },
    { name: "Learning Centre", href: "/learning/resources" },
    { name: "Jobs", href: "/jobs" },
    { name: "Blog", href: "/blog" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  // TELEGRAM LINK (Community)
  const telegramLink = "https://t.me/+aZTvBGln2eY2OTI0";

  return (
    <nav className="fixed w-full z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="relative flex items-center gap-3 group">
           <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden">
             <Image 
               src="https://res.cloudinary.com/dmqjicpcc/image/upload/v1765218297/1001440111_dztflg.jpg" 
               alt="HR Mentorship Logo" 
               fill
               className="object-cover"
               priority
             />
           </div>
           <div className="flex flex-col">
             <span className="font-heading font-bold text-xl leading-none text-primary dark:text-white transition">
               HR Mentorship
             </span>
             <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
               Community
             </span>
           </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`text-sm font-medium transition-colors hover:text-primary ${pathname === link.href ? 'text-primary font-bold' : 'text-slate-600 dark:text-slate-300'}`}
            >
              {link.name}
            </Link>
          ))}
          
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
            className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
             <Sun className="h-5 w-5 absolute transition-all scale-100 rotate-0 dark:scale-0 dark:-rotate-90 text-slate-600" />
             <Moon className="h-5 w-5 absolute transition-all scale-0 rotate-90 dark:scale-100 dark:rotate-0 text-white" />
          </button>

          <a href={telegramLink} target="_blank" className="px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition shadow-lg shadow-primary/20">
            Join Community
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden p-2 text-slate-900 dark:text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4 shadow-2xl h-screen">
           {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-slate-900 dark:text-white py-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center"
            >
              {link.name}
            </Link>
          ))}
          <a href={telegramLink} target="_blank" onClick={() => setIsOpen(false)} className="w-full py-4 bg-primary text-white text-center font-bold rounded-xl mt-4 shadow-lg">
            Join Community
          </a>
        </div>
      )}
    </nav>
  );
}
