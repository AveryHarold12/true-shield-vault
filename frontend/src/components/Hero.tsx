import heroBg from "@/assets/hero-bg.jpg";
import { Shield } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 animate-fade-in">
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">End-to-End Encrypted</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            Collect Truth
            <span className="block text-primary">Without Exposure.</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
            Each response is individually encrypted, ensuring complete anonymity with verifiable integrity.
            No one can trace answers back to respondents.
          </p>
        </div>
      </div>
    </section>
  );
};
