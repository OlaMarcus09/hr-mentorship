import { prisma } from '@/lib/prisma';
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Calendar, Users, Briefcase } from "lucide-react";

export const revalidate = 60;

export default async function Home() {
  
  // 1. FETCH REAL GALLERY IMAGES
  const galleryImages = await prisma.galleryImage.findMany({
    take: 4,
    orderBy: { createdAt: 'desc' }
  });

  // 2. CORE TEAM PREVIEW (Updated to .jpg for speed and accuracy)
  const coreTeamPreview = [
    { name: "Dr. Oluyemi Adeosun", role: "Founder & Visionary Leader", image: "/team/oluyemi.jpg" },
    { name: "Irene Ewheme Obagwu", role: "Director of Brand & Creativity", image: "/team/irene.jpg" },
    { name: "Deborah Dumbiri", role: "Director of Finance and Welfare", image: "/team/deborah.jpg" },
    { name: "Adenrele Amosu", role: "Director of People Engagement", image: "/team/adenrele.jpg" },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen font-sans selection:bg-purple-100 dark:selection:bg-purple-900">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=2000" 
            alt="HR Professionals" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-purple-900/90 mix-blend-multiply" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <div className="animate-fade-in-up space-y-10">
            <p className="text-sm md:text-base font-semibold tracking-widest uppercase text-purple-200">
              Trusted by 7,000+ HR Professionals
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight max-w-5xl mx-auto drop-shadow-lg">
              Where HR Careers Grow, <br/> Leaders Emerge, and <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">Community Thrives</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto font-light">
              HR Mentorship is more than a platform — it's a movement. Whether you're entry-level, mid-career, or senior leadership, this is where clarity meets competence.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
               <a href="https://t.me/hrmentorship" target="_blank" className="px-10 py-4 bg-white text-primary font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2">
                 Start Your Journey <ArrowRight size={20}/>
               </a>
               <Link href="/about" className="px-10 py-4 bg-transparent border border-white/40 text-white font-semibold rounded-full hover:bg-white/10 transition flex items-center justify-center">
                 Explore Programs
               </Link>
            </div>

            <div className="pt-16 flex justify-center gap-12 md:gap-24 border-t border-white/10 max-w-4xl mx-auto mt-12 opacity-90">
              <div><p className="text-4xl md:text-5xl font-bold">7k+</p><p className="text-xs uppercase tracking-wider mt-1">Members</p></div>
              <div><p className="text-4xl md:text-5xl font-bold">60k+</p><p className="text-xs uppercase tracking-wider mt-1">Applications Supported</p></div>
              <div><p className="text-4xl md:text-5xl font-bold">100%</p><p className="text-xs uppercase tracking-wider mt-1">Growth Stories</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section className="py-32 bg-white dark:bg-slate-900">
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
            <div className="relative h-[550px] rounded-[2rem] overflow-hidden shadow-2xl group">
               <Image 
                 src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800" 
                 alt="Community" 
                 fill 
                 className="object-cover group-hover:scale-105 transition duration-700"
               />
               <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"/>
            </div>
            <div className="space-y-8">
               <span className="text-primary font-bold uppercase tracking-wider text-sm bg-primary/5 px-4 py-2 rounded-full inline-block">About HR Mentorship</span>
               <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white leading-tight">
                  A Community Built on <br/> Growth & Connection.
               </h2>
               <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                  <p>
                     Founded on July 2, 2018, HR Mentorship began with one vision: to create a safe, structured, supportive space where HR professionals could learn, grow, and access resources that truly transform their careers.
                  </p>
                  <p>
                     Today, we nurture HR professionals who lead with competence, practice people-first leadership, and build ethical, high-performing workplaces.
                  </p>
               </div>
               
               <ul className="space-y-4 pt-4">
                  {[
                    "Lead with competence and character",
                    "Practice people-first leadership",
                    "Build ethical, innovative workplaces"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-slate-700 dark:text-slate-300 font-medium">
                      <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={14}/>
                      </div>
                      {item}
                    </li>
                  ))}
               </ul>

               <div className="pt-4">
                 <Link href="/about" className="group text-primary font-bold hover:text-primary/80 inline-flex items-center gap-2 text-lg transition-all">
                    Read Our Full Story <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
                 </Link>
               </div>
            </div>
         </div>
      </section>

      {/* 3. CORE TEAM SECTION (Priority Loading) */}
      <section className="py-32 bg-slate-50 dark:bg-slate-950">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20 max-w-3xl mx-auto">
               <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-6">Meet Our Core Team</h2>
               <p className="text-xl text-slate-600 dark:text-slate-400 font-light">The dedicated visionaries driving our mission forward.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
               {coreTeamPreview.map((member, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-800 text-center hover:shadow-xl hover:-translate-y-2 transition duration-300 group">
                     <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-8 border-4 border-slate-50 dark:border-slate-800 relative group-hover:border-primary/20 transition">
                        {/* Priority makes them load instantly */}
                        <Image src={member.image} alt={member.name} fill className="object-cover" priority={true}/>
                     </div>
                     <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{member.name}</h3>
                     <p className="text-xs text-primary font-bold uppercase tracking-widest">{member.role}</p>
                  </div>
               ))}
            </div>
            
            <div className="text-center">
               <Link href="/team" className="inline-flex items-center gap-2 px-10 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all border border-slate-200 dark:border-slate-700">
                  View Full Team <ArrowRight size={18}/>
               </Link>
            </div>
         </div>
      </section>

      {/* 4. EVENTS & PROGRAMS SECTION */}
      <section className="py-32 bg-white dark:bg-slate-900">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-8 leading-tight">
               Workshops & Learning Experiences <br/> That Drive Real Growth
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-20 font-light leading-relaxed">
               From weekly learning sessions to paid masterclasses, global webinars, study groups, and certification support, our programs are designed to strengthen competence.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
               {[
                 { label: "HR Book Review", icon: <Briefcase size={20}/> },
                 { label: "Certification Prep", icon: <CheckCircle2 size={20}/> },
                 { label: "HR Strategy", icon: <Users size={20}/> },
                 { label: "Digital HR", icon: <Calendar size={20}/> },
                 { label: "Analytics", icon: <Briefcase size={20}/> },
                 { label: "Career Development", icon: <Users size={20}/> }
               ].map((item, i) => (
                  <div key={i} className="flex items-center justify-center gap-3 p-6 bg-slate-50 dark:bg-slate-950 rounded-xl font-semibold text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800 hover:border-primary/30 transition">
                     <span className="text-primary">{item.icon}</span>
                     {item.label}
                  </div>
               ))}
            </div>

            <Link href="/events" className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-white font-bold rounded-full shadow-xl hover:bg-primary/90 hover:scale-105 transition-all">
               View Upcoming Events <Calendar size={18}/>
            </Link>
         </div>
      </section>

      {/* 5. COMMUNITY / GALLERY SECTION */}
      <section className="py-32 bg-slate-50 dark:bg-slate-950">
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
            <div className="order-2 md:order-1">
               <span className="text-primary font-bold uppercase tracking-wider text-sm mb-4 block">Our Gallery</span>
               <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-8">
                  Our Community in Action
               </h2>
               <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-light">
                  HR Mentorship is where professional growth meets real human community. Explore activities across:
               </p>
               <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-10">
                  <div className="flex items-center gap-3 font-semibold text-slate-700 dark:text-slate-300"><div className="w-2 h-2 bg-primary rounded-full"/> Networking</div>
                  <div className="flex items-center gap-3 font-semibold text-slate-700 dark:text-slate-300"><div className="w-2 h-2 bg-primary rounded-full"/> Mentorship</div>
                  <div className="flex items-center gap-3 font-semibold text-slate-700 dark:text-slate-300"><div className="w-2 h-2 bg-primary rounded-full"/> Workshops</div>
                  <div className="flex items-center gap-3 font-semibold text-slate-700 dark:text-slate-300"><div className="w-2 h-2 bg-primary rounded-full"/> Events</div>
               </div>
               <Link href="/gallery" className="text-primary font-bold hover:underline flex items-center gap-2 text-lg group">
                  View Full Gallery <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
               </Link>
            </div>
            
            <div className="order-1 md:order-2 grid grid-cols-2 gap-6">
               {galleryImages.length > 0 ? (
                 galleryImages.slice(0, 4).map((img, i) => (
                   <div key={img.id} className={`bg-slate-200 rounded-2xl overflow-hidden relative shadow-lg ${i % 2 === 0 ? 'h-64 mt-12' : 'h-64'}`}>
                      <Image src={img.imageUrl} alt={img.title || "Gallery"} fill className="object-cover hover:scale-110 transition duration-700"/>
                   </div>
                 ))
               ) : (
                 <>
                   <div className="h-64 bg-slate-200 rounded-2xl overflow-hidden relative mt-12 shadow-lg">
                      <Image src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=600" alt="Gallery 1" fill className="object-cover hover:scale-110 transition duration-700"/>
                   </div>
                   <div className="h-64 bg-slate-200 rounded-2xl overflow-hidden relative shadow-lg">
                      <Image src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600" alt="Gallery 2" fill className="object-cover hover:scale-110 transition duration-700"/>
                   </div>
                 </>
               )}
            </div>
         </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="py-32 bg-primary relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8">Ready to Grow Your HR Career?</h2>
            <p className="text-xl text-white/90 mb-12 font-light max-w-2xl mx-auto">Join thousands of professionals who have found their path, their people, and their potential with us.</p>
            <div className="flex justify-center">
               <a href="https://t.me/hrmentorship" target="_blank" className="px-12 py-5 bg-white text-primary font-bold text-lg rounded-full shadow-2xl hover:scale-105 hover:shadow-white/20 transition-all flex items-center gap-2">
                  Join the Movement <ArrowRight size={20}/>
               </a>
            </div>
         </div>
      </section>
    </div>
  );
}
