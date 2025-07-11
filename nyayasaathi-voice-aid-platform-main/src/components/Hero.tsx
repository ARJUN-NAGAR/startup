import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, Smartphone, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-warm-gradient overflow-hidden pt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-primary animate-pulse-gentle"></div>
        <div className="absolute bottom-40 right-32 w-24 h-24 rounded-full bg-secondary animate-pulse-gentle"></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full bg-primary-light animate-pulse-gentle"></div>
      </div>

      <div className="container mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Legal Help,{" "}
              <span className="bg-hero-gradient bg-clip-text text-transparent">
                Just a Voice Away
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground/80 mb-4">
              कानूनी सहायता, बस एक आवाज़ दूर।
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-lg">
              NyayaSaathi simplifies legal paperwork and connects rural citizens with justice through AI.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="xl" className="group">
              <Smartphone className="mr-2 group-hover:scale-110 transition-transform" />
              Use the App
            </Button>
            <Button variant="secondary" size="xl" className="group">
              <MapPin className="mr-2 group-hover:scale-110 transition-transform" />
              Find a Kiosk
            </Button>
          </div>

          {/* Voice Feature Highlight */}
          <Card className="p-6 bg-card/80 backdrop-blur border-voice/20 shadow-voice">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-voice/20 flex items-center justify-center animate-voice-glow">
                <Mic className="w-6 h-6 text-voice" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Speak in Your Language</h3>
                <p className="text-muted-foreground">AI understands Hindi and local dialects</p>
              </div>
            </div>
          </Card>

          {/* Trust Indicators */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success"></div>
              <span>24/7 Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success"></div>
              <span>Government Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success"></div>
              <span>Free for All</span>
            </div>
          </div>
        </div>

        {/* Right Content - Hero Image */}
        <div className="relative animate-slide-up">
          <div className="relative rounded-2xl overflow-hidden shadow-strong">
            <img 
              src={heroImage} 
              alt="Rural Indian citizens accessing legal aid through NyayaSaathi"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-hero-gradient opacity-10"></div>
          </div>
          
          {/* Floating Stats */}
          <Card className="absolute -bottom-6 -left-6 p-4 bg-card shadow-warm">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">900M+</div>
              <div className="text-sm text-muted-foreground">Citizens Served</div>
            </div>
          </Card>
          
          <Card className="absolute -top-6 -right-6 p-4 bg-card shadow-warm">
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">24/7</div>
              <div className="text-sm text-muted-foreground">AI Support</div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};