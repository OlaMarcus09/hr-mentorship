import Link from "next/link";
import { Menu, Search, Home, BookOpen, Users, Briefcase, Calendar, ImageIcon, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetClose } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";

export default function Navbar() {
  const navLinks = [
    { name: "Home", href: "/home", icon: Home },
    { name: "About", href: "/about", icon: Users },
    { name: "Learning", href: "/learning", icon: BookOpen },
    { name: "Remote HR", href: "/remote-hr", icon: Briefcase },
    { name: "Experts", href: "/experts", icon: Users },
    { name: "Events", href: "/events", icon: Calendar },
    { name: "Gallery", href: "/gallery", icon: ImageIcon },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 md:h-16 items-center justify-between px-4">
        
        {/* Logo */}
        <Link href="/home" className="flex items-center space-x-2">
          <div className="h-8 w-8 md:h-9 md:w-9 overflow-hidden rounded-md border border-slate-200 dark:border-slate-800">
             <img 
               src="https://res.cloudinary.com/dmqjicpcc/image/upload/v1765218297/1001440111_dztflg.jpg" 
               alt="Logo" 
               className="h-full w-full object-cover"
             />
          </div>
          <span className="text-lg md:text-xl font-semibold text-primary hidden sm:block font-heading">HR Mentorship</span>
        </Link>

        {/* Desktop Navigation - FIXED: Removed .slice(1) to show Home */}
        <div className="hidden xl:flex md:items-center md:space-x-5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary hover:underline underline-offset-4"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex md:items-center md:space-x-3">
          <ModeToggle />
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Search className="h-4 w-4 text-muted-foreground" />
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-white shadow-sm px-5 h-9 text-sm">
            Join Now
          </Button>
        </div>

        {/* Mobile Actions */}
        <div className="flex xl:hidden items-center gap-2">
          <Button size="sm" className="bg-primary h-8 text-xs px-3 rounded-full">
            Join
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                <Menu className="h-5 w-5 text-foreground" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-[1.5rem] px-5 pt-6 overflow-y-auto">
              <SheetHeader className="mb-4 flex flex-row items-center justify-between">
                 <div className="flex items-center gap-2">
                    <span className="text-lg font-bold font-heading text-primary">Menu</span>
                 </div>
              </SheetHeader>
              
              <div className="grid grid-cols-3 gap-3 mt-2 pb-8">
                {navLinks.map((link) => (
                  <SheetClose key={link.name} asChild>
                    <Link
                      href={link.href}
                      className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-all aspect-square"
                    >
                      <div className="h-8 w-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center mb-2 shadow-sm">
                        <link.icon className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                      </div>
                      <span className="text-xs font-medium text-center leading-tight">{link.name}</span>
                    </Link>
                  </SheetClose>
                ))}
              </div>
              
              <div className="mt-4 flex items-center justify-between border-t pt-4 mb-8">
                 <span className="text-sm font-medium">Theme</span>
                 <ModeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
