import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_BLOGS, MOCK_EVENTS } from "@/data/mock";
import Link from "next/link";
import { ArrowRight, Calendar, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      
      {/* SECTION 1: Featured Learning */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-2">Learning Centre</h2>
              <p className="text-muted-foreground">Latest resources and articles to boost your skills.</p>
            </div>
            <Button variant="outline" className="hidden md:flex">View All Resources <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_BLOGS.slice(0, 3).map((blog) => (
              <Card key={blog.id} className="hover:shadow-lg transition-shadow border-none shadow-md overflow-hidden">
                <div className="h-48 w-full bg-gray-200 relative">
                   <img src={blog.imageUrl} alt={blog.title} className="object-cover w-full h-full" />
                </div>
                <CardHeader>
                  <div className="flex gap-2 mb-2">
                    <Badge variant="secondary" className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100">{blog.category}</Badge>
                  </div>
                  <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-muted-foreground line-clamp-3 text-sm">{blog.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>{blog.author}</span>
                  <Link href={"/blog/" + blog.id} className="text-primary font-medium hover:underline">Read Article</Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: Upcoming Events */}
      <section className="py-20 bg-white dark:bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-12">
            <Calendar className="h-8 w-8 text-cyan-500" />
            <h2 className="text-3xl font-bold">Upcoming Events</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MOCK_EVENTS.map((event) => (
              <Card key={event.id} className="flex flex-col md:flex-row overflow-hidden border-l-4 border-l-primary">
                <div className="w-full md:w-1/3 bg-slate-100 flex items-center justify-center p-6">
                   <div className="text-center">
                      <div className="text-4xl font-bold text-primary">{new Date(event.date).getDate()}</div>
                      <div className="text-xl text-muted-foreground uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</div>
                   </div>
                </div>
                <div className="p-6 flex-1">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-muted-foreground mb-4">{event.summary}</p>
                  <div className="flex items-center text-sm text-cyan-600 dark:text-cyan-400 mb-4">
                    {event.location}
                  </div>
                  <Button size="sm">Register Now</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Experts CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <Users className="h-16 w-16 mx-auto mb-6 text-cyan-300" />
          <h2 className="text-4xl font-bold mb-6">Join the Experts Council</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Connect with seasoned HR veterans who have shaped the industry. 
            Get mentorship, advice, and career guidance.
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold rounded-full px-8">
            Find a Mentor
          </Button>
        </div>
      </section>
    </div>
  );
}
