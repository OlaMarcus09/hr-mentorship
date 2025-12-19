"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ImagePlus, Loader2, ArrowLeft } from "lucide-react";

export default function NewBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  async function handleImageUpload(e: any) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "m9wx2grx"); 
    formData.append("cloud_name", "dmqjicpcc"); 
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dmqjicpcc/image/upload", { method: "POST", body: formData });
      const data = await res.json();
      setImageUrl(data.secure_url);
    } catch (err) { alert("Image upload failed"); }
    setUploading(false);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    const formData = {
      title: e.target.title.value,
      author: e.target.author.value,
      content: e.target.content.value,
      image: imageUrl,
    };
    const res = await fetch("/api/blogs", { method: "POST", body: JSON.stringify(formData) });
    if (res.ok) { alert("Blog Published!"); router.push("/admin"); } 
    else { alert("Failed to publish"); }
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-6">
      <Link href="/admin" className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white mb-6 transition">
        <ArrowLeft size={20} /> Back to Dashboard
      </Link>
      <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Write New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border dark:border-slate-800">
        
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Cover Image</label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-80 transition">
              <ImagePlus size={20} />
              <span>{uploading ? "Uploading..." : "Choose Image"}</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
            {imageUrl && <img src={imageUrl} alt="Preview" className="h-12 w-12 object-cover rounded-md border dark:border-slate-700" />}
          </div>
        </div>

        <div><label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Title</label><input name="title" required className="w-full border dark:border-slate-700 p-3 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white" placeholder="Blog Headline" /></div>
        <div><label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Author</label><input name="author" required className="w-full border dark:border-slate-700 p-3 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white" placeholder="Your Name" /></div>
        <div><label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Content</label><textarea name="content" required rows={8} className="w-full border dark:border-slate-700 p-3 rounded-lg bg-white dark:bg-slate-950 text-slate-900 dark:text-white" placeholder="Write your article here..." /></div>
        
        <button disabled={loading || uploading} className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-lg hover:opacity-90 disabled:opacity-50 flex justify-center items-center gap-2 transition">
          {loading ? "Publishing..." : "Publish Blog"}
        </button>
      </form>
    </div>
  );
}
