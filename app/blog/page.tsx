import { prisma } from '@/lib/prisma';
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function BlogPage(props: { searchParams: Promise<{ page?: string }> }) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || '1');
  const pageSize = 6;
  
  const blogs = await prisma.blog.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { createdAt: 'desc' }
  });

  const totalBlogs = await prisma.blog.count();
  const totalPages = Math.ceil(totalBlogs / pageSize);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
       {/* HERO */}
       <section className="relative pt-48 pb-20 px-6 bg-primary">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1499750310159-5254f4cc1555?auto=format&fit=crop&w=1200')] bg-cover bg-center opacity-10"></div>
         <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">Our Blog</h1>
            <p className="text-xl text-white/90">Insights from the HR Community.</p>
         </div>
       </section>

       <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
             {blogs.map((blog) => (
                <Link href={`/blog/${blog.id}`} key={blog.id} className="group bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-xl transition">
                   <div className="relative h-56">
                      <Image src={blog.image || "https://via.placeholder.com/800x600"} alt={blog.title} fill className="object-cover group-hover:scale-105 transition duration-500"/>
                   </div>
                   <div className="p-6">
                      <div className="flex gap-4 text-xs font-bold text-slate-400 mb-3">
                         <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                         <span>{blog.author}</span>
                      </div>
                      <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition">{blog.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3">{blog.excerpt}</p>
                   </div>
                </Link>
             ))}
          </div>

          {/* PAGINATION BUTTONS */}
          <div className="flex justify-center gap-4">
             {page > 1 && (
               <Link href={`/blog?page=${page - 1}`} className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold transition">
                 <ChevronLeft size={16}/> Previous
               </Link>
             )}
             {page < totalPages && (
               <Link href={`/blog?page=${page + 1}`} className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold transition">
                 Next <ChevronRight size={16}/>
               </Link>
             )}
          </div>
       </div>
    </div>
  );
}
