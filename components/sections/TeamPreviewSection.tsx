import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trophy } from "lucide-react";
import { TeamMember } from "@/types";

interface TeamPreviewSectionProps {
  title: string;
  description: string;
  members: TeamMember[];
  buttonText?: string;
  buttonHref?: string;
  maxDisplay?: number;
}

export function TeamPreviewSection({ 
  title, 
  description, 
  members, 
  buttonText = "View Full Team",
  buttonHref = "/experts",
  maxDisplay = 4 
}: TeamPreviewSectionProps) {
  const displayMembers = members.slice(0, maxDisplay);
  
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">{title}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayMembers.map((member) => (
            <Card key={member.id} className="text-center border-none shadow-sm hover:shadow-xl transition-shadow bg-card p-6 rounded-3xl">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-muted">
                <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold font-heading">{member.name}</h3>
              <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">{member.role}</p>
              <div className="flex justify-center gap-1 text-yellow-500 text-sm items-center">
                <Trophy className="h-3 w-3" /> 10+ years experience
              </div>
            </Card>
          ))}
        </div>
        
        {buttonHref && (
          <div className="text-center mt-12">
            <Link href={buttonHref}>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 h-12 text-lg">
                {buttonText}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
