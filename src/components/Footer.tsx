export default function Footer() {
  return (
    <footer className="bg-primary px-6 py-16 md:px-16 md:py-20 lg:px-[120px]">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div>
            <h3 className="font-display text-2xl text-primary-foreground">Megam Drapes</h3>
            <p className="mt-3 max-w-xs font-body text-sm leading-relaxed text-primary-foreground/60">
              A curated atelier of India's finest handwoven silk sarees — 
              where heritage meets modern elegance.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.1em] text-gold-bright">Explore</p>
              <ul className="flex flex-col gap-2.5">
                {["Collections", "New Arrivals", "Heritage Weaves", "Bridal"].map((item) => (
                  <li key={item}>
                    <span className="cursor-pointer font-body text-sm text-primary-foreground/70 transition-colors duration-400 hover:text-gold-bright">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.1em] text-gold-bright">Atelier</p>
              <ul className="flex flex-col gap-2.5">
                {["Our Story", "Artisans", "Journal", "Contact"].map((item) => (
                  <li key={item}>
                    <span className="cursor-pointer font-body text-sm text-primary-foreground/70 transition-colors duration-400 hover:text-gold-bright">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="font-body text-xs text-primary-foreground/40">
            © 2026 Megam Drapes. All rights reserved.
          </p>
          <p className="font-body text-xs text-primary-foreground/40">
            Handcrafted with devotion in India
          </p>
        </div>
      </div>
    </footer>
  );
}
