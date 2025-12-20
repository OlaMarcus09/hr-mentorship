"use client";
import { useState, useEffect } from "react";
import { UserPlus, Trash2, Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ManageTeam() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Admins
  useEffect(() => {
    fetch("/api/admin/list").then(res => res.json()).then(data => {
      setAdmins(data);
      setLoading(false);
    });
  }, []);

  async function handleAddAdmin(e: any) {
    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.name.value;
    const password = e.target.password.value;
    
    const res = await fetch("/api/admin/create", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      alert("Admin Created!");
      window.location.reload();
    } else {
      alert("Failed to create admin");
    }
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <Link href="/admin" className="inline-flex items-center gap-2 text-slate-500 mb-6"><ArrowLeft size={18}/> Back</Link>
      <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Manage Team Access</h1>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* CREATE FORM */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border dark:border-slate-800 h-fit">
           <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><UserPlus size={20}/> Add New Admin</h2>
           <form onSubmit={handleAddAdmin} className="space-y-4">
             <div><label className="text-sm font-bold">Name</label><input name="name" required className="w-full p-2 border rounded dark:bg-slate-950"/></div>
             <div><label className="text-sm font-bold">Email</label><input name="email" type="email" required className="w-full p-2 border rounded dark:bg-slate-900"/></div>
             <div><label className="text-sm font-bold">Password</label><input name="password" type="password" required className="w-full p-2 border rounded dark:bg-slate-900"/></div>
             <button className="w-full bg-purple-600 text-white py-2 rounded font-bold hover:bg-purple-700">Create Admin</button>
           </form>
        </div>

        {/* LIST */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border dark:border-slate-800">
           <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Shield size={20}/> Current Admins</h2>
           {loading ? <p>Loading...</p> : (
             <div className="space-y-3">
               {admins.map((admin: any) => (
                 <div key={admin.id} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-950 rounded">
                    <div>
                       <p className="font-bold">{admin.name}</p>
                       <p className="text-xs text-slate-500">{admin.email}</p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{admin.role}</span>
                 </div>
               ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
