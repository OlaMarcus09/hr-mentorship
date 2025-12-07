import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_BLOGS } from "@/data/mock";
import { Search, Clock, User } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      
      {/* 1. Header & Search */}
      <section className="bg-primary py-20 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold font-heading mb-4">HR Insights & News</h1>
          <p className="text-xl text-primary-foreground/80 mb-8 font-light">
            Stay updated with the latest trends in people management.
          </p>
          
          <div className="max-w-xl mx-auto flex gap-2">
            <div className="relative flex-1">
               <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
               <Input 
                 placeholder="Search articles..." 
                 className="pl-10 h-12 text-black dark:text-white bg-white dark:bg-slate-900 border-none" 
               />
            </div>
            <Button size="lg" className="h-12 bg-cyan-500 hover:bg-cyan-600">Search</Button>
          </div>
        </div>
      </section>

      {/* 2. Blog Grid */}
      <section className="py-12 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_BLOGS.map((blog) => (
            <Card key={blog.id} className="border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
              <div className="h-56 overflow-hidden relative group cursor-pointer">
                 {/* Image Zoom Effect */}
                 <img 
                   src={blog.imageUrl} 
                   alt={blog.title} 
                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                 />
                 <div className="absolute top-4 left-4">
                   <Badge className="bg-white/90 text-primary hover:bg-white">{blog.category}</Badge>
                 </div>
              </div>
              
              <CardContent className="flex-1 p-6 pt-8">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                   <span className="flex items-center gap-1"><User className="h-3 w-3" /> {blog.author}</span>
                   <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {blog.createdAt}</span>
                </div>
                <CardTitle className="text-xl font-bold font-heading leading-tight mb-3">
                  <Link href={"/blog/" + blog.id} className="hover:text-cyan-600 transition-colors">
                    {blog.title}
                  </Link>
                </CardTitle>
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {blog.content}
                </p>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Link href={"/blog/" + blog.id} className="w-full">
                  <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/5 hover:text-primary">
                    Read Article
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Pagination Mockup */}
        <div className="flex justify-center mt-12 gap-2">
           <Button variant="outline" disabled>Previous</Button>
           <Button className="bg-primary">1</Button>
           <Button variant="outline">2</Button>
           <Button variant="outline">3</Button>
           <Button variant="outline">Next</Button>
        </div>
      </section>
    </div>
  );
}
