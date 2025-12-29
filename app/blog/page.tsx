import { prisma } from '@/lib/prisma';
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ExternalLink, Calendar, User } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const pageSize = 6;
  const skip = (page - 1) * pageSize;

  // 1. Fetch Real Posts with Pagination
  const [posts, totalCount] = await Promise.all([
    prisma.blog.findMany({
      take: pageSize,
      skip: skip,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.blog.count()
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
       
       {/* 1. HERO SECTION WITH IMAGE */}
       <section className="relative pt-48 pb-32 px-6 flex items-center justify-center min-h-[50vh]">
         {/* Background Image */}
         <div className="absolute inset-0 z-0">
           <Image 
             src="https://images.unsplash.com/photo-1499750310159-5b5f226932d7?auto=format&fit=crop&w=1200&q=80"
             alt="Blog Hero" 
             fill
             className="object-cover"
             priority
           />
           {/* Dark Overlay */}
           <div className="absolute inset-0 bg-black/60 dark:bg-black/70"></div>
         </div>

         <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
            <span className="inline-block py-1 px-4 rounded-full bg-primary/80 text-white font-bold text-sm mb-6 backdrop-blur-md">
              Insights & News
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              HR Mentorship Blog
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-8">
              Stay updated with the latest trends, success stories, and expert insights from our community.
            </p>
            
            <a href="https://t.me/+aZTvBGln2eY2OTI0" target="_blank" className="inline-flex items-center gap-2 px-8 py-3 bg-[#229ED9] text-white font-bold rounded-full hover:opacity-90 transition shadow-lg shadow-blue-400/20">
               <ExternalLink size={18} /> Join our Telegram Channel
            </a>
         </div>
       </section>

       {/* 2. BLOG GRID */}
       <div className="max-w-7xl mx-auto px-6 py-24">
         {posts.length === 0 ? (
            <div className="text-center py-20 text-slate-500 text-xl">No blog posts found. Check back soon!</div>
         ) : (
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-xl transition group flex flex-col h-full">
                   <div className="h-56 bg-slate-200 dark:bg-slate-800 relative overflow-hidden">
                      {post.image ? (
                        <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition duration-700" />
                      ) : (
                        <div className="absolute inset-0 bg-primary/5 flex items-center justify-center text-primary/20 font-bold text-2xl">HRM</div>
                      )}
                   </div>
                   <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                        <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(post.createdAt).toLocaleDateString()}</span>
                        <span className="text-primary">{post.author}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-primary transition leading-tight line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <span className="text-sm font-bold text-primary flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                        Read Article <ArrowRight size={16}/>
                      </span>
                   </div>
                </Link>
              ))}
           </div>
         )}

         {/* 3. PAGINATION */}
         {totalPages > 1 && (
           <div className="flex justify-between items-center border-t border-slate-200 dark:border-slate-800 pt-8 max-w-4xl mx-auto">
              <Link 
                href={page > 1 ? `/blog?page=${page - 1}` : '#'}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-200 dark:border-slate-800 font-bold text-slate-600 dark:text-slate-300 transition ${page <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white dark:hover:bg-slate-900'}`}
              >
                 <ArrowLeft size={18} /> Previous
              </Link>
              
              <span className="text-sm font-bold text-slate-500">
                Page {page} of {totalPages}
              </span>

              <Link 
                href={page < totalPages ? `/blog?page=${page + 1}` : '#'}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-200 dark:border-slate-800 font-bold text-slate-600 dark:text-slate-300 transition ${page >= totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white dark:hover:bg-slate-900'}`}
              >
                 Next <ArrowRight size={18} />
              </Link>
           </div>
         )}
       </div>
    </div>
  );
}
EOFcat << 'EOF' > app/blog/page.tsx
import { prisma } from '@/lib/prisma';
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ExternalLink, Calendar, User } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const pageSize = 6;
  const skip = (page - 1) * pageSize;

  // 1. Fetch Real Posts with Pagination
  const [posts, totalCount] = await Promise.all([
    prisma.blog.findMany({
      take: pageSize,
      skip: skip,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.blog.count()
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
       
       {/* 1. HERO SECTION WITH IMAGE */}
       <section className="relative pt-48 pb-32 px-6 flex items-center justify-center min-h-[50vh]">
         {/* Background Image */}
         <div className="absolute inset-0 z-0">
           <Image 
             src="https://images.unsplash.com/photo-1499750310159-5b5f226932d7?auto=format&fit=crop&w=1200&q=80"
             alt="Blog Hero" 
             fill
             className="object-cover"
             priority
           />
           {/* Dark Overlay */}
           <div className="absolute inset-0 bg-black/60 dark:bg-black/70"></div>
         </div>

         <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
            <span className="inline-block py-1 px-4 rounded-full bg-primary/80 text-white font-bold text-sm mb-6 backdrop-blur-md">
              Insights & News
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              HR Mentorship Blog
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-8">
              Stay updated with the latest trends, success stories, and expert insights from our community.
            </p>
            
            <a href="https://t.me/+aZTvBGln2eY2OTI0" target="_blank" className="inline-flex items-center gap-2 px-8 py-3 bg-[#229ED9] text-white font-bold rounded-full hover:opacity-90 transition shadow-lg shadow-blue-400/20">
               <ExternalLink size={18} /> Join our Telegram Channel
            </a>
         </div>
       </section>

       {/* 2. BLOG GRID */}
       <div className="max-w-7xl mx-auto px-6 py-24">
         {posts.length === 0 ? (
            <div className="text-center py-20 text-slate-500 text-xl">No blog posts found. Check back soon!</div>
         ) : (
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-xl transition group flex flex-col h-full">
                   <div className="h-56 bg-slate-200 dark:bg-slate-800 relative overflow-hidden">
                      {post.image ? (
                        <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition duration-700" />
                      ) : (
                        <div className="absolute inset-0 bg-primary/5 flex items-center justify-center text-primary/20 font-bold text-2xl">HRM</div>
                      )}
                   </div>
                   <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                        <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(post.createdAt).toLocaleDateString()}</span>
                        <span className="text-primary">{post.author}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-primary transition leading-tight line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <span className="text-sm font-bold text-primary flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                        Read Article <ArrowRight size={16}/>
                      </span>
                   </div>
                </Link>
              ))}
           </div>
         )}

         {/* 3. PAGINATION */}
         {totalPages > 1 && (
           <div className="flex justify-between items-center border-t border-slate-200 dark:border-slate-800 pt-8 max-w-4xl mx-auto">
              <Link 
                href={page > 1 ? `/blog?page=${page - 1}` : '#'}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-200 dark:border-slate-800 font-bold text-slate-600 dark:text-slate-300 transition ${page <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white dark:hover:bg-slate-900'}`}
              >
                 <ArrowLeft size={18} /> Previous
              </Link>
              
              <span className="text-sm font-bold text-slate-500">
                Page {page} of {totalPages}
              </span>

              <Link 
                href={page < totalPages ? `/blog?page=${page + 1}` : '#'}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-200 dark:border-slate-800 font-bold text-slate-600 dark:text-slate-300 transition ${page >= totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white dark:hover:bg-slate-900'}`}
              >
                 Next <ArrowRight size={18} />
              </Link>
           </div>
         )}
       </div>
    </div>
  );
}
EOFcat << 'EOF' > app/blog/page.tsx
import { prisma } from '@/lib/prisma';
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ExternalLink, Calendar, User } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const pageSize = 6;
  const skip = (page - 1) * pageSize;

  // 1. Fetch Real Posts with Pagination
  const [posts, totalCount] = await Promise.all([
    prisma.blog.findMany({
      take: pageSize,
      skip: skip,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.blog.count()
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
       
       {/* 1. HERO SECTION WITH IMAGE */}
       <section className="relative pt-48 pb-32 px-6 flex items-center justify-center min-h-[50vh]">
         {/* Background Image */}
         <div className="absolute inset-0 z-0">
           <Image 
             src="https://images.unsplash.com/photo-1499750310159-5b5f226932d7?auto=format&fit=crop&w=1200&q=80"
             alt="Blog Hero" 
             fill
             className="object-cover"
             priority
           />
           {/* Dark Overlay */}
           <div className="absolute inset-0 bg-black/60 dark:bg-black/70"></div>
         </div>

         <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
            <span className="inline-block py-1 px-4 rounded-full bg-primary/80 text-white font-bold text-sm mb-6 backdrop-blur-md">
              Insights & News
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              HR Mentorship Blog
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-8">
              Stay updated with the latest trends, success stories, and expert insights from our community.
            </p>
            
            <a href="https://t.me/+aZTvBGln2eY2OTI0" target="_blank" className="inline-flex items-center gap-2 px-8 py-3 bg-[#229ED9] text-white font-bold rounded-full hover:opacity-90 transition shadow-lg shadow-blue-400/20">
               <ExternalLink size={18} /> Join our Telegram Channel
            </a>
         </div>
       </section>

       {/* 2. BLOG GRID */}
       <div className="max-w-7xl mx-auto px-6 py-24">
         {posts.length === 0 ? (
            <div className="text-center py-20 text-slate-500 text-xl">No blog posts found. Check back soon!</div>
         ) : (
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-xl transition group flex flex-col h-full">
                   <div className="h-56 bg-slate-200 dark:bg-slate-800 relative overflow-hidden">
                      {post.image ? (
                        <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition duration-700" />
                      ) : (
                        <div className="absolute inset-0 bg-primary/5 flex items-center justify-center text-primary/20 font-bold text-2xl">HRM</div>
                      )}
                   </div>
                   <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                        <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(post.createdAt).toLocaleDateString()}</span>
                        <span className="text-primary">{post.author}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-primary transition leading-tight line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <span className="text-sm font-bold text-primary flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                        Read Article <ArrowRight size={16}/>
                      </span>
                   </div>
                </Link>
              ))}
           </div>
         )}

         {/* 3. PAGINATION */}
         {totalPages > 1 && (
           <div className="flex justify-between items-center border-t border-slate-200 dark:border-slate-800 pt-8 max-w-4xl mx-auto">
              <Link 
                href={page > 1 ? `/blog?page=${page - 1}` : '#'}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-200 dark:border-slate-800 font-bold text-slate-600 dark:text-slate-300 transition ${page <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white dark:hover:bg-slate-900'}`}
              >
                 <ArrowLeft size={18} /> Previous
              </Link>
              
              <span className="text-sm font-bold text-slate-500">
                Page {page} of {totalPages}
              </span>

              <Link 
                href={page < totalPages ? `/blog?page=${page + 1}` : '#'}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-200 dark:border-slate-800 font-bold text-slate-600 dark:text-slate-300 transition ${page >= totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white dark:hover:bg-slate-900'}`}
              >
                 Next <ArrowRight size={18} />
              </Link>
           </div>
         )}
       </div>
    </div>
  );
}
