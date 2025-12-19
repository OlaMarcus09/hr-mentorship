import { prisma } from '@/lib/prisma';
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const dynamic = 'force-dynamic';

async function getGallery() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return images;
}

export default async function GalleryPage() {
  const images = await getGallery();

  // Categories to display
  const categories = ['Workshop', 'Event', 'Networking', 'Mentorship'];

  // Helper to find latest image for a category
  const getLatestImg = (cat: string) => {
    const found = images.find((img) => img.category === cat);
    // Default fallbacks if no image uploaded
    if (!found) {
       if(cat === 'Workshop') return "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800";
       if(cat === 'Event') return "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800";
       if(cat === 'Networking') return "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800";
       return "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800";
    }
    return found.image;
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
            Experience the energy and collaboration of our HR professional community.
          </p>
        </div>

        {/* MAIN CATEGORY GRID (Big Thumbs) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
           {categories.map((cat) => (
             <div key={cat} className="relative h-64 md:h-80 rounded-3xl overflow-hidden shadow-lg group">
               <img 
                 src={getLatestImg(cat)} 
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
           ))}
        </div>

        {/* ALL UPLOADS GRID (Masonry-ish) */}
        {images.length > 0 && (
          <div className="pt-12 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">Recent Moments</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
               {images.map((img) => (
                 <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-square bg-slate-100">
                    <img src={img.image} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                       <span className="text-white text-sm font-bold bg-black/50 px-3 py-1 rounded-full">{img.category}</span>
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
