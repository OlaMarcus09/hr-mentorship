"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Message sent successfully!");
        (e.target as HTMLFormElement).reset();
      } else {
        alert("Failed to send message.");
      }
    } catch (err) {
      alert("Error sending message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
        
        {/* Contact Info */}
        <div>
           <h1 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-6">
             Get in Touch
           </h1>
           <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
             Have questions about our mentorship programs, events, or community? We're here to help.
           </p>

           <div className="space-y-8">
              <div className="flex items-start gap-4">
                 <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                   <Mail size={24}/>
                 </div>
                 <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Email Us</h3>
                    <p className="text-slate-600 dark:text-slate-400">info@hrmentorship.org</p>
                 </div>
              </div>
              
              <div className="flex items-start gap-4">
                 <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                   <Phone size={24}/>
                 </div>
                 <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Call Us</h3>
                    <p className="text-slate-600 dark:text-slate-400">+234 (800) 123 4567</p>
                 </div>
              </div>

              <div className="flex items-start gap-4">
                 <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                   <MapPin size={24}/>
                 </div>
                 <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Visit Us</h3>
                    <p className="text-slate-600 dark:text-slate-400">Lagos, Nigeria</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800">
           <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                 <label className="block text-sm font-bold mb-2">Full Name</label>
                 <input name="name" required className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950" placeholder="John Doe" />
              </div>
              <div>
                 <label className="block text-sm font-bold mb-2">Email Address</label>
                 <input name="email" type="email" required className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950" placeholder="john@example.com" />
              </div>
              <div>
                 <label className="block text-sm font-bold mb-2">Subject</label>
                 <input name="subject" className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950" placeholder="Inquiry about..." />
              </div>
              <div>
                 <label className="block text-sm font-bold mb-2">Message</label>
                 <textarea name="message" required rows={5} className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950" placeholder="How can we help you?"></textarea>
              </div>

              <button disabled={loading} type="submit" className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50">
                 {loading ? "Sending..." : <>Send Message <Send size={18}/></>}
              </button>
           </form>
        </div>
      </div>
    </div>
  );
}
