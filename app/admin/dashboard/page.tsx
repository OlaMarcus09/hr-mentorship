"use client";

import { useState, useEffect } from "react";
import { Trash2, Edit, Plus, RefreshCw, LogOut } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('blogs');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Edit/Create State
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState<any>(null); // If null, it's a "Create" action

  // Fetch Data based on active tab
  const fetchData = async () => {
    setLoading(true);
    try {
      let endpoint = '';
      if (activeTab === 'blogs') endpoint = '/api/blogs';
      if (activeTab === 'gallery') endpoint = '/api/gallery';
      
      const res = await fetch(endpoint);
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  // Handle Delete
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    
    try {
      let endpoint = '';
      if (activeTab === 'blogs') endpoint = `/api/blogs/${id}`;
      if (activeTab === 'gallery') endpoint = `/api/gallery?id=${id}`;

      const res = await fetch(endpoint, { method: 'DELETE' });
      if (res.ok) {
        fetchData(); // Refresh list
      } else {
        alert("Failed to delete");
      }
    } catch (e) {
      alert("Error deleting");
    }
  };

  // Handle Submit (Create or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    try {
      let url = '';
      let method = '';

      if (activeTab === 'blogs') {
        url = editItem ? `/api/blogs/${editItem.id}` : '/api/blogs';
        method = editItem ? 'PATCH' : 'POST';
      } else if (activeTab === 'gallery') {
        url = '/api/gallery'; 
        method = 'POST';
      }

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setIsEditing(false);
        setEditItem(null);
        fetchData(); // Refresh data immediately
        alert(editItem ? "Updated successfully!" : "Created successfully!");
      } else {
        alert("Operation failed");
      }
    } catch (err) {
      alert("Error saving data");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
           <div>
             <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
             <p className="text-slate-500">Manage your website content</p>
           </div>
           <div className="flex gap-4">
             <Link href="/" className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-lg font-bold text-sm hover:bg-slate-300 transition">View Live Site</Link>
           </div>
        </div>

        {/* TABS */}
        <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto">
           <button 
             onClick={() => setActiveTab('blogs')} 
             className={`pb-4 px-4 font-bold transition whitespace-nowrap ${activeTab === 'blogs' ? 'text-primary border-b-2 border-primary' : 'text-slate-500'}`}
           >
             Manage Blogs
           </button>
           <button 
             onClick={() => setActiveTab('gallery')} 
             className={`pb-4 px-4 font-bold transition whitespace-nowrap ${activeTab === 'gallery' ? 'text-primary border-b-2 border-primary' : 'text-slate-500'}`}
           >
             Manage Gallery
           </button>
        </div>

        {/* ACTION BAR */}
        <div className="flex justify-between items-center mb-6">
           <h2 className="text-xl font-bold capitalize">{activeTab} Content</h2>
           <button 
             onClick={() => { setEditItem(null); setIsEditing(true); }}
             className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-bold hover:opacity-90 shadow-lg shadow-primary/20"
           >
             <Plus size={18} /> Add New
           </button>
        </div>

        {/* LOADING STATE */}
        {loading && <div className="text-center py-10"><RefreshCw className="animate-spin mx-auto text-slate-400"/></div>}

        {/* LIST VIEW */}
        {!loading && (
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
             {items.length === 0 ? (
                <div className="p-12 text-center text-slate-500">No items found. Create your first one!</div>
             ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                        <tr>
                           <th className="p-4 font-bold text-slate-600 dark:text-slate-300 w-16">ID</th>
                           <th className="p-4 font-bold text-slate-600 dark:text-slate-300">Title / Name</th>
                           <th className="p-4 font-bold text-slate-600 dark:text-slate-300 text-right w-32">Actions</th>
                        </tr>
                     </thead>
                     <tbody>
                        {items.map((item) => (
                           <tr key={item.id} className="border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                              <td className="p-4 text-slate-500 font-mono text-sm">{item.id}</td>
                              <td className="p-4 font-medium text-slate-900 dark:text-white">
                                 {activeTab === 'blogs' ? item.title : item.title || "Gallery Image"}
                              </td>
                              <td className="p-4 flex justify-end gap-2">
                                 {activeTab === 'blogs' && (
                                   <button 
                                     onClick={() => { setEditItem(item); setIsEditing(true); }}
                                     className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
                                     title="Edit"
                                   >
                                     <Edit size={18}/>
                                   </button>
                                 )}
                                 <button 
                                   onClick={() => handleDelete(item.id)}
                                   className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                                   title="Delete"
                                 >
                                   <Trash2 size={18}/>
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
                </div>
             )}
          </div>
        )}

        {/* EDIT/CREATE MODAL */}
        {isEditing && (
           <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
              <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto border border-slate-100 dark:border-slate-800">
                 <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {editItem ? `Edit ${activeTab === 'blogs' ? 'Blog' : 'Item'}` : `Create New ${activeTab === 'blogs' ? 'Blog' : 'Item'}`}
                    </h3>
                    <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
                      <RefreshCw className="rotate-45" size={24}/>
                    </button>
                 </div>

                 <form onSubmit={handleSubmit} className="space-y-6">
                    {/* BLOG FORM */}
                    {activeTab === 'blogs' && (
                       <>
                          <div>
                             <label className="block text-sm font-bold mb-2">Title</label>
                             <input name="title" defaultValue={editItem?.title} required className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none" />
                          </div>
                          <div>
                             <label className="block text-sm font-bold mb-2">Author</label>
                             <input name="author" defaultValue={editItem?.author || "Admin"} required className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none" />
                          </div>
                          <div>
                             <label className="block text-sm font-bold mb-2">Excerpt (Short Summary)</label>
                             <textarea name="excerpt" defaultValue={editItem?.excerpt} required rows={2} className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none" />
                          </div>
                          <div>
                             <label className="block text-sm font-bold mb-2">Content (Full Text)</label>
                             <textarea name="content" defaultValue={editItem?.content} required rows={6} className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none" />
                          </div>
                          <div>
                             <label className="block text-sm font-bold mb-2">Image URL</label>
                             <input name="image" defaultValue={editItem?.image} placeholder="https://..." className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none" />
                          </div>
                       </>
                    )}

                    {/* GALLERY FORM */}
                    {activeTab === 'gallery' && (
                       <>
                          <div>
                             <label className="block text-sm font-bold mb-2">Title / Caption</label>
                             <input name="title" required className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none" />
                          </div>
                          <div>
                             <label className="block text-sm font-bold mb-2">Category (Event, Workshop, etc)</label>
                             <input name="category" required className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none" />
                          </div>
                          <div>
                             <label className="block text-sm font-bold mb-2">Image URL</label>
                             <input name="imageUrl" required placeholder="https://..." className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none" />
                          </div>
                       </>
                    )}

                    <div className="flex justify-end gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                       <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 rounded-lg font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition">Cancel</button>
                       <button type="submit" className="px-6 py-3 rounded-lg font-bold bg-primary text-white hover:opacity-90 transition shadow-lg shadow-primary/20">
                         {editItem ? "Update Changes" : "Create New"}
                       </button>
                    </div>
                 </form>
              </div>
           </div>
        )}

      </div>
    </div>
  );
}
