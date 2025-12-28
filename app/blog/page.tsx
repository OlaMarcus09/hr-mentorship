"use client";

import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20 px-6">
       
       {/* HERO */}
       <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-6">HR Insights & Community News</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            Stay updated with the latest trends, success stories, and announcements from the HR Mentorship team.
          </p>
          
          {/* TELEGRAM CTA */}
          <a href="https://t.me/hrmentorship" target="_blank" className="inline-flex items-center gap-2 px-8 py-3 bg-[#229ED9] text-white font-bold rounded-full hover:opacity-90 transition shadow-lg shadow-blue-400/20">
             <ExternalLink size={18} /> Join our Telegram Channel
          </a>
       </div>

       {/* BLOG GRID (Dummy Data) */}
       <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <article key={i} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-xl transition group">
               <div className="h-48 bg-slate-200 dark:bg-slate-800 relative">
                  {/* Placeholder for Blog Image */}
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition"></div>
               </div>
               <div className="p-6">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">Career Growth</span>
                  <h3 className="text-xl font-bold mt-2 mb-3 text-slate-900 dark:text-white group-hover:text-primary transition">
                    Navigating HR Leadership in 2025
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 mb-4">
                    The landscape of Human Resources is changing rapidly. Here are the key skills you need to stay ahead...
                  </p>
                  <span className="text-sm font-bold text-slate-900 dark:text-white underline">Read More</span>
               </div>
            </article>
          ))}
       </div>

       {/* PAGINATION */}
       <div className="max-w-6xl mx-auto flex justify-between items-center border-t border-slate-200 dark:border-slate-800 pt-8">
          <button className="flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 transition font-bold text-slate-600 dark:text-slate-300">
             <ArrowLeft size={18} /> Previous
          </button>
          
          <div className="flex gap-2">
             <button className="w-10 h-10 rounded-lg bg-primary text-white font-bold">1</button>
             <button className="w-10 h-10 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition">2</button>
             <button className="w-10 h-10 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition">3</button>
          </div>

          <button className="flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 transition font-bold text-slate-600 dark:text-slate-300">
             Next <ArrowRight size={18} />
          </button>
       </div>

    </div>
  );
}
