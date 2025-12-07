import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MOCK_EXPERTS } from "@/data/mock";
import { Linkedin } from "lucide-react";

export default function ExpertsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary py-20 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">The Experts Council</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto font-light">
            A collective of the most seasoned HR veterans in the industry, dedicated to guiding the next generation.
          </p>
        </div>
      </section>

      {/* Experts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_EXPERTS.map((expert) => (
              <Card key={expert.id} className="text-center hover:shadow-xl transition-all duration-300 border-none bg-slate-50 dark:bg-slate-900">
                <CardHeader className="flex flex-col items-center pt-8">
                  <div className="relative">
                    <Avatar className="h-40 w-40 border-4 border-white shadow-md">
                      {/* FIX: Removed objectFit prop, added className="object-cover" */}
                      <AvatarImage src={expert.imageUrl} className="object-cover" />
                      <AvatarFallback>{expert.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-2 right-2 bg-blue-600 rounded-full p-2 text-white shadow-sm">
                        <Linkedin className="h-4 w-4" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-8">
                  <h3 className="text-2xl font-bold font-heading mb-1">{expert.name}</h3>
                  <p className="text-cyan-600 dark:text-cyan-400 font-medium mb-4">{expert.role}</p>
                  <div className="inline-block bg-white dark:bg-black/20 px-4 py-1 rounded-full text-sm text-muted-foreground border">
                    {expert.company}
                  </div>
                  <div className="mt-6">
                    <Button variant="outline" className="rounded-full">Request Mentorship</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 bg-slate-900 text-white text-center">
         <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-heading mb-4">Are you an HR Veteran?</h2>
            <p className="mb-8 text-slate-300">Join the council and give back to the community.</p>
            <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white">Apply to Join</Button>
         </div>
      </section>
    </div>
  );
}
