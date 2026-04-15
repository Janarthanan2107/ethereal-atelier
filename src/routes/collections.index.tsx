import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { products, weaveTypes, type WeaveType } from "@/data/products";

export const Route = createFileRoute("/collections/")({
  component: CollectionsPage,
  head: () => ({
    meta: [
      { title: "Collections — Megam Drapes" },
      { name: "description", content: "Explore our curated collection of handwoven Banarasi, Kanjeevaram, and Pattu silk sarees crafted by master artisans." },
      { property: "og:title", content: "Collections — Megam Drapes" },
      { property: "og:description", content: "Explore our curated collection of handwoven silk sarees." },
    ],
  }),
});

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  }),
};

function CollectionsPage() {
  const [activeFilter, setActiveFilter] = useState<WeaveType | "All">("All");

  const filtered = activeFilter === "All"
    ? products
    : products.filter((p) => p.weaveType === activeFilter);

  return (
    <main>
      <Navigation />

      {/* Header */}
      <section className="bg-surface px-6 pt-32 pb-16 md:px-16 md:pt-40 md:pb-20 lg:px-[120px]">
        <div className="mx-auto max-w-[1440px]">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
            className="label-luxury mb-4"
          >
            The Atelier
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
            className="font-display text-4xl tracking-[-0.02em] text-foreground md:text-5xl lg:text-[3.5rem]"
          >
            Our Collections
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
            className="mt-4 max-w-lg font-body text-base leading-relaxed text-muted-foreground"
          >
            Each saree is a testament to centuries of artisan mastery — handwoven with devotion, presented with reverence.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-surface-container px-6 py-6 md:px-16 lg:px-[120px]">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-3">
          <span className="mr-2 font-body text-xs uppercase tracking-[0.1em] text-muted-foreground">
            Filter by Weave
          </span>
          <button
            onClick={() => setActiveFilter("All")}
            className={`px-5 py-2 font-body text-sm tracking-[0.03em] transition-all duration-400 ${
              activeFilter === "All"
                ? "bg-primary text-primary-foreground"
                : "bg-surface-highest text-foreground hover:bg-primary/10"
            }`}
          >
            All
          </button>
          {weaveTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveFilter(type)}
              className={`px-5 py-2 font-body text-sm tracking-[0.03em] transition-all duration-400 ${
                activeFilter === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface-highest text-foreground hover:bg-primary/10"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="bg-surface-container px-6 py-16 md:px-16 md:py-24 lg:px-[120px] lg:py-32">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <Link
                to="/collections/$productId"
                params={{ productId: product.id }}
                className="group block"
              >
                <div className="overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    width={800}
                    height={1000}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-5">
                  <p className="label-luxury mb-1.5">{product.category}</p>
                  <h3 className="font-display text-lg text-foreground">{product.title}</h3>
                  <div className="mt-1 flex items-center gap-3">
                    <span className="font-body text-sm text-muted-foreground">{product.price}</span>
                    <span className="font-body text-xs text-gold">{product.weaveType}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-display text-xl text-foreground">No sarees found</p>
            <p className="mt-2 font-body text-sm text-muted-foreground">
              Try selecting a different weave type.
            </p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
