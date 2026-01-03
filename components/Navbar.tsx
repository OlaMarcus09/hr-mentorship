"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Team", href: "/team" },
    { name: "Learning Centre", href: "/resources" },
    { name: "Jobs", href: "/jobs" },
    { name: "Events", href: "/events" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4"}`}>
      
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO SECTION */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 md:w-14 md:h-14 overflow-hidden rounded-lg bg-white shadow-sm">
             <Image 
               src="https://res.cloudinary.com/dmqjicpcc/image/upload/v1765218297/1001440111_dztflg.jpg" 
               alt="HR Mentorship Logo" 
               fill 
               className="object-contain p-0.5 group-hover:scale-105 transition duration-300"
             />
          </div>
          <span className={`text-xl md:text-2xl font-bold font-heading ${isScrolled ? "text-slate-900 dark:text-white" : "text-white"} hidden md:block`}>
            HR Mentorship
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`text-sm font-bold transition hover:text-primary ${
                pathname === link.href 
                  ? "text-primary" 
                  : isScrolled ? "text-slate-600 dark:text-slate-300" : "text-white/90 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="hidden lg:flex items-center gap-4">
          <button onClick={toggleTheme} className={`p-2 rounded-full transition ${isScrolled ? "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300" : "text-white hover:bg-white/10"}`}>
            {isDark ? <Sun size={20}/> : <Moon size={20}/>}
          </button>
          <a 
            href="https://t.me/hrmentorship" 
            target="_blank" 
            className="px-6 py-2.5 bg-white text-primary font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm"
          >
            Join Community
          </a>
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="lg:hidden flex items-center gap-4">
          <button onClick={toggleTheme} className={`p-2 rounded-full ${isScrolled ? "text-slate-600 dark:text-slate-300" : "text-white"}`}>
            {isDark ? <Sun size={20}/> : <Moon size={20}/>}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className={isScrolled ? "text-slate-900 dark:text-white" : "text-white"}>
            {isOpen ? <X size={28}/> : <Menu size={28}/>}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shadow-xl p-6 flex flex-col gap-4 lg:hidden animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-lg font-bold py-2 border-b border-slate-50 dark:border-slate-800 ${pathname === link.href ? "text-primary" : "text-slate-600 dark:text-slate-400"}`}
            >
              {link.name}
            </Link>
          ))}
          <a 
            href="https://t.me/hrmentorship" 
            target="_blank" 
            className="mt-4 w-full py-4 bg-primary text-white font-bold rounded-xl text-center shadow-lg"
          >
            Join Community
          </a>
        </div>
      )}
    </nav>
  );
}
