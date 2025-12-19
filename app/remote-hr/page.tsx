import { prisma } from '@/lib/prisma';
import { Briefcase, MapPin, Clock, DollarSign, ArrowRight } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

async function getJobs() {
  return await prisma.job.findMany({ orderBy: { postedAt: 'desc' } });
}

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 font-bold text-sm mb-4">
            <Briefcase size={16} /> HR Marketplace
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Find Your Next <span className="text-blue-600">HR Opportunity</span>
          </h1>
        </div>

        <div className="grid gap-4">
          {jobs.map((job) => (
            <Link key={job.id} href={`/remote-hr/${job.id}`} className="group bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-lg transition flex flex-col md:flex-row justify-between md:items-center gap-6">
               <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition">{job.title}</h3>
                  <p className="text-slate-500 font-medium mb-3">{job.company}</p>
                  <div className="flex flex-wrap gap-3 text-sm text-slate-500">
                    <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full"><MapPin size={14}/> {job.location}</span>
                    <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full"><Clock size={14}/> {job.type}</span>
                    {job.salary && <span className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-1 rounded-full"><DollarSign size={14}/> {job.salary}</span>}
                  </div>
               </div>
               <span className="shrink-0 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-lg font-bold text-sm text-center">View Details</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
