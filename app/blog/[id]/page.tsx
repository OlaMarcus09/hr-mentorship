import { prisma } from '@/lib/prisma';
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function SingleBlogPage({ params }: { params: { id: string } }) {
  const blogId = parseInt(params.id);
  if (isNaN(blogId)) notFound();

  const blog = await prisma.blog.findUnique({
    where: { id: blogId }
  });

  if (!blog) notFound();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-20 px-6">
      <article className="max-w-3xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-8 transition">
          <ArrowLeft size={18} /> Back to Blog
        </Link>
        
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white leading-tight">{blog.title}</h1>
        
        <div className="flex items-center gap-6 text-slate-500 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
           <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                 {blog.author.charAt(0)}
              </div>
              <span className="font-medium">{blog.author}</span>
           </div>
           <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
           </div>
        </div>

        {blog.image && (
          <div className="rounded-2xl overflow-hidden mb-10 shadow-lg">
             <img src={blog.image} className="w-full h-auto" alt={blog.title} />
          </div>
        )}

        <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
           {blog.content}
        </div>
      </article>
    </div>
  );
}
