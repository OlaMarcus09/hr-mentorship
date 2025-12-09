import Link from "next/link";
import { Menu, Search, Home, BookOpen, Users, Briefcase, Calendar, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader, SheetClose } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";

export default function Navbar() {
  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Users },
    { name: "Learning", href: "/learning", icon: BookOpen },
    { name: "Remote HR", href: "/remote-hr", icon: Briefcase },
    { name: "Experts", href: "/experts", icon: Users },
    { name: "Blog", href: "/blog", icon: FileText },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-10 w-10 overflow-hidden rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
             <img 
               src="https://res.cloudinary.com/dmqjicpcc/image/upload/v1765218297/1001440111_dztflg.jpg" 
               alt="HR Mentorship Logo" 
               className="h-full w-full object-cover"
             />
          </div>
          <span className="text-xl md:text-2xl font-bold text-primary hidden sm:block font-heading">HR Mentorship</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex md:items-center md:space-x-6">
          {navLinks.slice(1).map((link) => (
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
        <div className="hidden md:flex md:items-center md:space-x-4">
          <ModeToggle />
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg rounded-full px-6">
            Join Now
          </Button>
        </div>

        {/* Mobile Menu (Redesigned as Grid) */}
        <div className="flex md:hidden items-center gap-2">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-transparent">
                <Menu className="h-7 w-7 text-primary" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-[2rem] px-6">
              <SheetHeader className="mb-6 flex flex-row items-center justify-between">
                 <div className="flex items-center gap-3">
                    <img 
                       src="https://res.cloudinary.com/dmqjicpcc/image/upload/v1765218297/1001440111_dztflg.jpg" 
                       className="h-10 w-10 rounded-lg shadow-sm" 
                    />
                    <span className="text-xl font-bold font-heading">Menu</span>
                 </div>
                 {/* Close button is handled by Sheet default, but we can style content around it */}
              </SheetHeader>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                {navLinks.map((link) => (
                  <SheetClose key={link.name} asChild>
                    <Link
                      href={link.href}
                      className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-primary/50 hover:shadow-md transition-all group aspect-square"
                    >
                      <div className="h-12 w-12 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors shadow-sm">
                        <link.icon className="h-6 w-6 text-slate-600 dark:text-slate-400 group-hover:text-primary" />
                      </div>
                      <span className="text-base font-bold text-slate-700 dark:text-slate-200 group-hover:text-primary">{link.name}</span>
                    </Link>
                  </SheetClose>
                ))}
              </div>
              
              <div className="mt-8">
                 <Button className="w-full bg-primary text-white h-14 text-lg rounded-2xl shadow-xl shadow-primary/20 font-bold">
                   Join Membership
                 </Button>
                 <p className="text-center text-xs text-muted-foreground mt-4">Version 1.0.0</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
