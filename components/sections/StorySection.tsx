interface StorySectionProps {
  title: string;
  paragraphs: string[];
  imageUrl: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
}

export function StorySection({ 
  title, 
  paragraphs, 
  imageUrl, 
  imageAlt = "Story image",
  imagePosition = "right" 
}: StorySectionProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className={imagePosition === "right" ? "order-2 md:order-1" : "order-2"}>
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-primary mb-6">{title}</h2>
          <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className={`${imagePosition === "right" ? "order-1 md:order-2" : "order-1"} h-[300px] md:h-[400px] bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-xl`}>
          <img 
            src={imageUrl} 
            alt={imageAlt} 
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
