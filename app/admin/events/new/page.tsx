"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ImagePlus, Calendar, MapPin, ArrowLeft } from "lucide-react";

export default function NewEventPage() {
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
      date: e.target.date.value,
      location: e.target.location.value,
      image: imageUrl,
    };
    const res = await fetch("/api/events", { method: "POST", body: JSON.stringify(formData) });
    if (res.ok) { alert("Event Created!"); router.push("/admin"); } 
    else { const err = await res.json(); alert(err.error); }
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-6">
      <Link href="/admin" className="inline-flex items-center gap-2 text-gray-500 hover:text-black mb-6">
        <ArrowLeft size={20} /> Back to Dashboard
      </Link>
      <h1 className="text-3xl font-bold mb-6">Create New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Event Banner</label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition">
              <ImagePlus size={20} />
              <span>{uploading ? "Uploading..." : "Choose Image"}</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
            {imageUrl && <img src={imageUrl} alt="Preview" className="h-12 w-12 object-cover rounded-md border" />}
          </div>
        </div>
        <div><label className="block text-sm font-medium mb-1">Event Title</label><input name="title" required className="w-full border p-3 rounded-lg" placeholder="e.g. HR Summit 2025" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium mb-1">Date</label><div className="relative"><Calendar className="absolute left-3 top-3 text-gray-400" size={18} /><input name="date" type="date" required className="w-full border p-3 pl-10 rounded-lg" /></div></div>
          <div><label className="block text-sm font-medium mb-1">Location</label><div className="relative"><MapPin className="absolute left-3 top-3 text-gray-400" size={18} /><input name="location" required className="w-full border p-3 pl-10 rounded-lg" placeholder="Zoom / Lagos" /></div></div>
        </div>
        <button disabled={loading || uploading} className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50">{loading ? "Creating..." : "Create Event"}</button>
      </form>
    </div>
  );
}
