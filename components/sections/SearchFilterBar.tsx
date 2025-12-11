import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";

interface SearchFilterBarProps {
  onSearch?: () => void;
}

export function SearchFilterBar({ onSearch }: SearchFilterBarProps) {
  return (
    <div className="bg-card p-4 rounded-2xl shadow-sm border border-border mb-8 flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search by role (e.g. Recruiter, Manager)" className="pl-10 border-none bg-muted h-11" />
      </div>
      <div className="relative w-full md:w-64">
        <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Location" className="pl-10 border-none bg-muted h-11" />
      </div>
      <Button className="h-11 px-8 bg-primary" onClick={onSearch}>Find Jobs</Button>
    </div>
  );
}
