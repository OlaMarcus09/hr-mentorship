"use client";

import { useState, useEffect } from "react";
import { Trash2, UserPlus, Shield, ShieldAlert } from "lucide-react";

export default function ManageTeamPage() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserEmail, setCurrentUserEmail] = useState("");

  // Fetch Admins
  async function fetchAdmins() {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setAdmins(data);
    setLoading(false);
  }

  useEffect(() => {
    // Get current user from local storage (saved during login) if you implemented that, 
    // or just fetch list.
    fetchAdmins();
  }, []);

  async function handleAddAdmin(e: any) {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    const res = await fetch("/api/admin/users", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      alert("Admin Added!");
      e.target.reset();
      fetchAdmins(); // Refresh list
    } else {
      const err = await res.json();
      alert(err.error);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to remove this admin?")) return;
    
    const res = await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchAdmins();
    }
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Team</h1>
        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium border border-yellow-200">
           Super Admin Access Only
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* List of Admins */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Current Administrators</h2>
          {loading ? <p>Loading...</p> : admins.map((admin: any) => (
            <div key={admin.id} className="flex justify-between items-center bg-white p-4 rounded-lg border shadow-sm">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${admin.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'}`}>
                  {admin.role === 'SUPER_ADMIN' ? <ShieldAlert size={20}/> : <Shield size={20}/>}
                </div>
                <div>
                  <p className="font-bold">{admin.name}</p>
                  <p className="text-sm text-gray-500">{admin.email}</p>
                </div>
              </div>
              
              {/* Only show delete button if it's not a Super Admin */}
              {admin.role !== 'SUPER_ADMIN' && (
                <button onClick={() => handleDelete(admin.id)} className="text-red-500 hover:bg-red-50 p-2 rounded">
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add New Admin Form */}
        <div className="bg-slate-50 p-6 rounded-xl h-fit">
          <div className="flex items-center gap-2 mb-4">
            <UserPlus size={20} />
            <h2 className="text-xl font-semibold">Add New Admin</h2>
          </div>
          
          <form onSubmit={handleAddAdmin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Name</label>
              <input name="name" required className="w-full p-2 border rounded" placeholder="Jane Doe" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Email</label>
              <input name="email" type="email" required className="w-full p-2 border rounded" placeholder="jane@hrmentorship.com" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Password</label>
              <input name="password" type="password" required className="w-full p-2 border rounded" placeholder="••••••" />
            </div>
            <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
