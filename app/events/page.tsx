import { prisma } from '@/lib/prisma';
import { MapPin, Calendar, ArrowRight } from "lucide-react";

export const dynamic = 'force-dynamic';

async function getEvents() {
  return await prisma.event.findMany({ orderBy: { date: 'asc' } });
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-slate-900 dark:text-white">
            Upcoming Events
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Join our workshops, webinars, and summits to grow your career.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           {events.length === 0 ? (
             <div className="col-span-full text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
               <p className="text-slate-500 text-lg">No events scheduled at the moment.</p>
             </div>
           ) : (
             events.map((event) => (
               <div key={event.id} className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition group">
                 <div className="flex justify-between items-start mb-6">
                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                       Event
                    </span>
                    <div className="text-right">
                       <span className="block font-bold text-slate-900 dark:text-white text-lg">
                         {new Date(event.date).getDate()}
                       </span>
                       <span className="text-xs text-slate-500 uppercase">
                         {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                       </span>
                    </div>
                 </div>
                 
                 <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-primary transition">
                   {event.title}
                 </h3>
                 
                 <div className="flex flex-col gap-3 text-sm text-slate-500 mb-8">
                    <div className="flex items-center gap-2">
                       <Calendar size={16} className="text-primary"/> 
                       {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-2">
                       <MapPin size={16} className="text-primary"/> 
                       {event.location}
                    </div>
                 </div>

                 <button className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition flex items-center justify-center gap-2">
                    Register Now <ArrowRight size={16} />
                 </button>
               </div>
             ))
           )}
        </div>
      </div>
    </div>
  );
}
