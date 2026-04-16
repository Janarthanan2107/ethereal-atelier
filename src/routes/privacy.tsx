import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy — Megam Drapes" },
      {
        name: "description",
        content:
          "How Megam Drapes collects, uses, and protects your personal information.",
      },
      { property: "og:title", content: "Privacy Policy — Megam Drapes" },
      {
        property: "og:description",
        content: "Our commitment to protecting your data and privacy.",
      },
    ],
  }),
});

const sections = [
  {
    title: "Information We Collect",
    body: "We collect information you provide directly — name, email, shipping address, and payment details — when you place an order, create an account, or contact our atelier. We also gather limited browsing data through cookies to refine your experience.",
  },
  {
    title: "How We Use Your Information",
    body: "Your information is used to fulfil orders, personalise communication, share atelier news only with consent, and improve our service. We never sell your data to third parties.",
  },
  {
    title: "Cookies & Tracking",
    body: "We use essential cookies to keep your cart and session active, and analytics cookies (anonymised) to understand how the site is used. You may disable non-essential cookies in your browser settings.",
  },
  {
    title: "Data Security",
    body: "All transactions are encrypted using industry-standard SSL. Payment information is processed by certified gateways and never stored on our servers.",
  },
  {
    title: "Your Rights",
    body: "You may request a copy of your data, ask for corrections, or request deletion at any time by writing to atelier@megamdrapes.com. We respond within 30 days.",
  },
  {
    title: "Children's Privacy",
    body: "Our service is not directed to anyone under 16. We do not knowingly collect personal information from children.",
  },
  {
    title: "Updates",
    body: "We may revise this policy from time to time. Significant changes will be communicated via email to registered patrons.",
  },
];

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

      <article className="px-6 pb-24 pt-12 md:px-16 md:pb-32 lg:px-[120px]">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-[820px]"
        >
          <p className="label-luxury">Last updated · 16 April 2026</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] text-foreground md:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-6 font-body text-base leading-relaxed text-muted-foreground">
            We treat your information with the same care our artisans give to
            every weave. This policy explains, in plain language, how we
            collect, use, and protect your data.
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
