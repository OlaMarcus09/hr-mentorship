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

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"><ArrowLeft size={20}/></Link>
          <div><h1 className="text-3xl font-bold">Applicants</h1><p className="text-gray-500 text-sm">Review potential mentors and mentees</p></div>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg self-start">
          {["ALL", "Mentor", "Mentee"].map((tab) => (
            <button key={tab} onClick={() => setFilter(tab)} className={`px-4 py-2 rounded-md text-sm font-medium transition ${filter === tab ? 'bg-white shadow text-black' : 'text-gray-500 hover:text-black'}`}>{tab === "ALL" ? "All" : tab + "s"}</button>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {filteredApps.length === 0 ? <p className="text-center text-gray-500">No applications found.</p> : filteredApps.map((app: any) => (
          <div key={app.id} className="bg-white border rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6">
            
            {/* NEW: Profile Picture Display */}
            <div className="shrink-0">
               <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-gray-100 overflow-hidden border">
                 {app.image ? (
                   <img src={app.image} alt={app.name} className="h-full w-full object-cover" />
                 ) : (
                   <div className="h-full w-full flex items-center justify-center text-gray-400"><User size={32}/></div>
                 )}
               </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <h3 className="text-xl font-bold">{app.name}</h3>
                <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${app.type === 'Mentor' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>{app.type}</span>
                {app.status === 'PENDING' && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded font-bold">Pending</span>}
                {app.status === 'APPROVED' && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">Approved</span>}
                {app.status === 'REJECTED' && <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold">Rejected</span>}
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                <a href={`mailto:${app.email}`} className="flex items-center gap-1 hover:text-black hover:underline"><Mail size={16} /> {app.email}</a>
                {app.linkedin && <a href={app.linkedin} target="_blank" className="flex items-center gap-1 hover:text-blue-600 hover:underline"><Linkedin size={16} /> LinkedIn</a>}
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-gray-700 border"><p className="text-xs font-bold text-gray-400 uppercase mb-1">Bio</p>{app.bio}</div>
            </div>
            
            <div className="flex md:flex-col justify-center gap-2 min-w-[140px]">
              {app.status === 'PENDING' ? (
                <>
                  <button onClick={() => handleStatus(app.id, 'APPROVED')} className="flex-1 bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-600 transition flex items-center justify-center gap-2"><CheckCircle size={16} /> Approve</button>
                  <button onClick={() => handleStatus(app.id, 'REJECTED')} className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-50 hover:text-red-600 transition flex items-center justify-center gap-2"><XCircle size={16} /> Reject</button>
                </>
              ) : <div className="text-center text-sm text-gray-400 italic">Decision Made</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
