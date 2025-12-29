import { prisma } from '@/lib/prisma';
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Clock, DollarSign, Briefcase, ExternalLink, Calendar, CheckCircle } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function JobDetailsPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  
  // Fetch specific job
  const job = await prisma.job.findUnique({
    where: { id: parseInt(params.id) }
  });

  if (!job) return notFound();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20 px-6">
       <div className="max-w-4xl mx-auto">
          
          <Link href="/jobs" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-8 font-bold transition">
             <ArrowLeft size={20} /> Back to Jobs
          </Link>

          {/* JOB HEADER CARD */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 mb-8">
             <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                <div className="flex gap-6 items-center">
                   <div className="w-20 h-20 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold text-3xl uppercase">
                      {job.company.substring(0, 2)}
                   </div>
                   <div>
                      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{job.title}</h1>
                      <div className="flex flex-wrap gap-4 text-slate-500 dark:text-slate-400 font-medium">
                         <span className="flex items-center gap-1"><Briefcase size={18}/> {job.company}</span>
                         <span className="flex items-center gap-1"><MapPin size={18}/> {job.location}</span>
                         <span className="flex items-center gap-1"><Calendar size={18}/> Posted {new Date(job.postedAt).toLocaleDateString()}</span>
                      </div>
                   </div>
                </div>
                
                <a 
                   href={job.applyLink.startsWith('http') ? job.applyLink : `https://${job.applyLink}`} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition shadow-lg shadow-primary/20 flex items-center gap-2"
                >
                   Apply Now <ExternalLink size={20}/>
                </a>
             </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             {/* MAIN CONTENT */}
             <div className="md:col-span-2 space-y-8">
                
                {/* Description */}
                <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800">
                   <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Job Description</h3>
                   <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                      {job.description}
                   </div>
                </div>

                {/* Requirements (If valid) */}
                {job.requirements && (
                  <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800">
                     <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Requirements</h3>
                     <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                        {job.requirements}
                     </div>
                  </div>
                )}
             </div>

             {/* SIDEBAR */}
             <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                   <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Job Overview</h3>
                   
                   <div className="space-y-4">
                      <div className="flex items-start gap-4">
                         <Clock className="text-primary mt-1" size={20} />
                         <div>
                            <div className="font-bold text-slate-900 dark:text-white">Job Type</div>
                            <div className="text-slate-500">{job.type}</div>
                         </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                         <DollarSign className="text-primary mt-1" size={20} />
                         <div>
                            <div className="font-bold text-slate-900 dark:text-white">Salary</div>
                            <div className="text-slate-500">{job.salary || "Not specified"}</div>
                         </div>
                      </div>

                      <div className="flex items-start gap-4">
                         <MapPin className="text-primary mt-1" size={20} />
                         <div>
                            <div className="font-bold text-slate-900 dark:text-white">Location</div>
                            <div className="text-slate-500">{job.location}</div>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                   <h3 className="font-bold text-primary mb-2">Safety Tip</h3>
                   <p className="text-sm text-slate-600 dark:text-slate-400">
                     HR Mentorship will never ask you to pay for job applications. Please report any suspicious activity.
                   </p>
                </div>
             </div>
          </div>

       </div>
    </div>
  );
}
