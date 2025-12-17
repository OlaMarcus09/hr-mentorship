import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  Image as ImageIcon, 
  Users, 
  Settings, 
  LogOut,
  Briefcase
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900">
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col fixed h-full inset-y-0 z-50">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <span className="text-xl font-bold text-cyan-400 font-heading">HR Admin</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin">
            <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
              <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
            </Button>
          </Link>
          <Link href="/admin/blogs">
            <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
              <FileText className="mr-2 h-4 w-4" /> Blog Posts
            </Button>
          </Link>
          <Link href="/admin/events">
            <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
              <Calendar className="mr-2 h-4 w-4" /> Events
            </Button>
          </Link>
          <Link href="/admin/gallery">
            <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
              <ImageIcon className="mr-2 h-4 w-4" /> Gallery
            </Button>
          </Link>
          <Link href="/admin/team">
            <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
              <Users className="mr-2 h-4 w-4" /> Team & Experts
            </Button>
          </Link>
          <Link href="/admin/jobs">
            <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
              <Briefcase className="mr-2 h-4 w-4" /> Remote Jobs
            </Button>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Button variant="destructive" className="w-full">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
