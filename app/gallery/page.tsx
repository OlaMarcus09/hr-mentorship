import { prisma } from '@/lib/prisma';
import Image from "next/image";

export const revalidate = 60;

export default async function GalleryPage() {
  const images = await prisma.galleryImage.findMany({ orderBy: { createdAt: 'desc' } });

  // Group by category
  const events = images.filter(img => img.category === 'Events');
  const webinars = images.filter(img => img.category === 'Webinars');
  const meetups = images.filter(img => img.category === 'Meetups');

  const categories = [
    { name: 'Events', items: events },
    { name: 'Webinars', items: webinars },
    { name: 'Meetups', items: meetups }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-20">
       <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
             <h1 className="text-4xl font-heading font-bold text-slate-900 dark:text-white mb-4">Gallery</h1>
             <p className="text-xl text-slate-600 dark:text-slate-400">Memories from our community.</p>
          </div>

          <div className="space-y-20">
            {categories.map((cat) => (
              cat.items.length > 0 && (
                <div key={cat.name}>
                   <h2 className="text-2xl font-bold mb-8 pl-4 border-l-4 border-primary text-slate-900 dark:text-white">{cat.name}</h2>
                   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {cat.items.map(img => (
                        <div key={img.id} className="relative group overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800 aspect-square">
                           {/* FIX: Changed to object-contain/cover hybrid or simply cover with top alignment if needed. 
                               For now, sticking to standard cover but allowing full view on hover via lightbox logic if we had it.
                               Let's use 'object-top' to prioritize faces. */}
                           <Image 
                             src={img.imageUrl} 
                             alt={img.title || "Gallery Image"} 
                             fill 
                             className="object-cover object-top hover:scale-105 transition duration-700"
                           />
                           <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4">
                              <p className="text-white text-sm font-bold">{img.title}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              )
            ))}
          </div>
       </div>
    </div>
  );
}
