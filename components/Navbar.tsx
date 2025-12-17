"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Search, ChevronDown, ChevronUp, Home, Users, BookOpen, Image as ImageIcon, Briefcase, Mail, Newspaper, PlayCircle, FileText, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Menu Structure
const menuItems = [
  { name: "Home", href: "/", icon: Home, color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
  {
    name: "About Us",
    icon: Users,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    href: "/about",
    children: [
      { name: "Who We Are", href: "/about" },
      { name: "Core Team Members", href: "/about#team" },
      { name: "Experts Council", href: "/experts" },
    ],
  },
  {
    name: "Learning",
    icon: BookOpen,
    color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    href: "/learning",
    children: [
      { name: "Certificate Courses", href: "/learning" },
      { name: "Webinars", href: "/learning" },
      { name: "Events", href: "/events" },
      { name: "Resources", href: "/learning" },
    ],
  },
  { name: "Blog", href: "/blog", icon: Newspaper, color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400" },
  { name: "Contact", href: "/contact", icon: Mail, color: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400" },
  {
    name: "Gallery",
    icon: ImageIcon,
    color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400",
    href: "/gallery",
    children: [
      { name: "Members Gallery", href: "/gallery" },
      { name: "Events Gallery", href: "/gallery" },
    ],
  },
  {
    name: "More",
    icon: Briefcase,
    color: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    href: "/remote-hr",
    children: [
      { name: "Remote HR", href: "/remote-hr" },
      { name: "Greylist", href: "/remote-hr" },
      { name: "HR Vacancies", href: "/remote-hr" },
    ],
  },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [expandedItem, setExpandedItem] = React.useState<string | null>(null);

  const toggleExpand = (name: string) => {
    setExpandedItem(expandedItem === name ? null : name);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-9 w-9 overflow-hidden rounded-md border border-slate-200 dark:border-slate-800">
             <img 
               src="https://res.cloudinary.com/dmqjicpcc/image/upload/v1765218297/1001440111_dztflg.jpg" 
               alt="Logo" 
               className="h-full w-full object-cover"
             />
          </div>
          <span className="text-xl font-bold text-primary hidden sm:block font-heading">HR Mentorship</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center gap-6 h-full">
          {menuItems.map((item) => (
            <div key={item.name} className="relative group h-full flex items-center">
              <Link 
                href={item.href} 
                className="flex items-center gap-1 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors py-2"
              >
                {item.name}
                {item.children && <ChevronDown className="h-4 w-4 opacity-50 group-hover:rotate-180 transition-transform duration-200" />}
              </Link>
              {item.children && (
                <div className="absolute top-[calc(100%-10px)] left-0 pt-4 w-56 hidden group-hover:block hover:block z-50">
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-xl p-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex flex-col">
                      {item.children.map((child) => (
                        <Link 
                          key={child.name} 
                          href={child.href} 
                          className="px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-900/30 dark:hover:text-purple-300 rounded-lg transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3">
          <ModeToggle />
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white shadow-sm px-6 rounded-full font-bold">
            Join Now
          </Button>
        </div>

        {/* Mobile Menu (THE SLEEK GRID) */}
        <div className="flex xl:hidden items-center gap-2">
          <ModeToggle />
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="-mr-2">
                <Menu className="h-6 w-6 text-foreground" />
              </Button>
            </SheetTrigger>
            
            {/* 1. Bottom Sheet Position */}
            <SheetContent side="bottom" className="h-[85vh] rounded-t-[2rem] overflow-y-auto px-6 pt-8 bg-slate-50 dark:bg-slate-950 border-t-0 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.3)]">
              
              <SheetHeader className="text-left mb-8">
                <SheetTitle className="flex items-center gap-2">
                  <span className="text-2xl font-bold font-heading text-slate-900 dark:text-white">Menu</span>
                </SheetTitle>
              </SheetHeader>

              {/* 2. The App-Like Grid */}
              <div className="grid grid-cols-2 gap-3 pb-24">
                {menuItems.map((item) => (
                  <div key={item.name} className="flex flex-col">
                    {/* The Card */}
                    <div 
                      onClick={() => item.children ? toggleExpand(item.name) : setIsOpen(false)}
                      className={cn(
                        "flex flex-col items-center justify-center p-6 rounded-2xl cursor-pointer transition-all duration-200 active:scale-95 border border-transparent hover:border-slate-200 dark:hover:border-slate-800",
                        item.color, // Colorful backgrounds
                        "bg-opacity-50 dark:bg-opacity-20", // Softer colors
                        item.children && expandedItem === item.name ? "ring-2 ring-primary ring-offset-2 dark:ring-offset-slate-950" : ""
                      )}
                    >
                      <item.icon className="h-8 w-8 mb-3 opacity-90" />
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-sm text-center">{item.name}</span>
                        {item.children && (
                          expandedItem === item.name ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                        )}
                      </div>
                    </div>

                    {/* 3. The Expanded Sub-Menu (Appears below the card) */}
                    {item.children && expandedItem === item.name && (
                      <div className="col-span-2 mt-2 space-y-1 pl-2 animate-in slide-in-from-top-2 duration-200">
                         {item.children.map((child) => (
                           <Link 
                             key={child.name} 
                             href={child.href} 
                             onClick={() => setIsOpen(false)}
                             className="block p-3 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 hover:text-primary hover:border-primary/30 transition-all"
                           >
                             {child.name}
                           </Link>
                         ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom Fixed Join Button */}
              <div className="fixed bottom-6 left-6 right-6">
                 <Button className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 h-14 text-lg rounded-2xl font-bold shadow-2xl">
                   Join HR Mentorship
                 </Button>
              </div>

            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
