import { FileText, Download, PlayCircle, Book } from "lucide-react";

export default function ResourceCentrePage() {
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

        {/* Featured Resource */}
        <div className="bg-primary rounded-3xl p-8 md:p-12 mb-16 text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl">
           <div className="flex-1">
              <span className="inline-block bg-white/20 px-4 py-1 rounded-full text-xs font-bold uppercase mb-4">Book of the Month</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Work Rules!</h2>
              <p className="text-white/80 text-lg mb-8">Insights from Inside Google that will transform how you live and lead. This month's pick dives deep into the psychology of high-performance teams.</p>
              <div className="flex gap-4">
                 <button className="bg-white text-primary px-6 py-3 rounded-xl font-bold hover:bg-white/90 transition">Get this Book</button>
                 <button className="bg-transparent border border-white text-white px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition">Join Discussion</button>
              </div>
           </div>
           <div className="w-48 h-64 bg-white/10 rounded-lg shadow-lg rotate-3 shrink-0 flex items-center justify-center">
              <Book size={48} className="text-white/50" />
           </div>
        </div>

        {/* Resources Grid */}
        <div className="mb-12">
           <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                 <Download size={24} className="text-primary" /> Resource Hub
              </h2>
              <div className="flex gap-2">
                 <button className="text-sm font-bold text-slate-500 hover:text-black dark:hover:text-white px-3 py-1">All</button>
                 <button className="text-sm font-bold text-slate-500 hover:text-black dark:hover:text-white px-3 py-1">Templates</button>
                 <button className="text-sm font-bold text-slate-500 hover:text-black dark:hover:text-white px-3 py-1">Webinars</button>
              </div>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Template 1 */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-lg transition group">
                 <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <FileText size={24} />
                 </div>
                 <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">Employee Onboarding Checklist</h3>
                 <p className="text-slate-500 text-sm mb-6">A complete guide to welcoming new hires.</p>
                 <button className="text-blue-600 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                    Download Now <ArrowRight size={16} />
                 </button>
              </div>

              {/* Template 2 */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-lg transition group">
                 <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-lg flex items-center justify-center mb-4">
                    <FileText size={24} />
                 </div>
                 <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">Performance Review Template</h3>
                 <p className="text-slate-500 text-sm mb-6">Structured 360-degree feedback form.</p>
                 <button className="text-green-600 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                    Download Now <ArrowRight size={16} />
                 </button>
              </div>

              {/* Webinar */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-lg transition group">
                 <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-lg flex items-center justify-center mb-4">
                    <PlayCircle size={24} />
                 </div>
                 <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">Future of Remote Work</h3>
                 <p className="text-slate-500 text-sm mb-6">Recording of our Q3 Global Summit.</p>
                 <button className="text-red-600 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                    Watch Recording <ArrowRight size={16} />
                 </button>
              </div>
           </div>
        </div>
        
      </div>
    </div>
  );
}
