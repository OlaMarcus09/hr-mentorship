import { Button } from "@/components/ui/button";
import { MOCK_JOBS } from "@/data/mock";
import { PageHero, SearchFilterBar, JobListingSection } from "@/components/sections";

export default function RemoteHRPage() {
  const sidebar = (
    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
      <h3 className="text-lg font-bold font-heading mb-2 text-primary">Need a Contract Template?</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Don&apos;t start a gig without protection. Download our standard HR Consultant Agreement.
      </p>
      <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
        Go to Resources
      </Button>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-muted">
      <PageHero
        title={
          <>
            The <span className="text-cyan-400 italic">Marketplace</span> for HR Talent
          </>
        }
        description="Whether you need an Interim HR Manager or a full-time Head of People, find them here."
        backgroundImage="https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&w=2000&q=80"
        overlayClassName="bg-slate-900/90"
      >
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 rounded-full h-12 text-lg">
            I want to Hire Talent
          </Button>
          <Button size="lg" variant="outline" className="text-cyan-400 border-cyan-500 hover:bg-cyan-950 px-8 rounded-full h-12 text-lg">
            I want to Find Work
          </Button>
        </div>
      </PageHero>

      <section className="py-12 container mx-auto px-4">
        <SearchFilterBar />
        <JobListingSection jobs={MOCK_JOBS} sidebar={sidebar} />
      </section>
    </div>
  );
}
