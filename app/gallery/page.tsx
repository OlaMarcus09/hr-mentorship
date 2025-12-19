import { prisma } from '@/lib/prisma';
import { User, ArrowRight } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

async function getData() {
  // Fetch APPROVED Mentors only
  const mentors = await prisma.application.findMany({
    where: { type: 'Mentor', status: 'APPROVED' },
    orderBy: { createdAt: 'desc' }
  });
  return mentors;
}

export default async function GalleryPage() {
  const mentors = await getData();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* SECTION 1: COMMUNITY IN ACTION (Matches your Screenshot) */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-slate-900 dark:text-white">
            Our Community in Action
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Experience the energy and collaboration of our HR professional community
          </p>
        </div>

        {/* The "Big Thumbs" Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
           
           {/* Card 1: Workshop */}
           <div className="relative h-80 rounded-3xl overflow-hidden shadow-lg group">
             <img 
               src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800" 
               className="w-full h-full object-cover transition duration-700 group-hover:scale-110" 
               alt="Workshop"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
             <div className="absolute bottom-6 left-6">
               <span className="bg-[#8B5CF6] text-white px-6 py-2 rounded-full text-sm font-bold shadow-md">
                 Workshop
               </span>
             </div>
           </div>

           {/* Card 2: Event */}
           <div className="relative h-80 rounded-3xl overflow-hidden shadow-lg group">
             <img 
               src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800" 
               className="w-full h-full object-cover transition duration-700 group-hover:scale-110" 
               alt="Event"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
             <div className="absolute bottom-6 left-6">
               <span className="bg-[#8B5CF6] text-white px-6 py-2 rounded-full text-sm font-bold shadow-md">
                 Event
               </span>
             </div>
           </div>

           {/* Card 3: Networking */}
           <div className="relative h-80 rounded-3xl overflow-hidden shadow-lg group">
             <img 
               src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800" 
               className="w-full h-full object-cover transition duration-700 group-hover:scale-110" 
               alt="Networking"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
             <div className="absolute bottom-6 left-6">
               <span className="bg-[#8B5CF6] text-white px-6 py-2 rounded-full text-sm font-bold shadow-md">
                 Networking
               </span>
             </div>
           </div>

           {/* Card 4: Mentorship */}
           <div className="relative h-80 rounded-3xl overflow-hidden shadow-lg group">
             <img 
               src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800" 
               className="w-full h-full object-cover transition duration-700 group-hover:scale-110" 
               alt="Mentorship"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
             <div className="absolute bottom-6 left-6">
               <span className="bg-[#8B5CF6] text-white px-6 py-2 rounded-full text-sm font-bold shadow-md">
                 Mentorship
               </span>
             </div>
           </div>

        </div>

        {/* SECTION 2: OUR MENTORS (Dynamic Grid) */}
        {mentors.length > 0 && (
          <div className="border-t border-slate-200 dark:border-slate-800 pt-20">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
               <div>
                 <h2 className="text-3xl font-bold mb-2 font-heading text-slate-900 dark:text-white">Our Mentors</h2>
                 <p className="text-slate-500">Meet the experts guiding our community.</p>
               </div>
               <Link href="/experts" className="text-primary font-bold hover:underline flex items-center gap-2">
                 View All Experts <ArrowRight size={18} />
               </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {mentors.map((mentor) => (
                <div key={mentor.id} className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
                   {mentor.image ? (
                     <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-slate-300"><User size={32}/></div>
                   )}
                   {/* Gradient Overlay on Hover */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4">
                      <p className="text-white font-bold text-sm truncate w-full">{mentor.name}</p>
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
