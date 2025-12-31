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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
       
       {/* NEW HERO SECTION */}
       <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=2000" 
            alt="Community Gallery" 
            fill 
            className="object-cover"
            priority
          />
          {/* Purple Overlay to match Brand */}
          <div className="absolute inset-0 bg-purple-900/80 mix-blend-multiply" />
          
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fade-in-up">
             <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Our Memories</h1>
             <p className="text-xl text-white/90">Moments of connection, learning, and growth captured in time.</p>
          </div>
       </section>

       <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="space-y-20">
            {categories.map((cat) => (
              cat.items.length > 0 && (
                <div key={cat.name}>
                   <h2 className="text-2xl font-bold mb-8 pl-4 border-l-4 border-primary text-slate-900 dark:text-white">{cat.name}</h2>
                   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {cat.items.map(img => (
                        <div key={img.id} className="relative group overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800 aspect-square">
                           <Image 
                             src={img.imageUrl} 
                             alt={img.title || "Gallery Image"} 
                             fill 
                             className="object-cover object-top hover:scale-110 transition duration-700"
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
            
            {images.length === 0 && (
              <div className="text-center py-20">
                <p className="text-slate-500 italic">No images uploaded yet.</p>
              </div>
            )}
          </div>
       </div>
    </div>
  );
}
