import Link from "next/link";
import { ArrowRight, MapPin, Users, Star, Briefcase } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

async function getData() {
  const latestBlogs = await prisma.blog.findMany({ take: 3, orderBy: { createdAt: 'desc' } });
  const upcomingEvents = await prisma.event.findMany({ take: 3, orderBy: { date: 'asc' } });
  return { latestBlogs, upcomingEvents };
}

export default async function Home() {
  const { latestBlogs, upcomingEvents } = await getData();

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50 dark:bg-slate-950">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-primary/20 blur-[100px] rounded-full opacity-50 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-bold mb-6">
               Trusted by 7,000+ HR Professionals
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 leading-tight text-slate-900 dark:text-white">
              Where HR Careers Grow, <span className="text-primary">Leaders Emerge</span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              HR Mentorship is more than a platform — it's a movement. A vibrant community where HR professionals come to learn, connect, and evolve.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/mentorship/apply" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold transition text-center shadow-lg shadow-primary/25">
                Start Your Journey
              </Link>
              <Link href="/events" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-8 py-4 rounded-xl font-bold transition text-center">
                Explore Programs
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-2 md:flex md:gap-12 gap-y-8 gap-x-4">
               <div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">7k+</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Members</div>
               </div>
               <div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">60k+</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Supported</div>
               </div>
               <div className="col-span-2 md:col-span-1">
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">Weekly</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Growth Stories</div>
               </div>
            </div>
          </div>
          
          <div className="relative mt-8 lg:mt-0">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 aspect-[4/3] md:aspect-auto">
               <img 
                 src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000" 
                 alt="HR Professionals" 
                 className="w-full h-full object-cover"
               />
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section className="py-16 bg-white dark:bg-slate-950">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6 font-heading">
               A Community Built on Growth
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8 text-sm md:text-base">
              Founded on July 2, 2018, HR Mentorship began with one vision: to create a safe space where HR professionals could learn and grow. Today, we are one of Africa's largest HR communities.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mb-10">
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border dark:border-slate-800">
                    <Users className="text-primary mb-2" size={24} />
                    <h3 className="font-bold">People-First</h3>
                    <p className="text-xs text-slate-500">We practice empathetic leadership.</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border dark:border-slate-800">
                    <Briefcase className="text-primary mb-2" size={24} />
                    <h3 className="font-bold">Innovation</h3>
                    <p className="text-xs text-slate-500">Building future-ready workplaces.</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border dark:border-slate-800">
                    <Star className="text-primary mb-2" size={24} />
                    <h3 className="font-bold">Excellence</h3>
                    <p className="text-xs text-slate-500">Setting the gold standard in HR.</p>
                </div>
            </div>
         </div>
      </section>

      {/* 3. EVENTS SECTION */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
             <h2 className="text-3xl font-bold mb-4 font-heading">Upcoming Events</h2>
             <p className="text-slate-500">Join our workshops and summits</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white dark:bg-slate-950 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                 <div className="flex justify-between items-start mb-4">
                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-bold uppercase">Event</span>
                    <div className="text-right text-sm font-bold">{new Date(event.date).toLocaleDateString()}</div>
                 </div>
                 <h3 className="text-lg font-bold mb-2 line-clamp-2">{event.title}</h3>
                 <div className="flex items-center gap-1 text-xs text-slate-500 mt-4">
                    <MapPin size={14} className="text-primary"/> {event.location}
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GALLERY PREVIEW (RESTORED TO 4 ITEMS) */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4 font-heading">Community in Action</h2>
           </div>
           
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative rounded-2xl overflow-hidden h-40 md:h-64">
                 <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600" className="w-full h-full object-cover"/>
                 <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded">Workshop</div>
              </div>
              <div className="relative rounded-2xl overflow-hidden h-40 md:h-64">
                 <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=600" className="w-full h-full object-cover"/>
                 <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded">Event</div>
              </div>
              <div className="relative rounded-2xl overflow-hidden h-40 md:h-64">
                 <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600" className="w-full h-full object-cover"/>
                 <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded">Networking</div>
              </div>
              <div className="relative rounded-2xl overflow-hidden h-40 md:h-64">
                 <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600" className="w-full h-full object-cover"/>
                 <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded">Mentorship</div>
              </div>
           </div>
           
           <div className="text-center mt-8">
              <Link href="/gallery" className="bg-primary text-white px-8 py-3 rounded-full font-bold text-sm">View Gallery</Link>
           </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-20 relative overflow-hidden text-center text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-[#240b36] to-[#c31432] dark:from-[#2e0249] dark:to-[#580a6b]"></div>
        <div className="relative z-10 px-6">
           <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Grow?</h2>
           <Link href="/mentorship/apply" className="bg-white text-primary px-8 py-4 rounded-xl font-bold inline-block">Start Your Journey</Link>
        </div>
      </section>
    </div>
  );
}
