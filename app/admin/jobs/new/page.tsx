"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

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
      salary: e.target.salary.value,
      description: e.target.description.value,
      requirements: e.target.requirements.value,
      applyLink: e.target.applyLink.value,
    };
    
    const res = await fetch("/api/jobs", { method: "POST", body: JSON.stringify(formData) });
    if (res.ok) { alert("Job Posted!"); router.push("/admin"); } 
    else { const err = await res.json(); alert(err.error || "Failed"); }
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-6">
      <Link href="/admin" className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white mb-6 transition">
        <ArrowLeft size={20} /> Back to Dashboard
      </Link>
      <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Post New Job</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border dark:border-slate-800">
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Job Title *</label>
            <input name="title" required className="w-full border dark:border-slate-700 p-3 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white" placeholder="e.g. HR Manager" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Company *</label>
            <input name="company" required className="w-full border dark:border-slate-700 p-3 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white" placeholder="e.g. Google" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
             <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Work Type</label>
             <select name="type" className="w-full border dark:border-slate-700 p-3 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
               <option>Remote</option>
               <option>Hybrid</option>
               <option>On-site</option>
             </select>
          </div>
          <div>
             <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Location *</label>
             <input name="location" required className="w-full border dark:border-slate-700 p-3 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white" placeholder="e.g. Lagos, Nigeria" />
          </div>
        </div>

        <div>
           <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Salary (Optional)</label>
           <input name="salary" className="w-full border dark:border-slate-700 p-3 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white" placeholder="e.g. $50,000 - $70,000 / year" />
        </div>

        <div>
           <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Job Description *</label>
           <textarea name="description" required rows={6} className="w-full border dark:border-slate-700 p-3 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white" placeholder="Describe the role, responsibilities, and team culture..." />
        </div>

        <div>
           <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Requirements</label>
           <textarea name="requirements" rows={4} className="w-full border dark:border-slate-700 p-3 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white" placeholder="- 5+ years experience&#10;- Knowledge of HR software" />
        </div>

        <div>
           <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Apply Link or Email</label>
           <input name="applyLink" className="w-full border dark:border-slate-700 p-3 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white" placeholder="https://company.com/apply or jobs@company.com" />
        </div>

        <button disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 transition flex items-center justify-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : "Post Job"}
        </button>
      </form>
    </div>
  );
}
