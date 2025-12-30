import { prisma } from '@/lib/prisma';
import Image from "next/image";
import { Calendar, MapPin, ExternalLink } from "lucide-react";

export const revalidate = 60;

export default async function EventsPage() {
  const events = await prisma.event.findMany({ orderBy: { date: 'asc' } });
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
       <section className="relative pt-48 pb-20 px-6 bg-primary w-full overflow-hidden">
         <div className="absolute inset-0">
            <Image 
              src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200" 
              alt="Events Hero" 
              fill 
              className="object-cover opacity-20"
              priority
            />
         </div>
         <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">Upcoming Events</h1>
            <p className="text-xl text-white/90">Join us for our next big gathering.</p>
         </div>
       </section>

       <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {events.map(e => (
                <div key={e.id} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl transition group w-full flex flex-col">
                   <div className="relative h-48 w-full bg-slate-200 dark:bg-slate-800">
                      {e.image ? (
                        <Image src={e.image} alt={e.title} fill className="object-cover" />
                      ) : (
                        <div className="flex items-center justify-center h-full text-slate-400">No Image</div>
                      )}
                   </div>
                   <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{e.title}</h3>
                      <div className="flex flex-col gap-2 text-sm text-slate-500 mb-6">
                         <span className="flex items-center gap-2"><Calendar size={16}/> {new Date(e.date).toLocaleDateString()}</span>
                         <span className="flex items-center gap-2"><MapPin size={16}/> {e.location}</span>
                      </div>
                      
                      {/* REGISTER BUTTON */}
                      <div className="mt-auto">
                        {e.registrationLink && e.registrationLink !== '#' ? (
                          <a 
                            href={e.registrationLink} 
                            target="_blank" 
                            className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition"
                          >
                            Register Now <ExternalLink size={16}/>
                          </a>
                        ) : (
                           <button disabled className="w-full py-3 bg-slate-100 dark:bg-slate-800 text-slate-400 font-bold rounded-lg cursor-not-allowed">
                             Registration Closed
                           </button>
                        )}
                      </div>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
}
