import { prisma } from '@/lib/prisma';

// Server Component: Fetch directly from DB
async function getBlogs() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return blogs;
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-8">HR Insights & Blog</h1>
      <div className="grid gap-6">
        {blogs.length === 0 ? (
          <p className="text-gray-500">No blogs posted yet.</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog.id} className="border p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
              <p className="text-sm text-gray-500 mb-4">By {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}</p>
              <p className="text-gray-700">{blog.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
