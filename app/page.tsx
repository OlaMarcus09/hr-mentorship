import { prisma } from '@/lib/prisma';
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, BookOpen, Calendar, Briefcase, CheckCircle2, Star, ShieldCheck, Zap } from "lucide-react";

export const revalidate = 60;

export default async function Home() {
  const latestBlogs = await prisma.blog.findMany({ take: 3, orderBy: { createdAt: 'desc' } });
  
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      
      {/* 1. HERO SECTION (With Fixed Dark Overlay) */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=2000" 
            alt="HR Professionals" 
            fill 
            className="object-cover"
            priority
          />
          {/* Darker opacity (90%) to fix readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/95 via-purple-900/90 to-purple-900/50 mix-blend-multiply" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white text-sm font-medium">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"/> #1 HR Community in Africa
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white leading-tight">
              Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">HR Career</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-lg">
              Join 7,000+ professionals bridging the gap between talent and opportunity through mentorship, resources, and growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/join" className="px-8 py-4 bg-white text-primary font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2">
                Start Your Journey <ArrowRight size={20}/>
              </Link>
              <Link href="/about" className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition flex items-center justify-center">
                Explore Programs
              </Link>
            </div>
            
            <div className="pt-8 flex items-center gap-8 border-t border-white/10 text-white/80">
              <div><p className="text-3xl font-bold text-white">7k+</p><p className="text-xs uppercase tracking-wide">Active Members</p></div>
              <div><p className="text-3xl font-bold text-white">60k+</p><p className="text-xs uppercase tracking-wide">Applications Supported</p></div>
              <div><p className="text-3xl font-bold text-white">98%</p><p className="text-xs uppercase tracking-wide">Career Growth Rate</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUSTED BY SECTION */}
      <section className="py-10 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">Trusted by HR Professionals form Top Companies</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
               {['Access Bank', 'Dangote', 'MTN', 'First Bank', 'Airtel', 'Guinness'].map((brand, i) => (
                  <span key={i} className="text-xl font-bold text-slate-400">{brand}</span>
               ))}
            </div>
         </div>
      </section>

      {/* 3. VALUE PROPOSITION (Restored) */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-6">Everything You Need to Succeed in HR</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">We provide the tools, network, and guidance to help you navigate the complexities of modern Human Resources.</p>
           </div>

           <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: <Users size={32}/>, title: "Mentorship", desc: "Get paired with industry veterans who can guide your career path." },
                { icon: <Briefcase size={32}/>, title: "Job Alerts", desc: "Access exclusive HR job openings delivered straight to you daily." },
                { icon: <BookOpen size={32}/>, title: "Resources", desc: "Download templates, policies, and guides to make your work easier." },
                { icon: <Calendar size={32}/>, title: "Events", desc: "Join webinars, workshops, and meetups with thought leaders." },
                { icon: <ShieldCheck size={32}/>, title: "Certification", desc: "Guidance and study groups for CIPM, HRCI, and SHRM exams." },
                { icon: <Zap size={32}/>, title: "Networking", desc: "Connect with peers to share challenges and solutions." }
              ].map((item, i) => (
                 <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition duration-300">
                    <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                       {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* 4. WHY JOIN SECTION (Restored) */}
      <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
               <Image 
                 src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800" 
                 alt="Community" 
                 fill 
                 className="object-cover"
               />
               <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"/>
            </div>
            <div className="space-y-8">
               <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white leading-tight">
                  Grow Faster Together.
               </h2>
               <p className="text-lg text-slate-600 dark:text-slate-400">
                  HR can be a lonely profession. We are changing that. By joining HR Mentorship, you are not just signing up for a newsletter; you are joining a family of professionals committed to your success.
               </p>
               <ul className="space-y-4">
                  {[
                    "Access to our private Telegram community (62k+ members)",
                    "Weekly expert-led learning sessions",
                    "Discounts on professional trainings",
                    "Peer-to-peer support system"
                  ].map((feat, i) => (
                     <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                        <CheckCircle2 className="text-primary shrink-0" size={20}/> {feat}
                     </li>
                  ))}
               </ul>
               <Link href="/join" className="inline-flex h-14 items-center px-8 bg-primary text-white font-bold rounded-full shadow-lg hover:bg-primary/90 transition">
                  Join the Movement
               </Link>
            </div>
         </div>
      </section>

      {/* 5. LATEST BLOGS (Restored) */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-4">Latest Insights</h2>
                <p className="text-slate-600 dark:text-slate-400">Fresh thinking from our editorial team.</p>
              </div>
              <Link href="/blog" className="text-primary font-bold hover:underline flex items-center gap-1">View All <ArrowRight size={16}/></Link>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8">
             {latestBlogs.map(blog => (
               <Link href={`/blog/${blog.id}`} key={blog.id} className="group bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm hover:shadow-xl transition border border-slate-100 dark:border-slate-800 flex flex-col h-full">
                 <div className="h-56 bg-slate-200 rounded-xl mb-6 relative overflow-hidden">
                    {blog.image ? <Image src={blog.image} alt={blog.title} fill className="object-cover group-hover:scale-105 transition duration-500"/> : null}
                 </div>
                 <p className="text-xs font-bold text-primary mb-2">{new Date(blog.createdAt).toLocaleDateString()}</p>
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary transition">{blog.title}</h3>
                 <p className="text-slate-500 line-clamp-3 mb-6 flex-1">{blog.excerpt}</p>
                 <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary flex items-center gap-1 mt-auto">Read Post <ArrowRight size={14}/></span>
               </Link>
             ))}
           </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION (Restored) */}
      <section className="py-24 bg-primary relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">Ready to Transform Your Career?</h2>
            <p className="text-xl text-white/90 mb-10">Join the thousands of HR professionals who have found their path, their people, and their potential with us.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <Link href="/join" className="px-10 py-5 bg-white text-primary font-bold text-lg rounded-full shadow-2xl hover:scale-105 transition-transform">
                  Become a Member
               </Link>
               <Link href="/contact" className="px-10 py-5 bg-transparent border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white/10 transition">
                  Contact Support
               </Link>
            </div>
         </div>
      </section>

    </div>
  );
}
