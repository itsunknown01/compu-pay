"use client";

interface FooterLinkProps {
  link: {
    name: string;
    href: string;
  };
}

export default function FooterLink({ link }: FooterLinkProps) {
  const handleLinkClick = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  return (
    <li>
      <a
        href={link.href}
        onClick={(e) => {
          if (link.href.startsWith("#")) {
            e.preventDefault();
            handleLinkClick(link.href);
          }
        }}
        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-sm"
      >
        {link.name}
      </a>
    </li>
  );
}
