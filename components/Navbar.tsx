"use client";

import Link from "next/link";
import { Menu, X, ChevronDown, Sun, Moon, Home, Info, BookOpen, FileText, Mail, Image as ImageIcon, Briefcase, UserPlus, Layers } from "lucide-react";
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
    <>
      <nav className="fixed w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex justify-between items-center">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
            <div className="h-8 w-8 md:h-10 md:w-10 overflow-hidden rounded-lg bg-white shadow-sm border border-slate-100">
              <img 
                 src="https://res.cloudinary.com/dmqjicpcc/image/upload/v1765218297/1001440111_dztflg.jpg" 
                 alt="Logo" 
                 className="h-full w-full object-cover"
              />
            </div>
            <span className="text-lg md:text-xl font-bold font-heading text-slate-900 dark:text-white">
              HR Mentorship
            </span>
          </Link>

          {/* DESKTOP MENU (Restored Full Links) */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-primary transition">Home</Link>
            
            {/* About Dropdown */}
            <div className="relative group h-full flex items-center">
              <button className="flex items-center gap-1 hover:text-primary transition">About Us <ChevronDown size={14}/></button>
              <div className="absolute top-full left-0 w-48 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 p-2 mt-2">
                <Link href="/about" className="block px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">Our Story</Link>
                <Link href="/experts" className="block px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">Team & Experts</Link>
              </div>
            </div>

            {/* Learning Dropdown */}
            <div className="relative group h-full flex items-center">
              <button className="flex items-center gap-1 hover:text-primary transition">Learning Centre <ChevronDown size={14}/></button>
              <div className="absolute top-full left-0 w-48 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 p-2 mt-2">
                <Link href="/blog" className="block px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">Blog</Link>
                <Link href="/events" className="block px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">Events</Link>
              </div>
            </div>

            <Link href="/remote-hr" className="hover:text-primary transition">Jobs</Link>
            <Link href="/gallery" className="hover:text-primary transition">Gallery</Link>
            <Link href="/contact" className="hover:text-primary transition">Contact</Link>
          </div>

          {/* DESKTOP ACTIONS */}
          <div className="hidden lg:flex items-center gap-4">
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

          {/* MOBILE TOGGLE (Simple Icons) */}
          <div className="lg:hidden flex items-center gap-3">
             <button 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              {mounted && theme === "dark" ? <Sun size={20}/> : <Moon size={20}/>}
            </button>
            <button onClick={() => setIsOpen(true)} className="text-slate-900 dark:text-white p-1">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE BOTTOM SHEET MENU */}
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 lg:hidden ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={closeMenu}
      ></div>

      {/* Bottom Sheet */}
      <div className={`fixed bottom-0 left-0 w-full bg-white/90 dark:bg-slate-950/95 backdrop-blur-xl rounded-t-3xl shadow-2xl z-50 transition-transform duration-300 lg:hidden transform ${isOpen ? "translate-y-0" : "translate-y-full"}`}>
        
        <div className="p-2 flex justify-center">
           <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-2"></div>
        </div>

        <div className="p-6">
           <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Menu</h2>
              <button onClick={closeMenu} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                 <X size={20} />
              </button>
           </div>

           {/* THE GRID LAYOUT YOU ASKED FOR */}
           <div className="grid grid-cols-3 gap-3">
              <Link href="/" onClick={closeMenu} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-purple-50 dark:hover:bg-slate-800 transition border border-slate-100 dark:border-slate-800">
                 <Home size={20} className="text-primary"/>
                 <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Home</span>
              </Link>
              <Link href="/about" onClick={closeMenu} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-purple-50 dark:hover:bg-slate-800 transition border border-slate-100 dark:border-slate-800">
                 <Info size={20} className="text-blue-500"/>
                 <span className="text-xs font-bold text-slate-700 dark:text-slate-300">About</span>
              </Link>
              <Link href="/blog" onClick={closeMenu} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-purple-50 dark:hover:bg-slate-800 transition border border-slate-100 dark:border-slate-800">
                 <BookOpen size={20} className="text-pink-500"/>
                 <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Blog</span>
              </Link>
              <Link href="/remote-hr" onClick={closeMenu} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-purple-50 dark:hover:bg-slate-800 transition border border-slate-100 dark:border-slate-800">
                 <Briefcase size={20} className="text-purple-500"/>
                 <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Jobs</span>
              </Link>
              <Link href="/events" onClick={closeMenu} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-purple-50 dark:hover:bg-slate-800 transition border border-slate-100 dark:border-slate-800">
                 <Layers size={20} className="text-orange-500"/>
                 <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Events</span>
              </Link>
              <Link href="/gallery" onClick={closeMenu} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-purple-50 dark:hover:bg-slate-800 transition border border-slate-100 dark:border-slate-800">
                 <ImageIcon size={20} className="text-teal-500"/>
                 <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Gallery</span>
              </Link>
              <Link href="/contact" onClick={closeMenu} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-purple-50 dark:hover:bg-slate-800 transition border border-slate-100 dark:border-slate-800">
                 <Mail size={20} className="text-red-500"/>
                 <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Contact</span>
              </Link>
              <Link href="/experts" onClick={closeMenu} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-purple-50 dark:hover:bg-slate-800 transition border border-slate-100 dark:border-slate-800">
                 <UserPlus size={20} className="text-green-500"/>
                 <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Experts</span>
              </Link>
           </div>
           
           <div className="mt-6">
             <Link href="/mentorship/apply" onClick={closeMenu} className="block w-full bg-primary text-white text-center py-4 rounded-xl font-bold text-sm shadow-lg shadow-primary/20">
               Join Our Community
             </Link>
           </div>
           <div className="h-8"></div> {/* Safety spacer for iOS home bar */}
        </div>
      </div>
    </>
  );
}
