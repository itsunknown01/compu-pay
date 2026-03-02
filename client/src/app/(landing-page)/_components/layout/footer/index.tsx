import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Platform", href: "#intelligence" },
        { name: "How It Works", href: "#process" },
        { name: "Results", href: "#metrics" },
        { name: "Pricing", href: "#cta" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press Kit", href: "#" },
        { name: "Contact", href: "#cta" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Compliance Hub", href: "#" },
        { name: "API Docs", href: "#" },
        { name: "Security", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { name: "GitHub", href: "#", icon: Github },
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "Email", href: "mailto:hello@compupay.com", icon: Mail },
  ];

  return (
    <footer
      className="relative bg-[#06060e] border-t border-white/[0.06]"
      role="contentinfo"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main footer */}
          <div className="py-14 lg:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
              {/* Brand column */}
              <div className="lg:col-span-2">
                {/* Logo */}
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-[var(--lp-accent)] flex items-center justify-center">
                    <span className="text-white font-display font-extrabold text-sm leading-none">
                      C
                    </span>
                  </div>
                  <span className="font-display text-lg font-bold text-white tracking-tight">
                    Compu
                    <span className="text-[var(--lp-accent-bright)]">Pay</span>
                  </span>
                </div>

                <p className="text-sm text-white/40 leading-relaxed mb-6 max-w-xs">
                  AI-powered payroll intelligence platform. Detect risks and
                  compliance issues before they cost you.
                </p>

                {/* Social links */}
                <div className="flex gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.08] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--lp-accent)]"
                        aria-label={`Follow us on ${social.name}`}
                        target={
                          social.href.startsWith("mailto:")
                            ? undefined
                            : "_blank"
                        }
                        rel={
                          social.href.startsWith("mailto:")
                            ? undefined
                            : "noopener noreferrer"
                        }
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Link columns */}
              {footerLinks.map((section, index) => (
                <div key={index}>
                  <h4 className="text-xs font-semibold text-white/60 uppercase tracking-[0.15em] mb-4">
                    {section.title}
                  </h4>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.href}
                          className="text-sm text-white/35 hover:text-white/80 transition-colors duration-300"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/[0.06] py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-xs text-white/30">
              © {currentYear} CompuPay. All rights reserved.
            </div>
            <div className="text-xs text-white/30">
              Built by Ayushman Gohain
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
