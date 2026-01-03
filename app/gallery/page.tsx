"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Loader2, Filter } from "lucide-react";

export default function GalleryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // FILTER & PAGINATION STATE
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; 

  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        setImages(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredImages = activeCategory === "All" 
    ? images 
    : images.filter(img => img.category === activeCategory);

  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
  const currentImages = filteredImages.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const categories = ["All", "Events", "Webinars", "Meetups"];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
       
       {/* HERO SECTION */}
       <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=2000" 
            alt="Gallery" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-purple-900/80 mix-blend-multiply" />
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
             <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Our Moments & Memories</h1>
             <p className="text-xl text-white/90">A visual journey through our events, webinars, and community gatherings.</p>
          </div>
       </section>

       <div className="max-w-7xl mx-auto px-6 py-20">
          
          {/* CATEGORY TABS */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
             {categories.map((cat) => (
               <button
                 key={cat}
                 onClick={() => handleCategoryChange(cat)}
                 className={`px-6 py-2 rounded-full text-sm font-bold transition-all shadow-sm ${
                   activeCategory === cat 
                     ? "bg-primary text-white scale-105 shadow-primary/25" 
                     : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                 }`}
               >
                 {cat}
               </button>
             ))}
          </div>

          {loading ? (
             <div className="h-64 flex flex-col items-center justify-center text-slate-500 gap-4">
                <Loader2 className="animate-spin text-primary" size={32} />
                <p>Loading gallery...</p>
             </div>
          ) : currentImages.length > 0 ? (
             <>
               {/* IMAGES GRID - FIXED DESIGN */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {currentImages.map((img) => (
                     <div key={img.id} className="group relative h-80 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-800">
                        {/* Image Area */}
                        <div className="relative h-full w-full">
                           <Image 
                             src={img.imageUrl} 
                             alt={img.title || "Gallery Image"} 
                             fill 
                             className="object-cover group-hover:scale-105 transition duration-700"
                           />
                           {/* Gradient Overlay (Always Visible) */}
                           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90" />
                           
                           {/* Text Content (Always Visible) */}
                           <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition duration-300">
                              <span className="inline-block px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-wider rounded-full mb-3 shadow-lg">
                                {img.category}
                              </span>
                              <h3 className="text-white font-bold text-lg leading-tight drop-shadow-md">
                                {img.title}
                              </h3>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               {/* PAGINATION CONTROLS */}
               {totalPages > 1 && (
                 <div className="flex justify-center items-center gap-4">
                    <button 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-3 bg-white dark:bg-slate-900 rounded-full shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 transition border border-slate-100 dark:border-slate-800"
                    >
                      <ChevronLeft size={20}/>
                    </button>
                    
                    <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
                      Page {currentPage} of {totalPages}
                    </span>

                    <button 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-3 bg-white dark:bg-slate-900 rounded-full shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 transition border border-slate-100 dark:border-slate-800"
                    >
                      <ChevronRight size={20}/>
                    </button>
                 </div>
               )}
             </>
          ) : (
             <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                   <Filter size={24}/>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">No images found</h3>
                <p className="text-slate-500">There are no images in the {activeCategory} category yet.</p>
             </div>
          )}
       </div>
    </div>
  );
}
