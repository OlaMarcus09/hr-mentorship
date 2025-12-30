"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Moon, Sun, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Removed "Certificate Courses" from this list
  const learningLinks = [
    { label: "Mentorship", href: "/mentorship" },
    { label: "Resources", href: "/resources" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
           <div className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
             <Image src="/logo.png" alt="HR Logo" width={40} height={40} className="object-cover"/>
           </div>
           <span className={`text-xl font-heading font-bold ${scrolled ? 'text-slate-900 dark:text-white' : 'text-white'}`}>
             HR Mentorship
           </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
           <Link href="/" className={`text-sm font-bold hover:text-primary transition ${scrolled ? 'text-slate-700 dark:text-slate-300' : 'text-white/90'}`}>Home</Link>
           <Link href="/about" className={`text-sm font-bold hover:text-primary transition ${scrolled ? 'text-slate-700 dark:text-slate-300' : 'text-white/90'}`}>About Us</Link>
           <Link href="/team" className={`text-sm font-bold hover:text-primary transition ${scrolled ? 'text-slate-700 dark:text-slate-300' : 'text-white/90'}`}>Team</Link>
           
           {/* Dropdown */}
           <div className="relative group">
              <button className={`flex items-center gap-1 text-sm font-bold hover:text-primary transition ${scrolled ? 'text-slate-700 dark:text-slate-300' : 'text-white/90'}`}>
                 Learning Centre <ChevronDown size={14}/>
              </button>
              <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                 <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 p-2 w-48">
                    {learningLinks.map((link) => (
                       <Link key={link.href} href={link.href} className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
                          {link.label}
                       </Link>
                    ))}
                 </div>
              </div>
           </div>

           <Link href="/jobs" className={`text-sm font-bold hover:text-primary transition ${scrolled ? 'text-slate-700 dark:text-slate-300' : 'text-white/90'}`}>Jobs</Link>
           <Link href="/blog" className={`text-sm font-bold hover:text-primary transition ${scrolled ? 'text-slate-700 dark:text-slate-300' : 'text-white/90'}`}>Blog</Link>
           <Link href="/gallery" className={`text-sm font-bold hover:text-primary transition ${scrolled ? 'text-slate-700 dark:text-slate-300' : 'text-white/90'}`}>Gallery</Link>
           <Link href="/contact" className={`text-sm font-bold hover:text-primary transition ${scrolled ? 'text-slate-700 dark:text-slate-300' : 'text-white/90'}`}>Contact</Link>
           
           <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className={`p-2 rounded-full transition ${scrolled ? 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-white' : 'text-white/90 hover:bg-white/10'}`}>
              {theme === "dark" ? <Sun size={20}/> : <Moon size={20}/>}
           </button>

           <Link href="/join" className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-full hover:bg-primary/90 transition shadow-lg shadow-primary/25">
              Join Community
           </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button onClick={() => setIsOpen(!isOpen)} className={`md:hidden p-2 ${scrolled ? 'text-slate-900 dark:text-white' : 'text-white'}`}>
           {isOpen ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
         <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 p-6 shadow-xl flex flex-col gap-4">
            <Link href="/" className="text-lg font-bold text-slate-900 dark:text-white" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/about" className="text-lg font-bold text-slate-900 dark:text-white" onClick={() => setIsOpen(false)}>About Us</Link>
            <Link href="/team" className="text-lg font-bold text-slate-900 dark:text-white" onClick={() => setIsOpen(false)}>Team</Link>
            <div className="h-px bg-slate-100 dark:bg-slate-800 my-2"></div>
            <Link href="/mentorship" className="text-lg font-bold text-slate-900 dark:text-white" onClick={() => setIsOpen(false)}>Mentorship</Link>
            <Link href="/resources" className="text-lg font-bold text-slate-900 dark:text-white" onClick={() => setIsOpen(false)}>Resources</Link>
            <div className="h-px bg-slate-100 dark:bg-slate-800 my-2"></div>
            <Link href="/jobs" className="text-lg font-bold text-slate-900 dark:text-white" onClick={() => setIsOpen(false)}>Jobs</Link>
            <Link href="/blog" className="text-lg font-bold text-slate-900 dark:text-white" onClick={() => setIsOpen(false)}>Blog</Link>
            <Link href="/gallery" className="text-lg font-bold text-slate-900 dark:text-white" onClick={() => setIsOpen(false)}>Gallery</Link>
            <Link href="/contact" className="text-lg font-bold text-slate-900 dark:text-white" onClick={() => setIsOpen(false)}>Contact</Link>
            <Link href="/join" className="w-full py-3 bg-primary text-white text-center font-bold rounded-lg" onClick={() => setIsOpen(false)}>Join Community</Link>
         </div>
      )}
    </nav>
  );
}
