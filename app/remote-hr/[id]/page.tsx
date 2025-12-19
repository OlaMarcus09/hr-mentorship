import { prisma } from '@/lib/prisma';
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, DollarSign, Building } from "lucide-react";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function SingleJobPage({ params }: { params: { id: string } }) {
  const job = await prisma.job.findUnique({ where: { id: parseInt(params.id) } });
  if (!job) notFound();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/remote-hr" className="inline-flex items-center gap-2 text-slate-500 hover:text-black dark:hover:text-white mb-8 transition">
          <ArrowLeft size={18} /> Back to Jobs
        </Link>
        
        <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-2xl shadow-sm border dark:border-slate-800">
           <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">{job.title}</h1>
           <div className="flex items-center gap-2 text-xl text-slate-600 dark:text-slate-400 mb-8">
              <Building size={20} /> {job.company}
           </div>

           <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10 border-y border-slate-100 dark:border-slate-800 py-6">
              <div>
                 <p className="text-xs text-slate-400 uppercase font-bold mb-1">Location</p>
                 <p className="font-medium flex items-center gap-2"><MapPin size={16}/> {job.location}</p>
              </div>
              <div>
                 <p className="text-xs text-slate-400 uppercase font-bold mb-1">Type</p>
                 <p className="font-medium flex items-center gap-2"><Clock size={16}/> {job.type}</p>
              </div>
              <div>
                 <p className="text-xs text-slate-400 uppercase font-bold mb-1">Salary</p>
                 <p className="font-medium flex items-center gap-2 text-green-600"><DollarSign size={16}/> {job.salary || "Negotiable"}</p>
              </div>
           </div>

           <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 mb-10 whitespace-pre-wrap">
              <h3 className="font-bold text-lg mb-2">Job Description</h3>
              {job.description || "No description provided."}
              
              {job.requirements && (
                <>
                  <h3 className="font-bold text-lg mt-6 mb-2">Requirements</h3>
                  {job.requirements}
                </>
              )}
           </div>

           <div className="text-center">
              <a 
                href={job.applyLink && job.applyLink.includes('@') ? `mailto:${job.applyLink}` : job.applyLink || '#'}
                target="_blank"
                className="inline-block w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-blue-500/30"
              >
                Apply for this Role
              </a>
           </div>
        </div>
      </div>
    </div>
  );
}
