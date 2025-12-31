import { prisma } from '@/lib/prisma';
import { FileText, PlayCircle, Download, ExternalLink, Book } from "lucide-react";

export const revalidate = 60;

// Helper to get YouTube ID
const getYoutubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export default async function ResourcesPage() {
  const resources = await prisma.resource.findMany({ orderBy: { createdAt: 'desc' } });

  // Group by type
  const videos = resources.filter(r => r.type === 'Video');
  const docs = resources.filter(r => r.type !== 'Video');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-20">
       <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
             <h1 className="text-4xl font-heading font-bold text-slate-900 dark:text-white mb-4">Learning Centre</h1>
             <p className="text-xl text-slate-600 dark:text-slate-400">Templates, guides, and tutorials.</p>
          </div>

          {/* VIDEO SECTION */}
          {videos.length > 0 && (
            <div className="mb-20">
               <h2 className="text-2xl font-bold flex items-center gap-2 mb-8 text-primary"><PlayCircle/> Video Tutorials</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {videos.map(vid => {
                    const ytId = getYoutubeId(vid.fileUrl);
                    return (
                      <div key={vid.id} className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
                         {/* EMBED PLAYER */}
                         <div className="relative aspect-video bg-black">
                           {ytId ? (
                             <iframe 
                               src={`https://www.youtube.com/embed/${ytId}`} 
                               className="absolute inset-0 w-full h-full" 
                               allowFullScreen
                               title={vid.title}
                             />
                           ) : (
                             <div className="flex items-center justify-center h-full text-white/50">Invalid Video Link</div>
                           )}
                         </div>
                         <div className="p-6">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">{vid.title}</h3>
                            <a href={vid.fileUrl} target="_blank" className="text-sm font-bold text-primary hover:underline">Watch on YouTube</a>
                         </div>
                      </div>
                    );
                  })}
               </div>
            </div>
          )}

          {/* DOWNLOADS SECTION */}
          <div>
             <h2 className="text-2xl font-bold flex items-center gap-2 mb-8 text-primary"><Download/> Downloadable Resources</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {docs.map(doc => (
                   <div key={doc.id} className="flex items-start gap-4 p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition">
                      <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-primary">
                         {doc.type === 'Book' ? <Book size={24}/> : <FileText size={24}/>}
                      </div>
                      <div className="flex-1">
                         <h3 className="font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">{doc.title}</h3>
                         <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">{doc.type}</span>
                         <a href={doc.fileUrl} target="_blank" className="text-sm font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg inline-flex items-center gap-2 hover:bg-primary hover:text-white transition">
                            Download / View <ExternalLink size={14}/>
                         </a>
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
}
