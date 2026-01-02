"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  LayoutDashboard, FileText, Briefcase, Calendar, Image as ImageIcon, 
  Users, UserCheck, Settings, Plus, Trash2, Edit, RefreshCw, 
  X, Upload, Mail, ShieldAlert, Eye, Lock, ChevronLeft, ChevronRight, Check, Ban, LogOut
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // 1. URL PERSISTENCE: Get active tab from URL or default to 'blogs'
  const activeTab = searchParams.get('tab') || 'blogs';

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<string>('ADMIN');
  
  // 2. PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Number of items per page

  // CRUD State
  const [isEditing, setIsEditing] = useState(false);
  const [viewMessage, setViewMessage] = useState<any>(null); 
  const [viewApplicant, setViewApplicant] = useState<any>(null);
  const [editItem, setEditItem] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 3. LOGOUT & AUTO-LOGOUT LOGIC
  const handleLogout = useCallback(() => {
    // Clear credentials
    localStorage.removeItem("adminRole");
    document.cookie = "adminAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    // Redirect to login
    router.push("/admin"); 
  }, [router]);

  useEffect(() => {
    const storedRole = localStorage.getItem("adminRole");
    if (storedRole) setRole(storedRole);

    // 1 Hour Inactivity Timer (3600000 ms)
    let inactivityTimer: NodeJS.Timeout;
    
    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(handleLogout, 3600000);
    };

    // Listen for activity
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);
    
    // Start timer
    resetTimer();

    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, [handleLogout]);

  // Reset pagination when tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

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
        { id: 'mentors', label: 'Mentor Applicants', icon: <UserCheck size={18}/> },
        { id: 'mentees', label: 'Mentee Applicants', icon: <Users size={18}/> },
        { id: 'messages', label: 'Messages', icon: <Mail size={18}/> },
      ]
    },
    {
      title: "System",
      items: [
        ...(role === 'SUPER_ADMIN' ? [{ id: 'admins', label: 'Manage Admins', icon: <ShieldAlert size={18}/> }] : []),
        { id: 'settings', label: 'Settings', icon: <Settings size={18}/> },
      ]
    }
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const uploadOneImage = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default');
    const res = await fetch(`https://api.cloudinary.com/v1_1/dmqjicpcc/image/upload`, { method: 'POST', body: formData });
    if (!res.ok) throw new Error('Upload failed');
    const data = await res.json();
    return data.secure_url;
  };

  const fetchData = async () => {
    if (activeTab === 'settings') { setItems([]); return; }
    setLoading(true);
    setItems([]); 
    try {
      let endpoint = `/api/${activeTab}`;
      if (activeTab === 'mentors') endpoint = `/api/applicants?role=mentor`;
      if (activeTab === 'mentees') endpoint = `/api/applicants?role=mentee`;
      if (activeTab === 'admins') endpoint = `/api/admins`;

      const res = await fetch(endpoint);
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (error) { setItems([]); } finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, [activeTab]);

  const handleStatusUpdate = async (id: number, status: 'ACCEPTED' | 'REJECTED') => {
    if (!confirm(`Are you sure you want to mark this applicant as ${status}?`)) return;
    try {
      const res = await fetch(`/api/applicants/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) { fetchData(); alert(`Applicant ${status}`); }
      else { alert("Failed to update status"); }
    } catch (e) { alert("Error updating status"); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this?")) return;
    try {
      let endpoint = `/api/${activeTab}/${id}`;
      if (activeTab === 'gallery') endpoint = `/api/gallery?id=${id}`;
      if (activeTab === 'mentors' || activeTab === 'mentees') endpoint = `/api/applicants/${id}`;
      if (activeTab === 'messages') endpoint = `/api/messages?id=${id}`;
      if (activeTab === 'admins') endpoint = `/api/admins?id=${id}`;

      const res = await fetch(endpoint, { method: 'DELETE' });
      if (res.ok) { fetchData(); alert("Deleted successfully"); }
    } catch (e) { alert("Error deleting"); }
  };

  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email');
    const newPassword = formData.get('newPassword');

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword })
      });
      if(res.ok) { alert("Password updated!"); (e.target as HTMLFormElement).reset(); }
      else { alert("Failed to update password"); }
    } catch(err) { alert("Error updating settings"); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadProgress("");
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data: any = Object.fromEntries(formData.entries());

    try {
      if (activeTab === 'gallery' && fileInputRef.current?.files?.length) {
        const files = Array.from(fileInputRef.current.files);
        const category = data.category;
        const caption = data.title; 

        for (let i = 0; i < files.length; i++) {
          setUploadProgress(`Uploading ${i + 1} of ${files.length}...`);
          const url = await uploadOneImage(files[i]);
          await fetch('/api/gallery', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: caption || files[i].name, category, imageUrl: url })
          });
        }
        setIsEditing(false); fetchData(); alert("All images uploaded!");
        return;
      }

      let url = ''; let method = ''; let endpointBase = activeTab;
      if (activeTab === 'mentors' || activeTab === 'mentees') endpointBase = 'applicants';
      if (activeTab === 'admins') { url = '/api/admins'; method = 'POST'; }
      else {
         url = editItem ? `/api/${endpointBase}/${editItem.id}` : `/api/${endpointBase}`; method = editItem ? 'PATCH' : 'POST';
      }

      if (fileInputRef.current?.files?.[0]) {
        const imageUrl = await uploadOneImage(fileInputRef.current.files[0]);
        if (activeTab === 'blogs' || activeTab === 'events') data.image = imageUrl;
      }

      const res = await fetch(url, { method: method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });

      if (res.ok) {
        setIsEditing(false); setEditItem(null); setPreviewUrl(null); fetchData(); alert("Saved successfully!");
      } else { 
        const errData = await res.json();
        alert(`Operation failed: ${errData.error || 'Unknown error'}`); 
      }
    } catch (err) { alert("Error submitting form"); } finally { setIsUploading(false); setUploadProgress(""); }
  };

  // PAGINATION LOGIC
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row pt-20">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shrink-0 flex flex-col h-[calc(100vh-80px)] md:sticky md:top-20">
        <div className="p-6">
           <h2 className="font-heading font-bold text-xl text-primary mb-1">Admin Panel</h2>
           <p className="text-xs text-slate-500">Logged in as: {role}</p>
        </div>
        
        <nav className="px-4 space-y-8 flex-1 overflow-y-auto">
           {menuGroups.map((group) => (
             <div key={group.title}>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">{group.title}</h3>
                <div className="space-y-1">
                   {group.items.map((item) => (
                     <button 
                       key={item.id} 
                       onClick={() => {
                         // Push URL parameter so refresh works
                         router.push(`/admin/dashboard?tab=${item.id}`);
                       }} 
                       className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition 
                         ${activeTab === item.id 
                           ? 'bg-primary/10 text-primary' 
                           : 'text-slate-900 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                         }`}
                     >
                       {item.icon} {item.label}
                     </button>
                   ))}
                </div>
             </div>
           ))}
        </nav>

        {/* LOGOUT BUTTON */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
           <button 
             onClick={handleLogout}
             className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
           >
             <LogOut size={18}/> Logout
           </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-x-hidden">
        <div className="flex justify-between items-center mb-8">
           <h1 className="text-2xl font-bold text-slate-900 dark:text-white capitalize">{activeTab}</h1>
           
           {activeTab !== 'settings' && activeTab !== 'mentors' && activeTab !== 'mentees' && activeTab !== 'messages' && (
             <button onClick={() => { setEditItem(null); setIsEditing(true); setPreviewUrl(null); }} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 shadow-lg"><Plus size={16} /> Add New</button>
           )}
        </div>

        {activeTab === 'settings' && (
           <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 max-w-xl">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white"><Lock size={20}/> Change Credentials</h2>
              <form onSubmit={handleSettingsSubmit} className="space-y-4">
                 <div><label className="admin-label">Confirm Email</label><input name="email" type="email" required className="admin-input" /></div>
                 <div><label className="admin-label">New Password</label><input name="newPassword" type="password" required className="admin-input" /></div>
                 <button type="submit" className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90">Update Password</button>
              </form>
           </div>
        )}

        {activeTab !== 'settings' && (
          loading ? <div className="h-64 flex items-center justify-center"><RefreshCw className="animate-spin text-primary"/></div> : (
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
               <div className="overflow-x-auto">
                   <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">
                         <tr><th className="p-4 w-16">ID</th><th className="p-4">Title/Name</th><th className="p-4">Details</th><th className="p-4 w-40 text-right">Actions</th></tr>
                      </thead>
                      <tbody className="text-slate-600 dark:text-slate-300">
                         {currentItems.length > 0 ? currentItems.map((item) => (
                           <tr key={item.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                              <td className="p-4">#{item.id}</td>
                              <td className="p-4 font-bold text-slate-900 dark:text-white">{item.title || item.name || item.subject}</td>
                              <td className="p-4">
                                 {activeTab === 'messages' && <span className="text-xs truncate block max-w-xs italic opacity-75">{item.message?.substring(0, 50)}...</span>}
                                 {activeTab === 'jobs' && `${item.company}`}
                                 {activeTab === 'gallery' && item.category}
                                 {activeTab === 'resources' && item.type}
                                 {activeTab === 'events' && item.date && new Date(item.date).toLocaleDateString()}
                                 {(activeTab === 'mentors' || activeTab === 'mentees') && (
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${item.status === 'ACCEPTED' ? 'bg-green-100 text-green-700' : item.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{item.status || 'PENDING'}</span>
                                 )}
                              </td>
                              <td className="p-4 flex justify-end gap-2">
                                 {(activeTab === 'mentors' || activeTab === 'mentees') && (
                                   <>
                                     <button onClick={() => handleStatusUpdate(item.id, 'ACCEPTED')} className="p-2 text-green-600 bg-green-50 rounded hover:bg-green-100"><Check size={16}/></button>
                                     <button onClick={() => handleStatusUpdate(item.id, 'REJECTED')} className="p-2 text-red-600 bg-red-50 rounded hover:bg-red-100"><Ban size={16}/></button>
                                   </>
                                 )}
                                 {(activeTab === 'messages' || activeTab === 'mentors' || activeTab === 'mentees') && (
                                   <button onClick={() => activeTab === 'messages' ? setViewMessage(item) : setViewApplicant(item)} className="p-2 text-blue-600 bg-blue-50 rounded hover:bg-blue-100"><Eye size={16}/></button>
                                 )}
                                 {activeTab !== 'mentors' && activeTab !== 'mentees' && activeTab !== 'messages' && (
                                    <button onClick={() => { setEditItem(item); setPreviewUrl(item.image || item.imageUrl); setIsEditing(true); }} className="p-2 text-slate-600 hover:text-primary"><Edit size={16}/></button>
                                 )}
                                 <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16}/></button>
                              </td>
                           </tr>
                         )) : (
                           <tr><td colSpan={4} className="p-8 text-center text-slate-500">No items found.</td></tr>
                         )}
                      </tbody>
                   </table>
               </div>

               {/* PAGINATION CONTROLS */}
               {totalPages > 1 && (
                 <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                    <span className="text-xs text-slate-500 font-bold">Page {currentPage} of {totalPages}</span>
                    <div className="flex gap-2">
                       <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-md disabled:opacity-50"><ChevronLeft size={16}/></button>
                       <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-md disabled:opacity-50"><ChevronRight size={16}/></button>
                    </div>
                 </div>
               )}
            </div>
          )
        )}

        {/* MODALS */}
        {viewMessage && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
             <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-xl shadow-2xl p-8 border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center mb-6"><h3 className="text-xl font-bold text-slate-900 dark:text-white">Message Details</h3><button onClick={() => setViewMessage(null)}><X className="text-slate-500"/></button></div>
                <div className="space-y-4 text-slate-700 dark:text-slate-300">
                   <div><label className="text-xs font-bold text-slate-500">FROM</label><p className="font-bold">{viewMessage.name} ({viewMessage.email})</p></div>
                   <div><label className="text-xs font-bold text-slate-500">SUBJECT</label><p className="font-bold">{viewMessage.subject}</p></div>
                   <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg"><p className="whitespace-pre-wrap">{viewMessage.message}</p></div>
                </div>
             </div>
          </div>
        )}

        {viewApplicant && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
             <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-xl shadow-2xl p-8 border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center mb-6"><h3 className="text-xl font-bold capitalize text-slate-900 dark:text-white">{viewApplicant.role} Application</h3><button onClick={() => setViewApplicant(null)}><X className="text-slate-500"/></button></div>
                <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
                   <div className="grid grid-cols-2 gap-4">
                      <div><label className="text-xs font-bold text-slate-500">NAME</label><p className="font-bold">{viewApplicant.name}</p></div>
                      <div><label className="text-xs font-bold text-slate-500">EMAIL</label><p className="font-bold truncate" title={viewApplicant.email}>{viewApplicant.email}</p></div>
                   </div>
                   <div><label className="text-xs font-bold text-slate-500">LINKEDIN</label><p className="font-bold text-primary truncate"><a href={viewApplicant.linkedin} target="_blank">{viewApplicant.linkedin || 'N/A'}</a></p></div>
                   <div><label className="text-xs font-bold text-slate-500">GOAL</label><div className="bg-slate-50 dark:bg-slate-800 p-3 rounded mt-1"><p>{viewApplicant.goal}</p></div></div>
                   <div className="flex justify-between items-center pt-2 border-t mt-4 border-slate-100 dark:border-slate-800">
                      <span className="text-xs text-slate-400">Applied: {new Date(viewApplicant.createdAt).toLocaleDateString()}</span>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${viewApplicant.status === 'ACCEPTED' ? 'bg-green-100 text-green-700' : viewApplicant.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{viewApplicant.status || 'PENDING'}</span>
                   </div>
                </div>
             </div>
          </div>
        )}

        {isEditing && (
           <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
              <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                 <div className="flex justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800"><h3 className="text-xl font-bold text-slate-900 dark:text-white">{editItem ? 'Edit' : 'Create'}</h3><button onClick={() => setIsEditing(false)}><X className="text-slate-500"/></button></div>
                 <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {activeTab === 'jobs' && (
                       <>
                          <div><label className="admin-label">Job Title</label><input name="title" defaultValue={editItem?.title} required className="admin-input" /></div>
                          <div><label className="admin-label">Company Name</label><input name="company" defaultValue={editItem?.company} required className="admin-input" /></div>
                          <div>
                            <label className="admin-label">Salary Range</label>
                            <select name="salary" defaultValue={editItem?.salary || ""} className="admin-input">
                              <option value="" disabled>Select Salary Range</option>
                              <option value="< $1000">&lt; $1000</option>
                              <option value="$1000 - $5000">$1000 - $5000</option>
                              <option value="$5000 - $10000">$5000 - $10000</option>
                              <option value="$10000 - $20000">$10000 - $20000</option>
                              <option value="$20000 - $50000">$20000 - $50000</option>
                              <option value="> $50000">&gt; $50000</option>
                            </select>
                          </div>
                          <div><label className="admin-label">Location</label><input name="location" defaultValue={editItem?.location} required className="admin-input" /></div>
                          <div><label className="admin-label">Job Type</label><select name="type" defaultValue={editItem?.type || "Full Time"} className="admin-input"><option>Full Time</option><option>Part Time</option><option>Contract</option></select></div>
                          <div><label className="admin-label">Job Description</label><textarea name="description" defaultValue={editItem?.description} required className="admin-input" rows={4}/></div>
                          <div><label className="admin-label">Application Link/Email</label><input name="applyLink" defaultValue={editItem?.applyLink} required className="admin-input" /></div>
                       </>
                    )}

                    {activeTab === 'events' && (
                       <>
                          <div><label className="admin-label">Event Title</label><input name="title" defaultValue={editItem?.title} required className="admin-input" /></div>
                          <div><label className="admin-label">Date & Time</label><input name="date" type="datetime-local" defaultValue={editItem?.date ? new Date(editItem.date).toISOString().slice(0, 16) : ''} className="admin-input" /></div>
                          <div><label className="admin-label">Location</label><input name="location" defaultValue={editItem?.location} placeholder="Zoom / Lagos" required className="admin-input" /></div>
                          <div><label className="admin-label">Registration URL</label><input name="registrationLink" defaultValue={editItem?.registrationLink} placeholder="https://..." className="admin-input" /></div>
                          <div className="space-y-3"><label className="admin-label">Event Banner</label><input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/*" /></div>
                       </>
                    )}

                    {activeTab === 'gallery' && (
                       <>
                          <div><label className="admin-label">Caption (Optional)</label><input name="title" className="admin-input" /></div>
                          <div><label className="admin-label">Category</label><select name="category" className="admin-input"><option value="Events">Events</option><option value="Webinars">Webinars</option><option value="Meetups">Meetups</option></select></div>
                          <div className="space-y-3"><label className="admin-label">Images (Select Multiple)</label><input type="file" ref={fileInputRef} multiple accept="image/*" /></div>
                          {uploadProgress && <p className="text-primary font-bold animate-pulse">{uploadProgress}</p>}
                       </>
                    )}

                    {activeTab === 'resources' && (
                       <>
                          <div><label className="admin-label">Resource Title</label><input name="title" defaultValue={editItem?.title} required className="admin-input" /></div>
                          <div><label className="admin-label">Type</label><select name="type" defaultValue={editItem?.type || "PDF"} className="admin-input"><option>PDF</option><option>Video</option><option>Link</option><option>Book</option><option>DOC</option><option>PPT</option><option>XLS</option></select></div>
                          <div><label className="admin-label">File URL / YouTube Link</label><input name="fileUrl" defaultValue={editItem?.fileUrl} required className="admin-input" /></div>
                       </>
                    )}

                    {activeTab === 'blogs' && (
                       <>
                          <div><label className="admin-label">Blog Title</label><input name="title" defaultValue={editItem?.title} required className="admin-input" /></div>
                          <div><label className="admin-label">Author</label><input name="author" defaultValue={editItem?.author} className="admin-input" /></div>
                          <div><label className="admin-label">Content</label><textarea name="content" defaultValue={editItem?.content} className="admin-input" rows={6}/></div>
                          <div className="space-y-3"><label className="admin-label">Cover Image</label><input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/*" /></div>
                       </>
                    )}

                    <button disabled={isUploading} type="submit" className="w-full py-3 bg-primary text-white font-bold rounded-lg mt-4 disabled:opacity-50 hover:bg-primary/90">{isUploading ? "Processing..." : "Save Changes"}</button>
                 </form>
              </div>
           </div>
        )}
      </main>
      <style jsx global>{` 
        .admin-input { width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; background: transparent; color: inherit; } 
        .dark .admin-input { border-color: #1e293b; }
        .admin-label { display: block; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.5rem; color: #64748b; }
        .dark .admin-label { color: #94a3b8; }
      `}</style>
    </div>
  );
}

// Ensure the page can handle search params correctly
export default function AdminDashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
