import { motion } from "framer-motion";
import heroImage from "@/assets/hero-saree.jpg";

const silk = {
  hidden: { opacity: 0, y: 48 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.15, duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-surface px-6 pt-28 md:px-16 lg:px-[120px] lg:pt-0">
      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col items-start justify-center gap-12 lg:flex-row lg:items-center lg:gap-0">
        {/* Text – editorial floating left */}
        <div className="relative z-10 flex-1 lg:pr-16">
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={silk}
            className="label-luxury mb-6"
          >
            The Royal Silk Heritage
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={silk}
            className="font-display text-4xl leading-[1.1] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-[3.5rem]"
          >
            Where Silk
            <br />
            Becomes Legacy
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={silk}
            className="mt-6 max-w-md font-body text-base leading-relaxed text-muted-foreground"
          >
            Each saree in our atelier is a testament to centuries of artisan mastery — 
            handwoven with devotion, draped with grace.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={silk}
            className="mt-10 flex items-center gap-8"
          >
            <button className="bg-primary-container px-8 py-3.5 text-sm tracking-[0.05em] uppercase text-on-primary transition-all duration-400 hover:opacity-90">
              Explore Collection
            </button>
            <span className="gold-link cursor-pointer">Our Story</span>
          </motion.div>
        </div>

        {/* Image – asymmetric right offset */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          className="relative flex-1 lg:flex lg:justify-end"
        >
          <div className="relative lg:-mr-16 xl:-mr-24">
            <img
              src={heroImage}
              alt="Luxurious handwoven silk saree draped on a boutique mannequin"
              className="h-[60vh] w-full object-cover shadow-ambient sm:h-[70vh] lg:h-[85vh] lg:w-auto lg:max-w-[520px]"
              width={1280}
              height={1600}
            />
            {/* Floating gold accent */}
            <div className="absolute -bottom-4 -left-4 h-24 w-24 bg-gold-bright/10 lg:-bottom-8 lg:-left-8 lg:h-40 lg:w-40" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
