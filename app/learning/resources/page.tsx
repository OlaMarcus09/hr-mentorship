"use client";

import { useState } from "react";
import { Play, Youtube, ChevronDown, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ResourcesPage() {
  const [filter, setFilter] = useState("All");

  // Filter categories tailored for Video content
  const categories = ["All", "Webinars", "Tutorials", "Interviews", "Event Highlights"];

  // Dummy Video Data (Replace placeholders with real YouTube video IDs/thumbnails later)
  // Using Unsplash images as placeholders for now to mimic video thumbnails
  const resources = [
    { id: 1, title: "Building a Resilient HR Strategy for 2025", category: "Webinars", thumbnail: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80", link: "#" },
    { id: 2, title: "Mastering LinkedIn for Talent Acquisition", category: "Tutorials", thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80", link: "#" },
    { id: 3, title: "Interview with Dr. Oluyemi Adeosun on Leadership", category: "Interviews", thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80", link: "#" },
    { id: 4, title: "HR Summit 2024: Key Takeaways", category: "Event Highlights", thumbnail: "https://images.unsplash.com/photo-1475721027767-ad4771c96d2f?auto=format&fit=crop&w=800&q=80", link: "#" },
    { id: 5, title: "Navigating Workplace Compliance", category: "Webinars", thumbnail: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80", link: "#" },
    { id: 6, title: "How to Conduct Effective Performance Reviews", category: "Tutorials", thumbnail: "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=800&q=80", link: "#" },
  ];

  const filteredResources = filter === "All" ? resources : resources.filter(r => r.category === filter);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      
      {/* 1. HERO SECTION WITH IMAGE */}
      <section className="relative pt-48 pb-32 px-6 flex items-center justify-center min-h-[60vh]">
         {/* Background Image */}
         <div className="absolute inset-0 z-0">
           <Image
             src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
             alt="Learning Centre"
             fill
             className="object-cover"
             priority
           />
           {/* Dark Overlay */}
           <div className="absolute inset-0 bg-black/60 dark:bg-black/70"></div>
         </div>

         {/* Content */}
         <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
            <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-red-600/90 text-white font-bold text-sm mb-6 backdrop-blur-md shadow-sm">
              <Youtube size={16} /> HR Mentorship TV
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Learning Centre & Video Resources
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-10">
              Watch expert-led webinars, tutorials, interviews, and event highlights designed to accelerate your HR career.
            </p>
            
            {/* YOUTUBE CTA */}
            <a 
               href="https://youtube.com/@hrmentorship?si=N_t2VjM6JkKjLzUu" 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition shadow-xl shadow-red-600/20 text-lg group"
            >
               <Youtube className="group-hover:scale-110 transition-transform" size={24} /> View YouTube Channel
            </a>
         </div>
      </section>

      {/* 2. FILTER SECTION (DROPDOWN) */}
      <section className="py-10 px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-20 z-30 shadow-sm">
         <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Latest Videos</h2>
            
            {/* Dropdown Filter */}
            <div className="relative">
               <select 
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="appearance-none bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 py-3 pl-5 pr-12 rounded-lg font-bold cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
               >
                  {categories.map((cat) => (
                     <option key={cat} value={cat}>{cat}</option>
                  ))}
               </select>
               <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={20} />
            </div>
         </div>
      </section>

      {/* 3. VIDEO CONTENT GRID */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource) => (
               <a 
                  key={resource.id} 
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800"
               >
                  {/* Thumbnail Container */}
                  <div className="relative aspect-video bg-slate-200 dark:bg-slate-800 overflow-hidden">
                     <Image 
                        src={resource.thumbnail} 
                        alt={resource.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                     />
                     {/* Play Icon Overlay */}
                     <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center pl-1 shadow-lg scale-90 group-hover:scale-100 transition-transform">
                           <Play className="text-primary" size={32} fill="currentColor" />
                        </div>
                     </div>
                     {/* Category Tag */}
                     <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {resource.category}
                     </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                     <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {resource.title}
                     </h3>
                     <div className="mt-4 flex items-center gap-1 text-sm font-bold text-primary group/link">
                        Watch Video <ExternalLink size={14} className="group-hover/link:translate-x-1 transition-transform"/>
                     </div>
                  </div>
               </a>
            ))}
         </div>
      </section>

    </div>
  );
}
