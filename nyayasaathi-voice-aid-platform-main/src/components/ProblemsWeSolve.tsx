import { Card } from "@/components/ui/card";
import { 
  CreditCard, 
  Award, 
  MapPin, 
  AlertTriangle, 
  Gift, 
  Shield,
  FileText,
  Users,
  Clock
} from "lucide-react";

const problems = [
  {
    icon: CreditCard,
    title: "Aadhaar Issues",
    description: "Update, correction, and new Aadhaar card applications",
    examples: ["Address change", "Name correction", "Mobile number update"],
    color: "primary"
  },
  {
    icon: Award,
    title: "Pension & Certificates",
    description: "Government pension schemes and certificate applications",
    examples: ["Old age pension", "Caste certificate", "Income certificate"],
    color: "secondary"
  },
  {
    icon: MapPin,
    title: "Land Disputes",
    description: "Property and land-related legal documentation",
    examples: ["Property registration", "Land mutation", "Boundary disputes"],
    color: "primary"
  },
  {
    icon: AlertTriangle,
    title: "Court Notices",
    description: "Understanding and responding to legal notices",
    examples: ["Traffic challans", "Civil court notices", "Legal summons"],
    color: "voice"
  },
  {
    icon: Gift,
    title: "Welfare Schemes",
    description: "Access to government welfare and subsidy programs",
    examples: ["PM-KISAN", "Ayushman Bharat", "Housing schemes"],
    color: "secondary"
  },
  {
    icon: Shield,
    title: "Legal Fraud Protection",
    description: "Reporting and protection from legal fraud",
    examples: ["Document forgery", "Land grabbing", "Fake schemes"],
    color: "primary"
  }
];

const stats = [
  { number: "50+", label: "Types of Legal Issues", icon: FileText },
  { number: "1000+", label: "Villages Covered", icon: MapPin },
  { number: "24/7", label: "AI Support Available", icon: Clock },
  { number: "500+", label: "Trained Paralegals", icon: Users }
];

export const ProblemsWeSolve = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Problems We Solve
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From everyday documentation to complex legal issues, NyayaSaathi provides solutions for the most common legal challenges faced by rural India
          </p>
        </div>

        {/* Problem Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            const isPrimary = problem.color === "primary";
            const isSecondary = problem.color === "secondary";
            const isVoice = problem.color === "voice";
            
            return (
              <Card 
                key={index}
                className={`p-6 hover:shadow-warm transition-all duration-300 hover:scale-105 animate-fade-in group ${
                  isVoice ? 'border-voice/20 hover:border-voice/40' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="space-y-4">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${
                    isPrimary ? 'bg-primary/10' : 
                    isSecondary ? 'bg-secondary/10' : 
                    'bg-voice/10'
                  }`}>
                    <Icon className={`w-7 h-7 ${
                      isPrimary ? 'text-primary' : 
                      isSecondary ? 'text-secondary' : 
                      'text-voice'
                    }`} />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {problem.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {problem.description}
                    </p>
                  </div>

                  {/* Examples */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Common Examples:</h4>
                    <ul className="space-y-1">
                      {problem.examples.map((example, exIndex) => (
                        <li key={exIndex} className="text-sm text-muted-foreground flex items-center">
                          <div className={`w-1.5 h-1.5 rounded-full mr-2 ${
                            isPrimary ? 'bg-primary' : 
                            isSecondary ? 'bg-secondary' : 
                            'bg-voice'
                          }`}></div>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={index} 
                className="p-6 text-center group hover:shadow-warm transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="inline-block p-8 bg-muted/50 border-primary/20">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Don't See Your Problem?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg">
              Our AI is continuously learning. Describe your legal issue and we'll connect you with the right resources.
            </p>
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary-dark transition-colors">
              Ask NyayaSaathi
            </button>
          </Card>
        </div>
      </div>
    </section>
  );
};