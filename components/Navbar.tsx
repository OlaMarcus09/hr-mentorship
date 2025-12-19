"use client";

import Link from "next/link";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Close menu when a link is clicked
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
          <div className="h-10 w-10 overflow-hidden rounded-lg bg-white shadow-sm border border-slate-100">
            <img 
               src="https://res.cloudinary.com/dmqjicpcc/image/upload/v1765218297/1001440111_dztflg.jpg" 
               alt="Logo" 
               className="h-full w-full object-cover"
            />
          </div>
          <span className="text-xl font-bold font-heading text-slate-900 dark:text-white hidden md:block">
            HR Mentorship
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium hover:text-primary transition">Home</Link>
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium hover:text-primary transition">
              About <ChevronDown size={14}/>
            </button>
            <div className="absolute top-full left-0 w-48 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 p-2">
              <Link href="/about" className="block px-4 py-2 text-sm rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">Our Story</Link>
              <Link href="/experts" className="block px-4 py-2 text-sm rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">Experts Council</Link>
            </div>
          </div>
          <Link href="/blog" className="text-sm font-medium hover:text-primary transition">Blog</Link>
          <Link href="/remote-hr" className="text-sm font-medium hover:text-primary transition">Jobs</Link>
          <Link href="/gallery" className="text-sm font-medium hover:text-primary transition">Gallery</Link>
          <Link href="/contact" className="text-sm font-medium hover:text-primary transition">Contact</Link>
        </div>

        {/* ACTIONS */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-600 dark:text-slate-400"
          >
            {mounted && theme === "dark" ? <Sun size={20}/> : <Moon size={20}/>}
          </button>
          <Link href="/mentorship/apply" className="bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-primary/90 transition shadow-lg shadow-primary/25">
            Join Community
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {mounted && theme === "dark" ? <Sun size={20}/> : <Moon size={20}/>}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900 dark:text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE GLASS MENU */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full h-[calc(100vh-80px)] bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 p-6 flex flex-col gap-6 overflow-y-auto z-40 animate-in slide-in-from-top-5">
          <div className="grid gap-2">
            <Link href="/" onClick={closeMenu} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 font-bold text-lg">Home</Link>
            <Link href="/about" onClick={closeMenu} className="p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 font-medium text-slate-600 dark:text-slate-300">About Us</Link>
            <Link href="/blog" onClick={closeMenu} className="p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 font-medium text-slate-600 dark:text-slate-300">Blog</Link>
            <Link href="/remote-hr" onClick={closeMenu} className="p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 font-medium text-slate-600 dark:text-slate-300">Job Board</Link>
            <Link href="/gallery" onClick={closeMenu} className="p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 font-medium text-slate-600 dark:text-slate-300">Gallery</Link>
            <Link href="/contact" onClick={closeMenu} className="p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 font-medium text-slate-600 dark:text-slate-300">Contact</Link>
          </div>
          
          <div className="mt-auto">
            <Link href="/mentorship/apply" onClick={closeMenu} className="block w-full bg-primary text-white text-center py-4 rounded-xl font-bold text-lg shadow-lg">
              Join Community
            </Link>
            <p className="text-center text-xs text-slate-400 mt-6">© 2025 HR Mentorship</p>
          </div>
        </div>
      )}
    </nav>
  );
}
