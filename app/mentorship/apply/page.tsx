"use client";

import { useState } from "react";
import { Check, Upload } from "lucide-react";
import Image from "next/image";

export default function ApplyPage() {
  const [role, setRole] = useState<'mentee' | 'mentor'>('mentee');

  return (
    // FIX: Increased top padding to pt-32 to clear the Navbar completely
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
         {/* Simple Role Toggle */}
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

         <form className="p-8 space-y-6">
            {/* Profile Photo Upload UI */}
            <div className="flex flex-col items-center mb-6">
               <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 cursor-pointer hover:border-primary transition group relative overflow-hidden">
                  <Upload className="text-slate-400 group-hover:text-primary" />
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
               </div>
               <span className="text-xs text-slate-500 mt-2">Upload Profile Photo</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
               <div>
                  <label className="block text-sm font-bold mb-2">Full Name</label>
                  <input type="text" className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950" placeholder="Jane Doe" />
               </div>
               <div>
                  <label className="block text-sm font-bold mb-2">Email Address</label>
                  <input type="email" className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950" placeholder="jane@example.com" />
               </div>
            </div>

            <div>
               <label className="block text-sm font-bold mb-2">LinkedIn Profile URL</label>
               <input type="url" className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950" placeholder="https://linkedin.com/in/..." />
            </div>

            <div>
               <label className="block text-sm font-bold mb-2">Current Role & Company</label>
               <input type="text" className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950" placeholder="HR Manager at..." />
            </div>

            <div>
               <label className="block text-sm font-bold mb-2">Why do you want to join?</label>
               <textarea rows={4} className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950" placeholder="Tell us about your goals..."></textarea>
            </div>

            <button type="button" className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition shadow-lg mt-4">
               Submit Application
            </button>
         </form>
      </div>
    </div>
  );
}
