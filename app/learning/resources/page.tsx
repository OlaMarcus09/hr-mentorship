import { FileText, Download, PlayCircle, Book, ArrowRight, Folder } from "lucide-react";

export default function ResourceCentrePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-slate-900 dark:text-white">Resource Centre</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">Curated templates, guides, and tools.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           {/* Resource Card 1 */}
           <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition group">
              <div className="flex justify-between items-start mb-4">
                 <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl"><FileText size={24}/></div>
                 <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-bold px-2 py-1 rounded">PDF</span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">Onboarding Checklist</h3>
              <p className="text-slate-500 text-sm mb-6">Step-by-step guide for new hires.</p>
              <button className="w-full py-2 bg-slate-50 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-300 rounded-lg font-bold text-sm transition flex items-center justify-center gap-2">
                 <Download size={16}/> Download
              </button>
           </div>
           
           {/* Resource Card 2 */}
           <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition group">
              <div className="flex justify-between items-start mb-4">
                 <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-xl"><Folder size={24}/></div>
                 <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-bold px-2 py-1 rounded">DOCX</span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">Performance Review</h3>
              <p className="text-slate-500 text-sm mb-6">Editable template for Q4 reviews.</p>
              <button className="w-full py-2 bg-slate-50 dark:bg-slate-800 hover:bg-green-600 hover:text-white text-slate-700 dark:text-slate-300 rounded-lg font-bold text-sm transition flex items-center justify-center gap-2">
                 <Download size={16}/> Download
              </button>
           </div>

           {/* Resource Card 3 */}
           <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition group">
              <div className="flex justify-between items-start mb-4">
                 <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl"><PlayCircle size={24}/></div>
                 <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-bold px-2 py-1 rounded">VIDEO</span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">Future of Work</h3>
              <p className="text-slate-500 text-sm mb-6">Webinar recording from Summit 2024.</p>
              <button className="w-full py-2 bg-slate-50 dark:bg-slate-800 hover:bg-red-600 hover:text-white text-slate-700 dark:text-slate-300 rounded-lg font-bold text-sm transition flex items-center justify-center gap-2">
                 <ArrowRight size={16}/> Watch Now
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
