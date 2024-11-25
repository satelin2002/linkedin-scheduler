export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Brand/Logo Side */}
      <div className="hidden md:flex flex-col justify-between bg-muted p-10">
        <div className="flex items-center gap-2 text-lg font-medium">
          {/* Replace with your logo */}
          <div className="w-8 h-8 rounded-lg bg-primary" />
          Your Brand
        </div>
        <blockquote className="space-y-2">
          <p className="text-lg">
            "This platform has transformed how we handle our content strategy."
          </p>
          <footer className="text-sm">
            Sofia Davis, Content Manager at Acme Inc
          </footer>
        </blockquote>
      </div>

      {/* Auth Content Side */}
      <div className="flex items-center justify-center p-8">{children}</div>
    </div>
  );
}
