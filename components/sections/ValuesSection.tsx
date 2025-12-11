import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBgColor: string;
  iconColor: string;
}

interface ValuesSectionProps {
  title: string;
  values: Value[];
}

export function ValuesSection({ title, values }: ValuesSectionProps) {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold font-heading mb-12">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index} className="border-none shadow-lg py-8 bg-card">
                <CardContent className="flex flex-col items-center">
                  <div className={`h-16 w-16 ${value.iconBgColor} rounded-full flex items-center justify-center mb-6`}>
                    <Icon className={`h-8 w-8 ${value.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
