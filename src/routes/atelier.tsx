import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import fabricSelection from "@/assets/atelier-fabric-selection.jpg";
import zariDetail from "@/assets/atelier-zari-detail.jpg";
import sareeTexture3 from "@/assets/saree-texture-3.jpg";
import sareeIvory from "@/assets/saree-ivory-banarasi.jpg";

export const Route = createFileRoute("/atelier")({
  component: AtelierPage,
  head: () => ({
    meta: [
      { title: "The Atelier — Megam Drapes" },
      { name: "description", content: "Step inside the Megam Drapes atelier — where silk is curated, motifs are designed, and every saree is born from intention." },
      { property: "og:title", content: "The Atelier — Megam Drapes" },
      { property: "og:description", content: "Behind the scenes of India's most refined silk saree atelier." },
    ],
  }),
});

function ParallaxImage({ src, alt, speed = 0.3 }: { src: string; alt: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}px`, `${speed * 100}px`]);

  return (
    <div ref={ref} className="h-full overflow-hidden">
      <motion.img src={src} alt={alt} style={{ y }} className="h-full w-full object-cover scale-110" loading="lazy" width={1024} height={1024} />
    </div>
  );
}

const stages = [
  {
    num: "I",
    title: "Silk Sourcing",
    desc: "We source only the purest mulberry silk from heritage farms in Karnataka and Tamil Nadu. Each batch is hand-inspected for lustre, tensile strength, and natural sheen before being accepted into our collection.",
    image: sareeTexture3,
  },
  {
    num: "II",
    title: "Motif Design",
    desc: "Our design studio blends centuries-old temple motifs with contemporary sensibility. Every pattern is first hand-drawn on graph paper — a painstaking process that can take weeks for a single border design.",
    image: zariDetail,
  },
  {
    num: "III",
    title: "Colour Alchemy",
    desc: "Master dyers create our signature palette through layered dyeing processes. A single colour may require three to five immersions, each building depth and richness that synthetic dyes can never replicate.",
    image: fabricSelection,
  },
  {
    num: "IV",
    title: "The Final Drape",
    desc: "Every completed saree undergoes a meticulous quality ritual — checked for weave consistency, colour trueness, and the way it falls when draped. Only then does it receive the Megam seal.",
    image: sareeIvory,
  },
];

function AtelierPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  return (
    <main className="bg-background">
      <Navigation />

      {/* Hero */}
      <section ref={heroRef} className="relative h-[85vh] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img src={fabricSelection} alt="Fabric curation at the atelier" className="h-full w-full object-cover" width={1280} height={800} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </motion.div>
        <motion.div style={{ opacity: heroOpacity }} className="relative flex h-full flex-col items-center justify-end pb-24 px-8 text-center">
          <span className="label-luxury mb-4">Behind the Craft</span>
          <h1 className="font-display text-4xl leading-tight text-foreground md:text-6xl lg:text-7xl">
            The Atelier
          </h1>
          <p className="mt-6 max-w-lg font-body text-sm leading-relaxed text-muted-foreground md:text-base">
            Where raw silk transforms into heirlooms — an intimate look at the art of creation.
          </p>
        </motion.div>
      </section>

      {/* Introduction */}
      <section className="px-8 py-32 md:px-16 lg:px-[120px]">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mx-auto max-w-3xl text-center">
          <span className="label-luxury mb-6 block">The Process</span>
          <h2 className="font-display text-3xl leading-snug text-foreground md:text-4xl">
            From Thread to Treasure
          </h2>
          <p className="mt-8 font-body text-sm leading-relaxed text-muted-foreground md:text-base">
            Creating a Megam saree is a journey of deliberate choices. Every stage — from sourcing raw silk to the final quality check — is guided by an uncompromising pursuit of perfection. There are no shortcuts, no machine substitutes, and no compromises.
          </p>
        </motion.div>
      </section>

      {/* Alternating editorial stages */}
      {stages.map((stage, i) => (
        <section key={stage.num} className={`${i % 2 === 0 ? "bg-background" : "bg-surface-container"}`}>
          <div className="mx-auto grid max-w-7xl md:grid-cols-2 md:min-h-[70vh]">
            <motion.div
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col justify-center px-8 py-20 md:px-16 lg:px-20 ${i % 2 !== 0 ? "md:order-2" : ""}`}
            >
              <span className="font-display text-6xl text-gold/20">{stage.num}</span>
              <h3 className="mt-4 font-display text-2xl text-foreground md:text-3xl">{stage.title}</h3>
              <p className="mt-6 font-body text-sm leading-relaxed text-muted-foreground md:text-base">{stage.desc}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`aspect-square md:aspect-auto ${i % 2 !== 0 ? "md:order-1" : ""}`}
            >
              <ParallaxImage src={stage.image} alt={stage.title} speed={0.15} />
            </motion.div>
          </div>
        </section>
      ))}

      {/* Craftsmanship Numbers */}
      <section className="bg-primary px-8 py-24 md:px-16 lg:px-[120px]">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-4">
          {[
            { value: "30–60", unit: "Days", label: "Per saree creation" },
            { value: "5,000+", unit: "Threads", label: "In a single weave" },
            { value: "100%", unit: "Handwoven", label: "No machine shortcuts" },
            { value: "24K", unit: "Gold Zari", label: "Pure gold thread" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <span className="font-display text-3xl text-gold-bright md:text-4xl">{stat.value}</span>
              <span className="ml-1 font-body text-xs uppercase tracking-wider text-on-primary/60">{stat.unit}</span>
              <p className="mt-2 font-body text-xs text-on-primary/50">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Closing quote */}
      <section className="px-8 py-32 md:px-16 lg:px-[120px]">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mx-auto max-w-3xl text-center">
          <blockquote className="font-display text-2xl italic leading-relaxed text-foreground md:text-3xl">
            "Every saree that leaves our atelier carries with it the fingerprints of those who made it — and the intention of those who imagined it."
          </blockquote>
          <p className="mt-8 font-body text-xs uppercase tracking-widest text-muted-foreground">— The Megam Atelier</p>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
