"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, Briefcase, DollarSign, Clock, Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => {
        setJobs(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const currentJobs = filteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
       {/* HERO */}
       <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=2000" 
            alt="Jobs" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-purple-900/80 mix-blend-multiply" />
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
             <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Find Your Dream Role</h1>
             <p className="text-xl text-white/90">Explore curated opportunities from top companies.</p>
          </div>
       </section>

       <div className="max-w-7xl mx-auto px-6 py-20">
          
          {/* SEARCH */}
          <div className="mb-12 relative max-w-xl mx-auto">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
             <input 
               type="text" 
               placeholder="Search by job title or company..." 
               className="w-full p-4 pl-12 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm focus:ring-2 focus:ring-primary outline-none transition"
               onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
             />
          </div>

          {loading ? (
             <p className="text-center text-slate-500">Loading opportunities...</p>
          ) : filteredJobs.length > 0 ? (
             <>
               <div className="grid md:grid-cols-2 gap-6 mb-12">
                  {currentJobs.map(job => (
                     <div key={job.id} className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm hover:shadow-lg transition border border-slate-100 dark:border-slate-800 group">
                        <div className="flex justify-between items-start mb-4">
                           <div>
                              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition">{job.title}</h3>
                              <p className="text-slate-500 font-medium">{job.company}</p>
                           </div>
                           <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded-full text-slate-600 dark:text-slate-400 uppercase tracking-wide">{job.type}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400 mb-6">
                           <span className="flex items-center gap-1"><MapPin size={16}/> {job.location}</span>
                           {job.salary && <span className="flex items-center gap-1"><DollarSign size={16}/> {job.salary}</span>}
                           <span className="flex items-center gap-1"><Clock size={16}/> {new Date(job.createdAt).toLocaleDateString()}</span>
                        </div>

                        <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3 leading-relaxed">{job.description}</p>

                        <a href={job.applyLink} target="_blank" className="inline-block w-full text-center py-3 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition">
                           Apply Now
                        </a>
                     </div>
                  ))}
               </div>

               {/* PAGINATION */}
               {totalPages > 1 && (
                 <div className="flex justify-center gap-4">
                    <button 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-3 bg-white dark:bg-slate-900 rounded-full shadow-sm hover:bg-slate-50 disabled:opacity-50 transition"
                    >
                      <ChevronLeft/>
                    </button>
                    <span className="flex items-center font-bold text-slate-500">Page {currentPage} of {totalPages}</span>
                    <button 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-3 bg-white dark:bg-slate-900 rounded-full shadow-sm hover:bg-slate-50 disabled:opacity-50 transition"
                    >
                      <ChevronRight/>
                    </button>
                 </div>
               )}
             </>
          ) : (
             <div className="text-center py-20">
                <p className="text-xl text-slate-500 font-medium">No jobs found matching your search.</p>
             </div>
          )}
       </div>
    </div>
  );
}
