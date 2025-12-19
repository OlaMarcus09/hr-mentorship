"use client";

import { useState, useEffect } from "react";
import { User, Linkedin, Mail, CheckCircle, XCircle, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ApplicationsList() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL"); // ALL, Mentor, Mentee

  // Fetch applications on load
  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    const res = await fetch("/api/apply/list");
    const data = await res.json();
    setApps(data);
    setLoading(false);
  }

  // Handle Approve/Reject
  async function handleStatus(id: number, newStatus: string) {
    if(!confirm(`Are you sure you want to mark this as ${newStatus}?`)) return;

    const res = await fetch("/api/apply/status", {
      method: "POST",
      body: JSON.stringify({ id, status: newStatus }),
      headers: { "Content-Type": "application/json" }
    });

    if (res.ok) {
      fetchApplications(); // Refresh list immediately
    } else {
      alert("Failed to update status");
    }
  }

  // Filter Logic
  const filteredApps = apps.filter((app: any) => 
    filter === "ALL" ? true : app.type === filter
  );

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen text-slate-500">
       Loading applicants...
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
             <ArrowLeft size={20}/>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Applicants</h1>
            <p className="text-gray-500 text-sm">Review potential mentors and mentees</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-gray-100 p-1 rounded-lg self-start">
          {["ALL", "Mentor", "Mentee"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${filter === tab ? 'bg-white shadow text-black' : 'text-gray-500 hover:text-black'}`}
            >
              {tab === "ALL" ? "All" : tab + "s"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {filteredApps.length === 0 ? <p className="text-center text-gray-500 py-10">No applications found.</p> : filteredApps.map((app: any) => (
          <div key={app.id} className="bg-white border rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6">
            
            {/* Left: Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-xl font-bold">{app.name}</h3>
                <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${app.type === 'Mentor' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                  {app.type}
                </span>
                
                {/* Status Badge */}
                {app.status === 'PENDING' && <span className="flex items-center gap-1 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded font-bold"><Clock size={12}/> Pending</span>}
                {app.status === 'APPROVED' && <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold"><CheckCircle size={12}/> Approved</span>}
                {app.status === 'REJECTED' && <span className="flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold"><XCircle size={12}/> Rejected</span>}
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                <a href={`mailto:${app.email}`} className="flex items-center gap-1 hover:text-black hover:underline">
                  <Mail size={16} /> {app.email}
                </a>
                {app.linkedin && (
                  <a href={app.linkedin} target="_blank" className="flex items-center gap-1 hover:text-blue-600 hover:underline">
                    <Linkedin size={16} /> LinkedIn Profile
                  </a>
                )}
                <span className="text-xs text-gray-400 mt-0.5">Applied: {new Date(app.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg text-gray-700 border">
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Bio / Goals</p>
                <p className="text-sm leading-relaxed">{app.bio}</p>
              </div>
            </div>
            
            {/* Right: Actions */}
            <div className="flex md:flex-col justify-end gap-2 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6 min-w-[140px]">
              {app.status === 'PENDING' ? (
                <>
                  <button 
                    onClick={() => handleStatus(app.id, 'APPROVED')}
                    className="flex-1 bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-600 transition flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={16} /> Approve
                  </button>
                  <button 
                    onClick={() => handleStatus(app.id, 'REJECTED')}
                    className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition flex items-center justify-center gap-2"
                  >
                    <XCircle size={16} /> Reject
                  </button>
                </>
              ) : (
                <div className="text-center text-sm text-gray-400 italic py-2">
                  Decision Made
                </div>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
