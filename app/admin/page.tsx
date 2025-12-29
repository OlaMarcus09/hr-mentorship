"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Redirect to the Dashboard Command Center
        router.push("/admin/dashboard");
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 md:p-10">
        
        {/* Logo/Header */}
        <div className="text-center mb-8">
           <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
             <Lock size={32} />
           </div>
           <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Access</h1>
           <p className="text-slate-500 text-sm mt-2">Enter your credentials to access the dashboard.</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-6 text-center border border-red-100">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
           <div>
             <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Email Address</label>
             <div className="relative">
               <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
               <input 
                 name="email" 
                 type="email" 
                 required 
                 placeholder="admin@hrmentorship.com"
                 className="w-full pl-10 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:border-primary outline-none transition"
               />
             </div>
           </div>

           <div>
             <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Password</label>
             <div className="relative">
               <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
               <input 
                 name="password" 
                 type="password" 
                 required 
                 placeholder="••••••••"
                 className="w-full pl-10 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:border-primary outline-none transition"
               />
             </div>
           </div>

           <button 
             disabled={loading}
             type="submit" 
             className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
           >
             {loading ? <Loader2 className="animate-spin" size={20} /> : <>Access Dashboard <ArrowRight size={18} /></>}
           </button>
        </form>

        <div className="text-center mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
           <p className="text-xs text-slate-400">Restricted Area. Authorized Personnel Only.</p>
        </div>
      </div>
    </div>
  );
}
