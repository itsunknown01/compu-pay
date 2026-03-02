export default function LoginHeading() {
  return (
    <div className="mb-8">
      {/* Logo */}
      <div className="flex items-center gap-2.5 justify-center lg:justify-start mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-display font-extrabold text-lg leading-none">
            C
          </span>
        </div>
        <span className="font-display text-2xl font-bold text-foreground tracking-tight">
          Compu<span className="text-primary">Pay</span>
        </span>
      </div>

      <h1 className="text-3xl lg:text-4xl font-bold font-display text-foreground mb-4">
        Welcome back
      </h1>
      <p className="text-lg text-muted-foreground leading-relaxed">
        AI-powered payroll intelligence platform. Detect risks and compliance
        issues before they cost you.
      </p>
    </div>
  );
}
