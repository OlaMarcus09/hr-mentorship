"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const formData = {
      title: e.target.title.value,
      company: e.target.company.value,
      type: e.target.type.value,
      location: e.target.location.value,
    };

    const res = await fetch("/api/jobs", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      alert("Job Posted!");
      router.push("/jobs");
    } else {
      alert("Failed to post job");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Post New Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4 border p-6 rounded-lg bg-white shadow">
        
        <div>
          <label className="block text-sm font-medium mb-1">Job Title</label>
          <input name="title" required className="w-full border p-2 rounded" placeholder="e.g. HR Manager" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Company</label>
          <input name="company" required className="w-full border p-2 rounded" placeholder="Company Name" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select name="type" className="w-full border p-2 rounded">
              <option>Remote</option>
              <option>Hybrid</option>
              <option>On-site</option>
            </select>
          </div>
          <div>
             <label className="block text-sm font-medium mb-1">Location</label>
             <input name="location" required className="w-full border p-2 rounded" placeholder="e.g. Lagos" />
          </div>
        </div>

        <button 
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
}
