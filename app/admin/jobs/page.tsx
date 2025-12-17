"use client"

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MOCK_JOBS } from "@/data/mock";
import { Plus, Trash2, Eye } from "lucide-react";

export default function AdminJobsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-heading">Job Listings</h1>
          <p className="text-muted-foreground">Manage open roles for the Remote HR board.</p>
        </div>
        <Button className="bg-primary">
          <Plus className="mr-2 h-4 w-4" /> Post New Job
        </Button>
      </div>

      <div className="rounded-xl border bg-white dark:bg-slate-900 overflow-hidden shadow">
        <Table>
          <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_JOBS.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-bold">{job.title}</TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell>{job.type}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500"><Eye className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500"><Trash2 className="h-4 w-4" /></Button>
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
