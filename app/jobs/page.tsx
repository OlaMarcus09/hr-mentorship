import { prisma } from '@/lib/prisma';
import Link from "next/link";
import { MapPin, DollarSign, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function JobsPage(props: { searchParams: Promise<{ page?: string }> }) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || '1');
  const pageSize = 8;

  const jobs = await prisma.job.findMany({ 
    orderBy: { postedAt: 'desc' },
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  const totalJobs = await prisma.job.count();
  const totalPages = Math.ceil(totalJobs / pageSize);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
       {/* HERO SECTION */}
       <section className="relative pt-48 pb-20 px-6 bg-primary">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200')] bg-cover bg-center opacity-10"></div>
         <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">Latest Opportunities</h1>
            <p className="text-xl text-white/90">Find your next role in our community.</p>
         </div>
       </section>

       <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
             {jobs.map((job) => (
                <div key={job.id} className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-xl transition group">
                   <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                         <Briefcase size={24}/>
                      </div>
                      <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">{job.type}</span>
                   </div>
                   
                   <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition">{job.title}</h3>
                   <p className="text-slate-500 font-medium mb-4">{job.company}</p>
                   
                   <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-6 border-t border-slate-100 dark:border-slate-800 pt-4">
                      <span className="flex items-center gap-1"><MapPin size={16}/> {job.location}</span>
                      {job.salary && <span className="flex items-center gap-1 text-green-600 font-bold"><DollarSign size={16}/> {job.salary}</span>}
                   </div>

                   <Link href={`/jobs/${job.id}`} className="block text-center w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg hover:opacity-90 transition">
                      View Details
                   </Link>
                </div>
             ))}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center gap-4">
             {page > 1 && (
               <Link href={`/jobs?page=${page - 1}`} className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold transition">
                 <ChevronLeft size={16}/> Previous
               </Link>
             )}
             {page < totalPages && (
               <Link href={`/jobs?page=${page + 1}`} className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold transition">
                 Next <ChevronRight size={16}/>
               </Link>
             )}
          </div>
       </div>
    </div>
  );
}
