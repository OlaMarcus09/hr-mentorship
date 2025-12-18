"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

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

    try {
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
    } catch (err) {
      alert("Something went wrong.");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-gray-600">Have questions about our mentorship programs? We're here to help.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        
        {/* Left Side: Contact Info */}
        <div className="bg-slate-50 p-8 rounded-2xl">
          <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email us</p>
                <p className="font-medium">hello@hrmentorship.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full text-green-600">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Call us</p>
                <p className="font-medium">+234 812 345 6789</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Visit us</p>
                <p className="font-medium">Ibadan, Nigeria</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: The Form */}
        <div className="bg-white border p-8 rounded-2xl shadow-sm">
          {success ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
              <p className="text-gray-600 mb-6">Thank you for reaching out. We will get back to you shortly.</p>
              <button 
                onClick={() => setSuccess(false)}
                className="text-blue-600 hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input 
                  name="name" 
                  required 
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea 
                  name="message" 
                  required 
                  rows={5}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="How can we help you?"
                />
              </div>

              <button 
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? "Sending..." : "Send Message"}
                {!loading && <Send size={18} />}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
