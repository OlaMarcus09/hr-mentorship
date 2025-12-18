import { prisma } from '@/lib/prisma';
import Image from 'next/image'; // Next.js Image optimization

export const dynamic = 'force-dynamic';

async function getBlogs() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return blogs;
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold mb-10 text-center">HR Insights & Blog</h1>
      
      <div className="grid gap-8">
        {blogs.length === 0 ? (
          <p className="text-gray-500 text-center">No blogs posted yet.</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog.id} className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition bg-white">
              {/* IMAGE DISPLAY */}
              {blog.image && (
                <div className="relative h-64 w-full">
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-8">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <span className="font-medium text-black">{blog.author}</span>
                  <span>•</span>
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
                
                <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{blog.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
