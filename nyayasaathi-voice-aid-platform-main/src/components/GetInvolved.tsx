import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Store, 
  HandHeart, 
  GraduationCap, 
  Phone, 
  MessageCircle, 
  Mail,
  MapPin,
  Clock,
  Shield
} from "lucide-react";

const opportunities = [
  {
    icon: Store,
    title: "Become a Franchisee",
    description: "Set up a NyayaSaathi kiosk in your village and earn while serving your community",
    benefits: ["Monthly revenue potential", "Complete training provided", "Government backing"],
    cta: "Apply for Franchise",
    color: "primary"
  },
  {
    icon: HandHeart,
    title: "Partner with Us",
    description: "NGOs, Legal Services, and CSR partners can amplify our reach across rural India",
    benefits: ["Expand your impact", "Shared resources", "Joint funding opportunities"],
    cta: "Explore Partnership",
    color: "secondary"
  },
  {
    icon: GraduationCap,
    title: "Join as Nyaya Mitra",
    description: "Become a trained paralegal and help complex cases in your region",
    benefits: ["Professional certification", "Flexible working hours", "Meaningful work"],
    cta: "Become Nyaya Mitra",
    color: "voice"
  }
];

const contactMethods = [
  {
    icon: Phone,
    title: "Helpline",
    value: "1800-123-NYAYA",
    description: "Free call from any network",
    available: "24/7 Support"
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+91 98765 43210",
    description: "Voice messages supported",
    available: "9 AM - 9 PM"
  },
  {
    icon: Mail,
    title: "Email",
    value: "help@nyayasaathi.in",
    description: "Detailed queries welcome",
    available: "Response within 24hrs"
  }
];

const kioskFeatures = [
  "Voice-guided interface in local languages",
  "Document scanning and printing",
  "Video calls with paralegals",
  "Government form auto-fill",
  "Aadhaar integration",
  "Offline mode for remote areas"
];

export const GetInvolved = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get Involved
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join our mission to make legal aid accessible to every Indian citizen. Multiple ways to contribute and grow with us.
          </p>
        </div>

        {/* Opportunities */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {opportunities.map((opportunity, index) => {
            const Icon = opportunity.icon;
            const isPrimary = opportunity.color === "primary";
            const isSecondary = opportunity.color === "secondary";
            const isVoice = opportunity.color === "voice";
            
            return (
              <Card 
                key={index}
                className={`p-8 hover:shadow-warm transition-all duration-300 hover:scale-105 animate-fade-in group ${
                  isVoice ? 'border-voice/20' : ''
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="space-y-6">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${
                    isPrimary ? 'bg-primary/10' : 
                    isSecondary ? 'bg-secondary/10' : 
                    'bg-voice/10'
                  }`}>
                    <Icon className={`w-8 h-8 ${
                      isPrimary ? 'text-primary' : 
                      isSecondary ? 'text-secondary' : 
                      'text-voice'
                    }`} />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {opportunity.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {opportunity.description}
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Key Benefits:</h4>
                    <ul className="space-y-1">
                      {opportunity.benefits.map((benefit, bIndex) => (
                        <li key={bIndex} className="text-sm text-muted-foreground flex items-center">
                          <div className={`w-1.5 h-1.5 rounded-full mr-2 ${
                            isPrimary ? 'bg-primary' : 
                            isSecondary ? 'bg-secondary' : 
                            'bg-voice'
                          }`}></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <Button 
                    variant={isPrimary ? "default" : isSecondary ? "secondary" : "voice"}
                    className="w-full"
                  >
                    {opportunity.cta}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Contact & Support */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Methods */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8">Contact & Support</h3>
            <div className="space-y-6">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <Card 
                    key={index}
                    className="p-6 hover:shadow-warm transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-foreground">{method.title}</h4>
                          <div className="flex items-center gap-1 text-xs text-success">
                            <Clock className="w-3 h-3" />
                            {method.available}
                          </div>
                        </div>
                        <p className="text-lg font-mono text-primary mb-1">{method.value}</p>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Kiosk Information */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8">Our Kiosks</h3>
            <Card className="p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-primary" />
                <h4 className="text-lg font-semibold text-foreground">Find a Kiosk Near You</h4>
              </div>
              <p className="text-muted-foreground mb-4">
                Located in village centers, post offices, and community halls for easy access.
              </p>
              <Button variant="outline" className="w-full">
                <MapPin className="w-4 h-4 mr-2" />
                View Kiosk Locations
              </Button>
            </Card>

            <Card className="p-6">
              <h4 className="text-lg font-semibold text-foreground mb-4">Kiosk Features</h4>
              <div className="grid grid-cols-1 gap-2">
                {kioskFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-success flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* FAQ Teaser */}
        <Card className="p-8 bg-muted/30 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">Have Questions?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our comprehensive FAQ section covers everything from how to use the app to becoming a partner. Get instant answers to common questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default">
              View FAQ
            </Button>
            <Button variant="voice">
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat with AI Assistant
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};