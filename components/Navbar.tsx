"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// Menu Structure
const menuItems = [
  { name: "Home", href: "/" },
  {
    name: "About Us",
    href: "/about",
    children: [
      { name: "Who We Are", href: "/about" },
      { name: "Core Team Members", href: "/about#team" },
      { name: "Experts Council", href: "/experts" },
    ],
  },
  {
    name: "Learning Centre",
    href: "/learning",
    children: [
      { name: "Certificate Courses", href: "/learning" },
      { name: "Webinars", href: "/learning" },
      { name: "Events", href: "/events" },
      { name: "Resources", href: "/learning" },
      { name: "Templates", href: "/learning" },
      { name: "Book of the Month", href: "/learning" },
    ],
  },
  { name: "Blog", href: "/blog" },
  { name: "Contact Us", href: "/contact" },
  {
    name: "Gallery",
    href: "/gallery",
    children: [
      { name: "Members Gallery", href: "/gallery" },
      { name: "Events Gallery", href: "/gallery" },
    ],
  },
  {
    name: "More",
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

        {/* Desktop Navigation (Hover Dropdowns) */}
        <div className="hidden xl:flex items-center gap-6 h-full">
          {menuItems.map((item) => (
            <div key={item.name} className="relative group h-full flex items-center">
              {/* Parent Link */}
              <Link 
                href={item.href} 
                className="flex items-center gap-1 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors py-2"
              >
                {item.name}
                {item.children && <ChevronDown className="h-4 w-4 opacity-50 group-hover:rotate-180 transition-transform duration-200" />}
              </Link>

              {/* Hover Content (Only if children exist) */}
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

        {/* Mobile Menu (Bottom Sheet Accordion) */}
        <div className="flex xl:hidden items-center gap-2">
          <ModeToggle />
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="-mr-2">
                <Menu className="h-6 w-6 text-foreground" />
              </Button>
            </SheetTrigger>
            {/* UPDATED: side="bottom", height 85vh, rounded top */}
            <SheetContent side="bottom" className="h-[85vh] rounded-t-[2rem] overflow-y-auto px-6 pt-8">
              <SheetHeader className="text-left mb-6 flex flex-row items-center justify-between">
                <SheetTitle className="flex items-center gap-2">
                  <img src="https://res.cloudinary.com/dmqjicpcc/image/upload/v1765218297/1001440111_dztflg.jpg" className="h-8 w-8 rounded" />
                  <span className="text-primary font-bold">Menu</span>
                </SheetTitle>
              </SheetHeader>

              {/* Mobile List */}
              <div className="flex flex-col gap-1 pb-20">
                {menuItems.map((item) => (
                  item.children ? (
                    <Accordion type="single" collapsible key={item.name} className="w-full">
                      <AccordionItem value={item.name} className="border-b-0">
                        <AccordionTrigger className="py-4 text-lg font-semibold text-slate-800 dark:text-slate-100 hover:no-underline hover:text-primary">
                          {item.name}
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-3 pl-4 border-l-2 border-slate-100 dark:border-slate-800 ml-2 mb-2">
                          {item.children.map((child) => (
                            <Link 
                              key={child.name} 
                              href={child.href} 
                              onClick={() => setIsOpen(false)}
                              className="py-1 text-base text-slate-600 dark:text-slate-400 hover:text-primary font-medium"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="py-4 text-lg font-semibold text-slate-800 dark:text-slate-100 border-b border-transparent hover:text-primary flex justify-between items-center"
                    >
                      {item.name}
                    </Link>
                  )
                ))}

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                   <Button className="w-full bg-primary text-white h-14 text-lg rounded-2xl font-bold shadow-lg">
                     Join Now
                   </Button>
                </div>
              </div>

            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
