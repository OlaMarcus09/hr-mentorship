import { prisma } from '@/lib/prisma';
import Image from "next/image";

export const revalidate = 60;

export default async function WebinarsPage() {
  const events = await prisma.event.findMany({ 
    where: { location: { contains: 'Virtual', mode: 'insensitive' } } 
  });
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
       <section className="relative pt-48 pb-20 px-6 bg-primary w-full overflow-hidden">
         <div className="absolute inset-0">
            <Image 
              src="https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=1200" 
              alt="Webinars Hero" 
              fill 
              className="object-cover opacity-20"
              priority
            />
         </div>
         <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">Upcoming Webinars</h1>
            <p className="text-xl text-white/90">Join our virtual learning sessions.</p>
         </div>
       </section>

       <div className="max-w-4xl mx-auto px-6 py-20">
          {events.length === 0 ? <p className="text-center text-slate-500">No upcoming webinars scheduled.</p> : (
             <div className="grid grid-cols-1 gap-6">
                {events.map(e => (
                   <div key={e.id} className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 w-full">
                      <h3 className="font-bold text-2xl text-slate-900 dark:text-white mb-2">{e.title}</h3>
                      <p className="text-slate-500">{new Date(e.date).toLocaleDateString()} • Virtual Event</p>
                   </div>
                ))}
             </div>
          )}
       </div>
    </div>
  );
}
