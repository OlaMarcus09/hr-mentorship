"use client";

import { useState } from "react";
import { CheckCircle, ImagePlus, Loader2 } from "lucide-react";
import Link from "next/link";

export default function ApplicationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  // Cloudinary Upload Logic
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
      name: e.target.name.value,
      email: e.target.email.value,
      type: e.target.type.value,
      linkedin: e.target.linkedin.value,
      bio: e.target.bio.value,
      image: imageUrl, // Send Image URL
    };

    const res = await fetch("/api/apply", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setSubmitted(true);
    } else {
      const err = await res.json();
      alert(err.error || "Something went wrong");
    }
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="bg-white p-8 rounded-2xl shadow text-center max-w-md">
          <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center text-green-600 mb-4">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Application Received!</h2>
          <p className="text-gray-600 mb-6">
            We have received your profile. We will review it and get back to you shortly.
          </p>
          <Link href="/" className="bg-black text-white px-6 py-2 rounded-lg font-bold">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 font-heading">Join the Mentorship Program</h1>
        <p className="text-xl text-gray-600">Apply to become a Mentor or find guidance as a Mentee.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 border rounded-2xl shadow-sm space-y-6">
        
        {/* Profile Picture Upload */}
        <div className="flex justify-center mb-6">
            <div className="text-center">
                <label className="block text-sm font-bold text-gray-700 mb-3">Profile Photo</label>
                <div className="relative inline-block">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-100 bg-slate-50 flex items-center justify-center">
                        {imageUrl ? (
                            <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <ImagePlus size={32} className="text-slate-300" />
                        )}
                    </div>
                    <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition shadow-sm">
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        {uploading ? <Loader2 size={16} className="animate-spin"/> : <ImagePlus size={16}/>}
                    </label>
                </div>
                <p className="text-xs text-gray-400 mt-2">Click icon to upload</p>
            </div>
        </div>

        {/* Role Selection */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">I want to join as a:</label>
          <div className="grid grid-cols-2 gap-4">
            <label className="border rounded-lg p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50">
              <input type="radio" name="type" value="Mentee" defaultChecked className="w-5 h-5 text-blue-600" />
              <div>
                <span className="font-bold block">Mentee</span>
                <span className="text-xs text-gray-500">I want to learn</span>
              </div>
            </label>
            <label className="border rounded-lg p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50">
              <input type="radio" name="type" value="Mentor" className="w-5 h-5 text-blue-600" />
              <div>
                <span className="font-bold block">Mentor</span>
                <span className="text-xs text-gray-500">I want to guide</span>
              </div>
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div><label className="block text-sm font-medium mb-1">Full Name</label><input name="name" required className="w-full p-3 border rounded-lg" placeholder="Jane Doe" /></div>
          <div><label className="block text-sm font-medium mb-1">Email Address</label><input name="email" type="email" required className="w-full p-3 border rounded-lg" placeholder="jane@example.com" /></div>
        </div>

        <div><label className="block text-sm font-medium mb-1">LinkedIn Profile</label><input name="linkedin" className="w-full p-3 border rounded-lg" placeholder="https://linkedin.com/in/..." /></div>
        <div><label className="block text-sm font-medium mb-1">Short Bio / Goals</label><textarea name="bio" required rows={4} className="w-full p-3 border rounded-lg" placeholder="Tell us about yourself..." /></div>

        <button disabled={loading || uploading} className="w-full bg-black text-white py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition disabled:opacity-50">
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}
