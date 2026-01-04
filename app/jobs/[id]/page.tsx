"use client";

import { useState, useEffect } from "react";
import { MapPin, Clock, DollarSign, Briefcase, ArrowLeft, Building, ExternalLink, Mail } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function JobDetailsPage() {
  const params = useParams();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        if (Array.isArray(data)) {
            const found = data.find((j: any) => j.id.toString() === params.id);
            setJob(found);
        }
      } catch (error) {
        console.error("Failed to load job");
      } finally {
        setLoading(false);
      }
    }
    if (params.id) fetchJob();
  }, [params.id]);

  // HELPER: Format Date Safely
  const formatDate = (dateString: string) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    // If date is invalid, return fallback
    if (isNaN(date.getTime())) return "Recently";
    return date.toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  // HELPER: Strict Link Detection
  const getSafeLink = (link: string) => {
    if (!link) return "#";
    const cleanLink = link.trim();

    // 1. Trust existing protocols
    if (cleanLink.startsWith('http://') || cleanLink.startsWith('https://')) return cleanLink;
    if (cleanLink.startsWith('mailto:')) return cleanLink;
    
    // 2. STRICT Email Check: Must match pattern "user@domain.com"
    // (No slashes allowed, must have @, must have dot after @)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailPattern.test(cleanLink)) {
        return `mailto:${cleanLink}`;
    }
    
    // 3. Fallback: Treat as Website (add https://)
    return `https://${cleanLink}`;
  };

  if (loading) return <div className="min-h-screen pt-32 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  
  if (!job) return (
    <div className="min-h-screen pt-32 text-center px-6">
        <h1 className="text-2xl font-bold">Job not found</h1>
        <Link href="/jobs" className="text-primary hover:underline mt-4 block">Back to Jobs</Link>
    </div>
  );

  const safeApplyLink = getSafeLink(job.applyLink);
  const isEmail = safeApplyLink.startsWith('mailto:');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/jobs" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-8 font-bold text-sm">
          <ArrowLeft size={16}/> Back to Jobs
        </Link>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-10 shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex flex-col md:flex-row justify-between md:items-start gap-6 mb-8">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">{job.title}</h1>
                    <div className="flex items-center gap-2 text-xl font-bold text-slate-600 dark:text-slate-400">
                        <Building size={20}/> {job.company}
                    </div>
                </div>
                
                {/* SMART APPLY BUTTON */}
                <a 
                  href={safeApplyLink} 
                  target={isEmail ? "_self" : "_blank"} 
                  rel="noopener noreferrer"
                  className={`px-8 py-3 font-bold rounded-xl transition shadow-lg text-center whitespace-nowrap flex items-center gap-2
                    ${isEmail 
                        ? "bg-slate-800 text-white hover:bg-slate-700 shadow-slate-200" 
                        : "bg-primary text-white hover:bg-primary/90 shadow-primary/20"
                    }`}
                >
                  {isEmail ? <Mail size={18}/> : <ExternalLink size={18}/>}
                  {isEmail ? "Send Email" : "Apply Now"}
                </a>
            </div>

            <div className="flex flex-wrap gap-4 mb-10 pb-10 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg font-medium text-slate-600 dark:text-slate-300">
                    <MapPin size={18} className="text-primary"/> {job.location}
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg font-medium text-slate-600 dark:text-slate-300">
                    <DollarSign size={18} className="text-green-500"/> {job.salary}
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg font-medium text-slate-600 dark:text-slate-300">
                    <Briefcase size={18} className="text-blue-500"/> {job.type}
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg font-medium text-slate-600 dark:text-slate-300">
                    <Clock size={18} className="text-orange-500"/> Posted {formatDate(job.createdAt)}
                </div>
            </div>

            <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-bold mb-4">Job Description</h3>
                <p className="whitespace-pre-wrap text-slate-600 dark:text-slate-400 leading-relaxed">{job.description}</p>
            </div>
            
            <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
                <p className="text-slate-500 mb-6">Interested in this role?</p>
                <a 
                  href={safeApplyLink} 
                  target={isEmail ? "_self" : "_blank"} 
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-10 py-4 font-bold rounded-xl transition shadow-xl
                    ${isEmail 
                        ? "bg-slate-800 text-white hover:bg-slate-700 shadow-slate-200" 
                        : "bg-primary text-white hover:bg-primary/90 shadow-primary/20"
                    }`}
                >
                  {isEmail ? "Send Email Application" : "Apply for this Position"}
                </a>
            </div>
        </div>
      </div>
    </div>
  );
}
