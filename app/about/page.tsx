import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-heading text-slate-900 dark:text-white mb-6">Our Story</h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            Founded in 2020, HR Mentorship began with a simple belief: <span className="text-primary font-bold">Great HR leaders are made, not just born.</span>
          </p>
        </div>

        {/* Image */}
        <div className="relative h-80 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
           <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200" alt="Team meeting" fill className="object-cover" />
        </div>

        {/* Content */}
        <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">The Journey</h3>
          <p>
            We noticed a gap in the industry. While there were many resources for technical skills, there was a lack of dedicated mentorship for the soft skills required to lead modern organizations. Today, we are a community of over 5,000 HR professionals.
          </p>
        </div>
        
        {/* COMMUNITY VOICE (TESTIMONIALS) - UPDATED: No Images */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-16">
           <h3 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-8 text-center">Community Voice</h3>
           <div className="grid md:grid-cols-2 gap-8">
              
              {/* Testimonial 1 */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                 <p className="text-slate-600 dark:text-slate-300 italic mb-6">"HR Mentorship gave me the confidence to step into a leadership role. The support is unmatched."</p>
                 <div>
                    <div className="font-bold text-slate-900 dark:text-white">Chioma N.</div>
                    <div className="text-sm text-primary font-bold uppercase tracking-wider">HR Manager, Lagos</div>
                 </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                 <p className="text-slate-600 dark:text-slate-300 italic mb-6">"I found my current job through the community network. It's more than just a group; it's a family."</p>
                 <div>
                    <div className="font-bold text-slate-900 dark:text-white">Emmanuel O.</div>
                    <div className="text-sm text-primary font-bold uppercase tracking-wider">Talent Acquisition Lead</div>
                 </div>
              </div>

           </div>
        </div>

      </div>
    </div>
  );
}
