"use client"

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MOCK_TEAM, MOCK_EXPERTS } from "@/data/mock";
import { Plus, Trash2, Pencil } from "lucide-react";

export default function AdminTeamPage() {
  const allMembers = [...MOCK_TEAM.map(m => ({...m, type: 'Core Team'})), ...MOCK_EXPERTS.map(m => ({...m, type: 'Expert Council'}))];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-heading">Team & Experts</h1>
          <p className="text-muted-foreground">Manage profiles displayed on the About & Experts pages.</p>
        </div>
        <Button className="bg-primary">
          <Plus className="mr-2 h-4 w-4" /> Add Member
        </Button>
      </div>

      <div className="rounded-xl border bg-white dark:bg-slate-900 overflow-hidden shadow">
        <Table>
          <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
            <TableRow>
              <TableHead>Profile</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allMembers.map((member) => (
              <TableRow key={member.id + member.name}>
                <TableCell className="flex items-center gap-3 font-medium">
                   <Avatar>
                      <AvatarImage src={member.imageUrl} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                   </Avatar>
                   {member.name}
                </TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>
                   <span className={`px-2 py-1 rounded-full text-xs font-bold ${member.type === 'Core Team' ? 'bg-purple-100 text-purple-700' : 'bg-cyan-100 text-cyan-700'}`}>
                      {member.type}
                   </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500"><Pencil className="h-4 w-4" /></Button>
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
