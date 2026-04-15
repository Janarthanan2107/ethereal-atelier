import { motion } from "framer-motion";
import sareeTexture from "@/assets/saree-texture-1.jpg";

export default function EditorialSection() {
  return (
    <section className="bg-surface px-6 py-24 md:px-16 md:py-32 lg:px-[120px] lg:py-40">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-0">
        {/* Image – offset left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="relative"
        >
          <div className="lg:-ml-8">
            <img
              src={sareeTexture}
              alt="Close-up of intricate Banarasi zari weaving"
              loading="lazy"
              width={800}
              height={1000}
              className="aspect-[3/4] w-full max-w-[500px] object-cover shadow-ambient"
            />
          </div>
          {/* Tonal layer behind */}
          <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full bg-surface-container lg:-bottom-10 lg:-right-10" />
        </motion.div>

        {/* Text – floating right */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          className="lg:pl-24"
        >
          <p className="label-luxury mb-4">The Artisan's Touch</p>
          <h2 className="font-display text-3xl leading-[1.15] tracking-[-0.02em] text-foreground md:text-4xl">
            Woven by Hand,
            <br />
            Worn with Pride
          </h2>
          <p className="mt-6 max-w-md font-body text-base leading-[1.6] text-muted-foreground">
            Every thread tells a story of generations. Our master weavers in Varanasi and 
            Kanchipuram carry forward an unbroken lineage of silk artistry — 
            transforming raw filaments into heirloom treasures.
          </p>
          <p className="mt-4 max-w-md font-body text-base leading-[1.6] text-muted-foreground">
            From the loom to your wardrobe, each saree takes 15 to 45 days of 
            meticulous craftsmanship.
          </p>
          <div className="mt-10">
            <span className="gold-link cursor-pointer">Discover Our Heritage</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
