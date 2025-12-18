"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Loader2 } from "lucide-react";

export default function NewBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  // 1. Handle File Selection & Upload to Cloudinary
  async function handleImageUpload(e: any) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "m9wx2grx"); // Your Preset
    formData.append("cloud_name", "dmqjicpcc");   // Your Cloud Name

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dmqjicpcc/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setImageUrl(data.secure_url); // Save the URL we get back
    } catch (err) {
      alert("Image upload failed");
    }
    setUploading(false);
  }

  // 2. Submit the Form (Title + Content + Image URL)
  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const formData = {
      title: e.target.title.value,
      author: e.target.author.value,
      content: e.target.content.value,
      image: imageUrl, // Send the Cloudinary URL to our DB
    };

    const res = await fetch("/api/blogs", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      alert("Blog Published!");
      router.push("/blog");
    } else {
      alert("Failed to publish");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-6">Write New Blog</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border">
        
        {/* Image Upload Section */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Cover Image</label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition">
              <ImagePlus size={20} />
              <span>{uploading ? "Uploading..." : "Choose Image"}</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
            {imageUrl && (
              <img src={imageUrl} alt="Preview" className="h-12 w-12 object-cover rounded-md border" />
            )}
            {imageUrl && <span className="text-xs text-green-600 font-medium">Image Ready!</span>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input name="title" required className="w-full border p-3 rounded-lg" placeholder="Blog Headline" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Author</label>
          <input name="author" required className="w-full border p-3 rounded-lg" placeholder="Your Name" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea name="content" required rows={8} className="w-full border p-3 rounded-lg" placeholder="Write your article here..." />
        </div>

        <button 
          disabled={loading || uploading}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50 flex justify-center items-center gap-2"
        >
          {loading && <Loader2 className="animate-spin" size={20} />}
          {loading ? "Publishing..." : "Publish Blog"}
        </button>
      </form>
    </div>
  );
}
