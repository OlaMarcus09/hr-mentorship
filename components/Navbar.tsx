"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const menuItems = [
  { name: "Home", href: "/" },
  {
    name: "About Us",
    children: [
      { name: "Who We Are", href: "/about" },
      { name: "Core Team Members", href: "/about#team" },
      { name: "Experts Council", href: "/experts" },
    ],
  },
  {
    name: "Learning Centre",
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
    children: [
      { name: "Members Gallery", href: "/gallery" },
      { name: "Events Gallery", href: "/gallery" },
    ],
  },
  {
    name: "More",
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

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center gap-6">
          {menuItems.map((item) => (
            item.children ? (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-primary outline-none transition-colors data-[state=open]:text-primary">
                  {item.name} <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                {/* FIXED: Added explicit background, border, and shadow classes */}
                <DropdownMenuContent className="w-56 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl rounded-xl p-2 z-50">
                  {item.children.map((child) => (
                    <DropdownMenuItem key={child.name} asChild className="focus:bg-slate-100 dark:focus:bg-slate-800 cursor-pointer rounded-lg px-3 py-2.5">
                      <Link href={child.href} className="w-full font-medium">
                        {child.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link 
                key={item.name} 
                href={item.href} 
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            )
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3">
          <ModeToggle />
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white shadow-sm px-6 rounded-full">
            Join Now
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="flex xl:hidden items-center gap-2">
          <ModeToggle />
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="-mr-2">
                <Menu className="h-6 w-6 text-foreground" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] overflow-y-auto bg-background border-l">
              <SheetHeader className="text-left mb-6">
                <SheetTitle className="flex items-center gap-2">
                  <img src="https://res.cloudinary.com/dmqjicpcc/image/upload/v1765218297/1001440111_dztflg.jpg" className="h-8 w-8 rounded" />
                  <span className="text-primary font-bold">Menu</span>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-1">
                {menuItems.map((item) => (
                  item.children ? (
                    <Accordion type="single" collapsible key={item.name} className="w-full border-none">
                      <AccordionItem value={item.name} className="border-b-0">
                        <AccordionTrigger className="py-3 text-base font-medium hover:no-underline hover:text-primary [&[data-state=open]]:text-primary">
                          {item.name}
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-1 pl-4 border-l-2 border-slate-100 dark:border-slate-800 ml-2 pb-2">
                          {item.children.map((child) => (
                            <Link 
                              key={child.name} 
                              href={child.href} 
                              onClick={() => setIsOpen(false)}
                              className="py-2 px-2 text-sm text-muted-foreground hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-900 rounded-md transition-colors block"
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
                      className="py-3 text-base font-medium border-b border-transparent hover:text-primary flex justify-between items-center"
                    >
                      {item.name}
                    </Link>
                  )
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                 <Button className="w-full bg-primary text-white h-12 text-lg rounded-xl">
                   Join Now
                 </Button>
              </div>

            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
