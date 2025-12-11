import { Button } from "@/components/ui/button";
import { MOCK_EVENTS } from "@/data/mock";
import { Plus } from "lucide-react";
import { PageHero, EventsListSection } from "@/components/sections";

export default function EventsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Upcoming Events"
        description="Webinars, Summits, and Workshops to level up your game."
        backgroundImage="https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=2000&q=80"
        overlayClassName="bg-primary/90 mix-blend-multiply"
      >
        <Button className="bg-white text-primary hover:bg-gray-100 rounded-full font-bold px-8">
          <Plus className="mr-2 h-4 w-4" /> Submit an Event
        </Button>
      </PageHero>

      <EventsListSection events={MOCK_EVENTS} />
    </div>
  );
}
