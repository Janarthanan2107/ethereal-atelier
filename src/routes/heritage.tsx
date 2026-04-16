import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import artisanLoom from "@/assets/heritage-artisan-loom.jpg";
import silkThreads from "@/assets/heritage-silk-threads.jpg";
import sareeTexture1 from "@/assets/saree-texture-1.jpg";
import sareeTexture2 from "@/assets/saree-texture-2.jpg";

export const Route = createFileRoute("/heritage")({
  component: HeritagePage,
  head: () => ({
    meta: [
      { title: "Our Heritage — Megam Drapes" },
      { name: "description", content: "Discover the centuries-old artisan traditions behind Megam Drapes — from hand-spun silk threads to master-woven sarees." },
      { property: "og:title", content: "Our Heritage — Megam Drapes" },
      { property: "og:description", content: "Centuries of weaving mastery, preserved in every thread." },
    ],
  }),
});

function ParallaxImage({ src, alt, speed = 0.3 }: { src: string; alt: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}px`, `${speed * 100}px`]);

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.img src={src} alt={alt} style={{ y }} className="h-full w-full object-cover scale-110" loading="lazy" width={1024} height={1024} />
    </div>
  );
}

const timeline = [
  { year: "1952", title: "The First Loom", text: "Our founder, Shri Raghunath Iyer, set up a single handloom in Kanchipuram, beginning a legacy of silk artistry that would span generations." },
  { year: "1978", title: "Varanasi Collaboration", text: "A historic partnership with Banarasi master weavers expanded our repertoire, blending South and North Indian weaving traditions." },
  { year: "1995", title: "Heritage Preservation", text: "We established the Megam Weaver Collective, ensuring fair wages and preserving ancient techniques threatened by industrialisation." },
  { year: "2024", title: "Digital Atelier", text: "Megam Drapes brings centuries of heritage to the modern world — a curated digital experience for discerning collectors." },
];

function HeritagePage() {
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
          <img src={artisanLoom} alt="Master weaver at handloom" className="h-full w-full object-cover" width={1280} height={800} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </motion.div>
        <motion.div style={{ opacity: heroOpacity }} className="relative flex h-full flex-col items-center justify-end pb-24 px-8 text-center">
          <span className="label-luxury mb-4">Est. 1952</span>
          <h1 className="font-display text-4xl leading-tight text-foreground md:text-6xl lg:text-7xl">
            Woven Into<br />History
          </h1>
          <p className="mt-6 max-w-lg font-body text-sm leading-relaxed text-muted-foreground md:text-base">
            Seven decades of preserving India's most revered silk weaving traditions — one thread at a time.
          </p>
        </motion.div>
      </section>

      {/* Philosophy */}
      <section className="px-8 py-32 md:px-16 lg:px-[120px]">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2 md:items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="label-luxury mb-6 block">Our Philosophy</span>
            <h2 className="font-display text-3xl leading-snug text-foreground md:text-4xl">
              Where Patience Becomes Art
            </h2>
            <p className="mt-6 font-body text-sm leading-relaxed text-muted-foreground md:text-base">
              Each Megam saree is a testament to patience — the kind measured not in hours, but in weeks and months. Our master weavers work with the same techniques their forebears perfected centuries ago, using hand-spun silk threads and real gold zari.
            </p>
            <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground md:text-base">
              We believe luxury isn't manufactured — it's cultivated. Every motif carries meaning, every colour tells a story, and every saree holds within it the quiet dignity of human craft.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="aspect-[3/4] overflow-hidden">
            <ParallaxImage src={silkThreads} alt="Vibrant silk threads on wooden spools" speed={0.2} />
          </motion.div>
        </div>
      </section>

      {/* The Weaving Process */}
      <section className="bg-surface-container px-8 py-32 md:px-16 lg:px-[120px]">
        <div className="mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-20 text-center">
            <span className="label-luxury mb-4 block">The Craft</span>
            <h2 className="font-display text-3xl text-foreground md:text-5xl">The Weaving Process</h2>
          </motion.div>

          <div className="grid gap-20 md:grid-cols-3">
            {[
              { step: "01", title: "Thread Selection", desc: "Only the finest mulberry silk cocoons are chosen, hand-reeled into threads of extraordinary lustre and strength." },
              { step: "02", title: "Dyeing & Preparation", desc: "Natural and heritage-formula dyes create our signature colour palette — deep maroons, royal golds, and jewel-tone greens." },
              { step: "03", title: "Handloom Weaving", desc: "Master artisans work jacquard handlooms, interlacing silk and gold zari into intricate motifs over weeks of patient labour." },
            ].map((item, i) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}>
                <span className="font-display text-5xl text-gold/30">{item.step}</span>
                <h3 className="mt-4 font-display text-xl text-foreground">{item.title}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-8 py-32 md:px-16 lg:px-[120px]">
        <div className="mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20 text-center">
            <span className="label-luxury mb-4 block">Our Journey</span>
            <h2 className="font-display text-3xl text-foreground md:text-5xl">A Legacy of Silk</h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gold/20 md:left-1/2" />
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative mb-16 pl-16 md:w-1/2 ${i % 2 === 0 ? "md:pr-16 md:pl-0 md:text-right" : "md:ml-auto md:pl-16"}`}
              >
                <div className={`absolute top-1 left-4 h-5 w-5 rounded-full border-2 border-gold bg-background md:left-auto ${i % 2 === 0 ? "md:-right-2.5" : "md:-left-2.5"}`} />
                <span className="label-luxury text-gold-bright">{item.year}</span>
                <h3 className="mt-2 font-display text-xl text-foreground">{item.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-width parallax divider */}
      <section className="relative h-[50vh] overflow-hidden">
        <ParallaxImage src={sareeTexture2} alt="Silk saree detail" speed={0.4} />
        <div className="absolute inset-0 flex items-center justify-center bg-primary/50">
          <motion.blockquote initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-2xl px-8 text-center">
            <p className="font-display text-2xl italic leading-relaxed text-on-primary md:text-3xl">
              "A saree is not just a garment — it is a story spun in silk, a poem woven in gold."
            </p>
            <cite className="mt-6 block font-body text-xs uppercase tracking-widest text-on-primary/70">— Shri Raghunath Iyer, Founder</cite>
          </motion.blockquote>
        </div>
      </section>

      {/* Artisans */}
      <section className="px-8 py-32 md:px-16 lg:px-[120px]">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2 md:items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="aspect-[4/3] overflow-hidden order-2 md:order-1">
            <ParallaxImage src={sareeTexture1} alt="Handwoven silk saree close-up" speed={0.2} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="order-1 md:order-2">
            <span className="label-luxury mb-6 block">Our Artisans</span>
            <h2 className="font-display text-3xl leading-snug text-foreground md:text-4xl">Guardians of the Loom</h2>
            <p className="mt-6 font-body text-sm leading-relaxed text-muted-foreground md:text-base">
              We work with over 120 master weavers across Kanchipuram, Varanasi, and Dharmavaram. Each artisan brings generations of inherited skill — knowledge that cannot be taught in classrooms, only passed down at the loom.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-8">
              {[
                { num: "120+", label: "Artisans" },
                { num: "72", label: "Years" },
                { num: "3", label: "Heritage Regions" },
              ].map((stat) => (
                <div key={stat.label}>
                  <span className="font-display text-2xl text-gold md:text-3xl">{stat.num}</span>
                  <span className="mt-1 block font-body text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
