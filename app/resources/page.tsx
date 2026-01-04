"use client";

import { useState, useEffect } from "react";
import { Search, FileText, Video, Book, Link as LinkIcon, Download, ExternalLink, Loader2, PlayCircle } from "lucide-react";

export default function ResourcesPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

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

  // Filter Logic
  const filteredResources = resources.filter(res => {
    const matchesCategory = filter === "All" || res.type === filter;
    const matchesSearch = res.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'Video': return <Video className="text-red-500" size={32} />;
      case 'PDF': return <FileText className="text-red-600" size={32} />;
      case 'Book': return <Book className="text-amber-600" size={32} />;
      case 'Link': return <LinkIcon className="text-blue-500" size={32} />;
      default: return <FileText className="text-slate-500" size={32} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-slate-900 dark:text-white mb-4">
            Resource Library
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Access our curated collection of templates, guides, and videos designed to help you succeed.
          </p>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 mb-10">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            
            {/* Filter Buttons */}
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {['All', 'Video', 'PDF', 'Book', 'Link'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition whitespace-nowrap
                    ${filter === type 
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'}`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search resources..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:border-primary transition"
              />
            </div>
          </div>
        </div>

        {/* GRID CONTENT */}
        {loading ? (
          <div className="h-64 flex items-center justify-center"><Loader2 className="animate-spin text-primary" size={40}/></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.length > 0 ? filteredResources.map((res) => (
              <div key={res.id} className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-lg transition group">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl group-hover:scale-110 transition">
                    {getIcon(res.type)}
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                    {res.type}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 min-h-[3.5rem]">
                  {res.title}
                </h3>
                
                <a 
                  href={res.fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition mt-4
                    ${res.type === 'Video' 
                      ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                      : 'bg-primary/5 text-primary hover:bg-primary/10'}`}
                >
                  {res.type === 'Video' ? <><PlayCircle size={18}/> Watch Now</> : <><Download size={18}/> Access File</>}
                </a>
              </div>
            )) : (
              <div className="col-span-full text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-300">
                <FileText className="mx-auto text-slate-300 mb-4" size={48} />
                <p className="text-slate-500 font-bold">No resources found matching your search.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
