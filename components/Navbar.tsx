"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Mobile Dropdown States
  const [mobileLearningOpen, setMobileLearningOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  // LOGIC: 
  // 1. Not Scrolled (Top) -> Always WHITE (to contrast with purple Hero sections)
  // 2. Scrolled -> Dark Text (to contrast with White/Glass background)
  
  const textColorClass = scrolled ? "text-slate-900 dark:text-white" : "text-white";
  
  // Background: Transparent at top, White/Glass when scrolled
  const bgClass = scrolled ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm" : "bg-transparent";

  // Logo Text: Follows the same logic as links
  const logoTextClass = textColorClass;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Team", href: "/team" },
    { 
      name: "Learning Centre", 
      href: "#", 
      dropdown: [
        { name: "Resources", href: "/resources" },
        { name: "Events", href: "/events" },
      ]
    },
    { name: "Jobs", href: "/jobs" },
    { name: "Blog", href: "/blog" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden shadow-sm">
               <span className="font-bold text-primary text-xl">HR</span>
            </div>
            <span className={`font-heading font-bold text-xl tracking-tight transition-colors ${logoTextClass}`}>
              HR Mentorship
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.dropdown ? (
                  <button className={`flex items-center gap-1 text-sm font-bold transition-colors hover:text-purple-300 ${textColorClass}`}>
                    {link.name} <ChevronDown size={14}/>
                  </button>
                ) : (
                  <Link href={link.href} className={`text-sm font-bold transition-colors hover:text-purple-300 ${textColorClass}`}>
                    {link.name}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {link.dropdown && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0">
                    {link.dropdown.map((item) => (
                      <Link key={item.name} href={item.href} className="block px-4 py-3 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary first:rounded-t-xl last:rounded-b-xl">
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* THEME TOGGLE */}
            <button 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`p-2 rounded-full transition-colors ${scrolled ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <Link href="/join" className="px-6 py-2.5 bg-white text-primary text-sm font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all">
              Join Community
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="md:hidden flex items-center gap-4">
             <button 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`p-2 rounded-full transition-colors ${scrolled ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' : 'bg-white/20 text-white'}`}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={`p-2 ${textColorClass}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 shadow-xl p-6 flex flex-col gap-4 h-screen overflow-y-auto pb-32">
          {navLinks.map((link) => (
             <div key={link.name}>
               {link.dropdown ? (
                 <div>
                    <button 
                      onClick={() => setMobileLearningOpen(!mobileLearningOpen)}
                      className="flex items-center justify-between w-full text-lg font-medium text-slate-900 dark:text-white py-2"
                    >
                      {link.name} <ChevronDown size={16} className={`transition ${mobileLearningOpen ? 'rotate-180' : ''}`}/>
                    </button>
                    {mobileLearningOpen && (
                      <div className="pl-4 mt-2 space-y-2 border-l-2 border-slate-100 dark:border-slate-800">
                         {link.dropdown.map(item => (
                           <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)} className="block py-2 text-slate-600 dark:text-slate-400">
                             {item.name}
                           </Link>
                         ))}
                      </div>
                    )}
                 </div>
               ) : (
                 <Link 
                   href={link.href} 
                   onClick={() => setIsOpen(false)}
                   className="block text-lg font-medium text-slate-900 dark:text-white py-2"
                 >
                   {link.name}
                 </Link>
               )}
             </div>
          ))}
          <Link 
            href="/join" 
            onClick={() => setIsOpen(false)}
            className="w-full py-3 bg-primary text-white text-center font-bold rounded-lg mt-4"
          >
            Join Community
          </Link>
        </div>
      )}
    </nav>
  );
}
