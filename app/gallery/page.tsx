import { prisma } from '@/lib/prisma';
import { User } from "lucide-react";

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
    <div className="min-h-screen bg-white dark:bg-slate-950 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* SECTION 1: EVENT HIGHLIGHTS */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold font-heading mb-4 text-slate-900 dark:text-white">Gallery</h1>
          <p className="text-lg text-slate-500">Capturing moments from our events and community.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-24">
           {/* Static Event Photos (Replace with Real Cloudinary URLs later) */}
           <div className="h-64 rounded-xl overflow-hidden"><img src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600" className="w-full h-full object-cover hover:scale-105 transition"/></div>
           <div className="h-64 rounded-xl overflow-hidden"><img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600" className="w-full h-full object-cover hover:scale-105 transition"/></div>
           <div className="h-64 rounded-xl overflow-hidden"><img src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=600" className="w-full h-full object-cover hover:scale-105 transition"/></div>
           <div className="h-64 rounded-xl overflow-hidden md:col-span-2"><img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800" className="w-full h-full object-cover hover:scale-105 transition"/></div>
           <div className="h-64 rounded-xl overflow-hidden"><img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600" className="w-full h-full object-cover hover:scale-105 transition"/></div>
        </div>

        {/* SECTION 2: MENTOR SHOWCASE (Dynamic) */}
        {mentors.length > 0 && (
          <div>
            <div className="text-center mb-12">
               <h2 className="text-3xl font-bold mb-4 font-heading">Our Mentors</h2>
               <p className="text-slate-500">The experts guiding the next generation.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {mentors.map((mentor) => (
                <div key={mentor.id} className="group relative aspect-square rounded-xl overflow-hidden bg-slate-100">
                   {mentor.image ? (
                     <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-slate-300"><User size={32}/></div>
                   )}
                   {/* Name Overlay on Hover */}
                   <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                      <p className="text-white font-bold text-sm truncate">{mentor.name}</p>
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
