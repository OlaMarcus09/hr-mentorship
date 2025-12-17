"use client"

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  Image as ImageIcon, 
  Users, 
  Briefcase, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Blog Posts", href: "/admin/blogs", icon: FileText },
    { name: "Events", href: "/admin/events", icon: Calendar },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { name: "Team & Experts", href: "/admin/team", icon: Users },
    { name: "Remote Jobs", href: "/admin/jobs", icon: Briefcase },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900 transition-all duration-300">
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-slate-900 text-white hidden md:flex flex-col fixed h-full inset-y-0 z-50 transition-all duration-300 shadow-xl",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        {/* Header with Toggle */}
        <div className="h-16 flex items-center px-4 border-b border-slate-800 justify-between">
          {!isCollapsed && (
             <span className="text-xl font-bold text-cyan-400 font-heading whitespace-nowrap overflow-hidden animate-in fade-in duration-300">
               HR Admin
             </span>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(
              "text-slate-400 hover:text-white hover:bg-slate-800",
              isCollapsed ? "mx-auto" : "ml-auto"
            )}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className="block group">
                <div 
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2.5 transition-all duration-200 cursor-pointer",
                    isActive 
                      ? "bg-primary text-white shadow-md shadow-primary/20" 
                      : "text-slate-400 hover:text-white hover:bg-slate-800",
                    isCollapsed ? "justify-center" : "justify-start"
                  )}
                  title={isCollapsed ? item.name : ""}
                >
                  <item.icon className={cn("h-5 w-5 shrink-0", isCollapsed ? "mr-0" : "mr-3")} />
                  
                  {!isCollapsed && (
                    <span className="font-medium truncate animate-in fade-in duration-200">
                      {item.name}
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800">
          <Button 
            variant="destructive" 
            className={cn(
              "w-full transition-all duration-300", 
              isCollapsed ? "px-0 justify-center" : "justify-start px-4"
            )}
            title="Logout"
          >
            <LogOut className={cn("h-4 w-4", isCollapsed ? "mr-0" : "mr-2")} />
            {!isCollapsed && "Logout"}
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main 
        className={cn(
          "flex-1 p-4 md:p-8 transition-all duration-300 ease-in-out",
          isCollapsed ? "md:ml-20" : "md:ml-64"
        )}
      >
        {children}
      </main>
    </div>
  );
}
