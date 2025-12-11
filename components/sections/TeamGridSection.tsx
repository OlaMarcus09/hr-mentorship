import { Card, CardContent } from "@/components/ui/card";
import { Linkedin } from "lucide-react";
import { TeamMember } from "@/types";

interface TeamGridSectionProps {
  title: string;
  description: string;
  members: TeamMember[];
}

export function TeamGridSection({ title, description, members }: TeamGridSectionProps) {
  return (
    <section className="py-20 container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold font-heading">{title}</h2>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {members.map((member) => (
          <Card key={member.id} className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all group">
            <div className="aspect-square w-full overflow-hidden relative bg-slate-200 dark:bg-slate-800">
              <img 
                src={member.imageUrl} 
                alt={member.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-card p-2 rounded-full text-blue-600">
                  <Linkedin className="h-5 w-5" />
                </div>
              </div>
            </div>
            
            <CardContent className="p-5 text-center">
              <h3 className="text-lg font-bold font-heading">{member.name}</h3>
              <p className="text-primary font-medium text-sm mb-2">{member.role}</p>
              <p className="text-xs text-muted-foreground line-clamp-2">{member.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
