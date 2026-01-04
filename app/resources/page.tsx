"use client";

import { useState, useEffect } from "react";
import { Search, FileText, Video, Book, Link as LinkIcon, Download, Loader2, PlayCircle, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

export default function ResourcesPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  
  // PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    async function fetchResources() {
      try {
        const res = await fetch('/api/resources');
        const data = await res.json();
        if (Array.isArray(data)) setResources(data);
      } catch (error) {
        console.error("Failed to load resources");
      } finally {
        setLoading(false);
      }
    }
    fetchResources();
  }, []);

  // Reset page when filter/search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, search]);

  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'Video': return <Video className="text-red-500" size={24} />;
      case 'PDF': return <FileText className="text-red-600" size={24} />;
      case 'Book': return <Book className="text-amber-600" size={24} />;
      case 'Link': return <LinkIcon className="text-blue-500" size={24} />;
      default: return <FileText className="text-slate-500" size={24} />;
    }
  };

  // 1. FILTER & SEARCH
  const filteredResources = resources.filter(res => {
    const matchesCategory = filter === "All" || res.type === filter;
    const matchesSearch = res.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 2. PAGINATION LOGIC
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredResources.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      
      {/* HERO SECTION WITH IMAGE */}
      <div className="relative bg-slate-900 py-32 px-6">
        <div 
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-heading text-white mb-6">
            Resource Library
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
            A curated collection of tools, guides, and videos to accelerate your growth.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-20 pb-20">
        
        {/* SEARCH & FILTERS CARD */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 mb-10">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
              {['All', 'Video', 'PDF', 'Book', 'Link'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition whitespace-nowrap
                    ${filter === type 
                      ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                >
                  {type}
                </button>
              ))}
            </div>
            
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search resources..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
              />
            </div>
          </div>
        </div>

        {/* CONTENT GRID */}
        {loading ? (
          <div className="h-64 flex items-center justify-center"><Loader2 className="animate-spin text-primary" size={40}/></div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {currentItems.length > 0 ? currentItems.map((res) => {
                const youtubeId = res.type === 'Video' ? getYouTubeId(res.fileUrl) : null;

                return (
                  <div key={res.id} className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col h-full group">
                    
                    {/* PREVIEW AREA */}
                    <div className="bg-slate-100 dark:bg-slate-950 aspect-video relative flex items-center justify-center overflow-hidden">
                      {res.type === 'Video' && youtubeId ? (
                        <iframe
                          className="w-full h-full absolute inset-0"
                          src={`https://www.youtube.com/embed/${youtubeId}`}
                          title={res.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : res.type === 'Video' ? (
                        <div className="w-full h-full flex items-center justify-center bg-slate-900">
                          <PlayCircle className="text-white/50 group-hover:text-white transition" size={56} />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-slate-300 group-hover:text-primary transition">
                          {getIcon(res.type)}
                        </div>
                      )}
                    </div>

                    {/* INFO AREA */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-500">
                          {res.type}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 line-clamp-2 group-hover:text-primary transition">
                        {res.title}
                      </h3>
                      
                      <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                        {res.type === 'Video' && youtubeId ? (
                          <p className="text-xs text-slate-400 italic flex items-center gap-1">
                            <Video size={14}/> Watch video above
                          </p>
                        ) : (
                          <a 
                            href={res.fileUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`w-full py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition
                              ${res.type === 'Video' 
                                ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                          >
                            {res.type === 'Video' ? <><ExternalLink size={16}/> Open Link</> : <><Download size={16}/> Access File</>}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }) : (
                <div className="col-span-full text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-300">
                  <FileText className="mx-auto text-slate-300 mb-4" size={48} />
                  <p className="text-slate-500 font-bold">No resources found matching your criteria.</p>
                </div>
              )}
            </div>

            {/* PAGINATION CONTROLS */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-md disabled:opacity-50 hover:bg-slate-50 transition"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="px-4 py-3 bg-white dark:bg-slate-800 rounded-full shadow-md font-bold text-sm flex items-center">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-md disabled:opacity-50 hover:bg-slate-50 transition"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
