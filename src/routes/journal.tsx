import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import fashionEditorial from "@/assets/journal-fashion-editorial.jpg";
import bridalStory from "@/assets/journal-bridal-story.jpg";
import sareeTexture1 from "@/assets/saree-texture-1.jpg";
import sareeTexture2 from "@/assets/saree-texture-2.jpg";
import sareeTexture3 from "@/assets/saree-texture-3.jpg";
import sareePink from "@/assets/saree-pink-kanjeevaram.jpg";

export const Route = createFileRoute("/journal")({
  component: JournalPage,
  head: () => ({
    meta: [
      { title: "Journal — Megam Drapes" },
      { name: "description", content: "Stories of silk, fashion insights, and the narratives behind India's most exquisite handwoven sarees." },
      { property: "og:title", content: "Journal — Megam Drapes" },
      { property: "og:description", content: "Fashion stories and heritage narratives from the world of handwoven silk." },
    ],
  }),
});

interface Article {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

const articles: Article[] = [
  {
    id: "art-of-draping",
    category: "Style",
    title: "The Art of Draping: A Guide to Regional Styles",
    excerpt: "From the Nivi drape of Andhra Pradesh to the Seedha Pallu of Gujarat — discover how the same six yards transform across India's diverse cultural landscape.",
    date: "March 2024",
    readTime: "8 min read",
    image: fashionEditorial,
    featured: true,
  },
  {
    id: "bridal-trousseau",
    category: "Bridal",
    title: "Curating the Perfect Bridal Trousseau",
    excerpt: "An intimate guide to selecting heirloom sarees for the most cherished occasions — from the mehendi to the reception.",
    date: "February 2024",
    readTime: "12 min read",
    image: bridalStory,
  },
  {
    id: "banarasi-revival",
    category: "Heritage",
    title: "The Banarasi Revival: Preserving a Dying Art",
    excerpt: "How a new generation of weavers in Varanasi is breathing life into ancient techniques while fighting the rise of power looms.",
    date: "January 2024",
    readTime: "10 min read",
    image: sareeTexture1,
  },
  {
    id: "gold-zari-story",
    category: "Craft",
    title: "Threads of Gold: The Story of Zari",
    excerpt: "The fascinating journey of real gold zari — from pure metal to lustrous thread, and its sacred role in Indian textile heritage.",
    date: "December 2023",
    readTime: "7 min read",
    image: sareeTexture2,
  },
  {
    id: "monsoon-palette",
    category: "Style",
    title: "Monsoon Palette: Colours That Come Alive in Rain",
    excerpt: "Emerald, teal, and deep sapphire — the jewel tones that define the monsoon wardrobe and how to wear them with grace.",
    date: "November 2023",
    readTime: "6 min read",
    image: sareeTexture3,
  },
  {
    id: "kanjeevaram-legacy",
    category: "Heritage",
    title: "Kanjeevaram: The Queen of Silks",
    excerpt: "A deep dive into the 400-year-old weaving tradition of Kanchipuram and the temple motifs that define its iconic identity.",
    date: "October 2023",
    readTime: "9 min read",
    image: sareePink,
  },
];

function JournalPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const featured = articles.find((a) => a.featured);
  const rest = articles.filter((a) => !a.featured);

  return (
    <main className="bg-background">
      <Navigation />

      {/* Hero */}
      <section ref={heroRef} className="relative flex min-h-[60vh] items-end overflow-hidden pb-20 pt-32">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative mx-auto w-full max-w-6xl px-8 md:px-16 lg:px-[120px]">
          <span className="label-luxury mb-4 block">Stories & Insights</span>
          <h1 className="font-display text-4xl leading-tight text-foreground md:text-6xl lg:text-7xl">
            The Journal
          </h1>
          <p className="mt-6 max-w-lg font-body text-sm leading-relaxed text-muted-foreground md:text-base">
            Fashion narratives, heritage stories, and the quiet art of dressing well — from the world of handwoven silk.
          </p>
        </motion.div>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="px-8 pb-24 md:px-16 lg:px-[120px]">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mx-auto grid max-w-6xl overflow-hidden md:grid-cols-2 md:min-h-[500px]">
            <div className="aspect-[4/3] overflow-hidden md:aspect-auto">
              <img src={featured.image} alt={featured.title} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" width={1024} height={1024} />
            </div>
            <div className="flex flex-col justify-center bg-surface-container p-10 md:p-16">
              <div className="flex items-center gap-4">
                <span className="label-luxury">{featured.category}</span>
                <span className="font-body text-xs text-muted-foreground">{featured.date}</span>
              </div>
              <h2 className="mt-4 font-display text-2xl leading-snug text-foreground md:text-3xl">{featured.title}</h2>
              <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground">{featured.excerpt}</p>
              <div className="mt-8 flex items-center gap-4">
                <span className="gold-link cursor-pointer">Read Story</span>
                <span className="font-body text-xs text-muted-foreground">· {featured.readTime}</span>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Divider */}
      <div className="mx-auto max-w-6xl px-8 md:px-16 lg:px-[120px]">
        <div className="h-px bg-border" />
      </div>

      {/* Article Grid */}
      <section className="px-8 py-24 md:px-16 lg:px-[120px]">
        <div className="mx-auto max-w-6xl">
          <span className="label-luxury mb-12 block">Latest Stories</span>
          <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((article, i) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={article.image} alt={article.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" width={1024} height={1024} />
                </div>
                <div className="mt-5 flex items-center gap-4">
                  <span className="label-luxury">{article.category}</span>
                  <span className="font-body text-xs text-muted-foreground">{article.date}</span>
                </div>
                <h3 className="mt-3 font-display text-lg leading-snug text-foreground transition-colors duration-300 group-hover:text-gold">{article.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground line-clamp-3">{article.excerpt}</p>
                <span className="mt-4 inline-block font-body text-xs uppercase tracking-wider text-gold">{article.readTime}</span>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary px-8 py-24 md:px-16 lg:px-[120px]">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mx-auto max-w-2xl text-center">
          <span className="font-body text-xs uppercase tracking-widest text-gold-bright">Stay Connected</span>
          <h2 className="mt-4 font-display text-2xl text-on-primary md:text-3xl">Subscribe to Our Journal</h2>
          <p className="mt-4 font-body text-sm text-on-primary/60">Receive curated stories on heritage, style, and the art of silk — delivered with the same care we weave into every saree.</p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full max-w-sm border-b border-on-primary/20 bg-transparent px-4 py-3 font-body text-sm text-on-primary placeholder:text-on-primary/30 outline-none focus:border-gold-bright transition-colors duration-300 sm:w-auto"
            />
            <button className="font-body text-xs uppercase tracking-widest text-gold-bright transition-opacity duration-300 hover:opacity-70 px-6 py-3">
              Subscribe
            </button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
