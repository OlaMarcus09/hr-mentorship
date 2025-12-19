"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setSuccess(true);
      e.target.reset();
    } else {
      alert("Failed to send message. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 bg-white dark:bg-slate-900 rounded-2xl shadow-sm overflow-hidden border dark:border-slate-800">
        
        {/* Contact Info (Left) */}
        <div className="bg-purple-900 text-white p-10 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-6">Get in Touch</h1>
            <p className="text-purple-200 mb-10 leading-relaxed">
              Have questions about our mentorship programs, events, or job board? We are here to help you grow your HR career.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="text-purple-300 mt-1" />
                <div>
                  <h3 className="font-bold">Email</h3>
                  <p className="text-purple-200 text-sm">hello@hrmentorship.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="text-purple-300 mt-1" />
                <div>
                  <h3 className="font-bold">Phone</h3>
                  <p className="text-purple-200 text-sm">+234 800 123 4567</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="text-purple-300 mt-1" />
                <div>
                  <h3 className="font-bold">Office</h3>
                  <p className="text-purple-200 text-sm">Lagos, Nigeria</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-sm text-purple-400">
            © 2025 HR Mentorship
          </div>
        </div>

        {/* Form (Right) */}
        <div className="p-10">
          {success ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h2>
              <p className="text-slate-500 dark:text-slate-400">
                Thank you for reaching out. We will get back to you shortly.
              </p>
              <button onClick={() => setSuccess(false)} className="mt-6 text-purple-600 font-bold hover:underline">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send us a Message</h2>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                <input name="name" required className="w-full border dark:border-slate-700 p-3 rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-600 outline-none transition" placeholder="John Doe" />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                <input name="email" type="email" required className="w-full border dark:border-slate-700 p-3 rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-600 outline-none transition" placeholder="john@example.com" />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Message</label>
                <textarea name="message" required rows={4} className="w-full border dark:border-slate-700 p-3 rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-600 outline-none transition" placeholder="How can we help you?" />
              </div>

              <button disabled={loading} className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2">
                {loading ? <Loader2 className="animate-spin" /> : <><Send size={18} /> Send Message</>}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
