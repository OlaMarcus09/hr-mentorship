import { prisma } from '@/lib/prisma';
import Image from "next/image";
import { FileText, PlayCircle, Download, ExternalLink, Book } from "lucide-react";
import VideoCard from "@/components/VideoCard"; // Import the new fast player

export const revalidate = 60;

export default async function ResourcesPage() {
  const resources = await prisma.resource.findMany({ orderBy: { createdAt: 'desc' } });

  // Group by type
  const videos = resources.filter(r => r.type === 'Video');
  const docs = resources.filter(r => r.type !== 'Video');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
       
       {/* NEW HERO SECTION */}
       <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=2000" 
            alt="Learning Resources" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-purple-900/80 mix-blend-multiply" />
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
             <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Learning Centre</h1>
             <p className="text-xl text-white/90">Curated templates, guides, and tutorials to accelerate your HR career.</p>
          </div>
       </section>

       <div className="max-w-7xl mx-auto px-6 py-20">
          
          {/* VIDEO SECTION (Using Fast VideoCard) */}
          {videos.length > 0 && (
            <div className="mb-20">
               <h2 className="text-2xl font-bold flex items-center gap-2 mb-8 text-primary border-b border-slate-200 dark:border-slate-800 pb-4">
                 <PlayCircle/> Video Tutorials
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {videos.map(vid => (
                    <VideoCard key={vid.id} url={vid.fileUrl} title={vid.title} />
                  ))}
               </div>
            </div>
          )}

          {/* DOWNLOADS SECTION */}
          <div>
             <h2 className="text-2xl font-bold flex items-center gap-2 mb-8 text-primary border-b border-slate-200 dark:border-slate-800 pb-4">
               <Download/> Downloadable Resources
             </h2>
             {docs.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {docs.map(doc => (
                     <div key={doc.id} className="flex items-start gap-4 p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition group">
                        <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition">
                           {doc.type === 'Book' ? <Book size={24}/> : <FileText size={24}/>}
                        </div>
                        <div className="flex-1">
                           <h3 className="font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">{doc.title}</h3>
                           <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 block">{doc.type}</span>
                           <a href={doc.fileUrl} target="_blank" className="text-sm font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg inline-flex items-center gap-2 hover:bg-primary hover:text-white transition w-full justify-center">
                              Download / View <ExternalLink size={14}/>
                           </a>
                        </div>
                     </div>
                  ))}
               </div>
             ) : (
               <p className="text-slate-500 italic">No downloadable resources added yet.</p>
             )}
          </div>
       </div>
    </div>
  );
}
