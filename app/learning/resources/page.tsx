import { prisma } from '@/lib/prisma';
import { FileText, Download, PlayCircle, Link as LinkIcon, Book, ArrowRight, Folder } from "lucide-react";

export const dynamic = 'force-dynamic';

async function getResources() {
  return await prisma.resource.findMany({ orderBy: { createdAt: 'desc' } });
}

export default async function ResourceCentrePage() {
  const resources = await getResources();

  // Helper to get icon/color based on type
  const getTypeStyles = (type: string) => {
    switch(type) {
      case 'PDF': return { icon: <FileText size={24}/>, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20', label: 'PDF' };
      case 'DOCX': return { icon: <Folder size={24}/>, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', label: 'DOCX' };
      case 'VIDEO': return { icon: <PlayCircle size={24}/>, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20', label: 'VIDEO' };
      default: return { icon: <LinkIcon size={24}/>, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20', label: 'LINK' };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-32 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-slate-900 dark:text-white">
            Resource Centre
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Curated templates, guides, and tools to accelerate your HR journey.
          </p>
        </div>

        {/* Featured Banner */}
        <div className="bg-primary rounded-3xl p-8 md:p-12 mb-16 text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl">
           <div className="flex-1">
              <span className="inline-block bg-white/20 px-4 py-1 rounded-full text-xs font-bold uppercase mb-4">Book of the Month</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Work Rules!</h2>
              <p className="text-white/80 text-lg mb-8">Insights from Inside Google that will transform how you live and lead.</p>
              <button className="bg-white text-primary px-6 py-3 rounded-xl font-bold hover:bg-white/90 transition">Get this Book</button>
           </div>
           <div className="hidden md:flex w-32 h-40 bg-white/10 rounded-lg items-center justify-center rotate-3"><Book size={48} className="text-white/50" /></div>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           {resources.length === 0 ? (
             <div className="col-span-full text-center py-12 text-slate-500">No resources uploaded yet.</div>
           ) : resources.map((res) => {
             const style = getTypeStyles(res.type);
             return (
               <div key={res.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition group flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                     <div className={`p-3 rounded-xl ${style.bg} ${style.color}`}>{style.icon}</div>
                     <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-bold px-2 py-1 rounded">{style.label}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">{res.title}</h3>
                  <p className="text-slate-500 text-sm mb-6 flex-1">{res.description}</p>
                  <a href={res.fileUrl} target="_blank" className={`w-full py-3 rounded-lg font-bold text-sm transition flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 ${style.color}`}>
                     {res.type === 'VIDEO' ? <><PlayCircle size={16}/> Watch Now</> : <><Download size={16}/> Download Resource</>}
                  </a>
               </div>
             );
           })}
        </div>
        
      </div>
    </div>
  );
}
