import { prisma } from '@/lib/prisma';
import { User, ArrowRight } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

async function getData() {
  const mentors = await prisma.application.findMany({
    where: { type: 'Mentor', status: 'APPROVED' },
    orderBy: { createdAt: 'desc' }
  });

  const galleryImages = await prisma.galleryImage.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return { mentors, galleryImages };
}

export default async function GalleryPage() {
  const { mentors, galleryImages } = await getData();

  // Helper to find latest image for a category
  const getLatestImg = (cat: string, fallback: string) => {
    const found = galleryImages.find((img) => img.category === cat);
    return found ? found.image : fallback;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-slate-900 dark:text-white">
            Our Community in Action
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Experience the energy and collaboration of our HR professional community
          </p>
        </div>

        {/* DYNAMIC BIG THUMBS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
           {['Workshop', 'Event', 'Networking', 'Mentorship'].map((cat) => {
             // Define fallbacks based on category
             let fallback = "";
             if(cat === 'Workshop') fallback = "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800";
             if(cat === 'Event') fallback = "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800";
             if(cat === 'Networking') fallback = "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800";
             if(cat === 'Mentorship') fallback = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800";

             return (
               <div key={cat} className="relative h-80 rounded-3xl overflow-hidden shadow-lg group">
                 <img 
                   src={getLatestImg(cat, fallback)} 
                   className="w-full h-full object-cover transition duration-700 group-hover:scale-110" 
                   alt={cat}
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                 <div className="absolute bottom-6 left-6">
                   <span className="bg-[#8B5CF6] text-white px-6 py-2 rounded-full text-sm font-bold shadow-md">
                     {cat}
                   </span>
                 </div>
               </div>
             );
           })}
        </div>

        {/* RECENT UPLOADS GRID (If you have extra photos) */}
        {galleryImages.length > 0 && (
          <div className="mb-24">
            <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Recent Uploads</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {galleryImages.map((img) => (
                 <div key={img.id} className="rounded-xl overflow-hidden h-48 relative group">
                    <img src={img.image} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                    <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                      {img.category}
                    </div>
                 </div>
               ))}
            </div>
          </div>
        )}

        {/* MENTORS SECTION */}
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
