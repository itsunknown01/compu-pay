import Link from "next/link";


export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container flex h-14 items-center justify-between px-4 text-sm text-muted-foreground">
        <p>© {currentYear} CompuPay. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <Link
            href="/privacy"
            className="hover:text-foreground transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="hover:text-foreground transition-colors"
          >
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}
