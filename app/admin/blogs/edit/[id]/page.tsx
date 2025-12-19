"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ImagePlus, ArrowLeft, Loader2, Save } from "lucide-react";

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
    image: ""
  });

  // Fetch Data on Load
  useEffect(() => {
    // Unwrap params.id if necessary or use directly depending on Next.js version behavior
    // but usually string in client component
    const blogId = params?.id;
    if (blogId) {
      fetch(`/api/blogs?id=${blogId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && !data.error) setFormData(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [params]);

  // Image Upload Logic
  async function handleImageUpload(e: any) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "m9wx2grx"); 
    form.append("cloud_name", "dmqjicpcc"); 
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dmqjicpcc/image/upload", { method: "POST", body: form });
      const data = await res.json();
      setFormData(prev => ({ ...prev, image: data.secure_url }));
    } catch (err) { alert("Image upload failed"); }
    setUploading(false);
  }

  // Handle Save
  async function handleSubmit(e: any) {
    e.preventDefault();
    setSaving(true);
    
    const res = await fetch("/api/blogs", { 
      method: "PUT", 
      body: JSON.stringify({ ...formData, id: params.id }) 
    });

    if (res.ok) { 
      alert("Blog Updated!"); 
      router.push("/admin/manage"); 
    } else { 
      alert("Failed to update"); 
    }
    setSaving(false);
  }

  if (loading) return <div className="p-10 text-center text-slate-500">Loading blog details...</div>;

  return (
    <div className="max-w-2xl mx-auto py-10 px-6">
      <Link href="/admin/manage" className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white mb-6 transition">
        <ArrowLeft size={20} /> Back to Manage Content
      </Link>
      <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Edit Blog Post</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border dark:border-slate-800">
        
        {/* Image */}
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Cover Image</label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-80 transition">
              <ImagePlus size={20} />
              <span>{uploading ? "Uploading..." : "Change Image"}</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
            {formData.image && <img src={formData.image} alt="Preview" className="h-12 w-12 object-cover rounded-md border dark:border-slate-700" />}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Title</label>
          <input 
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required 
            className="w-full border dark:border-slate-700 p-3 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white" 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Author</label>
          <input 
            value={formData.author}
            onChange={(e) => setFormData({...formData, author: e.target.value})}
            required 
            className="w-full border dark:border-slate-700 p-3 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white" 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Content</label>
          <textarea 
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            required 
            rows={8} 
            className="w-full border dark:border-slate-700 p-3 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white" 
          />
        </div>
        
        <button disabled={saving || uploading} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex justify-center items-center gap-2 transition font-bold">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
