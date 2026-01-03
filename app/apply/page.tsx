"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { CheckCircle2, Loader2, AlertCircle, Linkedin, User, Target } from "lucide-react";

function ApplyForm() {
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get('role') === 'mentor' ? 'MENTOR' : 'MENTEE';
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: defaultRole,
    linkedin: "",
    goal: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/applicants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to submit application.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="max-w-xl mx-auto py-20 px-6 text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
           <CheckCircle2 size={40}/>
        </div>
        <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-4">Application Received!</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
           Thank you for applying to be a {formData.role === 'MENTOR' ? 'Mentor' : 'Mentee'}. 
           Our team will review your profile and get back to you via email shortly.
        </p>
        <a href="/" className="px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition">Return Home</a>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 my-10">
       <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-2">
         Apply as a {formData.role === 'MENTOR' ? 'Mentor' : 'Mentee'}
       </h2>
       <p className="text-slate-500 mb-8">Join the community and start your journey.</p>

       {status === "error" && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3">
             <AlertCircle size={20}/>
             <p className="font-bold">{errorMessage}</p>
          </div>
       )}

       <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Role Selector */}
          <div className="grid grid-cols-2 gap-4 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
             <button 
               type="button" 
               onClick={() => setFormData({...formData, role: 'MENTEE'})}
               className={`py-3 rounded-lg font-bold text-sm transition ${formData.role === 'MENTEE' ? 'bg-white dark:bg-slate-700 shadow text-primary' : 'text-slate-500'}`}
             >
               I want to be Mentored
             </button>
             <button 
               type="button" 
               onClick={() => setFormData({...formData, role: 'MENTOR'})}
               className={`py-3 rounded-lg font-bold text-sm transition ${formData.role === 'MENTOR' ? 'bg-white dark:bg-slate-700 shadow text-primary' : 'text-slate-500'}`}
             >
               I want to Mentor
             </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
             <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
                  <input 
                    required 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-primary"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address</label>
                <input 
                  required 
                  type="email" 
                  placeholder="john@example.com"
                  className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-primary"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
             </div>
          </div>

          <div className="space-y-2">
             <label className="text-sm font-bold text-slate-700 dark:text-slate-300">LinkedIn Profile URL</label>
             <div className="relative">
                <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
                <input 
                  type="url" 
                  placeholder="https://linkedin.com/in/johndoe"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-primary"
                  value={formData.linkedin}
                  onChange={e => setFormData({...formData, linkedin: e.target.value})}
                />
             </div>
          </div>

          <div className="space-y-2">
             <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
               {formData.role === 'MENTOR' ? 'Why do you want to mentor?' : 'What are your career goals?'}
             </label>
             <div className="relative">
                <Target className="absolute left-4 top-4 text-slate-400" size={18}/>
                <textarea 
                  required 
                  rows={4}
                  placeholder={formData.role === 'MENTOR' ? "Share your expertise..." : "Describe what you hope to achieve..."}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-primary"
                  value={formData.goal}
                  onChange={e => setFormData({...formData, goal: e.target.value})}
                ></textarea>
             </div>
          </div>

          <button 
            disabled={status === "loading"}
            className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary/90 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
             {status === "loading" ? <Loader2 className="animate-spin"/> : "Submit Application"}
          </button>
       </form>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
       <section className="relative h-[30vh] min-h-[250px] flex items-center justify-center overflow-hidden bg-slate-900">
          <Image 
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000" 
            alt="Apply" 
            fill 
            className="object-cover opacity-30"
          />
          <div className="relative z-10 text-center px-6">
             <h1 className="text-4xl font-heading font-bold text-white mb-2">Join the Program</h1>
             <p className="text-slate-300">Take the next step in your HR career.</p>
          </div>
       </section>
       
       <div className="px-6">
          <Suspense fallback={<div className="text-center py-20">Loading form...</div>}>
            <ApplyForm />
          </Suspense>
       </div>
    </div>
  );
}
