import { Card } from "@/components/ui/card";
import { Smartphone, Mic, Brain, FileText, Navigation, Users } from "lucide-react";

const steps = [
  {
    icon: Smartphone,
    title: "Open App or Visit Kiosk",
    description: "Access NyayaSaathi through our mobile app or visit your nearest kiosk",
    color: "primary"
  },
  {
    icon: Mic,
    title: "Speak Your Problem",
    description: "Tell us your legal issue in Hindi or your local language",
    color: "voice"
  },
  {
    icon: Brain,
    title: "AI Understands",
    description: "Our AI processes your problem and identifies the right solution",
    color: "secondary"
  },
  {
    icon: FileText,
    title: "Documents Auto-Generated",
    description: "Legal documents are automatically created based on your needs",
    color: "primary"
  },
  {
    icon: Navigation,
    title: "Voice Guidance for Submission",
    description: "Step-by-step audio instructions to submit your application",
    color: "voice"
  },
  {
    icon: Users,
    title: "Escalation to Paralegals",
    description: "Complex cases are handled by our trained Nyaya Mitra team",
    color: "secondary"
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple steps to get the legal help you need, designed for everyone in rural India
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isVoice = step.color === "voice";
            const isPrimary = step.color === "primary";
            const isSecondary = step.color === "secondary";
            
            return (
              <Card 
                key={index} 
                className={`p-6 hover:shadow-warm transition-all duration-300 hover:scale-105 animate-fade-in relative overflow-hidden group ${
                  isVoice ? 'border-voice/20' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-5 group-hover:opacity-10 transition-opacity">
                  <div className={`w-full h-full rounded-full ${
                    isPrimary ? 'bg-primary' : isSecondary ? 'bg-secondary' : 'bg-voice'
                  }`}></div>
                </div>

                <div className="relative z-10">
                  {/* Step Number */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      isPrimary ? 'bg-primary text-primary-foreground' : 
                      isSecondary ? 'bg-secondary text-secondary-foreground' : 
                      'bg-voice text-voice-foreground'
                    }`}>
                      {index + 1}
                    </div>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isPrimary ? 'bg-primary/10' : 
                      isSecondary ? 'bg-secondary/10' : 
                      'bg-voice/10 animate-voice-glow'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        isPrimary ? 'text-primary' : 
                        isSecondary ? 'text-secondary' : 
                        'text-voice'
                      }`} />
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 w-8 h-0.5 bg-gradient-to-r from-primary/20 to-transparent"></div>
                )}
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="inline-block p-8 bg-hero-gradient text-primary-foreground shadow-strong">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="mb-6 opacity-90">Join thousands of citizens already using NyayaSaathi</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-card text-foreground rounded-lg font-semibold hover:bg-card/90 transition-colors">
                Download App
              </button>
              <button className="px-6 py-3 border-2 border-card text-card rounded-lg font-semibold hover:bg-card hover:text-foreground transition-colors">
                Find Kiosk Near Me
              </button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};