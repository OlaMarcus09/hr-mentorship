"use client";

import { useState, useEffect } from "react";
import { User, Linkedin, Mail, CheckCircle, XCircle, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ApplicationsList() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => { fetchApplications(); }, []);

  async function fetchApplications() {
    const res = await fetch("/api/apply/list");
    const data = await res.json();
    setApps(data);
    setLoading(false);
  }

  async function handleStatus(id: number, newStatus: string) {
    if(!confirm(`Mark as ${newStatus}?`)) return;
    const res = await fetch("/api/apply/status", {
      method: "POST",
      body: JSON.stringify({ id, status: newStatus }),
      headers: { "Content-Type": "application/json" }
    });
    if (res.ok) fetchApplications();
  }

  const filteredApps = apps.filter((app: any) => filter === "ALL" ? true : app.type === filter);

  if (loading) return <div className="flex justify-center items-center min-h-screen text-slate-500 dark:text-slate-400">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition">
              <ArrowLeft size={20}/>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Applicants</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Review potential mentors and mentees</p>
            </div>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex bg-slate-200 dark:bg-slate-900 p-1 rounded-lg self-start">
            {["ALL", "Mentor", "Mentee"].map((tab) => (
              <button 
                key={tab} 
                onClick={() => setFilter(tab)} 
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  filter === tab 
                    ? 'bg-white dark:bg-slate-700 shadow text-black dark:text-white' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {tab === "ALL" ? "All" : tab + "s"}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="grid gap-6">
          {filteredApps.length === 0 ? (
            <p className="text-center text-slate-500 dark:text-slate-400 py-10">No applications found.</p>
          ) : (
            filteredApps.map((app: any) => (
              <div key={app.id} className="bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6 transition hover:shadow-md">
                
                {/* Profile Picture */}
                <div className="shrink-0">
                   <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden border dark:border-slate-700">
                     {app.image ? (
                       <img src={app.image} alt={app.name} className="h-full w-full object-cover" />
                     ) : (
                       <div className="h-full w-full flex items-center justify-center text-slate-400"><User size={32}/></div>
                     )}
                   </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{app.name}</h3>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${app.type === 'Mentor' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'}`}>
                      {app.type}
                    </span>
                    
                    {/* Status Badges */}
                    {app.status === 'PENDING' && <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2 py-0.5 rounded font-bold">Pending</span>}
                    {app.status === 'APPROVED' && <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded font-bold">Approved</span>}
                    {app.status === 'REJECTED' && <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-0.5 rounded font-bold">Rejected</span>}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                    <a href={`mailto:${app.email}`} className="flex items-center gap-1 hover:text-black dark:hover:text-white hover:underline"><Mail size={16} /> {app.email}</a>
                    {app.linkedin && <a href={app.linkedin} target="_blank" className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 hover:underline"><Linkedin size={16} /> LinkedIn</a>}
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg text-slate-700 dark:text-slate-300 border dark:border-slate-700">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Bio</p>
                    {app.bio}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex md:flex-col justify-center gap-2 min-w-[140px]">
                  {app.status === 'PENDING' ? (
                    <>
                      <button onClick={() => handleStatus(app.id, 'APPROVED')} className="flex-1 bg-black dark:bg-white dark:text-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-600 dark:hover:bg-green-400 transition flex items-center justify-center gap-2">
                        <CheckCircle size={16} /> Approve
                      </button>
                      <button onClick={() => handleStatus(app.id, 'REJECTED')} className="flex-1 bg-white dark:bg-transparent border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 hover:border-red-200 transition flex items-center justify-center gap-2">
                        <XCircle size={16} /> Reject
                      </button>
                    </>
                  ) : <div className="text-center text-sm text-slate-400 italic">Decision Made</div>}
                </div>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
