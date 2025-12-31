import { prisma } from '@/lib/prisma';
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, BookOpen, Calendar, Briefcase, CheckCircle2 } from "lucide-react";

export const revalidate = 60;

export default async function Home() {
  const latestBlogs = await prisma.blog.findMany({ take: 3, orderBy: { createdAt: 'desc' } });
  
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      
      {/* HERO SECTION - Darker Overlay Fix */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=2000" 
            alt="HR Professionals" 
            fill 
            className="object-cover"
            priority
          />
          {/* Opacity increased from 90% to 95%/90% for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/95 via-purple-800/90 to-purple-900/40 mix-blend-multiply" />
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

      {/* TRUSTED SECTION */}
      <section className="py-20 bg-white dark:bg-slate-900">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-heading font-bold mb-16 text-slate-900 dark:text-white">Trusted by 7,000+ HR Professionals <br/> Across Nigeria and Beyond</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
               {['Access Bank', 'Dangote', 'MTN', 'First Bank'].map((brand, i) => (
                  <div key={i} className="flex items-center justify-center h-20 bg-slate-50 dark:bg-slate-800 rounded-xl font-bold text-xl text-slate-400">{brand}</div>
               ))}
            </div>
         </div>
      </section>

      {/* LATEST BLOGS */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-4">Latest Insights</h2>
                <p className="text-slate-600 dark:text-slate-400">Fresh thinking from our editorial team.</p>
              </div>
              <Link href="/blog" className="text-primary font-bold hover:underline">View All Articles</Link>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8">
             {latestBlogs.map(blog => (
               <Link href={`/blog/${blog.id}`} key={blog.id} className="group bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm hover:shadow-xl transition border border-slate-100 dark:border-slate-800">
                 <div className="h-48 bg-slate-200 rounded-xl mb-6 relative overflow-hidden">
                    {blog.image ? <Image src={blog.image} alt={blog.title} fill className="object-cover group-hover:scale-105 transition duration-500"/> : null}
                 </div>
                 <p className="text-xs font-bold text-primary mb-2">{new Date(blog.createdAt).toLocaleDateString()}</p>
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary transition">{blog.title}</h3>
                 <p className="text-slate-500 line-clamp-3 mb-4">{blog.excerpt}</p>
                 <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary flex items-center gap-1">Read Post <ArrowRight size={14}/></span>
               </Link>
             ))}
           </div>
        </div>
      </section>
    </div>
  );
}
