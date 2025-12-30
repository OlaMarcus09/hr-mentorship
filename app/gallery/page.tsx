import { prisma } from '@/lib/prisma';
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const images = await prisma.galleryImage.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
       {/* HERO SECTION */}
       <section className="relative pt-48 pb-20 px-6 bg-primary">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200')] bg-cover bg-center opacity-10"></div>
         <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">Community Gallery</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
               Moments from our events, workshops, and meetups.
            </p>
         </div>
       </section>

       <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
             {images.map((img) => (
                <div key={img.id} className="break-inside-avoid relative rounded-2xl overflow-hidden group">
                   <Image 
                     src={img.imageUrl} 
                     alt={img.title} 
                     width={800} 
                     height={600} 
                     className="w-full h-auto"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-8">
                      <div>
                         <span className="text-xs font-bold text-primary uppercase tracking-widest mb-1 block">{img.category}</span>
                         <h3 className="text-white font-bold text-lg">{img.title}</h3>
                      </div>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
}
