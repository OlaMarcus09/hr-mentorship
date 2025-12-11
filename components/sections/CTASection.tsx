import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CTAButton {
  text: string;
  variant?: "default" | "outline";
  className?: string;
  onClick?: () => void;
}

interface CTASectionProps {
  badge?: string;
  title: string;
  description: string;
  buttons: CTAButton[];
  gradientClassName?: string;
}

export function CTASection({ 
  badge, 
  title, 
  description, 
  buttons, 
  gradientClassName = "bg-gradient-to-br from-purple-900 to-indigo-900" 
}: CTASectionProps) {
  return (
    <section className={`py-24 ${gradientClassName} text-center text-white`}>
      <div className="container mx-auto px-4">
        {badge && (
          <Badge className="bg-white/10 text-white hover:bg-white/20 mb-6 border-none px-4 py-1">{badge}</Badge>
        )}
        <h2 
          className="text-3xl md:text-5xl font-bold font-heading mb-6 leading-tight"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto mb-10 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {buttons.map((button, index) => (
            <Button 
              key={index}
              size="lg" 
              variant={button.variant || "default"}
              className={button.className || "rounded-full px-8 h-14 text-lg font-bold"}
              onClick={button.onClick}
            >
              {button.text}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
