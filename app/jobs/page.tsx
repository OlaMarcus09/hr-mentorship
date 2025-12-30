import { prisma } from '@/lib/prisma';
import Link from "next/link";
import { MapPin, Clock, DollarSign, Briefcase } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function JobsPage() {
  const jobs = await prisma.job.findMany({ orderBy: { postedAt: 'desc' } });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20 px-6">
       <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Latest Opportunities</h1>
       </div>
       
       <div className="max-w-5xl mx-auto grid gap-6">
          {jobs.map((job) => (
             <div key={job.id} className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-lg transition flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1">
                   <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                   <div className="flex flex-wrap gap-4 text-sm text-slate-500 font-medium">
                      <span className="flex items-center gap-1"><Briefcase size={16}/> {job.company}</span>
                      <span className="flex items-center gap-1"><MapPin size={16}/> {job.location}</span>
                      {job.salary && <span className="flex items-center gap-1 text-green-600"><DollarSign size={16}/> {job.salary}</span>}
                   </div>
                </div>
                <Link href={`/jobs/${job.id}`} className="px-6 py-3 bg-slate-100 dark:bg-slate-800 font-bold rounded-lg hover:bg-primary hover:text-white transition">View Details</Link>
             </div>
          ))}
       </div>
    </div>
  );
}
