export default function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 animate-spin rounded-full border border-gold/20 border-t-gold" />
        </div>
        <p className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Weaving
        </p>
      </div>
    </div>
  );
}
