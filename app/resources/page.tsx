"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search, FileText, Video, ChevronLeft, ChevronRight, Loader2, Download } from "lucide-react";
import VideoCard from "@/components/VideoCard";

export default function ResourcesPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All"); // All, PDF, Video
  
  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch('/api/resources')
      .then(res => res.json())
      .then(data => {
        setResources(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // FILTERING LOGIC
  const filteredResources = resources.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "All" ? true : res.type === activeTab;
    return matchesSearch && matchesTab;
  });

  // PAGINATION LOGIC
  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
  const currentResources = filteredResources.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
       
       {/* HERO */}
       <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1456324504439-367cee13d8fa?auto=format&fit=crop&w=2000" 
            alt="Learning Centre" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-purple-900/80 mix-blend-multiply" />
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
             <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Learning Centre</h1>
             <p className="text-xl text-white/90">Access our curated library of templates, guides, and video tutorials.</p>
          </div>
       </section>

       <div className="max-w-7xl mx-auto px-6 py-20">
          
          {/* CONTROLS */}
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
             <div className="flex gap-2 p-1 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                {["All", "PDF", "Video"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                    className={`px-6 py-2 rounded-md text-sm font-bold transition ${activeTab === tab ? 'bg-primary text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    {tab}
                  </button>
                ))}
             </div>

             <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
                <input 
                  type="text" 
                  placeholder="Search resources..." 
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-primary outline-none transition"
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                />
             </div>
          </div>

          {loading ? (
             <div className="flex justify-center h-64 items-center"><Loader2 className="animate-spin text-primary" size={40}/></div>
          ) : filteredResources.length > 0 ? (
             <>
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {currentResources.map((res) => (
                     <div key={res.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-lg transition group">
                        <div className="flex items-start justify-between mb-4">
                           <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${res.type === 'Video' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                              {res.type === 'Video' ? <Video size={24}/> : <FileText size={24}/>}
                           </div>
                           <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-500">{res.type}</span>
                        </div>
                        
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition">{res.title}</h3>
                        
                        {/* If it's a VIDEO, show the Player, otherwise show Download Button */}
                        {res.type === 'Video' ? (
                           <div className="mt-4 rounded-lg overflow-hidden border border-slate-100 dark:border-slate-800">
                              <VideoCard url={res.fileUrl} title={res.title} />
                           </div>
                        ) : (
                           <a href={res.fileUrl} target="_blank" className="mt-6 w-full py-3 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                              <Download size={16}/> Download Resource
                           </a>
                        )}
                     </div>
                  ))}
               </div>

               {/* PAGINATION */}
               {totalPages > 1 && (
                 <div className="flex justify-center items-center gap-4">
                    <button 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-3 bg-white dark:bg-slate-900 rounded-full shadow-sm hover:bg-slate-50 disabled:opacity-50 transition border border-slate-200 dark:border-slate-800"
                    >
                      <ChevronLeft size={20}/>
                    </button>
                    <span className="font-bold text-slate-500">Page {currentPage} of {totalPages}</span>
                    <button 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-3 bg-white dark:bg-slate-900 rounded-full shadow-sm hover:bg-slate-50 disabled:opacity-50 transition border border-slate-200 dark:border-slate-800"
                    >
                      <ChevronRight size={20}/>
                    </button>
                 </div>
               )}
             </>
          ) : (
             <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">No resources found</h3>
                <p className="text-slate-500">Try adjusting your search filters.</p>
             </div>
          )}
       </div>
    </div>
  );
}
