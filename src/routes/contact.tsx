import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { z } from "zod";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Megam Drapes Atelier" },
      {
        name: "description",
        content:
          "Visit our atelier or send a private enquiry. We respond to every message within 24 hours.",
      },
      { property: "og:title", content: "Contact — Megam Drapes" },
      {
        property: "og:description",
        content: "Schedule a private consultation with our atelier.",
      },
    ],
  }),
});

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(10, "Tell us a little more").max(1000),
});

function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  textarea,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  textarea?: boolean;
}) {
  const isActive = value.length > 0;
  const Field = textarea ? "textarea" : "input";

  return (
    <div className="relative">
      <Field
        id={id}
        type={textarea ? undefined : type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={textarea ? 5 : undefined}
        placeholder=" "
        className="peer block w-full resize-none border-0 border-b border-foreground/15 bg-transparent px-0 pt-6 pb-2 font-body text-sm text-foreground transition-colors duration-300 placeholder-shown:placeholder-transparent focus:border-gold focus:outline-none"
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-0 transition-all duration-300 ${
          isActive
            ? "top-0 text-[0.65rem] uppercase tracking-[0.15em] text-gold"
            : "top-6 text-sm text-muted-foreground"
        } peer-focus:top-0 peer-focus:text-[0.65rem] peer-focus:uppercase peer-focus:tracking-[0.15em] peer-focus:text-gold`}
      >
        {label}
      </label>
      {error && (
        <p className="mt-2 font-body text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    toast.success("Message received", {
      description: "Our atelier will respond within 24 hours.",
    });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Breadcrumbs items={[{ label: "Contact" }]} />

      <section className="px-6 pb-24 pt-12 md:px-16 md:pb-32 lg:px-[120px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="mx-auto max-w-[1200px]"
        >
          <p className="label-luxury">Atelier Enquiries</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] text-foreground md:text-7xl">
            Begin a conversation
          </h1>
          <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-muted-foreground">
            Whether you seek a bridal trousseau, a single heirloom drape, or a
            private viewing — our curators respond personally to every enquiry.
          </p>
        </motion.div>

        <div className="mx-auto mt-20 grid max-w-[1200px] gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          {/* Left — details */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-12"
          >
            <div>
              <p className="label-luxury">Visit the Atelier</p>
              <p className="mt-4 font-display text-2xl text-foreground">
                14, Mylapore Heritage Lane
              </p>
              <p className="mt-1 font-body text-sm leading-relaxed text-muted-foreground">
                Chennai, Tamil Nadu 600004
                <br />
                India
              </p>
              <p className="mt-4 font-body text-xs uppercase tracking-[0.15em] text-gold">
                By appointment · Tue – Sat · 11am – 7pm
              </p>
            </div>

            <div>
              <p className="label-luxury">Direct</p>
              <a
                href="mailto:atelier@megamdrapes.com"
                className="mt-4 block font-display text-xl text-foreground transition-colors duration-300 hover:text-gold"
              >
                atelier@megamdrapes.com
              </a>
              <a
                href="tel:+914442100100"
                className="mt-1 block font-body text-sm text-muted-foreground transition-colors duration-300 hover:text-gold"
              >
                +91 44 4210 0100
              </a>
            </div>

            <div>
              <p className="label-luxury">Follow</p>
              <div className="mt-4 flex gap-6">
                {[
                  { name: "Instagram", href: "https://instagram.com" },
                  { name: "Pinterest", href: "https://pinterest.com" },
                  { name: "Journal", href: "/journal" },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    className="font-body text-xs uppercase tracking-[0.15em] text-foreground transition-colors duration-300 hover:text-gold"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="overflow-hidden bg-surface-container">
              <iframe
                title="Atelier location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=80.265%2C13.030%2C80.275%2C13.040&layer=mapnik"
                className="h-[280px] w-full border-0 grayscale"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="space-y-10"
            noValidate
          >
            <FloatingInput
              id="name"
              label="Your Name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              error={errors.name}
            />
            <FloatingInput
              id="email"
              label="Email Address"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              error={errors.email}
            />
            <FloatingInput
              id="message"
              label="Your Enquiry"
              value={form.message}
              onChange={(v) => setForm({ ...form, message: v })}
              error={errors.message}
              textarea
            />
            <button
              type="submit"
              disabled={submitting}
              className="group relative inline-flex items-center gap-3 bg-primary px-8 py-4 font-body text-xs uppercase tracking-[0.15em] text-on-primary transition-opacity duration-400 hover:opacity-90 disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Send Enquiry"}
              <span className="transition-transform duration-400 group-hover:translate-x-1">
                →
              </span>
            </button>
          </motion.form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
