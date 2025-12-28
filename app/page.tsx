import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, Briefcase, TrendingUp, BookOpen, Award, BarChart, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      
      {/* 1. HERO SECTION - FIXED: PURE WHITE (No Purple) */}
      <section className="relative pt-40 pb-20 px-6 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight text-slate-900 dark:text-white">
            Trusted by 7,000+ HR Professionals <br/> Across Nigeria and Beyond
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Where HR Careers Grow, Leaders Emerge, and Community Thrives.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/mentorship/apply" className="px-10 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition shadow-xl shadow-primary/20 text-lg">
              Start Your Journey
            </Link>
            <Link href="/learning/resources" className="px-10 py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-lg hover:bg-slate-200 transition text-lg">
              Explore Programs
            </Link>
          </div>

          {/* STATS - Centralized & Big */}
          <div className="border-y border-slate-100 dark:border-slate-800 py-12">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                   <div className="text-6xl font-bold text-slate-900 dark:text-white mb-2">7k+</div>
                   <div className="text-sm font-bold uppercase tracking-widest text-slate-500">Active Members</div>
                </div>
                <div className="md:border-l border-slate-200 dark:border-slate-800">
                   <div className="text-6xl font-bold text-slate-900 dark:text-white mb-2">60k+</div>
                   <div className="text-sm font-bold uppercase tracking-widest text-slate-500">Applications Supported</div>
                </div>
                <div className="md:border-l border-slate-200 dark:border-slate-800">
                   <div className="text-6xl font-bold text-slate-900 dark:text-white mb-2">98%</div>
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
              <Image 
                 src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800" 
                 alt="HR Mentorship Story" 
                 fill 
                 className="object-cover"
              />
           </div>
           
           <div>
              <p className="text-primary font-bold uppercase tracking-widest mb-3">Who We Are</p>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-6">
                A Community Built on Growth
              </h2>
              <div className="prose dark:prose-invert text-lg text-slate-600 dark:text-slate-300 leading-relaxed space-y-6">
                <p>Founded on July 2, 2018, HR Mentorship began with one vision: to create a safe space where HR professionals could learn and grow.</p>
                <p>Today, we are a continental force for professional excellence, nurturing leaders who transform workplaces.</p>
                <div className="pt-4">
                   <Link href="/about" className="text-primary font-bold hover:underline inline-flex items-center gap-2 text-lg">
                     Read our full story <ArrowRight size={20}/>
                   </Link>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* 3. EVENTS & LEARNING */}
      <section className="py-24 px-6 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto text-center mb-16">
           <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-6">
             Workshops & Learning Experiences
           </h2>
           <p className="text-xl text-slate-600 dark:text-slate-400">
             From weekly sessions to global webinars, we provide the tools you need to excel.
           </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6">
           {[
             { icon: <BookOpen size={28}/>, title: "HR Book Review" },
             { icon: <Award size={28}/>, title: "Certification Prep" },
             { icon: <TrendingUp size={28}/>, title: "HR Strategy" },
             { icon: <Briefcase size={28}/>, title: "Digital HR" },
             { icon: <BarChart size={28}/>, title: "People Analytics" },
             { icon: <Users size={28}/>, title: "Career Development" },
           ].map((item, idx) => (
             <div key={idx} className="p-8 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl hover:shadow-xl transition hover:-translate-y-1 flex flex-col items-center text-center gap-4 group cursor-default">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-full text-primary group-hover:scale-110 transition-transform shadow-sm">
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{item.title}</h3>
             </div>
           ))}
        </div>
      </section>

      {/* 4. BECOME A MENTOR / CTA SECTION - FIXED: PURE WHITE BACKGROUND */}
      <section className="py-24 px-6 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto text-center">
           
           <span className="inline-block py-1 px-4 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6">
             Join Our Growing Community
           </span>
           
           <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 dark:text-white mb-8">
             Ready to Take the Next Step <br/> in Your HR Journey?
           </h2>
           
           <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
             Join thousands of HR professionals who are transforming their careers through expert mentorship, practical guidance, and an empowering network designed for your success.
           </p>

           <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
              <Link href="/mentorship/apply" className="px-10 py-5 bg-primary text-white font-bold text-lg rounded-xl hover:bg-primary/90 transition shadow-xl shadow-primary/20">
                Become a Mentee
              </Link>
              <Link href="/mentorship/join" className="px-10 py-5 bg-white border-2 border-slate-200 text-slate-900 font-bold text-lg rounded-xl hover:border-primary hover:text-primary transition">
                Join as Mentor
              </Link>
           </div>

           {/* IMPACT CARDS (Styled for White Background) */}
           <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                 <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center text-primary mb-6 shadow-sm">
                   <Users size={24} />
                 </div>
                 <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">10,000+</h3>
                 <p className="text-slate-500 font-medium">Active Professionals</p>
              </div>
              
              <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                 <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center text-primary mb-6 shadow-sm">
                   <TrendingUp size={24} />
                 </div>
                 <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">98%</h3>
                 <p className="text-slate-500 font-medium">Career Growth Rate</p>
              </div>

              <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                 <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center text-primary mb-6 shadow-sm">
                   <CheckCircle size={24} />
                 </div>
                 <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">500+</h3>
                 <p className="text-slate-500 font-medium">Expert Mentors</p>
              </div>
           </div>

        </div>
      </section>

    </div>
  );
}
