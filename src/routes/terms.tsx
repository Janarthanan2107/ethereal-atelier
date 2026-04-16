import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Megam Drapes" },
      {
        name: "description",
        content:
          "Terms governing the purchase and use of Megam Drapes products and services.",
      },
      { property: "og:title", content: "Terms & Conditions — Megam Drapes" },
      {
        property: "og:description",
        content: "The terms that govern our atelier service.",
      },
    ],
  }),
});

const sections = [
  {
    title: "Acceptance of Terms",
    body: "By accessing megamdrapes.com or placing an order, you agree to these terms. Please read them carefully — if you do not agree, kindly refrain from using our service.",
  },
  {
    title: "Products & Authenticity",
    body: "Every saree is hand-loomed and individually photographed. Slight variations in colour, weave density, and zari pattern are inherent to handcrafted textiles and celebrated as marks of authenticity, not defects.",
  },
  {
    title: "Pricing & Payment",
    body: "All prices are listed in Indian Rupees (₹) and inclusive of applicable taxes. We accept major cards, UPI, and net banking. Orders are confirmed upon successful payment.",
  },
  {
    title: "Shipping",
    body: "We ship across India within 5–7 business days. International shipping is offered to select countries; transit times vary. Complimentary shipping applies to orders above ₹25,000.",
  },
  {
    title: "Returns & Exchanges",
    body: "Owing to the bespoke nature of our pieces, returns are accepted only for manufacturing defects, raised within 7 days of delivery. Items must be unworn with original tags. Bridal commissions are final sale.",
  },
  {
    title: "Intellectual Property",
    body: "All photography, design, weave patterns, and editorial content on this site belong to Megam Drapes. Reproduction without written consent is prohibited.",
  },
  {
    title: "Limitation of Liability",
    body: "Megam Drapes is not liable for indirect or consequential damages arising from the use of our products beyond the purchase price of the item.",
  },
  {
    title: "Governing Law",
    body: "These terms are governed by the laws of India. Disputes shall be subject to the exclusive jurisdiction of the courts of Chennai.",
  },
];

function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Breadcrumbs items={[{ label: "Terms & Conditions" }]} />

      <article className="px-6 pb-24 pt-12 md:px-16 md:pb-32 lg:px-[120px]">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-[820px]"
        >
          <p className="label-luxury">Last updated · 16 April 2026</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] text-foreground md:text-6xl">
            Terms & Conditions
          </h1>
          <p className="mt-6 font-body text-base leading-relaxed text-muted-foreground">
            These terms set out the relationship between Megam Drapes and the
            patrons who entrust us with their wardrobe. They are written to be
            read, not skimmed.
          </p>
        </motion.header>

        <div className="mx-auto mt-16 max-w-[820px] space-y-12">
          {sections.map((s, i) => (
            <motion.section
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
            >
              <h2 className="font-display text-2xl text-foreground md:text-3xl">
                {s.title}
              </h2>
              <p className="mt-4 font-body text-base leading-[1.8] text-muted-foreground">
                {s.body}
              </p>
            </motion.section>
          ))}
        </div>
      </article>

      <Footer />
    </div>
  );
}
