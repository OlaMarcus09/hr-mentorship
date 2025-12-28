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
    { name: "Blog", href: "/blog" }, // <--- ADDED BLOG LINK HERE
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO SECTION */}
        <Link href="/" className="relative flex items-center gap-3 group">
           <div className="relative w-10 h-10 md:w-12 md:h-12">
             {/* Ensure your file is named 'logo.png' in the public folder */}
             <Image 
               src="/logo.png" 
               alt="HR Logo" 
               fill
               className="object-contain"
               priority
             />
             {/* Santa Hat Overlay - Positioned carefully to not block logo */}
             <div className="absolute -top-4 -left-3 w-8 h-8 pointer-events-none opacity-90">
                <Image src="https://cdn-icons-png.flaticon.com/512/744/744546.png" alt="Santa Hat" width={32} height={32} />
             </div>
           </div>
           
           {/* Text Logo as Fallback/Complement */}
           <div className="flex flex-col">
             <span className="font-heading font-bold text-xl leading-none text-slate-900 dark:text-white group-hover:text-primary transition">
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
          
          {/* Theme Toggle */}
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition">
             <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
             <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 top-2" />
          </button>

          <Link href="/mentorship/apply" className="px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition shadow-lg shadow-primary/20">
            Join Community
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden p-2 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition" onClick={() => setIsOpen(!isOpen)}>
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
          <Link href="/mentorship/apply" onClick={() => setIsOpen(false)} className="w-full py-4 bg-primary text-white text-center font-bold rounded-xl mt-4 shadow-lg">
            Join Community
          </Link>
        </div>
      )}
    </nav>
  );
}
