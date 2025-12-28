import { prisma } from '@/lib/prisma';
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, Briefcase, TrendingUp, BookOpen, Award, BarChart, CheckCircle, ArrowUpRight } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const teamPreview = await prisma.teamMember.findMany({ take: 4, orderBy: { id: 'asc' } });
  const events = await prisma.event.findMany({ take: 3, orderBy: { date: 'asc' } });
  const gallery = await prisma.galleryImage.findMany({ take: 4, orderBy: { createdAt: 'desc' } });

  const telegramLink = "https://t.me/+aZTvBGln2eY2OTI0";

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-48 pb-32 px-6 flex items-center justify-center min-h-[85vh]">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
            alt="HR Community"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-white/90 dark:bg-slate-950/90 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight text-primary dark:text-white drop-shadow-sm">
            Trusted by 7,000+ HR Professionals <br/> Across Nigeria and Beyond
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
            Where HR Careers Grow, Leaders Emerge, and Community Thrives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/mentorship/apply" className="px-10 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition shadow-xl shadow-primary/20 text-lg">
              Start Your Journey
            </Link>
            <Link href="/learning/resources" className="px-10 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold rounded-lg hover:bg-slate-50 transition text-lg">
              Explore Programs
            </Link>
          </div>
          
          <div className="border-t border-slate-200 dark:border-slate-800 pt-10">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                   <div className="text-6xl font-bold text-primary dark:text-white mb-2">7k+</div>
                   <div className="text-sm font-bold uppercase tracking-widest text-slate-500">Active Members</div>
                </div>
                <div className="md:border-l border-slate-300 dark:border-slate-800">
                   <div className="text-6xl font-bold text-primary dark:text-white mb-2">60k+</div>
                   <div className="text-sm font-bold uppercase tracking-widest text-slate-500">Applications Supported</div>
                </div>
                <div className="md:border-l border-slate-300 dark:border-slate-800">
                   <div className="text-6xl font-bold text-primary dark:text-white mb-2">98%</div>
                   <div className="text-sm font-bold uppercase tracking-widest text-slate-500">Career Growth Rate</div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
           <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800" alt="Story" fill className="object-cover" />
           </div>
           <div>
              <p className="text-primary font-bold uppercase tracking-widest mb-3">Who We Are</p>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-6">A Community Built on Growth</h2>
              <div className="prose dark:prose-invert text-lg text-slate-600 dark:text-slate-300 leading-relaxed space-y-6">
                <p>Founded on July 2, 2018, HR Mentorship began with one vision: to create a safe space where HR professionals could learn and grow.</p>
                <div className="pt-4">
                   <Link href="/about" className="text-primary font-bold hover:underline inline-flex items-center gap-2 text-lg">Read our full story <ArrowRight size={20}/></Link>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* 3. UPCOMING EVENTS */}
      <section className="py-24 px-6 bg-white dark:bg-slate-950">
         <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-4">Upcoming Events</h2>
            <p className="text-xl text-slate-500 dark:text-slate-400">Join our workshops, summits, and training sessions.</p>
         </div>

         {events.length > 0 ? (
           <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 mb-12">
              {events.map((event) => (
                <div key={event.id} className="group bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 hover:shadow-lg transition">
                   <div className="flex justify-between items-start mb-6">
                      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm text-center min-w-[70px]">
                         <div className="text-xs font-bold text-red-500 uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</div>
                         <div className="text-2xl font-bold text-slate-900 dark:text-white">{new Date(event.date).getDate()}</div>
                      </div>
                      <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">Event</span>
                   </div>
                   <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition">{event.title}</h3>
                   <p className="text-slate-500 text-sm mb-6 flex items-center gap-2"><Briefcase size={16}/> {event.location}</p>
                   <Link href="/events" className="w-full block text-center py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-bold text-sm hover:bg-slate-50 transition">Register Now</Link>
                </div>
              ))}
           </div>
         ) : (
           <div className="text-center py-10 text-slate-500">No upcoming events scheduled.</div>
         )}
         
         <div className="text-center">
            <Link href="/events" className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition">
              View All Events <ArrowRight size={18} />
            </Link>
         </div>
      </section>

      {/* 4. GALLERY PREVIEW */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900">
         <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-6">Our Community in Action</h2>
            <p className="text-xl text-slate-500 dark:text-slate-400">Experience the energy and collaboration.</p>
         </div>

         <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {gallery.length > 0 ? gallery.map((img) => (
               <div key={img.id} className="relative h-64 rounded-xl overflow-hidden group">
                  <Image src={img.imageUrl} alt="Gallery" fill className="object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                     <ArrowUpRight className="text-white" size={32} />
                  </div>
               </div>
            )) : (
              [1,2,3,4].map(i => (
                <div key={i} className="relative h-64 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
              ))
            )}
         </div>

         <div className="text-center">
            <Link href="/gallery" className="inline-block px-10 py-4 border-2 border-slate-200 dark:border-slate-800 rounded-full font-bold hover:border-primary hover:text-primary transition">
               View Full Gallery
            </Link>
         </div>
      </section>

      {/* 5. CTA */}
      <section className="py-24 px-6 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto text-center">
           <span className="inline-block py-1 px-4 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6">Join Our Growing Community</span>
           <h2 className="text-4xl md:text-6xl font-heading font-bold text-primary dark:text-white mb-8">Ready to Take the Next Step?</h2>
           <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
              <Link href="/mentorship/apply" className="px-10 py-5 bg-primary text-white font-bold text-lg rounded-xl hover:bg-primary/90 transition shadow-xl">Become a Mentee</Link>
              <a href={telegramLink} target="_blank" className="px-10 py-5 bg-white border-2 border-slate-200 text-slate-900 font-bold text-lg rounded-xl hover:border-primary hover:text-primary transition">
                Join Community
              </a>
           </div>
        </div>
      </section>
    </div>
  );
}
