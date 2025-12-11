import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { MapPin, Users } from "lucide-react";
import { Event } from "@/types";

interface EventsSectionProps {
  title: string;
  description: string;
  events: Event[];
  buttonText?: string;
  buttonHref?: string;
}

export function EventsSection({ 
  title, 
  description, 
  events, 
  buttonText = "View All Events",
  buttonHref = "/events" 
}: EventsSectionProps) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">{title}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {events.map((event) => (
            <Card key={event.id} className="flex flex-col md:flex-row overflow-hidden border-none shadow-lg rounded-3xl bg-card">
              <div className="p-8 flex-1">
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 dark:bg-purple-900 dark:text-purple-300 mb-4 px-3 py-1">Workshop</Badge>
                <h3 className="text-2xl font-bold font-heading mb-2">{event.title}</h3>
                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Virtual</span>
                  <span className="flex items-center gap-2"><Users className="h-4 w-4" /> 127 attending</span>
                </div>
                <Button variant="outline" className="rounded-full">Register Now</Button>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-8 flex flex-col justify-center items-center text-center min-w-[150px]">
                <span className="text-purple-600 dark:text-purple-400 font-bold text-lg">Feb 15, 2024</span>
                <span className="text-sm text-muted-foreground">2:00 PM EST</span>
              </div>
            </Card>
          ))}
        </div>
        
        {buttonHref && (
          <div className="text-center mt-12">
            <Link href={buttonHref}>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 h-12 text-lg">
                {buttonText}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
