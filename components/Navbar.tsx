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
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed w-full z-50 bg-white/95 dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        
        {/* LOGO WITH SANTA HAT 🎅 */}
        <Link href="/" className="flex items-center gap-2 relative group" onClick={closeMenu}>
          
          {/* The Santa Hat Image (Absolute Positioned) */}
          <div className="absolute -top-4 -left-3 w-8 h-8 z-20 pointer-events-none rotate-[-15deg] drop-shadow-md">
             <img src="https://cdn-icons-png.flaticon.com/512/744/744546.png" alt="Santa Hat" className="w-full h-full object-contain"/>
          </div>

          <div className="h-10 w-10 overflow-hidden rounded-lg bg-white shadow-sm border border-slate-100 relative z-10">
             <img src="https://res.cloudinary.com/dmqjicpcc/image/upload/v1765218297/1001440111_dztflg.jpg" alt="Logo" className="h-full w-full object-cover"/>
          </div>
          <span className="text-xl font-bold font-heading text-slate-900 dark:text-white hidden md:block">HR Mentorship</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium hover:text-primary transition">Home</Link>
          <div className="relative group h-20 flex items-center">
            <button className="flex items-center gap-1 text-sm font-medium hover:text-primary transition">About Us <ChevronDown size={14}/></button>
            <div className="absolute top-full left-0 w-48 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-b-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2">
              <Link href="/about" className="block px-4 py-2 text-sm rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">Our Story</Link>
              <Link href="/experts" className="block px-4 py-2 text-sm rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">Experts Council</Link>
            </div>
          </div>
          <div className="relative group h-20 flex items-center">
            <button className="flex items-center gap-1 text-sm font-medium hover:text-primary transition">Learning Centre <ChevronDown size={14}/></button>
            <div className="absolute top-full left-0 w-48 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-b-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2">
              <Link href="/blog" className="block px-4 py-2 text-sm rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">Blog</Link>
              <Link href="/events" className="block px-4 py-2 text-sm rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">Events</Link>
              <Link href="/learning/resources" className="block px-4 py-2 text-sm rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">Resource Centre</Link>
            </div>
          </div>
          <Link href="/remote-hr" className="text-sm font-medium hover:text-primary transition">Jobs</Link>
          <Link href="/gallery" className="text-sm font-medium hover:text-primary transition">Gallery</Link>
          <Link href="/contact" className="text-sm font-medium hover:text-primary transition">Contact</Link>
        </div>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-600 dark:text-slate-400">
            {mounted && theme === "dark" ? <Sun size={20}/> : <Moon size={20}/>}
          </button>
          <Link href="/mentorship/apply" className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-primary/90 transition shadow-lg shadow-primary/25">Join Community</Link>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition">
            {mounted && theme === "dark" ? <Sun size={20}/> : <Moon size={20}/>}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900 dark:text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="p-6 flex flex-col gap-4">
            <Link href="/" onClick={closeMenu} className="text-lg font-medium p-2 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg">Home</Link>
            <Link href="/about" onClick={closeMenu} className="text-lg font-medium p-2 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg">About Us</Link>
            <Link href="/experts" onClick={closeMenu} className="text-lg font-medium p-2 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg pl-6 border-l-2 border-slate-100">Experts Council</Link>
            <Link href="/blog" onClick={closeMenu} className="text-lg font-medium p-2 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg">Blog</Link>
            <Link href="/events" onClick={closeMenu} className="text-lg font-medium p-2 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg">Events</Link>
            <Link href="/learning/resources" onClick={closeMenu} className="text-lg font-medium p-2 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg">Resource Centre</Link>
            <Link href="/remote-hr" onClick={closeMenu} className="text-lg font-medium p-2 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg">Job Board</Link>
            <Link href="/gallery" onClick={closeMenu} className="text-lg font-medium p-2 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg">Gallery</Link>
            <Link href="/contact" onClick={closeMenu} className="text-lg font-medium p-2 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg">Contact Us</Link>
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Link href="/mentorship/apply" onClick={closeMenu} className="block w-full bg-primary text-white text-center py-4 rounded-lg font-bold text-lg shadow-lg">Join Community</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
