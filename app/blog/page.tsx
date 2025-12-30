import { prisma } from '@/lib/prisma';
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Calendar, User } from "lucide-react";

export const revalidate = 60;

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
       <section className="relative pt-48 pb-20 px-6 bg-primary w-full overflow-hidden">
         <div className="absolute inset-0 z-0">
            <Image 
              src="https://res.cloudinary.com/dmqjicpcc/image/upload/v1767099366/hero_Image_ezg2ir.jpg"
              alt="Blog Hero"
              fill
              className="object-cover opacity-30"
              priority
            />
         </div>
         <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">Our Blog</h1>
            <p className="text-xl text-white/90">Latest News, Insights & Stories.</p>
         </div>
       </section>

       <div className="max-w-7xl mx-auto px-6 py-20">
          {blogs.length === 0 ? (
             <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-800">
                <p className="text-slate-500 font-bold">No blog posts found. Go to Admin to create one.</p>
             </div>
          ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {blogs.map((blog) => (
                   <Link href={`/blog/${blog.id}`} key={blog.id} className="group bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-xl transition flex flex-col h-full">
                      <div className="relative h-56 w-full bg-slate-200">
                         {blog.image ? (
                           <Image 
                             src={blog.image} 
                             alt={blog.title} 
                             fill 
                             className="object-cover group-hover:scale-105 transition duration-500"
                           />
                         ) : (
                           <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
                         )}
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                         <div className="flex gap-4 text-xs font-bold text-slate-400 mb-3">
                            <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(blog.createdAt).toLocaleDateString()}</span>
                            <span className="flex items-center gap-1"><User size={12}/> {blog.author}</span>
                         </div>
                         <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition line-clamp-2 text-slate-900 dark:text-white">{blog.title}</h3>
                         <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-4 flex-1">{blog.excerpt}</p>
                         <span className="text-primary font-bold text-sm mt-auto">Read More →</span>
                      </div>
                   </Link>
                ))}
             </div>
          )}

          {/* PAGINATION */}
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
