import Link from "next/link";
import { Menu, Search, Home, BookOpen, Users, Briefcase, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";

export default function Navbar() {
  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "About Us", href: "/about", icon: Users },
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
          <div className="h-10 w-10 overflow-hidden rounded-lg">
             <img 
               src="https://res.cloudinary.com/dmqjicpcc/image/upload/v1765218297/1001440111_dztflg.jpg" 
               alt="HR Mentorship Logo" 
               className="h-full w-full object-cover"
             />
          </div>
          <span className="text-xl md:text-2xl font-bold text-primary hidden sm:block">HR Mentorship</span>
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
          <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg">
            Join Now
          </Button>
        </div>

        {/* Mobile Menu (Sheet) */}
        <div className="flex md:hidden items-center gap-2">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                 <SheetTitle className="text-left flex items-center gap-2">
                    <img 
                       src="https://res.cloudinary.com/dmqjicpcc/image/upload/v1765218297/1001440111_dztflg.jpg" 
                       className="h-8 w-8 rounded" 
                    />
                    <span className="text-primary font-bold">Menu</span>
                 </SheetTitle>
              </SheetHeader>
              
              <div className="flex flex-col space-y-2 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-primary/10 transition-colors group"
                  >
                    <link.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                    <span className="text-lg font-medium group-hover:text-primary">{link.name}</span>
                  </Link>
                ))}
                
                <div className="h-px bg-border my-4" />
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
