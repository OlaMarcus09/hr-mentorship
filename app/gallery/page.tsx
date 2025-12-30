"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Folder, ChevronLeft } from "lucide-react";

// Note: Client components cannot use 'revalidate' directly, 
// but the API fetch is fast. We optimize the UI here.

export default function GalleryPage() {
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
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

  const folders = ['Events', 'Webinars', 'Meetups'];
  const folderImages = activeFolder ? images.filter(img => img.category === activeFolder) : [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
       <section className="relative pt-48 pb-20 px-6 bg-primary w-full overflow-hidden">
         <div className="absolute inset-0">
            <Image 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200" 
              alt="Gallery Hero" 
              fill 
              className="object-cover opacity-20"
              priority
            />
         </div>
         <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">Gallery</h1>
            <p className="text-xl text-white/90">Our Community Memories.</p>
         </div>
       </section>

       <div className="max-w-7xl mx-auto px-6 py-20">
          {!activeFolder && (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {folders.map(folder => (
                   <button 
                     key={folder} 
                     onClick={() => setActiveFolder(folder)}
                     className="bg-white dark:bg-slate-900 p-12 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl transition flex flex-col items-center gap-4 group w-full"
                   >
                      <div className="w-24 h-24 bg-yellow-100 dark:bg-yellow-900/20 rounded-2xl flex items-center justify-center text-yellow-500 group-hover:scale-110 transition">
                         <Folder size={48} fill="currentColor" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{folder}</h3>
                      <p className="text-slate-500">{images.filter(i => i.category === folder).length} Photos</p>
                   </button>
                ))}
             </div>
          )}

          {activeFolder && (
             <div>
                <button onClick={() => setActiveFolder(null)} className="flex items-center gap-2 mb-8 text-slate-500 hover:text-primary font-bold">
                   <ChevronLeft size={20}/> Back to Folders
                </button>
                
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-slate-900 dark:text-white">
                   <Folder size={32} className="text-yellow-500" fill="currentColor"/> {activeFolder}
                </h2>

                {folderImages.length === 0 ? (
                   <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
                      <p className="text-slate-500 font-bold">No photos in this folder yet.</p>
                   </div>
                ) : (
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {folderImages.map(img => (
                         <div key={img.id} className="aspect-square relative rounded-2xl overflow-hidden hover:scale-[1.02] transition group w-full">
                            <Image src={img.imageUrl} alt={img.title} fill className="object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end p-6">
                               <p className="text-white font-bold">{img.title}</p>
                            </div>
                         </div>
                      ))}
                   </div>
                )}
             </div>
          )}
       </div>
    </div>
  );
}
