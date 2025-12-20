"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: any) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });

    if (res.ok) {
      window.location.href = "/admin"; // Force reload to update middleware/cookies
    } else {
      setError("Invalid credentials");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800">
        <div className="text-center mb-8">
           <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-xl mb-4">
             <Lock size={24} />
           </div>
           <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Login</h1>
           <p className="text-slate-500">Sign in to manage the platform</p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Email</label>
            <div className="relative">
               <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
               <input name="email" type="email" required className="w-full pl-10 p-3 bg-slate-50 dark:bg-slate-950 border dark:border-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-purple-600" placeholder="admin@hrmentorship.com"/>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Password</label>
            <div className="relative">
               <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
               <input name="password" type="password" required className="w-full pl-10 p-3 bg-slate-50 dark:bg-slate-950 border dark:border-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-purple-600" placeholder="••••••••"/>
            </div>
          </div>

          <button disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2">
            {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
