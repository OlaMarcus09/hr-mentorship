import { prisma } from '@/lib/prisma';
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  // 1. FETCH REAL POSTS FROM DB
  const posts = await prisma.blog.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20 px-6">
       
       {/* HERO */}
       <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-6">HR Insights & Community News</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            Stay updated with the latest trends, success stories, and announcements from the HR Mentorship team.
          </p>
          
          <a href="https://t.me/hrmentorship" target="_blank" className="inline-flex items-center gap-2 px-8 py-3 bg-[#229ED9] text-white font-bold rounded-full hover:opacity-90 transition shadow-lg shadow-blue-400/20">
             <ExternalLink size={18} /> Join our Telegram Channel
          </a>
       </div>

       {/* BLOG GRID (Real Data) */}
       {posts.length === 0 ? (
          <div className="text-center py-20 text-slate-500">No blog posts found. Check back soon!</div>
       ) : (
         <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-xl transition group block h-full flex flex-col">
                 <div className="h-48 bg-slate-200 dark:bg-slate-800 relative overflow-hidden">
                    {post.image ? (
                      <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition duration-500" />
                    ) : (
                      <div className="absolute inset-0 bg-primary/5 flex items-center justify-center text-primary/20 font-bold text-2xl">HRM</div>
                    )}
                 </div>
                 <div className="p-6 flex flex-col flex-1">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2">{post.author}</span>
                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-primary transition leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 mb-4 flex-1">
                      {post.excerpt}
                    </p>
                    <span className="text-sm font-bold text-slate-900 dark:text-white underline mt-auto">Read More</span>
                 </div>
              </Link>
            ))}
         </div>
       )}
    </div>
  );
}
