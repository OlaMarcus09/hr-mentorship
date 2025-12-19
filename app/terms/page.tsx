import Link from "next/link";
import { ArrowLeft, FileText, AlertCircle, Scale } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
        
        {/* Header */}
        <div className="mb-10">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-6 transition">
            <ArrowLeft size={18} /> Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Terms of Service</h1>
          <p className="text-slate-500">Last Updated: December 19, 2025</p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-slate-600 dark:text-slate-300 leading-relaxed">
          
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <FileText size={20} className="text-primary"/> 1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using the <strong>HR Mentorship</strong> website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. Description of Service</h2>
            <p>
              HR Mentorship provides a platform for HR professionals to connect, including a Mentorship Program, Job Board, and Event listings. We reserve the right to modify, suspend, or discontinue any part of the service at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Scale size={20} className="text-primary"/> 3. User Conduct
            </h2>
            <p className="mb-4">You agree not to use the website to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Upload or distribute content that is unlawful, defamatory, harassing, or abusive.</li>
              <li>Impersonate any person or entity or falsely state your affiliation with a person or entity.</li>
              <li>Post false or misleading job applications or mentorship profiles.</li>
              <li>Engage in any automated use of the system, such as using scripts to send comments or messages.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">4. Intellectual Property</h2>
            <p>
              The content, organization, graphics, design, and other matters related to the Site are protected under applicable copyrights and other proprietary laws. The copying, redistribution, use, or publication by you of any such matters or any part of the Site is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <AlertCircle size={20} className="text-primary"/> 5. Disclaimer of Warranties
            </h2>
            <p>
              The services are provided on an "as is" and "as available" basis. HR Mentorship makes no representations or warranties of any kind, express or implied, as to the operation of their services, or the information, content, or materials included therein.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">6. Limitation of Liability</h2>
            <p>
              In no event shall HR Mentorship be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of our website or participation in our programs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">7. Contact Information</h2>
            <p>
              For any questions regarding these Terms, please contact us at <a href="mailto:hello@hrmentorship.com" className="text-primary font-bold hover:underline">hello@hrmentorship.com</a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
