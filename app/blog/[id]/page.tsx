import { prisma } from '@/lib/prisma';
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { notFound } from "next/navigation";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function BlogPostPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = parseInt(params.id);

  if (isNaN(id)) return notFound();

  const post = await prisma.blog.findUnique({
    where: { id }
  });

  if (!post) return notFound();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-20 px-6">
      <article className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-8 transition font-bold">
          <ArrowLeft size={20} /> Back to Blog
        </Link>

        {/* Hero Image */}
        {post.image && (
          <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden mb-8 shadow-xl">
            <Image src={post.image} alt={post.title} fill className="object-cover" />
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
           <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
              <span className="flex items-center gap-1"><Calendar size={16}/> {new Date(post.createdAt).toLocaleDateString()}</span>
              <span className="flex items-center gap-1"><User size={16}/> {post.author}</span>
           </div>
           <h1 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white leading-tight">
             {post.title}
           </h1>
        </div>

        {/* Content */}
        <div className="prose dark:prose-invert max-w-none text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
           {/* Simple whitespace handling for paragraphs */}
           {post.content?.split('\n').map((paragraph, idx) => (
             <p key={idx} className="mb-4">{paragraph}</p>
           ))}
        </div>

      </article>
    </div>
  );
}
