"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Client Component to handle Tabs
export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState('Events');
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        setImages(data);
        setLoading(false);
      });
  }, []);

  const filteredImages = images.filter(img => img.category === activeTab);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
       {/* HERO */}
       <section className="relative pt-48 pb-20 px-6 bg-primary">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200')] bg-cover bg-center opacity-10"></div>
         <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">Gallery</h1>
            <p className="text-xl text-white/90">Moments from our Events, Workshops, and Meetups.</p>
         </div>
       </section>

       <div className="max-w-7xl mx-auto px-6 py-12">
          {/* FOLDER TABS */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
             {['Events', 'Workshops', 'Meetups'].map(tab => (
               <button 
                 key={tab} 
                 onClick={() => setActiveTab(tab)}
                 className={`px-8 py-3 rounded-full font-bold text-sm transition ${activeTab === tab ? 'bg-primary text-white shadow-lg' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
               >
                 {tab}
               </button>
             ))}
          </div>

          {/* IMAGE GRID */}
          {loading ? (
             <p className="text-center text-slate-500">Loading photos...</p>
          ) : filteredImages.length === 0 ? (
             <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
                <p className="text-slate-500 font-bold">No photos in {activeTab} yet.</p>
             </div>
          ) : (
             <div className="grid md:grid-cols-3 gap-6">
                {filteredImages.map(img => (
                   <div key={img.id} className="aspect-square relative rounded-2xl overflow-hidden hover:scale-[1.02] transition group">
                      <Image src={img.imageUrl} alt={img.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end p-6">
                         <p className="text-white font-bold">{img.title}</p>
                      </div>
                   </div>
                ))}
             </div>
          )}
       </div>
    </div>
  );
}
