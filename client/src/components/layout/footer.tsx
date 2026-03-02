import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background/50">
      <div className="container flex h-14 items-center justify-between px-4 text-sm text-muted-foreground">
        <p>© {currentYear} CompuPay. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <Link
            href="/privacy"
            className="hover:text-foreground transition-colors duration-300"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="hover:text-foreground transition-colors duration-300"
          >
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}
