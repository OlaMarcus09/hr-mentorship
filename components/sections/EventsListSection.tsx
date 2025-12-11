import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Event } from "@/types";

interface EventsListSectionProps {
  events: Event[];
}

export function EventsListSection({ events }: EventsListSectionProps) {
  return (
    <section className="py-20 container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden border-none shadow-lg flex flex-col h-full hover:shadow-xl transition-shadow">
            <div className="h-48 overflow-hidden relative">
              <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 bg-white dark:bg-card text-primary font-bold px-3 py-1 rounded text-sm shadow-sm">
                Upcoming
              </div>
            </div>
            <CardContent className="p-6 flex-1 flex flex-col">
              <div className="flex items-center text-sm text-cyan-600 dark:text-cyan-400 font-bold mb-2">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(event.date).toLocaleDateString()}
              </div>
              <h3 className="text-xl font-bold font-heading mb-2">{event.title}</h3>
              <p className="text-muted-foreground text-sm mb-6 flex-1">
                {event.summary}
              </p>
              
              <div className="space-y-3 pt-4 border-t border-border text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" /> {new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" /> {event.location}
                </div>
              </div>
              
              <Button className="w-full mt-6">Register Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
