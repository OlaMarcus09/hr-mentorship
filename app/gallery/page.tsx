import { prisma } from '@/lib/prisma';
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const images = await prisma.galleryImage.findMany({ orderBy: { createdAt: 'desc' } });
  
  const sections = {
    Events: images.filter(i => i.category === 'Events'),
    Workshops: images.filter(i => i.category === 'Workshops'),
    Meetups: images.filter(i => i.category === 'Meetups'),
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
       <section className="pt-48 pb-20 px-6 bg-primary text-center text-white">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">Community Gallery</h1>
       </section>

       <div className="max-w-7xl mx-auto px-6 py-20 space-y-24">
          {Object.entries(sections).map(([title, items]) => items.length > 0 && (
             <div key={title}>
                <div className="flex items-center gap-4 mb-8">
                   <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{title}</h2>
                   <div className="h-px bg-slate-200 flex-1"></div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                   {items.map(img => (
                      <div key={img.id} className="aspect-square relative rounded-2xl overflow-hidden hover:scale-[1.02] transition">
                         <Image src={img.imageUrl} alt={img.title} fill className="object-cover" />
                         <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition flex items-end p-6">
                            <p className="text-white font-bold">{img.title}</p>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}
