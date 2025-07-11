import { Card } from "@/components/ui/card";
import { Target, Eye, Users, MapPin, Award, TrendingUp } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description: "Empowering 900 million underserved Indians with accessible legal aid through technology and human support.",
    highlight: "900M+ Citizens"
  },
  {
    icon: Eye,
    title: "Our Vision", 
    description: "Building India's Digital Legal Infrastructure to ensure justice is accessible to every citizen, regardless of location or economic status.",
    highlight: "Digital-First"
  }
];

const team = [
  {
    name: "Dr. Priya Sharma",
    role: "Founder & CEO",
    background: "Former Legal Aid Lawyer, IIT Delhi",
    expertise: "Rural Development & Legal Tech"
  },
  {
    name: "Rajesh Kumar",
    role: "CTO",
    background: "Ex-Google AI Engineer, IIT Bombay", 
    expertise: "AI/ML & Voice Technology"
  },
  {
    name: "Meera Patel",
    role: "Head of Operations",
    background: "Former NALSA Program Manager",
    expertise: "Legal Aid Implementation"
  }
];

const milestones = [
  {
    year: "2023",
    achievement: "Founded NyayaSaathi",
    description: "Started with pilot program in 50 villages"
  },
  {
    year: "2024", 
    achievement: "1000+ Villages Covered",
    description: "Expanded to 5 states with government partnership"
  },
  {
    year: "2024",
    achievement: "AI Voice Support",
    description: "Launched multilingual AI in 12 regional languages"
  },
  {
    year: "2025",
    achievement: "National Expansion",
    description: "Targeting 10,000 villages across India"
  }
];

export const About = () => {
  return (
    <section className="py-20 bg-warm-gradient">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            About NyayaSaathi
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're on a mission to democratize legal access for rural India through innovative technology and human-centered design.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card 
                key={index}
                className="p-8 hover:shadow-warm transition-all duration-300 hover:scale-105 animate-fade-in group"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{value.title}</h3>
                      <div className="text-primary font-semibold">{value.highlight}</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {value.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Founding Team */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12">
            Founding Team
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card 
                key={index}
                className="p-6 text-center hover:shadow-warm transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-foreground">{member.name}</h4>
                    <p className="text-primary font-semibold">{member.role}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{member.background}</p>
                    <p className="text-sm font-medium text-secondary">{member.expertise}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Journey & Milestones */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12">
            Our Journey
          </h3>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 transform md:-translate-x-0.5"></div>
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div 
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full transform -translate-x-1.5 md:-translate-x-1.5 z-10"></div>
                  
                  {/* Content */}
                  <Card 
                    className={`ml-12 md:ml-0 p-6 w-full md:w-5/12 ${
                      index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                    } hover:shadow-warm transition-all duration-300 animate-fade-in`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                          {milestone.year.slice(-2)}
                        </div>
                        <h4 className="text-lg font-bold text-foreground">{milestone.achievement}</h4>
                      </div>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <Card className="p-8 bg-primary/5 border-primary/20">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Our Impact So Far</h3>
            <p className="text-muted-foreground">Real numbers from real people we've helped</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "50,000+", label: "Citizens Helped", icon: Users },
              { number: "1,000+", label: "Villages Covered", icon: MapPin },
              { number: "95%", label: "Success Rate", icon: Award },
              { number: "12", label: "Languages Supported", icon: TrendingUp }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-primary">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </section>
  );
};