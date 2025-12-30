import { prisma } from '@/lib/prisma';
import Image from "next/image";
import Link from "next/link";
import { Calendar, User } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const blogs = await prisma.blog.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
       {/* HERO SECTION */}
       <section className="relative pt-48 pb-20 px-6 bg-primary">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1499750310159-5254f4cc1555?auto=format&fit=crop&w=1200')] bg-cover bg-center opacity-10"></div>
         <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">Our Blog</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
               Insights, news, and stories from the HR Mentorship Community.
            </p>
         </div>
       </section>

       <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {blogs.map((blog) => (
                <Link href={`/blog/${blog.id}`} key={blog.id} className="group bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-xl transition">
                   <div className="relative h-64 overflow-hidden">
                      <Image 
                        src={blog.image || "https://via.placeholder.com/800x600"} 
                        alt={blog.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition duration-500"
                      />
                   </div>
                   <div className="p-8">
                      <div className="flex gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                         <span className="flex items-center gap-1"><Calendar size={14}/> {new Date(blog.createdAt).toLocaleDateString()}</span>
                         <span className="flex items-center gap-1"><User size={14}/> {blog.author}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-primary transition">{blog.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 line-clamp-3">{blog.excerpt}</p>
                   </div>
                </Link>
             ))}
          </div>
       </div>
    </div>
  );
}
