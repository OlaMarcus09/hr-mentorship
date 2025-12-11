import { Button } from "@/components/ui/button";
import Link from "next/link";

interface GalleryItem {
  imageUrl: string;
  label: string;
  className?: string;
}

interface GallerySectionProps {
  title: string;
  description: string;
  items: GalleryItem[];
  buttonText?: string;
  buttonHref?: string;
}

export function GallerySection({ 
  title, 
  description, 
  items, 
  buttonText = "View Full Gallery",
  buttonHref = "/gallery" 
}: GallerySectionProps) {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">{title}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[400px]">
          {items.map((item, index) => (
            <div key={index} className={`rounded-3xl overflow-hidden relative group ${item.className || ''}`}>
              <img src={item.imageUrl} alt={item.label} className="w-full h-full object-cover" />
              <div className="absolute bottom-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">{item.label}</div>
            </div>
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
