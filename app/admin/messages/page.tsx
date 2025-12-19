"use client";

import { useState, useEffect } from "react";
import { Mail, Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-10 text-center text-slate-500">Loading messages...</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="p-2 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition">
            <ArrowLeft size={20}/>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Inbox</h1>
        </div>

        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 p-12 rounded-xl text-center border border-dashed dark:border-slate-800">
              <Mail size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">No Messages Yet</h3>
              <p className="text-slate-500">Messages sent via the contact form will appear here.</p>
            </div>
          ) : (
            messages.map((msg: any) => (
              <div key={msg.id} className="bg-white dark:bg-slate-900 border dark:border-slate-800 p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-full flex items-center justify-center">
                      <User size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">{msg.name}</h3>
                      <a href={`mailto:${msg.email}`} className="text-sm text-primary hover:underline">{msg.email}</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Calendar size={14} />
                    {new Date(msg.createdAt).toLocaleDateString()} at {new Date(msg.createdAt).toLocaleTimeString()}
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-lg text-slate-700 dark:text-slate-300 text-sm leading-relaxed border dark:border-slate-800">
                  {msg.message}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
