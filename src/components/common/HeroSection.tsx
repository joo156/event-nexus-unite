
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  bgImage?: string;
}

const HeroSection = ({ title, subtitle, bgImage }: HeroSectionProps) => {
  const bgStyle = bgImage
    ? {
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {
        background: `linear-gradient(135deg, #9b87f5 0%, #7E69AB 100%)`,
      };

  return (
    <div 
      style={bgStyle}
      className="relative w-full py-24 md:py-32"
    >
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 text-shadow animate-fade-in">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 md:mb-10">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-eventPrimary hover:bg-eventSecondary text-white px-8">
            Explore Events
          </Button>
          <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white/20 px-8">
            Become a Speaker
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
