import { prisma } from '@/lib/prisma';
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const dynamic = 'force-dynamic';

async function getGallery() {
  // Safe fetch - returns empty array if table doesn't exist yet
  try {
    const images = await prisma.galleryImage.findMany({ orderBy: { createdAt: 'desc' } });
    return images;
  } catch (e) {
    return [];
  }
}

export default async function GalleryPage() {
  const images = await getGallery();

  // Helper to find latest image for a category
  const getLatestImg = (cat: string) => {
    // FIX: We use 'imageUrl' here because that is what is in the database now
    const found = images.find((img) => img.category === cat);
    
    // Default fallbacks if no image uploaded
    if (!found) {
       if(cat === 'Workshop') return "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800";
       if(cat === 'Retreat') return "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800";
       if(cat === 'Summit') return "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=800";
       return "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800";
    }
    return found.imageUrl; // FIX: Correct property name
  };

  const categories = [
    { name: "Annual Summit", id: "Summit", count: images.filter(i => i.category === 'Summit').length },
    { name: "HR Workshops", id: "Workshop", count: images.filter(i => i.category === 'Workshop').length },
    { name: "Executive Retreats", id: "Retreat", count: images.filter(i => i.category === 'Retreat').length },
    { name: "Community Meetups", id: "General", count: images.filter(i => i.category === 'General').length },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-32 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-20">
          <p className="text-primary font-bold tracking-widest uppercase mb-2">Our Memories</p>
          <h1 className="text-4xl md:text-5xl font-heading text-slate-900 dark:text-white mb-6">
            Captured Moments
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            A glimpse into the vibrant life of the HR Mentorship community.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
           {categories.map((cat) => (
             <div key={cat.id} className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer">
                <Image 
                  src={getLatestImg(cat.id)} 
                  alt={cat.name} 
                  fill 
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition flex flex-col justify-end p-6">
                   <h3 className="text-white text-xl font-bold mb-1">{cat.name}</h3>
                   <div className="flex justify-between items-center">
                     <span className="text-white/80 text-sm">{cat.count} Photos</span>
                     <span className="bg-white/20 p-2 rounded-full backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition transform translate-y-4 group-hover:translate-y-0">
                       <ArrowRight size={16} />
                     </span>
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* All Photos Grid */}
        <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">Recent Uploads</h2>
        <div className="columns-1 md:columns-3 gap-6 space-y-6">
           {images.map((img) => (
             <div key={img.id} className="break-inside-avoid relative group rounded-xl overflow-hidden bg-slate-200">
                <Image 
                   src={img.imageUrl} // FIX: Correct property name here too
                   alt={img.title || "Gallery Image"} 
                   width={600} 
                   height={800} 
                   className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-6">
                   <div>
                     <p className="text-white font-bold">{img.title}</p>
                     <p className="text-white/60 text-xs uppercase tracking-wider">{img.category}</p>
                   </div>
                </div>
             </div>
           ))}
        </div>

      </div>
    </div>
  );
}
