import { Card } from "@/components/ui/card";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  Shield,
  Award,
  CheckCircle
} from "lucide-react";

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" }
];

const footerLinks = {
  "Quick Links": [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Problems We Solve", href: "#problems" },
    { label: "About Us", href: "#about" },
    { label: "Get Involved", href: "#get-involved" }
  ],
  "Support": [
    { label: "Help Center", href: "#" },
    { label: "User Guide", href: "#" },
    { label: "Kiosk Locations", href: "#" },
    { label: "Contact Support", href: "#" }
  ],
  "Legal": [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Data Protection", href: "#" }
  ],
  "Partners": [
    { label: "Become Franchisee", href: "#" },
    { label: "NGO Partnerships", href: "#" },
    { label: "Nyaya Mitra Program", href: "#" },
    { label: "Corporate CSR", href: "#" }
  ]
};

const supporters = [
  "NALSA - National Legal Services Authority",
  "DLSA - District Legal Services Authority", 
  "PMGDISHA - Digital Literacy Mission",
  "BharatNet - Digital Infrastructure",
  "Jan Aushadhi - Government Initiative",
  "Common Service Centers"
];

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">NyayaSaathi</h3>
                <p className="text-background/80 text-sm leading-relaxed">
                  Empowering rural India with accessible legal aid through AI technology and human compassion.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-background/80">
                  <Phone className="w-4 h-4" />
                  <span>1800-123-NYAYA (Free)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-background/80">
                  <Mail className="w-4 h-4" />
                  <span>help@nyayasaathi.in</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-background/80">
                  <MapPin className="w-4 h-4" />
                  <span>New Delhi, India</span>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="font-semibold mb-3">Follow Us</h4>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        aria-label={social.label}
                        className="w-8 h-8 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-semibold mb-4">{category}</h4>
                <ul className="space-y-2">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-sm text-background/80 hover:text-background transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Supporters Section */}
        <div className="py-8 border-t border-background/20">
          <div className="text-center mb-6">
            <h4 className="font-semibold mb-4 flex items-center justify-center gap-2">
              <Award className="w-5 h-5" />
              Supported By
            </h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {supporters.map((supporter, index) => (
              <div
                key={index}
                className="text-center p-3 rounded-lg bg-background/5 hover:bg-background/10 transition-colors"
              >
                <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-background/10 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <p className="text-xs text-background/80 leading-tight">
                  {supporter}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="py-6 border-t border-background/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm text-background/80">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Government Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Data Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>ISO Certified</span>
              </div>
            </div>
            
            <div className="text-sm text-background/60">
              Available in 12+ regional languages
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-background/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/80">
            <div>
              © 2024 NyayaSaathi. All rights reserved. Made with ❤️ for rural India.
            </div>
            <div className="flex items-center gap-4">
              <span>🇮🇳 Proudly Indian</span>
              <span>•</span>
              <a href="#" className="hover:text-background transition-colors">
                Download App
              </a>
              <span>•</span>
              <a href="#" className="hover:text-background transition-colors">
                Find Kiosk
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};