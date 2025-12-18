"use client";

import { useState, useEffect } from "react";
import { Trash2, FileText, Briefcase, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ManageContent() {
  const [blogs, setBlogs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/blogs").then(res => res.json()),
      fetch("/api/jobs").then(res => res.json()),
      fetch("/api/events").then(res => res.json())
    ]).then(([blogsData, jobsData, eventsData]) => {
      setBlogs(blogsData);
      setJobs(jobsData);
      setEvents(eventsData);
    });
  }, []);

  async function handleDelete(type: string, id: number) {
    if(!confirm("Are you sure? This cannot be undone.")) return;
    const res = await fetch(`/api/${type}?id=${id}`, { method: 'DELETE' });
    if (res.ok) window.location.reload();
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 md:py-10 md:px-6 space-y-8">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"><ArrowLeft size={20}/></Link>
        <h1 className="text-2xl md:text-3xl font-bold">Manage Content</h1>
      </div>

      {/* BLOGS */}
      <section>
        <h2 className="text-lg font-bold flex items-center gap-2 mb-3 bg-slate-100 p-2 rounded"><FileText size={18}/> Blogs</h2>
        <div className="bg-white border rounded-lg divide-y">
          {blogs.map((item: any) => (
            <div key={item.id} className="p-4 flex justify-between items-center gap-4">
              <span className="text-sm md:text-base font-medium truncate">{item.title}</span>
              <button onClick={() => handleDelete('blogs', item.id)} className="shrink-0 text-red-500 p-2 bg-red-50 hover:bg-red-100 rounded-lg">
                 <Trash2 size={18}/>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* JOBS */}
      <section>
        <h2 className="text-lg font-bold flex items-center gap-2 mb-3 bg-slate-100 p-2 rounded"><Briefcase size={18}/> Jobs</h2>
        <div className="bg-white border rounded-lg divide-y">
          {jobs.map((item: any) => (
            <div key={item.id} className="p-4 flex justify-between items-center gap-4">
              <div className="min-w-0">
                <span className="text-sm md:text-base font-medium block truncate">{item.title}</span>
                <span className="text-xs text-gray-500 truncate">{item.company}</span>
              </div>
              <button onClick={() => handleDelete('jobs', item.id)} className="shrink-0 text-red-500 p-2 bg-red-50 hover:bg-red-100 rounded-lg">
                 <Trash2 size={18}/>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* EVENTS */}
      <section>
        <h2 className="text-lg font-bold flex items-center gap-2 mb-3 bg-slate-100 p-2 rounded"><Calendar size={18}/> Events</h2>
        <div className="bg-white border rounded-lg divide-y">
          {events.map((item: any) => (
            <div key={item.id} className="p-4 flex justify-between items-center gap-4">
              <div className="min-w-0">
                 <span className="text-sm md:text-base font-medium block truncate">{item.title}</span>
                 <span className="text-xs text-gray-500">{item.date}</span>
              </div>
              <button onClick={() => handleDelete('events', item.id)} className="shrink-0 text-red-500 p-2 bg-red-50 hover:bg-red-100 rounded-lg">
                 <Trash2 size={18}/>
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
