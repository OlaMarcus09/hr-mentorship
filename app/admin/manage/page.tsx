"use client";

import { useState, useEffect } from "react";
import { Trash2, FileText, Briefcase, Calendar, ArrowLeft, Pencil } from "lucide-react";
import Link from "next/link";

export default function ManageContent() {
  // FIX: Added <any[]> so TypeScript knows these arrays will hold data
  const [blogs, setBlogs] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [blogsRes, jobsRes, eventsRes] = await Promise.all([
          fetch("/api/blogs").then(r => r.ok ? r.json() : []),
          fetch("/api/jobs").then(r => r.ok ? r.json() : []),
          fetch("/api/events").then(r => r.ok ? r.json() : [])
        ]);

        // Handle blogs pagination structure if present
        setBlogs(Array.isArray(blogsRes.blogs) ? blogsRes.blogs : (Array.isArray(blogsRes) ? blogsRes : []));
        setJobs(Array.isArray(jobsRes) ? jobsRes : []);
        setEvents(Array.isArray(eventsRes) ? eventsRes : []);
        
      } catch (error) {
        console.error("Failed to load content", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  async function handleDelete(type: string, id: number) {
    if(!confirm("Are you sure? This cannot be undone.")) return;
    const res = await fetch(`/api/${type}?id=${id}`, { method: 'DELETE' });
    if (res.ok) window.location.reload();
  }

  if (loading) return <div className="p-10 text-center text-slate-500 dark:text-slate-400">Loading content...</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/admin" className="p-2 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-700 dark:text-slate-200">
            <ArrowLeft size={20}/>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Manage Content</h1>
        </div>

        {/* BLOGS */}
        <section>
          <h2 className="text-lg font-bold flex items-center gap-2 mb-3 bg-slate-200 dark:bg-slate-900 p-2 rounded text-slate-800 dark:text-slate-200">
            <FileText size={18}/> Blogs
          </h2>
          <div className="bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-lg divide-y dark:divide-slate-800 shadow-sm">
            {blogs.length === 0 && <div className="p-4 text-slate-500">No blogs found.</div>}
            {blogs.map((item: any) => (
              <div key={item.id} className="p-4 flex justify-between items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                <span className="text-sm md:text-base font-medium truncate text-slate-700 dark:text-slate-300">{item.title}</span>
                <div className="flex items-center gap-2">
                   <Link href={`/admin/blogs/edit/${item.id}`} className="shrink-0 text-blue-500 p-2 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg transition">
                     <Pencil size={18} />
                   </Link>
                   <button onClick={() => handleDelete('blogs', item.id)} className="shrink-0 text-red-500 p-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition">
                      <Trash2 size={18}/>
                   </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* JOBS */}
        <section>
          <h2 className="text-lg font-bold flex items-center gap-2 mb-3 bg-slate-200 dark:bg-slate-900 p-2 rounded text-slate-800 dark:text-slate-200">
            <Briefcase size={18}/> Jobs
          </h2>
          <div className="bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-lg divide-y dark:divide-slate-800 shadow-sm">
            {jobs.length === 0 && <div className="p-4 text-slate-500">No jobs found.</div>}
            {jobs.map((item: any) => (
              <div key={item.id} className="p-4 flex justify-between items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                <div className="min-w-0">
                  <span className="text-sm md:text-base font-medium block truncate text-slate-700 dark:text-slate-300">{item.title}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-500 truncate">{item.company}</span>
                </div>
                <button onClick={() => handleDelete('jobs', item.id)} className="shrink-0 text-red-500 p-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition">
                   <Trash2 size={18}/>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* EVENTS */}
        <section>
          <h2 className="text-lg font-bold flex items-center gap-2 mb-3 bg-slate-200 dark:bg-slate-900 p-2 rounded text-slate-800 dark:text-slate-200">
            <Calendar size={18}/> Events
          </h2>
          <div className="bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-lg divide-y dark:divide-slate-800 shadow-sm">
            {events.length === 0 && <div className="p-4 text-slate-500">No events found.</div>}
            {events.map((item: any) => (
              <div key={item.id} className="p-4 flex justify-between items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                <div className="min-w-0">
                   <span className="text-sm md:text-base font-medium block truncate text-slate-700 dark:text-slate-300">{item.title}</span>
                   <span className="text-xs text-slate-500 dark:text-slate-500">{item.date}</span>
                </div>
                <button onClick={() => handleDelete('events', item.id)} className="shrink-0 text-red-500 p-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-lg transition">
                   <Trash2 size={18}/>
                </button>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
