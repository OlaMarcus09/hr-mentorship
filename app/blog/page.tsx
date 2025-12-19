import { prisma } from '@/lib/prisma';
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";

export const dynamic = 'force-dynamic';

async function getBlogs(page = 1) {
  const limit = 6;
  const skip = (page - 1) * limit;
  const [blogs, total] = await prisma.$transaction([
    prisma.blog.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, excerpt: true, author: true, image: true, createdAt: true }
    }),
    prisma.blog.count()
  ]);
  
  return { blogs, total, pages: Math.ceil(total / limit) };
}

export default async function BlogIndexPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = parseInt(searchParams.page || '1');
  const { blogs, pages } = await getBlogs(page);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">HR Insights & Blog</h1>
          <p className="text-slate-500">Expert perspectives on the future of work.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link key={blog.id} href={`/blog/${blog.id}`} className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition border border-slate-100 dark:border-slate-800 flex flex-col h-full">
              <div className="h-48 overflow-hidden bg-slate-200">
                 {blog.image && <img src={blog.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                 <div className="flex gap-4 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1"><User size={12}/> {blog.author}</span>
                    <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(blog.createdAt).toLocaleDateString()}</span>
                 </div>
                 <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-primary transition">{blog.title}</h2>
                 <p className="text-slate-500 text-sm line-clamp-3 mb-6 flex-1">{blog.excerpt}</p>
                 <span className="text-primary font-bold text-sm flex items-center gap-2 mt-auto">Read Article <ArrowRight size={16}/></span>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center gap-2 mt-16">
           {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
             <Link 
               key={p} 
               href={`/blog?page=${p}`} 
               className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold transition ${p === page ? 'bg-primary text-white' : 'bg-white dark:bg-slate-900 text-slate-600 border hover:border-primary'}`}
             >
               {p}
             </Link>
           ))}
        </div>
      </div>
    </div>
  );
}
