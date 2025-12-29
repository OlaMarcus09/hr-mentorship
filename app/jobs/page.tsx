import { prisma } from '@/lib/prisma';
import Link from "next/link";
import { MapPin, Clock, DollarSign, Briefcase, Search, Filter, ArrowRight } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function JobsPage() {
  // 1. Fetch Jobs from Database (Newest first)
  const jobs = await prisma.job.findMany({
    orderBy: { postedAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-48 pb-20 px-6 bg-primary">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200')] bg-cover bg-center opacity-10"></div>
         <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Find Your Dream HR Role
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Browse the latest opportunities from top companies curated for the HR Mentorship community.
            </p>
         </div>
      </section>

      {/* 2. JOBS LIST */}
      <section className="max-w-6xl mx-auto px-6 py-20 -mt-10 relative z-20">
         
         {/* Search Bar UI (Visual only for now) */}
         <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-4 mb-12">
            <div className="flex-1 flex items-center px-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
               <Search className="text-slate-400" size={20}/>
               <input type="text" placeholder="Search job title or keyword..." className="w-full bg-transparent p-3 outline-none" />
            </div>
            <div className="flex-1 flex items-center px-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
               <MapPin className="text-slate-400" size={20}/>
               <input type="text" placeholder="Location..." className="w-full bg-transparent p-3 outline-none" />
            </div>
            <button className="bg-primary text-white font-bold px-8 py-3 rounded-lg hover:bg-primary/90 transition">
               Search Jobs
            </button>
         </div>

         {/* Job Grid */}
         {jobs.length === 0 ? (
            <div className="text-center py-20">
               <div className="bg-slate-100 dark:bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Briefcase className="text-slate-400" size={32} />
               </div>
               <h3 className="text-xl font-bold text-slate-900 dark:text-white">No jobs posted yet</h3>
               <p className="text-slate-500">Check back later or join our Telegram for alerts.</p>
            </div>
         ) : (
            <div className="grid gap-6">
               {jobs.map((job) => (
                  <div key={job.id} className="group bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-xl transition flex flex-col md:flex-row gap-6 items-start md:items-center">
                     
                     {/* Company Logo Placeholder */}
                     <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold text-2xl shrink-0 uppercase">
                        {job.company.substring(0, 2)}
                     </div>

                     <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition mb-2">
                           {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
                           <span className="flex items-center gap-1"><Briefcase size={16}/> {job.company}</span>
                           <span className="flex items-center gap-1"><MapPin size={16}/> {job.location}</span>
                           <span className="flex items-center gap-1"><Clock size={16}/> {job.type}</span>
                           {job.salary && <span className="flex items-center gap-1 text-green-600 dark:text-green-400"><DollarSign size={16}/> {job.salary}</span>}
                        </div>
                     </div>

                     <Link 
                        href={`/jobs/${job.id}`} 
                        className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-lg hover:bg-primary hover:text-white transition whitespace-nowrap"
                     >
                        View Details
                     </Link>
                  </div>
               ))}
            </div>
         )}

      </section>
    </div>
  );
}
