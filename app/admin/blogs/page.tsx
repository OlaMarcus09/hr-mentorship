"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MOCK_BLOGS } from "@/data/mock";
import { Plus, Search, Pencil, Trash2, Eye } from "lucide-react";
import Link from "next/link";

export default function AdminBlogsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading">Blog Posts</h1>
          <p className="text-muted-foreground">Manage your articles and news updates.</p>
        </div>
        <Link href="/admin/blogs/new">
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" /> Create New Post
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-lg border shadow-sm max-w-md">
        <Search className="h-4 w-4 text-muted-foreground ml-2" />
        <Input 
          placeholder="Search articles..." 
          className="border-none shadow-none focus-visible:ring-0" 
        />
      </div>

      {/* Data Table */}
      <div className="rounded-xl border bg-white dark:bg-slate-900 overflow-hidden shadow">
        <Table>
          <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_BLOGS.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell className="font-medium max-w-[300px] truncate">
                  {blog.title}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{blog.category}</Badge>
                </TableCell>
                <TableCell>{blog.author}</TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900 dark:text-green-300">
                    Published
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" title="View">
                      <Eye className="h-4 w-4 text-slate-500" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Edit">
                      <Pencil className="h-4 w-4 text-blue-500" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Delete">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
