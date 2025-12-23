"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Calendar, MapPin, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default function NewEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const formData = {
      title: e.target.title.value,
      date: e.target.date.value,
      location: e.target.location.value,
      image: e.target.image.value,
    };

    const res = await fetch("/api/events", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/admin/manage"); // Redirect back to manage page
    } else {
      alert("Failed to create event. Please check the date format.");
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
          <Calendar className="text-primary" /> Create New Event
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-sm font-bold mb-2">Event Title</label>
            <input name="title" required className="w-full p-3 bg-slate-50 dark:bg-slate-950 border dark:border-slate-800 rounded-lg" placeholder="e.g. Annual HR Summit 2025" />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-bold mb-2">Date & Time</label>
                <input name="date" required type="datetime-local" className="w-full p-3 bg-slate-50 dark:bg-slate-950 border dark:border-slate-800 rounded-lg" />
             </div>
             <div>
                <label className="block text-sm font-bold mb-2">Location</label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input name="location" required className="w-full pl-10 p-3 bg-slate-50 dark:bg-slate-950 border dark:border-slate-800 rounded-lg" placeholder="e.g. Lagos, Zoom, etc." />
                </div>
             </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Cover Image URL (Optional)</label>
            <div className="relative">
               <ImageIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
               <input name="image" type="url" className="w-full pl-10 p-3 bg-slate-50 dark:bg-slate-950 border dark:border-slate-800 rounded-lg" placeholder="https://..." />
            </div>
          </div>

          <button disabled={loading} className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition flex items-center justify-center gap-2">
             {loading ? "Creating..." : <><Save size={18} /> Publish Event</>}
          </button>

        </form>
      </div>
    </div>
  );
}
