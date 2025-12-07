import { MOCK_BLOGS } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Calendar, User, Share2, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Define Props for the Page
interface PageProps {
  params: { id: string };
}

export default function BlogDetailPage({ params }: PageProps) {
  // 1. Find the blog post matching the ID
  const blog = MOCK_BLOGS.find((b) => b.id.toString() === params.id);

  // 2. Handle 404 if not found
  if (!blog) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pb-20">
      
      {/* Hero Header */}
      <div className="relative h-[400px] w-full bg-slate-900">
         <img 
           src={blog.imageUrl} 
           alt={blog.title} 
           className="w-full h-full object-cover opacity-60"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
         
         <div className="absolute bottom-0 w-full p-8 md:p-16 text-white container mx-auto">
            <Link href="/blog">
              <Button variant="ghost" className="text-white hover:text-cyan-400 mb-6 pl-0">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
              </Button>
            </Link>
            <Badge className="bg-cyan-500 mb-4">{blog.category}</Badge>
            <h1 className="text-3xl md:text-5xl font-bold font-heading leading-tight max-w-4xl">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 mt-6 text-slate-300">
               <div className="flex items-center gap-2">
                 <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center">
                    <User className="h-5 w-5" />
                 </div>
                 <span className="font-medium text-white">{blog.author}</span>
               </div>
               <div className="flex items-center gap-2">
                 <Calendar className="h-4 w-4" />
                 <span>{blog.createdAt}</span>
               </div>
            </div>
         </div>
      </div>

      {/* Content Body */}
      <div className="container mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Main Article */}
        <div className="lg:col-span-8">
           <article className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed font-body">
              <p className="text-xl text-foreground font-medium mb-8">
                 {blog.content}
              </p>
              <p>
                 [This is where the full rich-text content would go. Since we are using mock data, 
                 we are showing this placeholder. In the real app, this would be rendered from 
                 Markdown or HTML content coming from the backend.]
              </p>
              <h3 className="text-2xl font-bold font-heading text-foreground mt-8 mb-4">Why this matters</h3>
              <p>
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                 incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                 nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <blockquote className="border-l-4 border-cyan-500 pl-4 italic my-8 text-foreground">
                 "The greatest asset of any organization is its people. Protecting their wellbeing is 
                 not just charity, it's strategy."
              </blockquote>
              <p>
                 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                 fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
              </p>
           </article>

           {/* Tags */}
           <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-sm font-bold uppercase text-muted-foreground mb-4">Related Tags</h4>
              <div className="flex gap-2">
                 {blog.tags.map(tag => (
                   <Badge key={tag} variant="secondary">{tag}</Badge>
                 ))}
              </div>
           </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
           
           {/* Share Widget */}
           <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold font-heading mb-4 flex items-center gap-2">
                 <Share2 className="h-4 w-4" /> Share this Article
              </h3>
              <div className="flex gap-2">
                 <Button variant="outline" className="flex-1"><Linkedin className="h-4 w-4 mr-2" /> LinkedIn</Button>
                 <Button variant="outline" className="flex-1"><Twitter className="h-4 w-4 mr-2" /> Twitter</Button>
              </div>
           </div>

           {/* Newsletter Widget */}
           <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl">
              <h3 className="font-bold font-heading mb-2 text-primary">Don't miss an update</h3>
              <p className="text-sm text-muted-foreground mb-4">
                 Get the latest HR trends delivered to your inbox weekly.
              </p>
              <Input placeholder="Your email address" className="bg-white dark:bg-slate-950 mb-2" />
              <Button className="w-full">Subscribe</Button>
           </div>
        </div>

      </div>
    </div>
  );
}
