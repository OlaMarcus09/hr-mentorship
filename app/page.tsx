import { prisma } from '@/lib/prisma';
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Calendar, Users, Briefcase } from "lucide-react";

export const revalidate = 60;

export default async function Home() {
  
  // Hardcoded Preview of Core Team (Top 4)
  const coreTeamPreview = [
    { name: "Dr. Oluyemi Adeosun", role: "Founder & Visionary Leader", image: "/team/oluyemi.jpg" },
    { name: "Irene Ewheme Obagwu", role: "Director of Brand & Creativity", image: "/team/irene.jpg" },
    { name: "Deborah Dumbiri", role: "Director of Finance and Welfare", image: "/team/deborah.jpg" },
    { name: "Adenrele Amosu", role: "Director of People Engagement", image: "/team/adenrele.jpg" },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      
      {/* 1. HERO SECTION (As requested in PDF) */}
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
          <div className="animate-fade-in-up space-y-8">
            <p className="text-sm md:text-base font-bold tracking-widest uppercase text-purple-200">
              Trusted by 7,000+ HR Professionals Across Nigeria and Beyond
            </p>
            <h1 className="text-4xl md:text-7xl font-heading font-bold leading-tight max-w-5xl mx-auto">
              Where HR Careers Grow, <br/> Leaders Emerge, and <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">Community Thrives</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              HR Mentorship is more than a platform — it's a movement. Whether you're entry-level, mid-career, or senior leadership, this is where clarity meets competence, and competence meets opportunity.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
               {/* JOIN COMMUNITY -> TELEGRAM */}
               <a href="https://t.me/hrmentorship" target="_blank" className="px-10 py-4 bg-white text-primary font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2">
                 Start Your Journey <ArrowRight size={20}/>
               </a>
               <Link href="/about" className="px-10 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition flex items-center justify-center">
                 Explore Programs
               </Link>
            </div>

            <div className="pt-12 flex justify-center gap-12 border-t border-white/10 max-w-3xl mx-auto mt-12">
              <div><p className="text-4xl font-bold">7k+</p><p className="text-xs uppercase opacity-70">Members</p></div>
              <div><p className="text-4xl font-bold">60k+</p><p className="text-xs uppercase opacity-70">Applicants Supported</p></div>
              <div><p className="text-4xl font-bold">100%</p><p className="text-xs uppercase opacity-70">Growth Stories</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION (From PDF) */}
      <section className="py-24 bg-white dark:bg-slate-900">
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
               <Image 
                 src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800" 
                 alt="Community" 
                 fill 
                 className="object-cover"
               />
            </div>
            <div>
               <p className="text-primary font-bold uppercase tracking-wider mb-2">About HR Mentorship</p>
               <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                  A Community Built on Growth, Connection, and Possibility
               </h2>
               <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  Founded on July 2, 2018, HR Mentorship began with one vision: to create a safe, structured, supportive space where HR professionals could learn, grow, and access resources that truly transform their careers.
               </p>
               <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                  Today, we have grown into one of Africa's largest HR communities. We nurture HR professionals who:
               </p>
               <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 font-bold text-slate-700 dark:text-slate-300"><CheckCircle2 className="text-primary"/> Lead with competence and character</li>
                  <li className="flex items-center gap-3 font-bold text-slate-700 dark:text-slate-300"><CheckCircle2 className="text-primary"/> Practice people-first leadership</li>
                  <li className="flex items-center gap-3 font-bold text-slate-700 dark:text-slate-300"><CheckCircle2 className="text-primary"/> Build ethical, innovative workplaces</li>
               </ul>
               <Link href="/about" className="text-primary font-bold hover:underline flex items-center gap-2 text-lg">
                  Read Our Full Story <ArrowRight size={20}/>
               </Link>
            </div>
         </div>
      </section>

      {/* 3. CORE TEAM SECTION (Replaces "Experts") */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-4">Meet Our Core Team</h2>
               <p className="text-xl text-slate-600 dark:text-slate-400">The dedicated professionals driving our vision.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
               {coreTeamPreview.map((member, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 text-center hover:-translate-y-1 transition duration-300">
                     <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-slate-50 dark:border-slate-800 relative">
                        <Image src={member.image} alt={member.name} fill className="object-cover"/>
                     </div>
                     <h3 className="font-bold text-lg text-slate-900 dark:text-white">{member.name}</h3>
                     <p className="text-sm text-primary font-bold uppercase tracking-wider">{member.role}</p>
                  </div>
               ))}
            </div>
            
            <div className="text-center">
               <Link href="/team" className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-full shadow hover:shadow-lg transition border border-slate-200 dark:border-slate-700">
                  View Full Team <ArrowRight size={18}/>
               </Link>
            </div>
         </div>
      </section>

      {/* 4. EVENTS & PROGRAMS SECTION */}
      <section className="py-24 bg-white dark:bg-slate-900">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-6">
               Workshops & Learning Experiences <br/> That Drive Real Growth
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-16">
               From weekly learning sessions to paid masterclasses, global webinars, study groups, and certification support, our programs are designed to strengthen competence.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
               {["HR Book Review", "Certification Prep", "HR Strategy", "Digital HR", "Analytics", "Career Development"].map((item, i) => (
                  <div key={i} className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl font-bold text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800">
                     {item}
                  </div>
               ))}
            </div>

            <Link href="/events" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-full shadow-lg hover:bg-primary/90 transition">
               View Upcoming Events <Calendar size={18}/>
            </Link>
         </div>
      </section>

      {/* 5. COMMUNITY / GALLERY SECTION */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
               <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-6">
                  Our Community in Action
               </h2>
               <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                  HR Mentorship is where professional growth meets real human community. Explore activities across:
               </p>
               <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-2 font-bold"><Users className="text-primary"/> Networking</div>
                  <div className="flex items-center gap-2 font-bold"><Briefcase className="text-primary"/> Mentorship</div>
                  <div className="flex items-center gap-2 font-bold"><Calendar className="text-primary"/> Workshops</div>
                  <div className="flex items-center gap-2 font-bold"><CheckCircle2 className="text-primary"/> Events</div>
               </div>
               <Link href="/gallery" className="text-primary font-bold hover:underline flex items-center gap-2 text-lg">
                  View Full Gallery <ArrowRight size={20}/>
               </Link>
            </div>
            <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
               <div className="h-64 bg-slate-200 rounded-2xl overflow-hidden relative mt-12">
                  <Image src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=600" alt="Gallery 1" fill className="object-cover"/>
               </div>
               <div className="h-64 bg-slate-200 rounded-2xl overflow-hidden relative">
                  <Image src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600" alt="Gallery 2" fill className="object-cover"/>
               </div>
            </div>
         </div>
      </section>

      {/* 6. CALL TO ACTION (Telegram Link) */}
      <section className="py-24 bg-primary relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">Ready to Grow Your HR Career?</h2>
            <p className="text-xl text-white/90 mb-10">Join thousands of professionals who have found their path, their people, and their potential with us.</p>
            <div className="flex justify-center">
               <a href="https://t.me/hrmentorship" target="_blank" className="px-12 py-5 bg-white text-primary font-bold text-lg rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center gap-2">
                  Join the Movement <ArrowRight size={20}/>
               </a>
            </div>
         </div>
      </section>
    </div>
  );
}
