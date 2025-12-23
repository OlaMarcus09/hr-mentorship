import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, Briefcase, TrendingUp, Calendar, BookOpen, Award, BarChart } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-primary">
        {/* Background Pattern/Image */}
        <div className="absolute inset-0 z-0 opacity-20">
          <Image 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200"
            alt="HR Community"
            fill
            className="object-cover mix-blend-multiply"
            priority
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
            Trusted by 7,000+ HR Professionals <br/> Across Nigeria and Beyond
          </h1>
          <p className="text-xl md:text-2xl font-light text-white/90 mb-8 max-w-3xl mx-auto">
            Where HR Careers Grow, Leaders Emerge, and Community Thrives.
          </p>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            HR Mentorship is more than a platform — it's a movement. A vibrant community where HR professionals come to learn, connect, grow, and evolve into leaders who shape the future of work.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/mentorship/apply" className="px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-slate-100 transition shadow-lg shadow-white/10">
              Start Your Journey
            </Link>
            <Link href="/learning/resources" className="px-8 py-4 bg-primary-foreground/10 border border-white/30 text-white font-bold rounded-lg hover:bg-white/10 transition backdrop-blur-sm">
              Explore Programs
            </Link>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/20 pt-10">
            <div className="p-4">
               <div className="text-4xl font-bold mb-1">7k+</div>
               <div className="text-sm uppercase tracking-widest opacity-80">Members</div>
            </div>
            <div className="p-4 border-t md:border-t-0 md:border-l border-white/20">
               <div className="text-4xl font-bold mb-1">60k+</div>
               <div className="text-sm uppercase tracking-widest opacity-80">Job Applicants Supported</div>
            </div>
            <div className="p-4 border-t md:border-t-0 md:border-l border-white/20">
               <div className="text-4xl font-bold mb-1">Weekly</div>
               <div className="text-sm uppercase tracking-widest opacity-80">Growth Stories</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
           <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                 src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800" 
                 alt="HR Mentorship Story" 
                 fill 
                 className="object-cover"
              />
           </div>
           
           <div>
              <p className="text-primary font-bold uppercase tracking-widest mb-2">About HR Mentorship</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 dark:text-white mb-6">
                A Community Built on Growth, Connection, and Possibility
              </h2>
              <div className="prose dark:prose-invert text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
                <p>
                  Founded on July 2, 2018, HR Mentorship began with one vision: to create a safe, structured, supportive space where HR professionals could learn, grow, and access resources that truly transform their careers.
                </p>
                <p>
                  Today, we have grown into one of Africa's largest HR communities, a network where professionals at every stage find mentorship, learning, opportunities, and a family they can rely on.
                </p>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 mt-6 shadow-sm">
                   <h3 className="font-bold text-slate-900 dark:text-white mb-3">We nurture HR professionals who:</h3>
                   <ul className="space-y-3">
                     <li className="flex items-start gap-3"><span className="text-primary mt-1">✔</span> Lead with competence and character</li>
                     <li className="flex items-start gap-3"><span className="text-primary mt-1">✔</span> Practice people-first leadership</li>
                     <li className="flex items-start gap-3"><span className="text-primary mt-1">✔</span> Build ethical, innovative, and high-performing workplaces</li>
                   </ul>
                </div>
                <div className="pt-6">
                   <Link href="/about" className="text-primary font-bold hover:underline inline-flex items-center gap-2">
                     Read our full story <ArrowRight size={18}/>
                   </Link>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* 3. EXPERTS SECTION REMOVED (As per instruction) */}

      {/* 4. EVENTS & LEARNING SECTION */}
      <section className="py-20 px-6 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto text-center mb-16">
           <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-6">
             Workshops & Learning Experiences That Drive Real Growth
           </h2>
           <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
             From weekly learning sessions to paid masterclasses, global webinars, study groups, and certification support, our programs are designed to strengthen competence.
           </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6">
           {[
             { icon: <BookOpen size={24}/>, title: "HR Book Review" },
             { icon: <Award size={24}/>, title: "Certification Prep" },
             { icon: <TrendingUp size={24}/>, title: "HR Strategy" },
             { icon: <Briefcase size={24}/>, title: "Digital HR" },
             { icon: <BarChart size={24}/>, title: "People Analytics" },
             { icon: <Users size={24}/>, title: "Career Development" },
           ].map((item, idx) => (
             <div key={idx} className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl hover:shadow-lg transition flex flex-col items-center text-center gap-4 group">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-full text-primary group-hover:scale-110 transition-transform shadow-sm">
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{item.title}</h3>
             </div>
           ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/events" className="inline-block px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg hover:opacity-90 transition">
            View Upcoming Events
          </Link>
        </div>
      </section>

      {/* 5. COMMUNITY SECTION */}
      <section className="py-20 px-6 bg-primary text-white">
         <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
               <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">Our Community in Action</h2>
               <p className="text-xl text-white/90 mb-8 leading-relaxed">
                 HR Mentorship is where professional growth meets real human community. We don't just connect online; we grow together.
               </p>
               <ul className="grid grid-cols-2 gap-4 mb-8">
                 <li className="flex items-center gap-2"><div className="w-2 h-2 bg-white rounded-full"></div> Workshops</li>
                 <li className="flex items-center gap-2"><div className="w-2 h-2 bg-white rounded-full"></div> Networking</li>
                 <li className="flex items-center gap-2"><div className="w-2 h-2 bg-white rounded-full"></div> Events</li>
                 <li className="flex items-center gap-2"><div className="w-2 h-2 bg-white rounded-full"></div> Mentorship</li>
               </ul>
               <Link href="/gallery" className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-slate-100 transition shadow-xl">
                 View Gallery <ArrowRight size={18}/>
               </Link>
            </div>
            
            {/* Gallery Preview Grid */}
            <div className="grid grid-cols-2 gap-4">
               <div className="h-48 bg-white/10 rounded-xl overflow-hidden"><Image src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=400" alt="Event" width={400} height={400} className="w-full h-full object-cover"/></div>
               <div className="h-48 bg-white/10 rounded-xl overflow-hidden mt-8"><Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400" alt="Workshop" width={400} height={400} className="w-full h-full object-cover"/></div>
               <div className="h-48 bg-white/10 rounded-xl overflow-hidden"><Image src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=400" alt="Talk" width={400} height={400} className="w-full h-full object-cover"/></div>
               <div className="h-48 bg-white/10 rounded-xl overflow-hidden mt-8"><Image src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400" alt="Team" width={400} height={400} className="w-full h-full object-cover"/></div>
            </div>
         </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900 text-center">
        <div className="max-w-3xl mx-auto">
           <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-8">
             Ready to Grow Your HR Career?
           </h2>
           <Link href="/mentorship/apply" className="inline-block px-10 py-4 bg-primary text-white font-bold text-lg rounded-xl hover:bg-primary/90 transition shadow-lg shadow-primary/30">
             Join the Community
           </Link>
        </div>
      </section>

    </div>
  );
}
