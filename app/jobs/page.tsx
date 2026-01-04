"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Clock, Briefcase, DollarSign, ChevronRight, ChevronLeft, Loader2, Search } from "lucide-react";

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch('/api/jobs');
        const data = await res.json();
        if (Array.isArray(data)) setJobs(data);
      } catch (error) {
        console.error("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  // Filter Logic
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase()) ||
    job.location.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const formatDate = (dateString: string) => {
    if (!dateString) return "Recently";
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-slate-900 dark:text-white mb-4">
            Career Opportunities
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Find your dream role. We connect talented professionals with top-tier companies.
          </p>
        </div>

        {/* SEARCH */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 mb-10 max-w-2xl mx-auto flex gap-2">
          <Search className="text-slate-400 my-auto ml-2" size={20}/>
          <input 
            type="text" 
            placeholder="Search by role, company, or location..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-slate-900 dark:text-white p-2"
          />
        </div>

        {/* JOBS LIST */}
        {loading ? (
          <div className="h-64 flex items-center justify-center"><Loader2 className="animate-spin text-primary" size={40}/></div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {currentJobs.length > 0 ? currentJobs.map((job) => (
                <div key={job.id} className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-lg hover:-translate-y-1 transition group flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-primary transition">{job.title}</h3>
                      <p className="text-sm text-slate-500 font-bold">{job.company}</p>
                    </div>
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                      {job.type}
                    </span>
                  </div>

                  <div className="space-y-2 mb-6 flex-1">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <MapPin size={16} className="text-primary"/> {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <DollarSign size={16} className="text-green-600"/> {job.salary}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Clock size={16} className="text-orange-500"/> Posted {formatDate(job.createdAt)}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-3">
                    <Link 
                      href={`/jobs/${job.id}`}
                      className="flex-1 py-2.5 text-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                    >
                      View Details
                    </Link>
                    <a 
                      href={job.applyLink || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 text-center rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary/90 transition shadow-lg shadow-primary/20"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              )) : (
                <div className="col-span-full text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-300">
                  <Briefcase className="mx-auto text-slate-300 mb-4" size={48} />
                  <p className="text-slate-500 font-bold">No jobs found matching your search.</p>
                </div>
              )}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-md disabled:opacity-50 hover:bg-slate-50 transition"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="px-4 py-3 bg-white dark:bg-slate-800 rounded-full shadow-md font-bold text-sm flex items-center">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-md disabled:opacity-50 hover:bg-slate-50 transition"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
