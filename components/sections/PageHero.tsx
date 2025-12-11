import { ReactNode } from "react";

interface PageHeroProps {
  title: string | ReactNode;
  description?: string;
  backgroundImage: string;
  overlayClassName?: string;
  children?: ReactNode;
}

export function PageHero({ 
  title, 
  description, 
  backgroundImage, 
  overlayClassName = "bg-slate-900/85",
  children 
}: PageHeroProps) {
  return (
    <section className="relative py-24 flex items-center justify-center text-center text-white overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url("${backgroundImage}")` }}
      >
        <div className={`absolute inset-0 ${overlayClassName}`} />
      </div>
      <div className="relative z-10 container mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-semibold font-heading mb-6">{title}</h1>
        {description && (
          <p className="text-base md:text-xl text-white/80 max-w-2xl mx-auto font-body font-light leading-relaxed">
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
