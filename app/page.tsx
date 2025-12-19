import Link from "next/link";
import { ArrowRight, CheckCircle, MapPin, Calendar, Users, Star, Briefcase } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

async function getData() {
  const latestBlogs = await prisma.blog.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' }
  });
  
  const upcomingEvents = await prisma.event.findMany({
    take: 3,
    orderBy: { date: 'asc' }
  });

  return { latestBlogs, upcomingEvents };
}

export default async function Home() {
  const { latestBlogs, upcomingEvents } = await getData();

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO SECTION (Matches Screenshot 3) */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-slate-50 dark:bg-slate-950">
        {/* Purple Blob Background */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-primary/20 blur-[100px] rounded-full opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full opacity-50 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold mb-6">
               Trusted by 500+ HR Professionals
            </div>
            <h1 className="text-5xl md:text-6xl font-bold font-heading mb-6 leading-tight text-slate-900 dark:text-white">
              Elevate Your <span className="text-primary">HR Career</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Transform your expertise with personalized mentorship, cutting-edge resources, and a thriving community dedicated to career excellence.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/mentorship/apply" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-bold transition shadow-lg shadow-primary/25">
                Become a Mentee
              </Link>
              <Link href="/mentorship/apply" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white px-8 py-4 rounded-lg font-bold transition">
                Join as Mentor
              </Link>
            </div>

            <div className="mt-12 flex gap-12">
               <div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">98%</div>
                  <div className="text-sm text-slate-500">Career Growth</div>
               </div>
               <div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">10K+</div>
                  <div className="text-sm text-slate-500">Professionals</div>
               </div>
               <div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">7K+</div>
                  <div className="text-sm text-slate-500">Mentees</div>
               </div>
            </div>
          </div>
          
          {/* Hero Image / Dashboard Visual */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800">
               <img 
                 src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000" 
                 alt="HR Professionals collaborating" 
                 className="w-full h-auto object-cover"
               />
               
               {/* Floating Card: Current Mentees (Matches Screenshot 3) */}
               <div className="absolute bottom-8 left-8 right-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-xl">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <p className="text-sm text-slate-500 mb-1">Current Mentees</p>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">1,247</h3>
                        <p className="text-xs text-primary font-medium">Active in programs</p>
                     </div>
                  </div>
                  {/* Progress Bars */}
                  <div className="space-y-3">
                     <div>
                        <div className="flex justify-between text-xs mb-1 font-medium"><span>Career Growth</span><span>94%</span></div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                           <div className="h-full bg-primary w-[94%]"></div>
                        </div>
                     </div>
                     <div>
                        <div className="flex justify-between text-xs mb-1 font-medium"><span>Skill Development</span><span>89%</span></div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                           <div className="h-full bg-cyan-400 w-[89%]"></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION (Matches Screenshot 4) */}
      <section className="py-20 bg-white dark:bg-slate-950">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-900/20 text-primary text-sm font-medium mb-6">
               <Star size={16} fill="currentColor" /> About HR Mentorship
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">
               Empowering the Next Generation of <br/> HR Professionals
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-8">
               HR Mentorship is a global platform dedicated to bridging the gap between aspiring HR professionals and experienced leaders. We foster growth through structured mentorship, knowledge-sharing, and real-world exposure — creating a community where every HR professional can thrive with purpose, clarity, and confidence.
            </p>
            <Link href="/about" className="text-primary font-bold hover:underline flex items-center justify-center gap-2">
               Explore More <ArrowRight size={18} />
            </Link>
         </div>
      </section>

      {/* 3. UPCOMING EVENTS (Matches Screenshot 5 - Dynamic) */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Upcoming Events</h2>
             <p className="text-slate-500 text-lg">Join our workshops, summits, and training sessions</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.length === 0 ? (
               <div className="col-span-3 text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                  <p className="text-slate-500">No upcoming events scheduled.</p>
               </div>
            ) : (
              upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white dark:bg-slate-950 p-6 rounded-2xl shadow-sm hover:shadow-xl transition border border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-start mb-6">
                     <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                        Event
                     </span>
                     <div className="text-right">
                        <div className="font-bold text-slate-900 dark:text-white">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                        <div className="text-xs text-slate-500">09:00 AM EST</div>
                     </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 line-clamp-2 min-h-[3.5rem]">{event.title}</h3>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-500 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                     <div className="flex items-center gap-1">
                        <MapPin size={14} className="text-primary"/> 
                        {event.location}
                     </div>
                     <div className="flex items-center gap-1">
                        <Users size={14} className="text-primary"/> 
                        100+ attending
                     </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="text-center mt-12">
             <Link href="/events" className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition">
                View All Events
             </Link>
          </div>
        </div>
      </section>

      {/* 4. EXPERT TEAM (Matches Screenshot 6) */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Meet Our Expert Team</h2>
              <p className="text-slate-500 text-lg">Learn from industry-leading HR professionals</p>
           </div>
           
           {/* Static Team Placeholders (since we don't have Team DB yet) */}
           <div className="grid md:grid-cols-3 gap-8">
              {[
                 { name: "Sarah Chen", role: "HR Transformation Lead", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400" },
                 { name: "Michael Rodriguez", role: "Talent Development Expert", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400" },
                 { name: "Emily Watson", role: "DEI Strategy Director", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&h=400" }
              ].map((member, i) => (
                 <div key={i} className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 text-center hover:-translate-y-2 transition duration-300">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-6 border-4 border-white dark:border-slate-800 shadow-lg">
                       <img src={member.img} alt={member.name} className="w-full h-full object-cover"/>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium text-sm mb-4">{member.role}</p>
                    <div className="flex justify-center gap-1 text-yellow-400 text-sm font-medium">
                       <Star size={14} fill="currentColor"/> 15+ years experience
                    </div>
                 </div>
              ))}
           </div>
           
           <div className="text-center mt-12">
              <Link href="/about" className="text-primary font-bold hover:underline">View Full Team &rarr;</Link>
           </div>
        </div>
      </section>

      {/* 5. GALLERY SECTION (Matches Screenshot 1 - YOU REQUESTED THIS) */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Our Community in Action</h2>
              <p className="text-slate-500 text-lg">Experience the energy and collaboration</p>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="relative group overflow-hidden rounded-2xl h-64">
                 <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600" className="w-full h-full object-cover transition duration-500 group-hover:scale-110"/>
                 <div className="absolute bottom-4 left-4 bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full">Workshop</div>
              </div>
              <div className="relative group overflow-hidden rounded-2xl h-64">
                 <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600" className="w-full h-full object-cover transition duration-500 group-hover:scale-110"/>
                 <div className="absolute bottom-4 left-4 bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full">Event</div>
              </div>
              <div className="relative group overflow-hidden rounded-2xl h-64">
                 <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=600" className="w-full h-full object-cover transition duration-500 group-hover:scale-110"/>
                 <div className="absolute bottom-4 left-4 bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full">Networking</div>
              </div>
              <div className="relative group overflow-hidden rounded-2xl h-64">
                 <img src="https://images.unsplash.com/photo-1559223607-a43c990ed9bb?auto=format&fit=crop&w=600" className="w-full h-full object-cover transition duration-500 group-hover:scale-110"/>
                 <div className="absolute bottom-4 left-4 bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full">Mentorship</div>
              </div>
           </div>
           
           <div className="text-center mt-10">
              <Link href="/gallery" className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition">
                 View Full Gallery
              </Link>
           </div>
        </div>
      </section>

      {/* 6. CTA SECTION (Matches Screenshot 2 - Gradient Background) */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#240b36] to-[#c31432] dark:from-[#2e0249] dark:to-[#580a6b]"></div>
        <div className="absolute inset-0 bg-primary/80 mix-blend-multiply"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
           <div className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm mb-6">
              Join Our Growing Community
           </div>
           <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to Take the Next Step in Your <br/><span className="text-purple-300">HR Journey?</span>
           </h2>
           <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of HR professionals who are transforming their careers through expert mentorship, practical guidance, and an empowering network.
           </p>
           <div className="flex flex-wrap justify-center gap-6">
              <Link href="/mentorship/apply" className="bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-white/90 transition">
                 Become a Mentee &rarr;
              </Link>
              <Link href="/mentorship/apply" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition">
                 Join as Mentor &rarr;
              </Link>
           </div>
        </div>
      </section>
    </div>
  );
}
