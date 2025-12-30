import { prisma } from '@/lib/prisma';
import { Search, Download, PlayCircle, FileText, ExternalLink } from "lucide-react";

export const revalidate = 60; 

export default async function ResourcesPage() {
  const allResources = await prisma.resource.findMany({ orderBy: { createdAt: 'desc' } });
  const videos = allResources.filter(r => r.type === 'Video');
  const downloads = allResources.filter(r => r.type === 'PDF' || r.type === 'Link');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
       <section className="pt-48 pb-20 px-6 bg-slate-900 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/10"></div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">HR Knowledge Hub</h1>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">Templates, guides, and tutorials.</p>
          </div>
       </section>

       <div className="max-w-7xl mx-auto px-6 py-20 space-y-20">
          {videos.length > 0 && (
            <div>
               <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 text-slate-900 dark:text-white"><PlayCircle className="text-primary"/> Video Tutorials</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map(video => (
                     <div key={video.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow border border-slate-100 dark:border-slate-800 w-full">
                        <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg mb-4 flex items-center justify-center relative group cursor-pointer">
                           <PlayCircle size={48} className="text-primary group-hover:scale-110 transition"/>
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{video.title}</h3>
                        <a href={video.fileUrl} target="_blank" className="text-sm font-bold text-primary hover:underline">Watch Now</a>
                     </div>
                  ))}
               </div>
            </div>
          )}

          {downloads.length > 0 && (
            <div>
               <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 text-slate-900 dark:text-white"><Download className="text-primary"/> Downloadable Resources</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {downloads.map(res => (
                     <div key={res.id} className="flex flex-col md:flex-row gap-4 p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition w-full">
                        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center shrink-0">
                           {res.type === 'PDF' ? <FileText/> : <ExternalLink/>}
                        </div>
                        <div>
                           <h3 className="font-bold text-lg mb-1 text-slate-900 dark:text-white">{res.title}</h3>
                           <a href={res.fileUrl} target="_blank" className="inline-block mt-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition text-slate-900 dark:text-white">
                              {res.type === 'PDF' ? 'Download PDF' : 'Visit Link'}
                           </a>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
          )}
       </div>
    </div>
  );
}
