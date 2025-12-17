"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Search, ChevronDown, ChevronUp, Home, Users, BookOpen, Image as ImageIcon, Briefcase, Mail, Newspaper } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"

// Menu Structure
const menuItems = [
  { name: "Home", href: "/", icon: Home },
  {
    name: "About",
    icon: Users,
    href: "/about",
    children: [
      { name: "Who We Are", href: "/about" },
      { name: "Core Team", href: "/about#team" },
      { name: "Experts", href: "/experts" },
    ],
  },
  {
    name: "Learning",
    icon: BookOpen,
    href: "/learning",
    children: [
      { name: "Courses", href: "/learning" },
      { name: "Webinars", href: "/learning" },
      { name: "Events", href: "/events" },
      { name: "Resources", href: "/learning" },
    ],
  },
  { name: "Blog", href: "/blog", icon: Newspaper },
  { name: "Contact", href: "/contact", icon: Mail },
  {
    name: "Gallery",
    icon: ImageIcon,
    href: "/gallery",
    children: [
      { name: "Members", href: "/gallery" },
      { name: "Events", href: "/gallery" },
    ],
  },
  {
    name: "More",
    icon: Briefcase,
    href: "/remote-hr",
    children: [
      { name: "Remote HR", href: "/remote-hr" },
      { name: "Jobs", href: "/remote-hr" },
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
          <div className="h-8 w-8 overflow-hidden rounded-md border border-slate-200 dark:border-slate-800">
             <img 
               src="https://res.cloudinary.com/dmqjicpcc/image/upload/v1765218297/1001440111_dztflg.jpg" 
               alt="Logo" 
               className="h-full w-full object-cover"
             />
          </div>
          <span className="text-lg font-bold text-primary hidden sm:block font-heading">HR Mentorship</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center gap-6 h-full">
          {menuItems.map((item) => (
            <div key={item.name} className="relative group h-full flex items-center">
              <Link 
                href={item.href} 
                className="flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-primary transition-colors py-2"
              >
                {item.name}
                {item.children && <ChevronDown className="h-4 w-4 opacity-50 group-hover:rotate-180 transition-transform duration-200" />}
              </Link>
              {item.children && (
                <div className="absolute top-[calc(100%-10px)] left-0 pt-4 w-48 hidden group-hover:block hover:block z-50">
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg rounded-lg p-1.5 overflow-hidden">
                    <div className="flex flex-col">
                      {item.children.map((child) => (
                        <Link 
                          key={child.name} 
                          href={child.href} 
                          className="px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary rounded-md transition-colors"
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
        <div className="hidden md:flex items-center gap-2">
          <ModeToggle />
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Search className="h-4 w-4 text-muted-foreground" />
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white shadow-sm px-5 h-9 text-sm rounded-full font-bold">
            Join Now
          </Button>
        </div>

        {/* Mobile Menu (Compact Grid) */}
        <div className="flex xl:hidden items-center gap-2">
          <ModeToggle />
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="-mr-2 h-9 w-9">
                <Menu className="h-5 w-5 text-foreground" />
              </Button>
            </SheetTrigger>
            
            {/* COMPACT BOTTOM SHEET */}
            <SheetContent side="bottom" className="max-h-[85vh] rounded-t-[1.5rem] px-4 pt-6 pb-8 bg-white dark:bg-slate-950 overflow-y-auto">
              
              <SheetHeader className="text-left mb-6 px-1">
                <SheetTitle className="text-lg font-bold text-slate-900 dark:text-white flex justify-between items-center">
                  <span>Menu</span>
                  <span className="text-xs font-normal text-muted-foreground">v1.0</span>
                </SheetTitle>
              </SheetHeader>

              {/* COMPACT GRID */}
              <div className="grid grid-cols-2 gap-3 pb-20">
                {menuItems.map((item) => (
                  <div key={item.name} className="flex flex-col">
                    {/* Compact Card */}
                    <div 
                      onClick={() => item.children ? toggleExpand(item.name) : setIsOpen(false)}
                      className={cn(
                        "flex flex-row items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border",
                        "bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800", // Light theme style
                        item.children && expandedItem === item.name ? "border-primary/50 bg-primary/5 dark:bg-primary/10" : "hover:bg-slate-100 dark:hover:bg-slate-800"
                      )}
                    >
                      <div className="h-8 w-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm text-primary shrink-0">
                         <item.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 flex items-center justify-between min-w-0">
                        <span className="font-semibold text-sm truncate text-slate-700 dark:text-slate-200">{item.name}</span>
                        {item.children && (
                          expandedItem === item.name ? <ChevronUp className="h-3 w-3 text-muted-foreground" /> : <ChevronDown className="h-3 w-3 text-muted-foreground" />
                        )}
                      </div>
                    </div>

                    {/* Sub-Menu */}
                    {item.children && expandedItem === item.name && (
                      <div className="col-span-2 mt-2 ml-4 space-y-1 border-l-2 border-slate-100 dark:border-slate-800 pl-3 animate-in slide-in-from-top-1">
                         {item.children.map((child) => (
                           <Link 
                             key={child.name} 
                             href={child.href} 
                             onClick={() => setIsOpen(false)}
                             className="block py-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
                           >
                             {child.name}
                           </Link>
                         ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Compact Fixed Button */}
              <div className="fixed bottom-6 left-6 right-6">
                 <Button className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 h-12 text-sm rounded-xl font-bold shadow-lg">
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
