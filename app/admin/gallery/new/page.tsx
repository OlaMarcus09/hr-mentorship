"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ImagePlus, ArrowLeft } from "lucide-react";

export default function NewGalleryPhoto() {
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
    } catch (err) { alert("Upload failed"); }
    setUploading(false);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const formData = {
      image: imageUrl,
      category: e.target.category.value,
      caption: e.target.caption.value,
    };

    const res = await fetch("/api/gallery", { method: "POST", body: JSON.stringify(formData) });
    if (res.ok) { alert("Photo Added!"); router.push("/admin"); } 
    else { alert("Failed to save"); }
    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto py-10 px-6">
      <Link href="/admin" className="inline-flex items-center gap-2 text-gray-500 hover:text-black mb-6">
        <ArrowLeft size={20} /> Back to Dashboard
      </Link>
      <h1 className="text-3xl font-bold mb-6">Add to Gallery</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border">
        
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Upload Photo</label>
          <div className="flex flex-col items-center gap-4 border-2 border-dashed p-6 rounded-lg">
            {imageUrl ? (
               <img src={imageUrl} className="h-40 object-cover rounded-lg shadow-sm" />
            ) : (
               <div className="h-40 w-full bg-gray-50 flex items-center justify-center text-gray-400">Preview</div>
            )}
            
            <label className="cursor-pointer bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition">
              <ImagePlus size={20} />
              <span>{uploading ? "Uploading..." : "Select Image"}</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* Category Selector */}
        <div>
           <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
           <select name="category" className="w-full border p-3 rounded-lg bg-white">
             <option value="Workshop">Workshop</option>
             <option value="Event">Event</option>
             <option value="Networking">Networking</option>
             <option value="Mentorship">Mentorship</option>
           </select>
        </div>

        <div>
           <label className="block text-sm font-medium mb-1">Caption (Optional)</label>
           <input name="caption" className="w-full border p-3 rounded-lg" placeholder="Short description..." />
        </div>

        <button disabled={loading || uploading || !imageUrl} className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 disabled:opacity-50">
          {loading ? "Saving..." : "Add to Gallery"}
        </button>
      </form>
    </div>
  );
}
