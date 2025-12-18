"use client";

import { useState, useEffect } from "react";
import { Trash2, FileText, Briefcase, Calendar } from "lucide-react";

export default function ManageContent() {
  const [blogs, setBlogs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [events, setEvents] = useState([]);

  // Fetch all content on load
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

    // Call the specific API endpoint with DELETE method
    const res = await fetch(`/api/${type}?id=${id}`, { method: 'DELETE' });
    
    if (res.ok) {
      alert("Deleted successfully");
      window.location.reload(); // Quick refresh to update list
    } else {
      alert("Failed to delete");
    }
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 space-y-12">
      <h1 className="text-3xl font-bold">Manage Content</h1>

      {/* BLOGS SECTION */}
      <section>
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4"><FileText size={20}/> Blogs</h2>
        <div className="bg-white border rounded-lg divide-y">
          {blogs.map((item: any) => (
            <div key={item.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
              <span>{item.title}</span>
              <button onClick={() => handleDelete('blogs', item.id)} className="text-red-500 p-2 hover:bg-red-50 rounded"><Trash2 size={16}/></button>
            </div>
          ))}
        </div>
      </section>

      {/* JOBS SECTION */}
      <section>
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4"><Briefcase size={20}/> Jobs</h2>
        <div className="bg-white border rounded-lg divide-y">
          {jobs.map((item: any) => (
            <div key={item.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
              <div>
                <span className="font-medium block">{item.title}</span>
                <span className="text-sm text-gray-500">{item.company}</span>
              </div>
              <button onClick={() => handleDelete('jobs', item.id)} className="text-red-500 p-2 hover:bg-red-50 rounded"><Trash2 size={16}/></button>
            </div>
          ))}
        </div>
      </section>

      {/* EVENTS SECTION */}
      <section>
        <h2 className="text-xl font-bold flex items-center gap-2 mb-4"><Calendar size={20}/> Events</h2>
        <div className="bg-white border rounded-lg divide-y">
          {events.map((item: any) => (
            <div key={item.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
              <div>
                 <span className="font-medium block">{item.title}</span>
                 <span className="text-sm text-gray-500">{item.date}</span>
              </div>
              <button onClick={() => handleDelete('events', item.id)} className="text-red-500 p-2 hover:bg-red-50 rounded"><Trash2 size={16}/></button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
