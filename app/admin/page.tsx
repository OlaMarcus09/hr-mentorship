import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Calendar, Briefcase, Trash2, FileCheck, Shield, Settings, PenTool, Plus } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import LogoutButton from "./logout-button";
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

async function getData() {
  const blogCount = await prisma.blog.count();
  const jobCount = await prisma.job.count();
  const eventCount = await prisma.event.count();
  const adminCount = await prisma.admin.count();
  
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  let isSuperAdmin = false;

  if (token) {
    const adminId = token.split('-').pop(); 
    if (adminId) {
      const admin = await prisma.admin.findUnique({ where: { id: parseInt(adminId) } });
      if (admin?.role === 'SUPER_ADMIN') isSuperAdmin = true;
    }
  }

  return { blogCount, jobCount, eventCount, adminCount, isSuperAdmin };
}

export default async function AdminDashboard() {
  const data = await getData();

  return (
    <div className="space-y-6 pb-20">
      {/* HEADER */}
      <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-6">
         <div>
           <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
           <p className="text-sm text-slate-500">Welcome back, Admin</p>
         </div>
         <div className="flex items-center gap-2">
           <Link href="/admin/settings" className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
             <Settings size={20} />
           </Link>
           <LogoutButton />
         </div>
      </div>
      
      {/* ACTION GRID - FIXED FOR MOBILE */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
         <Link href="/admin/blogs/new" className="bg-slate-900 dark:bg-white text-white dark:text-black p-4 rounded-xl hover:opacity-90 transition flex flex-col items-center justify-center gap-2 text-center">
           <PenTool size={24} /> <span className="text-sm font-bold">Write Blog</span>
         </Link>
         <Link href="/admin/jobs/new" className="bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition flex flex-col items-center justify-center gap-2 text-center">
           <Briefcase size={24} /> <span className="text-sm font-bold">Post Job</span>
         </Link>
         <Link href="/admin/events/new" className="bg-green-600 text-white p-4 rounded-xl hover:bg-green-700 transition flex flex-col items-center justify-center gap-2 text-center">
           <Calendar size={24} /> <span className="text-sm font-bold">New Event</span>
         </Link>
         <Link href="/admin/applications" className="bg-purple-600 text-white p-4 rounded-xl hover:bg-purple-700 transition flex flex-col items-center justify-center gap-2 text-center">
           <FileCheck size={24} /> <span className="text-sm font-bold">Applicants</span>
         </Link>
         
         {/* Second Row */}
         <Link href="/admin/gallery/new" className="bg-pink-600 text-white p-4 rounded-xl hover:bg-pink-700 transition flex flex-col items-center justify-center gap-2 text-center">
            <Plus size={24} /> <span className="text-sm font-bold">Add Photo</span>
         </Link>
         <Link href="/admin/manage" className="bg-red-600 text-white p-4 rounded-xl hover:bg-red-700 transition flex flex-col items-center justify-center gap-2 text-center">
            <Trash2 size={24} /> <span className="text-sm font-bold">Delete</span>
         </Link>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border dark:border-slate-800">
           <p className="text-xs text-slate-500 uppercase font-bold">Blogs</p>
           <p className="text-2xl font-bold">{data.blogCount}</p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border dark:border-slate-800">
           <p className="text-xs text-slate-500 uppercase font-bold">Jobs</p>
           <p className="text-2xl font-bold">{data.jobCount}</p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border dark:border-slate-800">
           <p className="text-xs text-slate-500 uppercase font-bold">Events</p>
           <p className="text-2xl font-bold">{data.eventCount}</p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border dark:border-slate-800">
           <p className="text-xs text-slate-500 uppercase font-bold">Admins</p>
           <p className="text-2xl font-bold">{data.adminCount}</p>
        </div>
      </div>
    </div>
  );
}
