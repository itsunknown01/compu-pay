import { Separator } from '@/components/ui/separator';
import {
  Github,
  Linkedin,
  Mail,
  Twitter
} from 'lucide-react';
import FooterLink from './footer-link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '#features' },
        { name: 'Services', href: '#services' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'API Documentation', href: '#docs' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#about' },
        { name: 'Careers', href: '#careers' },
        { name: 'Contact', href: '#contact' },
        { name: 'Press Kit', href: '#press' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Help Center', href: '#help' },
        { name: 'Payroll Guide', href: '#guide' },
        { name: 'Compliance Hub', href: '#compliance' },
        { name: 'Webinars', href: '#webinars' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#privacy' },
        { name: 'Terms of Service', href: '#terms' },
        { name: 'Security', href: '#security' },
        { name: 'Compliance', href: '#compliance' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'GitHub', href: '#github', icon: Github },
    { name: 'Twitter', href: '#twitter', icon: Twitter },
    { name: 'LinkedIn', href: '#linkedin', icon: Linkedin },
    { name: 'Email', href: 'mailto:hello@payrollai.com', icon: Mail }
  ];

  return (
    <footer className="bg-card border-t border-border" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {}
          <div className="py-12 lg:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
              {}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-primary mb-4">PayrollAI</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    Revolutionizing payroll management with artificial intelligence. 
                    Streamline your HR operations with our secure, compliant, and intelligent platform.
                  </p>
                </div>
                
                {}
                <div className="flex space-x-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        className="p-2 text-muted-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-sm"
                        aria-label={`Follow us on ${social.name}`}
                        target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                        rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {}
              {footerLinks.map((section, index) => (
                <div key={index} className="lg:col-span-1">
                  <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                    {section.title}
                  </h4>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <FooterLink link={link} key={linkIndex} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {}
          <div className="py-6 flex flex-col sm:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground mb-4 sm:mb-0">
              © {currentYear} PayrollAI. All rights reserved.
            </div>
            
              <div className="text-sm text-muted-foreground">
                Built by Ayushman Gohain 
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}