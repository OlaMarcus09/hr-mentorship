import { prisma } from '@/lib/prisma';
import { Briefcase, MapPin, Clock, DollarSign, Search } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

async function getJobs() {
  const jobs = await prisma.job.findMany({
    orderBy: { postedAt: 'desc' }
  });
  return jobs;
}

export default async function RemoteHrPage() {
  const jobs = await getJobs();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 md:px-8">
      
      {/* HEADER */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 font-bold text-sm mb-4">
          <Briefcase size={16} /> HR Marketplace
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
          Find Your Next <span className="text-blue-600">HR Opportunity</span>
        </h1>
        <p className="text-slate-500 text-lg">
          Curated remote and hybrid roles for top HR professionals.
        </p>
      </div>

      {/* JOB LIST */}
      <div className="max-w-4xl mx-auto space-y-4">
        {jobs.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 p-12 rounded-xl text-center border border-dashed">
            <Briefcase size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">No Jobs Posted Yet</h3>
            <p className="text-slate-500">Check back later for new opportunities.</p>
          </div>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="group bg-white dark:bg-slate-900 p-6 rounded-xl border hover:border-blue-500 hover:shadow-md transition duration-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                
                {/* Job Info */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition">
                    {job.title}
                  </h3>
                  <div className="text-slate-500 font-medium mb-3">{job.company}</div>
                  
                  <div className="flex flex-wrap gap-3 text-sm text-slate-500">
                    <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                      <MapPin size={14} /> {job.location}
                    </span>
                    <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                      <Clock size={14} /> {job.type}
                    </span>
                    {job.salary && (
                      <span className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-1 rounded-full font-medium">
                        <DollarSign size={14} /> {job.salary}
                      </span>
                    )}
                  </div>
                </div>

                {/* Apply Button */}
                <Link href={`mailto:careers@hrmentorship.com?subject=Application for ${job.title}`} className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition whitespace-nowrap">
                  Apply Now
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
