import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Calendar, Briefcase, Trash2, FileCheck, Shield, Settings } from "lucide-react";
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
      if (admin?.role === 'SUPER_ADMIN') {
        isSuperAdmin = true;
      }
    }
  }

  return { blogCount, jobCount, eventCount, adminCount, isSuperAdmin };
}

export default async function AdminDashboard() {
  const data = await getData();

  return (
    <div className="space-y-8 p-4 md:p-8">
      {/* HEADER */}
      <div className="flex flex-col gap-6 border-b pb-6">
        <div className="flex justify-between items-center">
           <div>
             <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
             <p className="text-sm text-gray-500">
               {data.isSuperAdmin ? "Super Admin" : "Admin Panel"}
             </p>
           </div>
           
           <div className="flex items-center gap-2">
             <Link href="/admin/settings" className="p-2 text-gray-600 hover:bg-gray-100 rounded-full" title="Settings">
               <Settings size={20} />
             </Link>
             <LogoutButton />
           </div>
        </div>
        
        {/* ACTION TOOLBAR */}
        <div className="grid grid-cols-2 md:flex md:flex-wrap items-center gap-3">
           
           <Link href="/admin/blogs/new" className="bg-black text-white px-4 py-3 md:py-2 rounded-lg hover:bg-gray-800 text-sm font-medium text-center shadow-sm">
             + Blog
           </Link>
           <Link href="/admin/jobs/new" className="bg-blue-600 text-white px-4 py-3 md:py-2 rounded-lg hover:bg-blue-700 text-sm font-medium text-center shadow-sm">
             + Job
           </Link>
           <Link href="/admin/events/new" className="bg-green-600 text-white px-4 py-3 md:py-2 rounded-lg hover:bg-green-700 text-sm font-medium text-center shadow-sm">
             + Event
           </Link>

           <div className="hidden md:block h-6 w-px bg-gray-300 mx-1"></div>

           <Link href="/admin/applications" className="bg-indigo-600 text-white px-4 py-3 md:py-2 rounded-lg hover:bg-indigo-700 text-sm font-medium text-center shadow-sm flex items-center justify-center gap-2">
             <FileCheck size={16} /> Applicants
           </Link>
           <Link href="/admin/manage" className="bg-red-600 text-white px-4 py-3 md:py-2 rounded-lg hover:bg-red-700 text-sm font-medium text-center shadow-sm flex items-center justify-center gap-2">
             <Trash2 size={16} /> Delete
           </Link>
           
           {data.isSuperAdmin && (
             <Link href="/admin/team" className="col-span-2 md:col-span-1 bg-purple-600 text-white px-4 py-3 md:py-2 rounded-lg hover:bg-purple-700 text-sm font-medium border border-purple-400 text-center flex items-center justify-center gap-2">
               <Shield size={16} /> Team
             </Link>
           )}
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.blogCount}</div>
            <p className="text-xs text-muted-foreground">Published articles</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.jobCount}</div>
            <p className="text-xs text-muted-foreground">Open positions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.eventCount}</div>
            <p className="text-xs text-muted-foreground">Upcoming</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.adminCount}</div>
            <p className="text-xs text-muted-foreground">Active Admins</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
