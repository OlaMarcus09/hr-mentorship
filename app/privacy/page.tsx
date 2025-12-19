import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
        
        {/* Header */}
        <div className="mb-10">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-6 transition">
            <ArrowLeft size={18} /> Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Privacy Policy</h1>
          <p className="text-slate-500">Last Updated: December 19, 2025</p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-slate-600 dark:text-slate-300 leading-relaxed">
          
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Shield size={20} className="text-primary"/> 1. Introduction
            </h2>
            <p>
              Welcome to <strong>HR Mentorship</strong> ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or participate in our mentorship programs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Eye size={20} className="text-primary"/> 2. Information We Collect
            </h2>
            <p className="mb-4">We collect information that you voluntarily provide to us when you apply for mentorship, post a job, or contact us. This includes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Identity:</strong> Name, email address, phone number, and LinkedIn profile URL.</li>
              <li><strong>Professional Data:</strong> Resume/CV details, job history, and career goals (for mentorship matching).</li>
              <li><strong>Media:</strong> Profile photographs uploaded for the Experts Council or Gallery.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Lock size={20} className="text-primary"/> 3. How We Use Your Information
            </h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Facilitate the connection between Mentors and Mentees.</li>
              <li>Display public profiles for Approved Mentors on our Experts page.</li>
              <li>Process job postings and display them on our Job Board.</li>
              <li>Send you administrative information, such as updates to our terms or event reminders.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">4. Disclosure of Your Information</h2>
            <p>
              We do not sell your personal data. However, we may share information with:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li><strong>Service Providers:</strong> Third-party vendors (e.g., Cloudinary for image hosting, Neon for database storage) who perform services for us.</li>
              <li><strong>Legal Obligations:</strong> If required to do so by law or in response to valid requests by public authorities.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">5. Data Security</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. However, please be aware that no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">6. Contact Us</h2>
            <p>
              If you have questions or comments about this policy, you may email us at <a href="mailto:hello@hrmentorship.com" className="text-primary font-bold hover:underline">hello@hrmentorship.com</a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
