"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const formData = {
      title: e.target.title.value,
      author: e.target.author.value,
      content: e.target.content.value,
    };

    const res = await fetch("/api/blogs", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      alert("Blog Published!");
      router.push("/blog"); // Redirect to public blog page
    } else {
      alert("Failed to publish");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Write New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4 border p-6 rounded-lg bg-white shadow">
        
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input name="title" required className="w-full border p-2 rounded" placeholder="Blog Headline" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Author</label>
          <input name="author" required className="w-full border p-2 rounded" placeholder="Your Name" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea name="content" required rows={6} className="w-full border p-2 rounded" placeholder="Write your article here..." />
        </div>

        <button 
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Publishing..." : "Publish Blog"}
        </button>
      </form>
    </div>
  );
}
