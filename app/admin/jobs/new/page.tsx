"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
    const res = await fetch("/api/jobs", { method: "POST", body: JSON.stringify(formData) });
    if (res.ok) { alert("Job Posted!"); router.push("/admin"); } 
    else { const err = await res.json(); alert(err.error); }
    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto py-10 px-6">
      <Link href="/admin" className="inline-flex items-center gap-2 text-gray-500 hover:text-black mb-6">
        <ArrowLeft size={20} /> Back to Dashboard
      </Link>
      <h1 className="text-3xl font-bold mb-6">Post New Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-xl shadow-sm border">
        <div><label className="block text-sm font-medium mb-1">Job Title</label><input name="title" required className="w-full border p-3 rounded-lg" /></div>
        <div><label className="block text-sm font-medium mb-1">Company</label><input name="company" required className="w-full border p-3 rounded-lg" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium mb-1">Type</label><select name="type" className="w-full border p-3 rounded-lg"><option>Remote</option><option>Hybrid</option><option>On-site</option></select></div>
          <div><label className="block text-sm font-medium mb-1">Location</label><input name="location" required className="w-full border p-3 rounded-lg" placeholder="e.g. London" /></div>
        </div>
        <button disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50">{loading ? "Posting..." : "Post Job"}</button>
      </form>
    </div>
  );
}
