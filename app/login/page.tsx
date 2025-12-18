"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: any) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        // SECURITY: Set a cookie so Middleware can read it
        // In a real app, use "HttpOnly" cookies via Server Actions
        document.cookie = "admin_token=" + data.token + "; path=/; max-age=86400"; // Expires in 1 day
        router.push("/admin"); // Go to dashboard
        router.refresh(); // Refresh to update navbar if needed
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={20} />
          </div>
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-gray-500 text-sm">Enter your credentials to access the dashboard</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              name="email" 
              type="email"
              required 
              className="w-full p-3 border rounded-lg"
              placeholder="admin@hrmentorship.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              name="password" 
              type="password"
              required 
              className="w-full p-3 border rounded-lg"
              placeholder="••••••••"
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Checking..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
