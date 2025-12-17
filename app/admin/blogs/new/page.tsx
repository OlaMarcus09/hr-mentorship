"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function CreateBlogPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link href="/admin/blogs">
        <Button variant="ghost" className="pl-0 hover:pl-2 transition-all">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs
        </Button>
      </Link>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-heading">Write New Article</h1>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <Save className="mr-2 h-4 w-4" /> Publish Post
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Article Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input placeholder="e.g. The Future of Remote Work" className="text-lg font-bold" />
              </div>
              <div className="space-y-2">
                <Label>Content (Markdown supported)</Label>
                <Textarea placeholder="Start writing your masterpiece..." className="min-h-[400px] font-mono text-sm leading-relaxed" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Input placeholder="e.g. Management" />
              </div>
              <div className="space-y-2">
                <Label>Author Name</Label>
                <Input placeholder="e.g. Olawale Marcus" />
              </div>
              <div className="space-y-2">
                <Label>Cover Image URL</Label>
                <Input placeholder="https://..." />
                <p className="text-xs text-muted-foreground">Paste a Cloudinary URL here.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
