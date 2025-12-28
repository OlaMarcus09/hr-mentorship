"use client";

import { useState } from "react";
import { MapPin, Briefcase, DollarSign, Search } from "lucide-react";

export default function JobsPage() {
  const [filter, setFilter] = useState("All");

  // Dummy Data for visual fullness
  const jobs = [
    { id: 1, title: "HR Manager", company: "Tech Global", location: "Lagos (Remote)", type: "Full Time", salary: "₦400k - ₦600k" },
    { id: 2, title: "Talent Acquisition Specialist", company: "Finance Corp", location: "Abuja", type: "Full Time", salary: "₦350k - ₦500k" },
    { id: 3, title: "HR Intern", company: "StartUp Inc", location: "Lagos", type: "Internship", salary: "₦100k" },
    { id: 4, title: "People Operations Lead", company: "Logistics Ltd", location: "Remote", type: "Contract", salary: "Negotiable" },
    { id: 5, title: "Learning & Dev Manager", company: "EduTech", location: "Lagos", type: "Full Time", salary: "₦700k+" },
  ];

  const filteredJobs = filter === "All" ? jobs : jobs.filter(j => j.type === filter);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      
      {/* 1. HERO SECTION (Clean White) */}
      <section className="pt-40 pb-16 px-6 bg-white dark:bg-slate-950 text-center border-b border-slate-100 dark:border-slate-800">
         <h1 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 dark:text-white mb-4">
           Find Your Next HR Role
         </h1>
         <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-8">
           Curated opportunities for HR professionals across Nigeria and beyond.
         </p>
         
         {/* Search Bar */}
         <div className="max-w-2xl mx-auto relative">
            <input type="text" placeholder="Search job titles or companies..." className="w-full pl-12 pr-4 py-4 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-primary/50" />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
         </div>
      </section>

      {/* 2. FILTERS */}
      <div className="max-w-5xl mx-auto px-6 py-10 flex gap-4 overflow-x-auto">
         {["All", "Full Time", "Contract", "Internship", "Remote"].map((f) => (
           <button 
             key={f}
             onClick={() => setFilter(f)}
             className={`px-6 py-2 rounded-full text-sm font-bold transition whitespace-nowrap ${filter === f ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100'}`}
           >
             {f}
           </button>
         ))}
      </div>

      {/* 3. JOB LIST */}
      <div className="max-w-5xl mx-auto px-6 pb-20 space-y-4">
         {filteredJobs.map((job) => (
           <div key={job.id} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800 hover:shadow-md transition flex flex-col md:flex-row justify-between md:items-center gap-4 group">
              <div>
                 <h3 className="font-bold text-xl text-slate-900 dark:text-white group-hover:text-primary transition">{job.title}</h3>
                 <p className="text-slate-500 dark:text-slate-400 font-medium mb-3">{job.company}</p>
                 <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1"><MapPin size={14}/> {job.location}</span>
                    <span className="flex items-center gap-1"><Briefcase size={14}/> {job.type}</span>
                    <span className="flex items-center gap-1"><DollarSign size={14}/> {job.salary}</span>
                 </div>
              </div>
              <button className="px-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                View Details
              </button>
           </div>
         ))}
      </div>

    </div>
  );
}
