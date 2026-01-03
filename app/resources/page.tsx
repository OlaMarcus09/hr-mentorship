"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search, FileText, Video, ChevronLeft, ChevronRight, Loader2, Download, PlayCircle } from "lucide-react";

export default function ResourcesPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All"); 
  
  // PAGINATION LIMITED TO 3 FOR PERFORMANCE
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    fetch('/api/resources')
      .then(res => res.json())
      .then(data => {
        setResources(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // FILTERING
  const filteredResources = resources.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "All" ? true : res.type === activeTab;
    return matchesSearch && matchesTab;
  });

  // PAGINATION
  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
  const currentResources = filteredResources.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // HELPER: Get Embed URL for YouTube
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
       
       {/* HERO SECTION WITH PATTERN */}
       <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-slate-900">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <Image 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2000" 
            alt="Learning Centre" 
            fill 
            className="object-cover opacity-40 mix-blend-overlay"
            priority
          />
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
             <span className="text-primary font-bold uppercase tracking-widest text-xs mb-3 block">Knowledge Hub</span>
             <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">Learning Centre</h1>
             <p className="text-xl text-slate-300 font-light max-w-2xl mx-auto">
                Watch, learn, and grow with our curated video sessions and downloadable guides.
             </p>
          </div>
       </section>

       <div className="max-w-6xl mx-auto px-6 py-20">
          
          {/* SEARCH & FILTER BAR */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center mb-12 sticky top-24 z-30">
             <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl">
                {["All", "Video", "PDF"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                    className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === tab ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    {tab}
                  </button>
                ))}
             </div>

             <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
                <input 
                  type="text" 
                  placeholder="Search topic..." 
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-none bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 outline-none transition font-medium"
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                />
             </div>
          </div>

          {loading ? (
             <div className="flex flex-col items-center justify-center h-64 gap-4">
               <Loader2 className="animate-spin text-primary" size={40}/>
               <p className="text-slate-500 animate-pulse">Loading resources...</p>
             </div>
          ) : filteredResources.length > 0 ? (
             <>
               {/* RESOURCES GRID (1 Column on Mobile, 2 on Tablet, 3 on Desktop) */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {currentResources.map((res) => (
                     <div key={res.id} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 group flex flex-col h-full">
                        
                        {/* MEDIA AREA - REAL PLAYER */}
                        <div className="w-full aspect-video bg-black relative">
                           {res.type === 'Video' ? (
                             res.fileUrl.includes('youtube') || res.fileUrl.includes('youtu') ? (
                               <iframe 
                                 src={getEmbedUrl(res.fileUrl)} 
                                 className="w-full h-full" 
                                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                 allowFullScreen
                                 loading="lazy"
                               />
                             ) : (
                               <video controls className="w-full h-full" preload="metadata">
                                 <source src={res.fileUrl} type="video/mp4" />
                                 Your browser does not support the video tag.
                               </video>
                             )
                           ) : (
                             <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:bg-slate-100 transition">
                                <FileText size={48} className="text-primary mb-2 opacity-50"/>
                                <span className="font-bold text-sm">PDF Document</span>
                             </div>
                           )}
                        </div>
                        
                        {/* CONTENT AREA */}
                        <div className="p-6 flex flex-col flex-1">
                           <div className="flex items-center gap-2 mb-3">
                              <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${res.type === 'Video' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                                {res.type}
                              </span>
                           </div>
                           
                           <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 line-clamp-2 leading-tight group-hover:text-primary transition">
                             {res.title}
                           </h3>
                           
                           <div className="mt-auto pt-4 border-t border-slate-50 dark:border-slate-800">
                             {res.type === 'Video' ? (
                               <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                                 <PlayCircle size={16} className="text-primary"/> 
                                 <span>Watch Now</span>
                               </div>
                             ) : (
                               <a href={res.fileUrl} target="_blank" className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg flex items-center justify-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 transition">
                                  <Download size={16}/> Download PDF
                               </a>
                             )}
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               {/* PAGINATION */}
               {totalPages > 1 && (
                 <div className="flex justify-center items-center gap-6 p-4 bg-white dark:bg-slate-900 rounded-full w-fit mx-auto shadow-lg border border-slate-100 dark:border-slate-800">
                    <button 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-3 bg-slate-50 dark:bg-slate-800 rounded-full hover:bg-primary hover:text-white disabled:opacity-30 disabled:hover:bg-slate-50 transition"
                    >
                      <ChevronLeft size={20}/>
                    </button>
                    
                    <span className="font-bold text-sm text-slate-500">
                      Page <span className="text-primary text-lg">{currentPage}</span> of {totalPages}
                    </span>

                    <button 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-3 bg-slate-50 dark:bg-slate-800 rounded-full hover:bg-primary hover:text-white disabled:opacity-30 disabled:hover:bg-slate-50 transition"
                    >
                      <ChevronRight size={20}/>
                    </button>
                 </div>
               )}
             </>
          ) : (
             <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
                <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                   <Search size={32} className="text-slate-300"/>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No resources found</h3>
                <p className="text-slate-500 max-w-sm mx-auto">We couldn't find anything matching "{searchTerm}". Try searching for something else.</p>
             </div>
          )}
       </div>
    </div>
  );
}
