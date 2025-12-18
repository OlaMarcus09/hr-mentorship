import Link from 'next/link';

// This is a Server Component. It fetches data BEFORE the page loads.
async function getBlogs() {
  // fetching from your own internal API
  const res = await fetch('http://localhost:3000/api/blogs', {
    cache: 'no-store' // Ensures we see new blogs instantly
  });
  if (!res.ok) return [];
  return res.json();
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
          blogs.map((blog: any) => (
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
