"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [learningOpen, setLearningOpen] = useState(false); // State for dropdown
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  // Telegram Link (Community)
  const telegramLink = "https://t.me/+aZTvBGln2eY2OTI0";

  // Learning Centre Sub-links
  const learningLinks = [
    { name: "Certificate Courses", href: "/learning/certificate-courses" },
    { name: "Webinars", href: "/learning/webinars" },
    { name: "Events", href: "/events" },
    { name: "Resources", href: "/learning/resources" },
    { name: "Book of the Month", href: "/learning/book-club" },
  ];

  const links = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Team", href: "/team" },
    // Learning Centre is handled separately for dropdown
    { name: "Jobs", href: "/jobs" },
    { name: "Blog", href: "/blog" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="relative flex items-center gap-3 group z-50">
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
          {links.slice(0, 3).map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`text-sm font-medium transition-colors hover:text-primary ${pathname === link.href ? 'text-primary font-bold' : 'text-slate-600 dark:text-slate-300'}`}
            >
              {link.name}
            </Link>
          ))}

          {/* DROPDOWN: Learning Centre */}
          <div 
            className="relative group"
            onMouseEnter={() => setLearningOpen(true)}
            onMouseLeave={() => setLearningOpen(false)}
          >
            <button className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${pathname.includes('/learning') ? 'text-primary font-bold' : 'text-slate-600 dark:text-slate-300'}`}>
              Learning Centre <ChevronDown size={14} />
            </button>
            
            {/* Dropdown Menu */}
            <div className={`absolute top-full left-0 w-56 pt-4 transition-all duration-200 ${learningOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
               <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden">
                  {learningLinks.map((item) => (
                    <Link 
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-3 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-primary transition border-b border-slate-50 dark:border-slate-800 last:border-0"
                    >
                      {item.name}
                    </Link>
                  ))}
               </div>
            </div>
          </div>

          {links.slice(3).map((link) => (
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
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4 shadow-2xl h-[calc(100vh-80px)] overflow-y-auto">
           {links.slice(0, 3).map((link) => (
            <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-900 dark:text-white py-3 border-b border-slate-100 dark:border-slate-800">
              {link.name}
            </Link>
          ))}
          
          {/* Mobile Dropdown Items */}
          <div className="py-2">
             <div className="text-lg font-bold text-slate-900 dark:text-white mb-2">Learning Centre</div>
             <div className="pl-4 flex flex-col gap-3 border-l-2 border-slate-200 dark:border-slate-800">
               {learningLinks.map((item) => (
                 <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)} className="text-slate-600 dark:text-slate-400">
                   {item.name}
                 </Link>
               ))}
             </div>
          </div>

          {links.slice(3).map((link) => (
            <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-900 dark:text-white py-3 border-b border-slate-100 dark:border-slate-800">
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
