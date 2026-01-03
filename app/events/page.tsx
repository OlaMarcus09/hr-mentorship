"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Calendar, MapPin, Clock, ExternalLink, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        setEvents(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const totalPages = Math.ceil(events.length / itemsPerPage);
  const currentEvents = events.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
       
       {/* HERO */}
       <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=2000" 
            alt="Events" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-purple-900/80 mix-blend-multiply" />
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
             <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Upcoming Events</h1>
             <p className="text-xl text-white/90">Join us for webinars, workshops, and community hangouts.</p>
          </div>
       </section>

       <div className="max-w-7xl mx-auto px-6 py-20">
          
          {loading ? (
             <div className="flex justify-center h-64 items-center">
               <Loader2 className="animate-spin text-primary" size={40}/>
             </div>
          ) : events.length > 0 ? (
             <>
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {currentEvents.map((event) => (
                     <div key={event.id} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition border border-slate-100 dark:border-slate-800 flex flex-col">
                        <div className="relative h-56 bg-slate-200">
                           {event.image ? (
                             <Image src={event.image} alt={event.title} fill className="object-cover"/>
                           ) : (
                             <div className="absolute inset-0 flex items-center justify-center text-slate-400">No Image</div>
                           )}
                           <div className="absolute top-4 right-4 bg-white dark:bg-slate-900 px-3 py-1 rounded-full text-xs font-bold shadow-sm uppercase tracking-wider text-primary">
                              {new Date(event.date).toLocaleDateString()}
                           </div>
                        </div>
                        
                        <div className="p-6 flex-1 flex flex-col">
                           <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">{event.title}</h3>
                           
                           <div className="space-y-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                              <div className="flex items-center gap-2"><Clock size={16}/> {new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                              <div className="flex items-center gap-2"><MapPin size={16}/> {event.location}</div>
                           </div>

                           <div className="mt-auto">
                             {event.registrationLink ? (
                               <a href={event.registrationLink} target="_blank" className="w-full py-3 bg-primary/10 text-primary font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition">
                                  Register Now <ExternalLink size={16}/>
                               </a>
                             ) : (
                               <button disabled className="w-full py-3 bg-slate-100 dark:bg-slate-800 text-slate-400 font-bold rounded-xl cursor-not-allowed">
                                  Registration Closed
                               </button>
                             )}
                           </div>
                        </div>
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
                <Calendar size={48} className="mx-auto text-slate-300 mb-4"/>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Upcoming Events</h3>
                <p className="text-slate-500">Check back later for new workshops and webinars.</p>
             </div>
          )}
       </div>
    </div>
  );
}
