"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Link as LinkIcon, FileText } from "lucide-react";
import Link from "next/link";

export default function NewResourcePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const formData = {
      title: e.target.title.value,
      type: e.target.type.value,
      description: e.target.description.value,
      fileUrl: e.target.fileUrl.value,
    };

    const res = await fetch("/api/resources", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/learning/resources"); // Go to view it
    } else {
      alert("Failed to save resource");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-6">
      <Link href="/admin" className="inline-flex items-center gap-2 text-slate-500 hover:text-black dark:hover:text-white mb-6 transition">
        <ArrowLeft size={20} /> Back to Dashboard
      </Link>
      
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border dark:border-slate-800">
        <h1 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
          <FileText className="text-primary" /> Add Resource
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-sm font-bold mb-2">Resource Title</label>
            <input name="title" required className="w-full p-3 bg-slate-50 dark:bg-slate-950 border dark:border-slate-800 rounded-lg" placeholder="e.g. Employee Handbook Template" />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-bold mb-2">Type</label>
                <select name="type" className="w-full p-3 bg-slate-50 dark:bg-slate-950 border dark:border-slate-800 rounded-lg">
                  <option value="PDF">PDF Document</option>
                  <option value="DOCX">Word Document</option>
                  <option value="VIDEO">Video Recording</option>
                  <option value="LINK">External Link</option>
                </select>
             </div>
             <div>
                <label className="block text-sm font-bold mb-2">File / Link URL</label>
                <input name="fileUrl" required type="url" className="w-full p-3 bg-slate-50 dark:bg-slate-950 border dark:border-slate-800 rounded-lg" placeholder="https://..." />
             </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Short Description</label>
            <textarea name="description" rows={3} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border dark:border-slate-800 rounded-lg" placeholder="What is this resource about?" />
          </div>

          <button disabled={loading} className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition flex items-center justify-center gap-2">
             {loading ? "Saving..." : <><Save size={18} /> Publish Resource</>}
          </button>

        </form>
      </div>
    </div>
  );
}
