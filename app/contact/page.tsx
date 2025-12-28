"use client";

import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-16">
           <h1 className="text-4xl md:text-5xl font-heading text-slate-900 dark:text-white mb-4">Get in Touch</h1>
           <p className="text-slate-600 dark:text-slate-400">We'd love to hear from you.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
           {/* Contact Info */}
           <div className="space-y-8">
              <div className="flex items-start gap-4">
                 <div className="bg-white dark:bg-slate-900 p-3 rounded-lg shadow-sm text-primary"><Mail size={24}/></div>
                 <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Email Us</h3>
                    <p className="text-slate-600 dark:text-slate-400">hello@hrmentorship.com</p>
                 </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="bg-white dark:bg-slate-900 p-3 rounded-lg shadow-sm text-primary"><Phone size={24}/></div>
                 <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Call Us</h3>
                    <p className="text-slate-600 dark:text-slate-400">+234 800 123 4567</p>
                 </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="bg-white dark:bg-slate-900 p-3 rounded-lg shadow-sm text-primary"><MapPin size={24}/></div>
                 <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Visit Us</h3>
                    <p className="text-slate-600 dark:text-slate-400">Lagos, Nigeria</p>
                 </div>
              </div>
           </div>

           {/* Simple Form */}
           <form className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-4">
              <div>
                 <label className="block text-sm font-bold mb-2">Name</label>
                 <input type="text" className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg" />
              </div>
              <div>
                 <label className="block text-sm font-bold mb-2">Email</label>
                 <input type="email" className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg" />
              </div>
              <div>
                 <label className="block text-sm font-bold mb-2">Message</label>
                 <textarea rows={4} className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg"></textarea>
              </div>
              <button className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition">Send Message</button>
           </form>
        </div>

      </div>
    </div>
  );
}
