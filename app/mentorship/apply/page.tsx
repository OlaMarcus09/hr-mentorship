"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

export default function ApplyPage() {
  const [role, setRole] = useState<'mentee' | 'mentor'>('mentee');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      role,
      name: formData.get("name"),
      email: formData.get("email"),
      linkedin: formData.get("linkedin"),
      goal: formData.get("goal"),
    };

    try {
      const res = await fetch("/api/applicants/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Application submitted successfully! We will contact you soon.");
        (e.target as HTMLFormElement).reset();
      } else {
        alert("Failed to submit. Please try again.");
      }
    } catch (err) {
      alert("Error submitting form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto text-center mb-10">
         <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-4">
           Join the Mentorship Program
         </h1>
         <p className="text-slate-600 dark:text-slate-400">
           Apply to become a Mentor or find guidance as a Mentee.
         </p>
      </div>

      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
         <div className="flex border-b border-slate-100 dark:border-slate-800">
            <button 
              onClick={() => setRole('mentee')}
              className={`flex-1 py-4 text-center font-bold transition ${role === 'mentee' ? 'bg-primary text-white' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
               I want to be a Mentee
            </button>
            <button 
              onClick={() => setRole('mentor')}
              className={`flex-1 py-4 text-center font-bold transition ${role === 'mentor' ? 'bg-primary text-white' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
               I want to be a Mentor
            </button>
         </div>

         <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
               <div>
                  <label className="block text-sm font-bold mb-2">Full Name</label>
                  <input name="name" required className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950" placeholder="Jane Doe" />
               </div>
               <div>
                  <label className="block text-sm font-bold mb-2">Email Address</label>
                  <input name="email" type="email" required className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950" placeholder="jane@example.com" />
               </div>
            </div>

            <div>
               <label className="block text-sm font-bold mb-2">LinkedIn Profile URL</label>
               <input name="linkedin" type="url" className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950" placeholder="https://linkedin.com/in/..." />
            </div>

            <div>
               <label className="block text-sm font-bold mb-2">Why do you want to join?</label>
               <textarea name="goal" rows={4} required className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950" placeholder="Tell us about your goals..."></textarea>
            </div>

            <button disabled={loading} type="submit" className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition shadow-lg mt-4 disabled:opacity-50">
               {loading ? "Submitting..." : "Submit Application"}
            </button>
         </form>
      </div>
    </div>
  );
}
