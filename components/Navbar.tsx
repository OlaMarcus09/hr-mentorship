"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Moon, Sun, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const learningLinks = [
    { label: "Webinars", href: "/webinars" },
    { label: "Events", href: "/events" },
    { label: "Resources", href: "/resources" },
    { label: "Book of the Month", href: "/books" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO FIXED WITH CLOUDINARY URL */}
        <Link href="/" className="flex items-center gap-2 group">
           <div className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-sm group-hover:scale-105 transition">
             <Image 
               src="https://res.cloudinary.com/dmqjicpcc/image/upload/v1765218297/1001440111_dztflg.jpg" 
               alt="HR Logo" 
               width={40} 
               height={40} 
               className="object-cover"
             />
           </div>
           <span className={`text-xl font-heading font-bold ${scrolled ? 'text-slate-900 dark:text-white' : 'text-white'} group-hover:opacity-80 transition`}>
             HR Mentorship
           </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-8">
           <Link href="/" className={`text-sm font-bold hover:text-primary transition ${scrolled ? 'text-slate-700 dark:text-slate-300' : 'text-white/90'}`}>Home</Link>
           <Link href="/about" className={`text-sm font-bold hover:text-primary transition ${scrolled ? 'text-slate-700 dark:text-slate-300' : 'text-white/90'}`}>About Us</Link>
           <Link href="/team" className={`text-sm font-bold hover:text-primary transition ${scrolled ? 'text-slate-700 dark:text-slate-300' : 'text-white/90'}`}>Team</Link>
           
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
        <button onClick={() => setIsOpen(!isOpen)} className={`lg:hidden p-2 ${scrolled ? 'text-slate-900 dark:text-white' : 'text-white'}`}>
           {isOpen ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
         <div className="lg:hidden fixed inset-0 top-16 bg-white dark:bg-slate-950 p-6 flex flex-col gap-6 overflow-y-auto pb-20 z-40">
            <Link href="/" className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/about" className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2" onClick={() => setIsOpen(false)}>About Us</Link>
            <Link href="/team" className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2" onClick={() => setIsOpen(false)}>Team</Link>
            
            <div className="space-y-2">
               <p className="text-sm font-bold text-slate-400 uppercase">Learning Centre</p>
               {learningLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="block text-lg font-bold text-slate-700 dark:text-slate-300 pl-4" onClick={() => setIsOpen(false)}>
                     {link.label}
                  </Link>
               ))}
            </div>

            <Link href="/jobs" className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2" onClick={() => setIsOpen(false)}>Jobs</Link>
            <Link href="/blog" className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2" onClick={() => setIsOpen(false)}>Blog</Link>
            <Link href="/gallery" className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2" onClick={() => setIsOpen(false)}>Gallery</Link>
            <Link href="/contact" className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2" onClick={() => setIsOpen(false)}>Contact</Link>
            
            <Link href="/join" className="w-full py-4 bg-primary text-white text-center font-bold rounded-xl mt-4" onClick={() => setIsOpen(false)}>Join Community</Link>
         </div>
      )}
    </nav>
  );
}
