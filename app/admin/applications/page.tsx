"use client";

import { useState, useEffect } from "react";
import { User, Linkedin, Mail } from "lucide-react";

export default function ApplicationsList() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/apply/list")
      .then((res) => res.json())
      .then((data) => {
        setApps(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8">Loading applications...</div>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-8">Mentorship Applications</h1>

      <div className="grid gap-6">
        {apps.length === 0 ? <p>No applications yet.</p> : apps.map((app: any) => (
          <div key={app.id} className="bg-white border rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold">{app.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${app.type === 'Mentor' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                    {app.type}
                  </span>
                </div>
                
                <div className="flex gap-4 text-sm text-gray-500 mb-4">
                  <a href={`mailto:${app.email}`} className="flex items-center gap-1 hover:text-black">
                    <Mail size={16} /> {app.email}
                  </a>
                  {app.linkedin && (
                    <a href={app.linkedin} target="_blank" className="flex items-center gap-1 hover:text-blue-600">
                      <Linkedin size={16} /> LinkedIn Profile
                    </a>
                  )}
                </div>

                <div className="bg-gray-50 p-4 rounded text-gray-700">
                  <p className="text-sm font-bold text-gray-400 uppercase mb-1">Bio / Goals</p>
                  {app.bio}
                </div>
              </div>
              
              <div className="text-xs text-gray-400">
                {new Date(app.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
