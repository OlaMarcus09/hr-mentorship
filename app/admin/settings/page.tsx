"use client";

import { useState } from "react";
import { Lock, Save, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const currentPassword = e.target.currentPassword.value;
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: "New passwords do not match" });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        body: JSON.stringify({ currentPassword, newPassword }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: "Password updated! You can now use your new password." });
        e.target.reset();
      } else {
        setMessage({ type: 'error', text: data.error || "Failed to update" });
      }
    } catch (err) {
      setMessage({ type: 'error', text: "Something went wrong" });
    }
    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto py-10 px-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">Account Settings</h1>
      </div>

      <div className="bg-white border rounded-xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 text-slate-700">
          <div className="bg-blue-50 p-3 rounded-full text-blue-600">
            <Lock size={24} />
          </div>
          <div>
            <h2 className="font-bold text-lg">Change Password</h2>
            <p className="text-sm text-gray-500">Update your login credentials</p>
          </div>
        </div>

        {message && (
          <div className={`p-4 rounded-lg mb-6 flex items-center gap-2 text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message.type === 'success' ? <CheckCircle size={16}/> : <AlertCircle size={16}/>}
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Current Password</label>
            <input 
              name="currentPassword" 
              type="password" 
              required 
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" 
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input 
              name="newPassword" 
              type="password" 
              required 
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" 
              placeholder="Min. 6 characters"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirm New Password</label>
            <input 
              name="confirmPassword" 
              type="password" 
              required 
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" 
              placeholder="Repeat new password"
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition flex justify-center items-center gap-2 disabled:opacity-50 mt-4"
          >
            {loading ? "Updating..." : "Update Password"}
            {!loading && <Save size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
}
