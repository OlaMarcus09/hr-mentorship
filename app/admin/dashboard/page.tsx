"use client";

import { useState, useEffect, useRef } from "react";
import { 
  LayoutDashboard, FileText, Briefcase, Calendar, Image as ImageIcon, 
  Users, UserCheck, Settings, Plus, Trash2, Edit, RefreshCw, 
  X, Upload, Mail, ShieldAlert, Eye, Lock
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('blogs');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<string>('ADMIN');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // CRUD State
  const [isEditing, setIsEditing] = useState(false);
  const [viewMessage, setViewMessage] = useState<any>(null);
  const [editItem, setEditItem] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("adminRole");
    if (storedRole) setRole(storedRole);
  }, []);

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
      setCurrentPage(1);
    } catch (error) { setItems([]); } finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, [activeTab]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
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
      } else { alert("Operation failed."); }
    } catch (err) { alert("Error submitting"); } finally { setIsUploading(false); setUploadProgress(""); }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row pt-20">
      <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shrink-0">
        <div className="p-6">
           <h2 className="font-heading font-bold text-xl text-primary mb-1">Admin Panel</h2>
           <p className="text-xs text-slate-500">Logged in as: {role}</p>
        </div>
        <nav className="px-4 space-y-8 mb-8">
           {menuGroups.map((group) => (
             <div key={group.title}>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">{group.title}</h3>
                <div className="space-y-1">
                   {group.items.map((item) => (
                     <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${activeTab === item.id ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>{item.icon} {item.label}</button>
                   ))}
                </div>
             </div>
           ))}
        </nav>
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
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Lock size={20}/> Change Credentials</h2>
              <form onSubmit={handleSettingsSubmit} className="space-y-4">
                 <div>
                    <label className="block text-sm font-bold mb-2">Confirm Email</label>
                    <input name="email" type="email" placeholder="admin@hrmentorship.com" required className="admin-input" />
                 </div>
                 <div>
                    <label className="block text-sm font-bold mb-2">New Password</label>
                    <input name="newPassword" type="password" placeholder="Min 6 characters" required className="admin-input" />
                 </div>
                 <button type="submit" className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90">Update Password</button>
              </form>
           </div>
        )}

        {activeTab !== 'settings' && (
          loading ? <div className="h-64 flex items-center justify-center"><RefreshCw className="animate-spin"/></div> : (
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
               <div className="overflow-x-auto">
                   <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                         <tr><th className="p-4 w-16">ID</th><th className="p-4">Title/Name</th><th className="p-4">Details</th><th className="p-4 w-32 text-right">Actions</th></tr>
                      </thead>
                      <tbody>
                         {currentItems.map((item) => (
                           <tr key={item.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                              <td className="p-4">#{item.id}</td>
                              <td className="p-4 font-bold">{item.title || item.name || item.subject}</td>
                              <td className="p-4 text-slate-600">
                                 {activeTab === 'messages' && <span className="text-xs truncate block max-w-xs">{item.message}</span>}
                                 {activeTab === 'jobs' && `${item.company}`}
                                 {activeTab === 'gallery' && item.category}
                                 {activeTab === 'resources' && item.type}
                              </td>
                              <td className="p-4 flex justify-end gap-2">
                                 {activeTab === 'messages' && (
                                   <button onClick={() => setViewMessage(item)} className="p-2 text-green-600 bg-green-50 rounded hover:bg-green-100"><Eye size={16} /></button>
                                 )}
                                 {activeTab !== 'mentors' && activeTab !== 'messages' && <button onClick={() => { setEditItem(item); setPreviewUrl(item.image || item.imageUrl); setIsEditing(true); }}><Edit size={16}/></button>}
                                 <button onClick={() => handleDelete(item.id)} className="text-red-600"><Trash2 size={16}/></button>
                              </td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
               </div>
            </div>
          )
        )}

        {viewMessage && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
             <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-xl shadow-2xl p-8 border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-xl font-bold">Message Details</h3>
                   <button onClick={() => setViewMessage(null)}><X/></button>
                </div>
                <div className="space-y-4">
                   <div><label className="text-xs font-bold text-slate-500">FROM</label><p className="font-bold">{viewMessage.name} ({viewMessage.email})</p></div>
                   <div><label className="text-xs font-bold text-slate-500">SUBJECT</label><p className="font-bold">{viewMessage.subject}</p></div>
                   <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg"><p className="whitespace-pre-wrap">{viewMessage.message}</p></div>
                </div>
             </div>
          </div>
        )}

        {isEditing && (
           <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
              <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                 <div className="flex justify-between mb-6 pb-4 border-b"><h3 className="text-xl font-bold">{editItem ? 'Edit' : 'Create'}</h3><button onClick={() => setIsEditing(false)}><X/></button></div>
                 <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {activeTab === 'jobs' && (
                       <>
                          <input name="title" defaultValue={editItem?.title} placeholder="Job Title" required className="admin-input" />
                          <input name="company" defaultValue={editItem?.company} placeholder="Company" required className="admin-input" />
                          <input name="salary" defaultValue={editItem?.salary} placeholder="Salary (e.g. $50k - $70k)" className="admin-input" />
                          <input name="location" defaultValue={editItem?.location} placeholder="Location" required className="admin-input" />
                          <select name="type" defaultValue={editItem?.type || "Full Time"} className="admin-input"><option>Full Time</option><option>Part Time</option><option>Contract</option></select>
                          <textarea name="description" defaultValue={editItem?.description} placeholder="Description" required className="admin-input" rows={4}/>
                          <input name="applyLink" defaultValue={editItem?.applyLink} placeholder="Application Link/Email" required className="admin-input" />
                       </>
                    )}

                    {activeTab === 'events' && (
                       <>
                          <input name="title" defaultValue={editItem?.title} placeholder="Event Name" required className="admin-input" />
                          <input name="date" type="datetime-local" className="admin-input" />
                          <input name="location" defaultValue={editItem?.location} placeholder="Location (e.g. Zoom or Lagos)" required className="admin-input" />
                          {/* NEW FIELD FOR LINK */}
                          <input name="registrationLink" defaultValue={editItem?.registrationLink} placeholder="Registration Link (e.g. https://zoom.us/...)" className="admin-input" />
                          <div className="space-y-3">
                            <label className="block text-sm font-bold">Event Banner</label>
                            {previewUrl && <div className="h-40 w-full relative"><Image src={previewUrl} alt="Preview" fill className="object-cover rounded"/></div>}
                            <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/*" />
                          </div>
                       </>
                    )}

                    {activeTab === 'gallery' && (
                       <>
                          <input name="title" placeholder="Caption (Optional)" className="admin-input" />
                          <select name="category" className="admin-input">
                             <option value="Events">Events</option>
                             <option value="Webinars">Webinars</option>
                             <option value="Meetups">Meetups</option>
                          </select>
                          <div className="space-y-3">
                            <label className="block text-sm font-bold">Images (Select Multiple)</label>
                            <input type="file" ref={fileInputRef} multiple accept="image/*" />
                          </div>
                          {uploadProgress && <p className="text-primary font-bold animate-pulse">{uploadProgress}</p>}
                       </>
                    )}

                    {activeTab === 'resources' && (
                       <>
                          <input name="title" defaultValue={editItem?.title} placeholder="Title" required className="admin-input" />
                          <select name="type" defaultValue={editItem?.type || "PDF"} className="admin-input"><option>PDF</option><option>Video</option><option>Link</option><option>Book</option></select>
                          <input name="fileUrl" defaultValue={editItem?.fileUrl} placeholder="File URL / Video Link" required className="admin-input" />
                       </>
                    )}

                    {activeTab === 'blogs' && (
                       <>
                          <input name="title" defaultValue={editItem?.title} placeholder="Title" required className="admin-input" />
                          <input name="author" defaultValue={editItem?.author} placeholder="Author" className="admin-input" />
                          <textarea name="content" defaultValue={editItem?.content} placeholder="Content/Description" className="admin-input" rows={4}/>
                          
                          <div className="space-y-3">
                            <label className="block text-sm font-bold">Image</label>
                            {previewUrl && <div className="h-40 w-full relative"><Image src={previewUrl} alt="Preview" fill className="object-cover rounded"/></div>}
                            <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/*" />
                          </div>
                       </>
                    )}

                    {activeTab === 'admins' && (
                       <>
                          <input name="name" placeholder="Name" required className="admin-input" />
                          <input name="email" placeholder="Email" required className="admin-input" />
                          <input name="password" type="password" placeholder="Password" required className="admin-input" />
                       </>
                    )}

                    <button disabled={isUploading} type="submit" className="w-full py-3 bg-primary text-white font-bold rounded-lg mt-4 disabled:opacity-50">
                       {isUploading ? "Processing..." : "Save Changes"}
                    </button>
                 </form>
              </div>
           </div>
        )}
      </main>
      <style jsx global>{` .admin-input { width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #ccc; background: transparent; } `}</style>
    </div>
  );
}
