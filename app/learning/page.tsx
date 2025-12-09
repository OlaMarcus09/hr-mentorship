import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MOCK_BOOK, MOCK_RESOURCES } from "@/data/mock";
import { BookOpen, Download, PlayCircle, FileText, ArrowRight, Lock } from "lucide-react";

export default function LearningCentre() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      
      {/* 1. Page Header with Image */}
      <section className="relative py-24 text-center text-white overflow-hidden">
         <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ 
             backgroundImage: 'url("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2000&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-primary/90 mix-blend-multiply" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl font-bold font-heading mb-4">Learning Centre</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto font-light font-body">
            Curated resources, templates, and insights to accelerate your HR journey.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-16">
        
        {/* 2. Book of the Month Spotlight */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="h-6 w-6 text-orange-500" />
            <h2 className="text-2xl font-bold font-heading">Book of the Month</h2>
          </div>
          
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-8 items-center">
            {/* Book Cover */}
            <div className="w-48 h-72 bg-slate-200 shrink-0 shadow-lg rounded-md overflow-hidden relative">
               <img src={MOCK_BOOK.imageUrl} alt={MOCK_BOOK.title} className="w-full h-full object-cover" />
               <div className="absolute top-2 right-2">
                 <Badge className="bg-orange-500 hover:bg-orange-600">Featured</Badge>
               </div>
            </div>
            
            {/* Book Details */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <h3 className="text-3xl font-bold font-heading">{MOCK_BOOK.title}</h3>
              <p className="text-xl text-cyan-600 dark:text-cyan-400 font-medium">by {MOCK_BOOK.author}</p>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                {MOCK_BOOK.description}
                <br className="mb-4" />
                This month's pick dives deep into the psychology of high-performance teams.
              </p>
              <div className="pt-4 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                <Button size="lg" className="rounded-full">Get this Book</Button>
                <Button variant="outline" size="lg" className="rounded-full">Join Discussion</Button>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Resource Library (Tabs) */}
        <section>
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-2">
                <Download className="h-6 w-6 text-cyan-500" />
                <h2 className="text-2xl font-bold font-heading">Resource Hub</h2>
             </div>
             <Badge variant="outline" className="border-cyan-500 text-cyan-600 gap-1 hidden md:flex">
                <Lock className="h-3 w-3" /> Member Access
             </Badge>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-[400px] mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="videos">Webinars</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {MOCK_RESOURCES.map((resource) => (
                  <Card key={resource.id} className="hover:border-cyan-400 transition-colors cursor-pointer group">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-cyan-100 transition-colors">
                        {resource.type === 'DOCUMENT' ? (
                          <FileText className="h-6 w-6 text-slate-600 group-hover:text-cyan-600" />
                        ) : (
                          <PlayCircle className="h-6 w-6 text-slate-600 group-hover:text-cyan-600" />
                        )}
                      </div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <CardDescription>{resource.type}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {resource.description}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="text-cyan-600 p-0 hover:bg-transparent hover:underline">
                        Download Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  );
}
