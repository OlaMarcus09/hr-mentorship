import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_BLOGS } from "@/data/mock";
import { Search, Clock, User } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      
      {/* 1. Hero Header with Image */}
      <section className="relative py-24 text-center text-white overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ 
             backgroundImage: 'url("https://images.unsplash.com/photo-1499750310159-5254f4cc1555?auto=format&fit=crop&w=2000&q=80")',
          }}
        >
          {/* Darker overlay for text readability */}
          <div className="absolute inset-0 bg-slate-900/80" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-semibold font-heading mb-4">HR Insights & News</h1>
          <p className="text-base md:text-xl text-gray-200 mb-8 font-light max-w-2xl mx-auto">
            Stay updated with the latest trends in people management.
          </p>
          
          <div className="max-w-md mx-auto flex gap-2 bg-white/10 p-2 rounded-full backdrop-blur-sm border border-white/20">
            <div className="relative flex-1">
               <Search className="absolute left-3 top-3 h-5 w-5 text-gray-300" />
               <Input 
                 placeholder="Search articles..." 
                 className="pl-10 h-10 text-white placeholder:text-gray-300 bg-transparent border-none focus-visible:ring-0" 
               />
            </div>
            <Button className="rounded-full bg-cyan-500 hover:bg-cyan-600 px-6">Search</Button>
          </div>
        </div>
      </section>

      {/* 2. Blog Grid */}
      <section className="py-12 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_BLOGS.map((blog) => (
            <Card key={blog.id} className="border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full group">
              <div className="h-56 overflow-hidden relative cursor-pointer">
                 {/* Image Zoom Effect */}
                 <img 
                   src={blog.imageUrl} 
                   alt={blog.title} 
                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                 />
                 <div className="absolute top-4 left-4">
                   <Badge className="bg-card text-primary shadow-sm">{blog.category}</Badge>
                 </div>
              </div>
              
              <CardContent className="flex-1 p-6 pt-6">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                   <span className="flex items-center gap-1"><User className="h-3 w-3" /> {blog.author}</span>
                   <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
                <CardTitle className="text-lg md:text-xl font-bold font-heading leading-tight mb-3 group-hover:text-primary transition-colors">
                  <Link href={"/blog/" + blog.id}>
                    {blog.title}
                  </Link>
                </CardTitle>
                <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                  {blog.content}
                </p>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Link href={"/blog/" + blog.id} className="w-full">
                  <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/5 hover:text-primary text-sm font-semibold">
                    Read Article
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
