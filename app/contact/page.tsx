import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
       
       {/* NEW HERO SECTION (Crucial for White Navbar) */}
       <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=2000" 
            alt="Contact Us" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-purple-900/80 mix-blend-multiply" />
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
             <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Get in Touch</h1>
             <p className="text-xl text-white/90">Have questions about joining, partnership, or our programs? We are here to help.</p>
          </div>
       </section>

       <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-3 gap-8">
             {/* Contact Info */}
             <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                   <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                      <Phone size={24}/>
                   </div>
                   <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Phone Support</h3>
                   <p className="text-slate-500 mb-4">Mon-Fri from 8am to 6pm.</p>
                   <a href="tel:+2348025320606" className="text-lg font-bold text-primary hover:underline">+234 802 532 0606</a>
                </div>

                <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                   <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                      <Mail size={24}/>
                   </div>
                   <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Email Us</h3>
                   <p className="text-slate-500 mb-4">We usually reply within 24 hours.</p>
                   <a href="mailto:hrmentorshipgroup@gmail.com" className="text-lg font-bold text-primary hover:underline">hrmentorshipgroup@gmail.com</a>
                </div>

                <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                   <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                      <MapPin size={24}/>
                   </div>
                   <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Our Presence</h3>
                   <p className="text-slate-500">
                     We have active chapters in Lagos, Abuja, Port Harcourt, Ibadan, and Northern Nigeria.
                   </p>
                </div>
             </div>

             {/* Form */}
             <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Send us a Message</h2>
                <form className="space-y-6">
                   <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Full Name</label>
                         <input type="text" placeholder="John Doe" className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary outline-none transition" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address</label>
                         <input type="email" placeholder="john@example.com" className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary outline-none transition" />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Subject</label>
                      <input type="text" placeholder="Inquiry about..." className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary outline-none transition" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Message</label>
                      <textarea rows={6} placeholder="How can we help you?" className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary outline-none transition"></textarea>
                   </div>
                   <button className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary/90 transition flex items-center justify-center gap-2">
                      Send Message <Send size={20}/>
                   </button>
                </form>
             </div>
          </div>
       </div>
    </div>
  );
}
