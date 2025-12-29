"use client";

import { useState, useEffect, useRef } from "react";
import { 
  LayoutDashboard, FileText, Briefcase, Calendar, Image as ImageIcon, 
  Users, UserCheck, Settings, Plus, Trash2, Edit, RefreshCw, 
  ChevronLeft, ChevronRight, X, Upload, Mail, ShieldAlert
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState('blogs');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // CRUD State
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- CONFIGURATION ---
  const menuGroups = [
    {
      title: "Content",
      items: [
        { id: 'blogs', label: 'Blogs', icon: <FileText size={18}/> },
        { id: 'jobs', label: 'Jobs', icon: <Briefcase size={18}/> },
        { id: 'events', label: 'Events', icon: <Calendar size={18}/> },
        { id: 'resources', label: 'Resources', icon: <LayoutDashboard size={18}/> },
        { id: 'gallery', label: 'Gallery', icon: <ImageIcon size={18}/> },
      ]
    },
    {
      title: "People",
      items: [
        { id: 'team', label: 'Website Team', icon: <Users size={18}/> }, // Frontend Team
        { id: 'mentors', label: 'Mentor Applicants', icon: <UserCheck size={18}/> },
        { id: 'mentees', label: 'Mentee Applicants', icon: <Users size={18}/> },
        { id: 'messages', label: 'Messages', icon: <Mail size={18}/> },
      ]
    },
    {
      title: "System",
      items: [
        { id: 'admins', label: 'Manage Admins', icon: <ShieldAlert size={18}/> }, // NEW: Dashboard Admins
        { id: 'settings', label: 'Settings', icon: <Settings size={18}/> },
      ]
    }
  ];

  // --- IMAGE UPLOAD HELPER (FIXED) ---
  const uploadImage = async (file: File): Promise<string> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!cloudName) {
      alert("Configuration Error: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is missing in .env file");
      throw new Error("Missing Cloud Name");
    }

    const formData = new FormData();
    formData.append('file', file);
    // IMPORTANT: Make sure this "upload preset" exists in your Cloudinary Settings -> Upload
    formData.append('upload_preset', 'ml_default'); 

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("Cloudinary Error:", err);
        throw new Error(err.error?.message || 'Failed to upload image');
      }

      const data = await res.json();
      return data.secure_url;
    } catch (error) {
      console.error("Upload error details:", error);
      throw error;
    }
  };

  // --- DATA FETCHING ---
  const fetchData = async () => {
    setLoading(true);
    setItems([]); 
    try {
      let endpoint = `/api/${activeTab}`;
      
      if (activeTab === 'mentors') endpoint = `/api/applicants?role=mentor`;
      if (activeTab === 'mentees') endpoint = `/api/applicants?role=mentee`;
      if (activeTab === 'admins') endpoint = `/api/admins`;
      if (activeTab === 'settings') { setLoading(false); return; }

      const res = await fetch(endpoint);
      if (!res.ok) throw new Error("Failed to fetch");
      
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
      setCurrentPage(1);
    } catch (error) {
      console.error(error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  // --- HANDLERS ---
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this?")) return;
    try {
      let endpoint = `/api/${activeTab}/${id}`;
      if (activeTab === 'gallery') endpoint = `/api/gallery?id=${id}`;
      if (activeTab === 'mentors' || activeTab === 'mentees') endpoint = `/api/applicants/${id}`;
      if (activeTab === 'messages') endpoint = `/api/messages?id=${id}`;
      if (activeTab === 'admins') endpoint = `/api/admins?id=${id}`;

      const res = await fetch(endpoint, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
        alert("Deleted successfully");
      } else {
        const err = await res.json();
        alert(err.error || "Failed to delete");
      }
    } catch (e) { alert("Error deleting"); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const data: any = Object.fromEntries(formData.entries());

    try {
      let url = '';
      let method = '';
      
      let endpointBase = activeTab;
      if (activeTab === 'mentors' || activeTab === 'mentees') endpointBase = 'applicants';
      
      if (activeTab === 'gallery') {
         url = '/api/gallery'; method = 'POST'; 
      } else if (activeTab === 'admins') {
         url = '/api/admins'; method = 'POST'; // Admins only allow creation here for safety
      } else {
         url = editItem ? `/api/${endpointBase}/${editItem.id}` : `/api/${endpointBase}`;
         method = editItem ? 'PATCH' : 'POST';
      }

      // Handle image upload
      if ((activeTab === 'blogs' || activeTab === 'team' || activeTab === 'events' || activeTab === 'gallery') && fileInputRef.current?.files?.[0]) {
        try {
          const imageUrl = await uploadImage(fileInputRef.current.files[0]);
          if (activeTab === 'blogs') data.image = imageUrl;
          if (activeTab === 'team') data.image = imageUrl;
          if (activeTab === 'events') data.image = imageUrl;
          if (activeTab === 'gallery') data.imageUrl = imageUrl;
        } catch (uploadError) {
          alert("Image Upload Failed. Check console for details.");
          setIsUploading(false);
          return;
        }
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
        alert("Saved successfully!");
      } else {
        const errorData = await res.json();
        alert(`Failed: ${errorData.error || "Unknown error"}`);
      }
    } catch (err) { 
      console.error(err);
      alert("Error submitting form. See console."); 
    } finally { 
      setIsUploading(false); 
    }
  };

  // --- PAGINATION CALCS ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex pt-20">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 fixed h-full overflow-y-auto hidden md:block z-10">
        <div className="p-6">
           <h2 className="font-heading font-bold text-xl text-primary mb-1">Admin Panel</h2>
           <p className="text-xs text-slate-500 dark:text-slate-400">Manage Content</p>
        </div>
        
        <nav className="px-4 space-y-8">
           {menuGroups.map((group) => (
             <div key={group.title}>
                <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 px-2">{group.title}</h3>
                <div className="space-y-1">
                   {group.items.map((item) => (
                     <button
                       key={item.id}
                       onClick={() => setActiveTab(item.id)}
                       className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${activeTab === item.id ? 'bg-primary/10 text-primary dark:bg-primary/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                     >
                       {item.icon} {item.label}
                     </button>
                   ))}
                </div>
             </div>
           ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 md:ml-64 p-8">
        
        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-8">
           <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white capitalize">
                {activeTab === 'mentors' ? 'Mentor Applicants' : activeTab === 'mentees' ? 'Mentee Applicants' : activeTab === 'messages' ? 'Inbox Messages' : activeTab === 'admins' ? 'Dashboard Admins' : `Manage ${activeTab}`}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                 {activeTab === 'admins' ? 'Create users who can login to this dashboard.' : 'Add, Edit, or Remove entries.'}
              </p>
           </div>
           
           <div className="flex gap-3">
             <Link href="/" target="_blank" className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition text-slate-700 dark:text-slate-300">
               View Live Site
             </Link>
             
             {activeTab !== 'settings' && activeTab !== 'mentors' && activeTab !== 'mentees' && activeTab !== 'messages' && (
               <button 
                 onClick={() => { setEditItem(null); setIsEditing(true); }}
                 className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 shadow-lg shadow-primary/20 transition"
               >
                 <Plus size={16} /> Add New
               </button>
             )}
           </div>
        </div>

        {/* CONTENT AREA */}
        {loading ? (
           <div className="h-64 flex items-center justify-center text-slate-400 dark:text-slate-500"><RefreshCw className="animate-spin"/></div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
             
             {/* DATA TABLE */}
             {items.length === 0 ? (
                <div className="p-12 text-center text-slate-500 dark:text-slate-400">
                  {activeTab === 'settings' ? 'Settings coming soon.' : `No ${activeTab} found.`}
                </div>
             ) : (
               <div className="overflow-x-auto">
                 <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                       <tr>
                          <th className="p-4 font-bold text-slate-500 dark:text-slate-400 w-16">ID</th>
                          <th className="p-4 font-bold text-slate-900 dark:text-white">Primary Info</th>
                          <th className="p-4 font-bold text-slate-900 dark:text-white">Details</th>
                          <th className="p-4 font-bold text-right text-slate-900 dark:text-white w-32">Actions</th>
                       </tr>
                    </thead>
                    <tbody>
                       {currentItems.map((item) => (
                         <tr key={item.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                            <td className="p-4 text-slate-500 dark:text-slate-400 font-mono text-xs">#{item.id}</td>
                            
                            <td className="p-4 font-bold text-slate-900 dark:text-white">
                               {activeTab === 'messages' ? item.subject || "No Subject" : (item.title || item.name || "Untitled")}
                            </td>
                            
                            <td className="p-4 text-slate-600 dark:text-slate-400">
                               {activeTab === 'blogs' && <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">By {item.author}</span>}
                               {activeTab === 'jobs' && <span className="flex items-center gap-2">{item.company} • {item.location}</span>}
                               {activeTab === 'events' && <span>{new Date(item.date).toLocaleDateString()}</span>}
                               {activeTab === 'team' && item.role}
                               {activeTab === 'admins' && <span className="text-xs font-mono">{item.email}</span>}
                               {activeTab === 'resources' && <span className="text-xs uppercase font-bold">{item.type}</span>}
                               {(activeTab === 'mentors' || activeTab === 'mentees') && item.email}
                               {activeTab === 'messages' && (
                                  <div className="flex flex-col">
                                    <span className="font-bold text-xs">{item.name} ({item.email})</span>
                                    <span className="text-xs text-slate-500 mt-1 line-clamp-1">{item.message}</span>
                                  </div>
                               )}
                            </td>

                            <td className="p-4 flex justify-end gap-2">
                               {activeTab !== 'mentors' && activeTab !== 'mentees' && activeTab !== 'gallery' && activeTab !== 'messages' && activeTab !== 'admins' && (
                                 <button 
                                    onClick={() => { setEditItem(item); setIsEditing(true); }} 
                                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition"
                                 >
                                    <Edit size={16}/>
                                 </button>
                               )}
                               
                               <button 
                                 onClick={() => handleDelete(item.id)} 
                                 className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition"
                               >
                                 <Trash2 size={16}/>
                               </button>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
               </div>
             )}

             {/* PAGINATION */}
             {totalPages > 1 && (
               <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Page {currentPage} of {totalPages}</span>
                  <div className="flex gap-2">
                     <button 
                       disabled={currentPage === 1}
                       onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                       className="p-2 border rounded-md disabled:opacity-50 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition"
                     >
                       <ChevronLeft size={16}/>
                     </button>
                     <button 
                       disabled={currentPage === totalPages}
                       onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                       className="p-2 border rounded-md disabled:opacity-50 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition"
                     >
                       <ChevronRight size={16}/>
                     </button>
                  </div>
               </div>
             )}
          </div>
        )}

        {/* MODAL */}
        {isEditing && (
           <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
              <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800">
                 <div className="flex justify-between mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                       {editItem ? `Edit ${activeTab.slice(0, -1)}` : `Create New ${activeTab.slice(0, -1)}`}
                    </h3>
                    <button onClick={() => setIsEditing(false)} className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition"><X/></button>
                 </div>
                 
                 <form key={editItem ? editItem.id : 'new'} onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* BLOGS */}
                    {activeTab === 'blogs' && (
                       <>
                          <input name="title" defaultValue={editItem?.title} placeholder="Post Title" required className="admin-input" />
                          <input name="author" defaultValue={editItem?.author} placeholder="Author Name" required className="admin-input" />
                          <textarea name="excerpt" defaultValue={editItem?.excerpt} placeholder="Short Summary" required className="admin-input" rows={2}/>
                          <textarea name="content" defaultValue={editItem?.content} placeholder="Full Content" required className="admin-input" rows={6}/>
                          <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Cover Image</label>
                            <div className="flex items-center gap-4">
                              <label htmlFor="file-upload" className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                                <Upload size={18} /> Choose File
                              </label>
                              <input id="file-upload" type="file" ref={fileInputRef} className="hidden" accept="image/*" />
                              <span className="text-sm text-slate-500 dark:text-slate-400">Or paste URL below</span>
                            </div>
                            <input name="image" defaultValue={editItem?.image} placeholder="Image URL (optional)" className="admin-input" />
                          </div>
                       </>
                    )}

                    {/* ADMINS (NEW) */}
                    {activeTab === 'admins' && (
                       <>
                          <input name="name" placeholder="Admin Name" required className="admin-input" />
                          <input name="email" type="email" placeholder="Admin Email" required className="admin-input" />
                          <input name="password" type="password" placeholder="Password" required className="admin-input" />
                          <p className="text-xs text-red-500">Note: New admins will have full access to this dashboard.</p>
                       </>
                    )}

                    {/* JOBS */}
                    {activeTab === 'jobs' && (
                       <>
                          <input name="title" defaultValue={editItem?.title} placeholder="Job Title" required className="admin-input" />
                          <input name="company" defaultValue={editItem?.company} placeholder="Company" required className="admin-input" />
                          <input name="location" defaultValue={editItem?.location} placeholder="Location" required className="admin-input" />
                          <select name="type" defaultValue={editItem?.type || "Full Time"} className="admin-input">
                             <option>Full Time</option><option>Part Time</option><option>Contract</option>
                          </select>
                          <textarea name="description" defaultValue={editItem?.description} placeholder="Description" required className="admin-input" rows={4}/>
                          <input name="applyLink" defaultValue={editItem?.applyLink} placeholder="Application Link/Email" required className="admin-input" />
                       </>
                    )}

                    {/* TEAM (WEBSITE) */}
                    {activeTab === 'team' && (
                       <>
                          <input name="name" defaultValue={editItem?.name} placeholder="Full Name" required className="admin-input" />
                          <input name="role" defaultValue={editItem?.role} placeholder="Role" required className="admin-input" />
                          <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Profile Photo</label>
                            <div className="flex items-center gap-4">
                              <label htmlFor="file-upload" className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                                <Upload size={18} /> Choose File
                              </label>
                              <input id="file-upload" type="file" ref={fileInputRef} className="hidden" accept="image/*" />
                              <span className="text-sm text-slate-500 dark:text-slate-400">Or paste URL below</span>
                            </div>
                            <input name="image" defaultValue={editItem?.image} placeholder="Image URL (optional)" className="admin-input" />
                          </div>
                       </>
                    )}
                    
                    {/* RESOURCES */}
                    {activeTab === 'resources' && (
                       <>
                          <input name="title" defaultValue={editItem?.title} placeholder="Title" required className="admin-input" />
                          <select name="type" defaultValue={editItem?.type || "PDF"} className="admin-input"><option>PDF</option><option>Video</option><option>Link</option></select>
                          <input name="fileUrl" defaultValue={editItem?.fileUrl} placeholder="File URL" required className="admin-input" />
                       </>
                    )}

                    {/* EVENTS */}
                    {activeTab === 'events' && (
                       <>
                          <input name="title" defaultValue={editItem?.title} placeholder="Event Name" required className="admin-input" />
                          <input name="date" type="datetime-local" defaultValue={editItem?.date ? new Date(editItem.date).toISOString().slice(0, 16) : ''} required className="admin-input" />
                          <input name="location" defaultValue={editItem?.location} placeholder="Location" required className="admin-input" />
                          <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Event Banner</label>
                            <div className="flex items-center gap-4">
                              <label htmlFor="file-upload" className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                                <Upload size={18} /> Choose File
                              </label>
                              <input id="file-upload" type="file" ref={fileInputRef} className="hidden" accept="image/*" />
                              <span className="text-sm text-slate-500 dark:text-slate-400">Or paste URL below</span>
                            </div>
                            <input name="image" defaultValue={editItem?.image} placeholder="Image URL (optional)" className="admin-input" />
                          </div>
                       </>
                    )}
                    
                    {/* GALLERY */}
                    {activeTab === 'gallery' && (
                       <>
                          <input name="title" placeholder="Caption" required className="admin-input" />
                          <input name="category" placeholder="Category" required className="admin-input" />
                          <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Image</label>
                            <div className="flex items-center gap-4">
                              <label htmlFor="file-upload" className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                                <Upload size={18} /> Choose File
                              </label>
                              <input id="file-upload" type="file" ref={fileInputRef} className="hidden" accept="image/*" />
                              <span className="text-sm text-slate-500 dark:text-slate-400">Or paste URL below</span>
                            </div>
                            <input name="imageUrl" placeholder="Image URL (optional)" className="admin-input" />
                          </div>
                       </>
                    )}

                    <button disabled={isUploading} type="submit" className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition">
                       {isUploading && <RefreshCw className="animate-spin" size={18} />}
                       {editItem ? "Save Changes" : "Create New Item"}
                    </button>
                 </form>
              </div>
           </div>
        )}
      </main>
      <style jsx global>{`
        .admin-input { width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; background-color: #f8fafc; outline: none; color: #1e293b; transition: all 0.2s; }
        .dark .admin-input { border-color: #334155; background-color: #1e293b; color: #f1f5f9; }
        .admin-input:focus { border-color: #7c3aed; background-color: white; }
        .dark .admin-input:focus { border-color: #7c3aed; background-color: #0f172a; }
      `}</style>
    </div>
  );
}
