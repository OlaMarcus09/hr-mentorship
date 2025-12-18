import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Calendar, Briefcase } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import LogoutButton from "./logout-button";
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

async function getData() {
  // 1. Fetch Stats
  const blogCount = await prisma.blog.count();
  const jobCount = await prisma.job.count();
  const eventCount = await prisma.event.count();
  const adminCount = await prisma.admin.count();
  
  // 2. NEXT.JS 15 FIX: We must 'await' the cookies() call
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  let isSuperAdmin = false;

  if (token) {
    // Extract ID from "mock-jwt-token-{ID}"
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
    <div className="space-y-8 p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center border-b pb-6">
        <div>
           <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
           <p className="text-gray-500">
             {data.isSuperAdmin ? "Welcome, Super Admin" : "Welcome, Admin"}
           </p>
        </div>
        
        <div className="flex items-center gap-3">
           <LogoutButton />
           <Link href="/admin/blogs/new" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 text-sm">+ Blog</Link>
           <Link href="/admin/jobs/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">+ Job</Link><Link href="/admin/events/new" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm ml-2">+ Event</Link><Link href="/admin/events/new" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm ml-2">+ Event</Link>
           
           {/* CONDITIONAL RENDERING: Only Super Admin sees this */}
           {data.isSuperAdmin && (
             <Link href="/admin/team" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 text-sm">
               Manage Team
             </Link>
           )}
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
