"use client";

import { useState, useEffect } from "react";
import { Trash2, Edit, Plus, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('blogs');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

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

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    try {
      let endpoint = '';
      if (activeTab === 'blogs') endpoint = `/api/blogs/${id}`;
      if (activeTab === 'gallery') endpoint = `/api/gallery?id=${id}`;

      const res = await fetch(endpoint, { method: 'DELETE' });
      if (res.ok) fetchData();
      else alert("Failed to delete");
    } catch (e) { alert("Error deleting"); }
  };

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
        fetchData();
        alert(editItem ? "Updated!" : "Created!");
      } else {
        alert("Operation failed");
      }
    } catch (err) { alert("Error saving data"); }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
           <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
           <Link href="/" className="text-sm font-bold text-primary hover:underline">View Live Site</Link>
        </div>

        <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 mb-8">
           {['blogs', 'gallery'].map(tab => (
             <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-4 px-4 font-bold capitalize ${activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-slate-500'}`}>
               Manage {tab}
             </button>
           ))}
        </div>

        <div className="flex justify-between items-center mb-6">
           <h2 className="text-xl font-bold capitalize">{activeTab} List</h2>
           <button onClick={() => { setEditItem(null); setIsEditing(true); }} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-bold hover:opacity-90">
             <Plus size={18} /> Add New
           </button>
        </div>

        {loading ? <div className="text-center py-10"><RefreshCw className="animate-spin mx-auto"/></div> : (
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
             {items.length === 0 ? <div className="p-8 text-center text-slate-500">No items found.</div> : (
                <table className="w-full text-left">
                   <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                      <tr>
                         <th className="p-4 font-bold">ID</th>
                         <th className="p-4 font-bold">Title</th>
                         <th className="p-4 font-bold text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody>
                      {items.map((item) => (
                         <tr key={item.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="p-4 text-slate-500">{item.id}</td>
                            <td className="p-4 font-medium">{item.title}</td>
                            <td className="p-4 flex justify-end gap-3">
                               {activeTab === 'blogs' && <button onClick={() => { setEditItem(item); setIsEditing(true); }} className="text-blue-500"><Edit size={18}/></button>}
                               <button onClick={() => handleDelete(item.id)} className="text-red-500"><Trash2 size={18}/></button>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             )}
          </div>
        )}

        {isEditing && (
           <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
              <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                 <h3 className="text-2xl font-bold mb-6">{editItem ? 'Edit Item' : 'Create New'}</h3>
                 <form onSubmit={handleSubmit} className="space-y-6">
                    {activeTab === 'blogs' && (
                       <>
                          <input name="title" defaultValue={editItem?.title} placeholder="Title" required className="w-full p-3 rounded border bg-transparent" />
                          <input name="author" defaultValue={editItem?.author || "Admin"} placeholder="Author" required className="w-full p-3 rounded border bg-transparent" />
                          <textarea name="excerpt" defaultValue={editItem?.excerpt} placeholder="Excerpt" required className="w-full p-3 rounded border bg-transparent" />
                          <textarea name="content" defaultValue={editItem?.content} placeholder="Content" required rows={5} className="w-full p-3 rounded border bg-transparent" />
                          <input name="image" defaultValue={editItem?.image} placeholder="Image URL" className="w-full p-3 rounded border bg-transparent" />
                       </>
                    )}
                    {activeTab === 'gallery' && (
                       <>
                          <input name="title" placeholder="Title/Caption" required className="w-full p-3 rounded border bg-transparent" />
                          <input name="category" placeholder="Category" required className="w-full p-3 rounded border bg-transparent" />
                          <input name="imageUrl" placeholder="Image URL" required className="w-full p-3 rounded border bg-transparent" />
                       </>
                    )}
                    <div className="flex justify-end gap-4 pt-4">
                       <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 rounded text-slate-500">Cancel</button>
                       <button type="submit" className="px-6 py-3 rounded bg-primary text-white font-bold">Save</button>
                    </div>
                 </form>
              </div>
           </div>
        )}
      </div>
    </div>
  );
}
