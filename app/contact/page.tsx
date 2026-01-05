"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSuccess(true);
        (e.target as HTMLFormElement).reset();
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      
      {/* HERO SECTION (Restored) */}
      <div className="relative bg-slate-900 py-32 px-6">
        <div 
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-heading text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
            Have questions about our mentorship programs or HR services? We're here to help.
          </p>
        </div>
      </div>

      {/* CONTENT SECTION (Overlapping Hero) */}
      <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl border border-slate-700">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6 text-primary">
                <Phone size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Phone Support</h3>
              <p className="text-slate-400 mb-4">Mon-Fri from 8am to 6pm.</p>
              <a href="tel:+2348025320606" className="text-xl font-bold text-primary hover:text-white transition">
                +234 802 532 0606
              </a>
            </div>

            <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl border border-slate-700">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6 text-primary">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <p className="text-slate-400 mb-4">We usually reply within 24 hours.</p>
              <a href="mailto:hrmentorshipgroup@gmail.com" className="text-lg md:text-xl font-bold text-primary hover:text-white transition break-all">
                hrmentorshipgroup@gmail.com
              </a>
            </div>

            <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl border border-slate-700">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6 text-primary">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Our Presence</h3>
              <p className="text-slate-400 leading-relaxed">
                We have active chapters in Lagos, Abuja, Port Harcourt, Ibadan, and Northern Nigeria.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-800">
            {success ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                <p className="text-slate-500">We'll get back to you shortly.</p>
                <button onClick={() => setSuccess(false)} className="mt-8 text-primary font-bold hover:underline">Send another message</button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                  <MessageSquare className="text-primary"/> Send us a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Your Name</label>
                      <input name="name" required className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-primary/50 transition" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Your Email</label>
                      <input name="email" type="email" required className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-primary/50 transition" placeholder="john@example.com" />
                    </div>
                  </div>
                
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Subject</label>
                    <input name="subject" required className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-primary/50 transition" placeholder="Inquiry about..." />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        Message <span className="text-slate-400 font-normal ml-1">(Max 2000 chars)</span>
                    </label>
                    <textarea 
                        name="message" 
                        required 
                        rows={5} 
                        maxLength={2000}
                        className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-primary/50 transition resize-none" 
                        placeholder="How can we help you today?" 
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition shadow-lg shadow-primary/25 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20}/> : <><Send size={20}/> Send Message</>}
                  </button>
                </form>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
