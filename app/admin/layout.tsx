import Link from "next/link";
import { LayoutDashboard, FileText, Briefcase, Calendar, Image as ImageIcon, Users, Settings, LogOut } from "lucide-react";
import LogoutButton from "./logout-button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-slate-950">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 md:min-h-screen shrink-0">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <div className="h-8 w-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">HR</div>
          <span className="font-bold text-lg text-slate-900 dark:text-white">Admin Panel</span>
        </div>

        <nav className="p-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 rounded-lg transition font-medium">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          
          <div className="pt-4 pb-2 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Create Content</div>
          
          <Link href="/admin/blogs/new" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 rounded-lg transition font-medium">
            <FileText size={20} /> Write Blog
          </Link>
          <Link href="/admin/jobs/new" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 rounded-lg transition font-medium">
            <Briefcase size={20} /> Post Job
          </Link>
          <Link href="/admin/events/new" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 rounded-lg transition font-medium">
            <Calendar size={20} /> Create Event
          </Link>
          <Link href="/admin/gallery/new" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 rounded-lg transition font-medium">
            <ImageIcon size={20} /> Upload Photo
          </Link>

          <div className="pt-4 pb-2 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Management</div>

          <Link href="/admin/applications" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 rounded-lg transition font-medium">
            <Users size={20} /> Applicants
          </Link>
          <Link href="/admin/manage" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 rounded-lg transition font-medium">
            <LogOut size={20} className="rotate-180" /> Delete Items
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 rounded-lg transition font-medium">
            <Settings size={20} /> Settings
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
      
    </div>
  );
}
