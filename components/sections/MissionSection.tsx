import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface MissionSectionProps {
  badge?: string;
  title: string;
  description: string;
  quote?: string;
  linkText?: string;
  linkHref?: string;
}

export function MissionSection({ 
  badge, 
  title, 
  description, 
  quote, 
  linkText = "Explore More",
  linkHref = "/about" 
}: MissionSectionProps) {
  return (
    <section className="py-20 bg-background text-center">
      <div className="container mx-auto px-4 max-w-4xl">
        {badge && (
          <Badge variant="secondary" className="mb-6 bg-purple-100 text-purple-700 hover:bg-purple-100 dark:bg-purple-900 dark:text-purple-300 px-4 py-1">
            {badge}
          </Badge>
        )}
        <h2 className="text-3xl md:text-5xl font-bold font-heading mb-8 text-foreground leading-tight">
          {title}
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
          {description}
        </p>
        
        {quote && (
          <div className="bg-muted p-8 rounded-3xl border border-border my-12">
            <p className="text-xl md:text-2xl font-medium text-purple-900 dark:text-purple-300 italic font-heading">
              &quot;{quote}&quot;
            </p>
            {linkHref && (
              <div className="mt-6">
                <Link href={linkHref} className="text-purple-600 dark:text-purple-400 font-bold hover:underline inline-flex items-center">
                  {linkText} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
