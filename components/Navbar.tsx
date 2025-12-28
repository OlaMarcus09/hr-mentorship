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
    { name: "Team", href: "/team" }, // <--- UPDATED LINK
    { name: "Learning Centre", href: "/learning/resources" },
    { name: "Jobs", href: "/jobs" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="relative flex items-center gap-2">
           <div className="relative w-10 h-10">
             <Image src="/logo.png" alt="HR Logo" width={40} height={40} className="object-contain" />
             {/* Santa Hat Overlay */}
             <div className="absolute -top-3 -left-2 w-8 h-8 pointer-events-none">
                <Image src="https://cdn-icons-png.flaticon.com/512/744/744546.png" alt="Santa Hat" width={32} height={32} />
             </div>
           </div>
           <span className="font-heading font-bold text-xl md:text-2xl text-slate-900 dark:text-white">
             HR Mentorship
           </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`text-sm font-medium transition-colors hover:text-primary ${pathname === link.href ? 'text-primary font-bold' : 'text-slate-600 dark:text-slate-300'}`}
            >
              {link.name}
            </Link>
          ))}
          
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition">
             <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
             <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 top-2" />
          </button>

          <Link href="/mentorship/apply" className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-full hover:bg-primary/90 transition shadow-lg shadow-primary/25">
            Join Community
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-slate-900 dark:text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4 shadow-xl">
           {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-slate-900 dark:text-white py-2 border-b border-slate-100 dark:border-slate-800"
            >
              {link.name}
            </Link>
          ))}
          <Link href="/mentorship/apply" onClick={() => setIsOpen(false)} className="w-full py-3 bg-primary text-white text-center font-bold rounded-lg mt-4">
            Join Community
          </Link>
        </div>
      )}
    </nav>
  );
}
