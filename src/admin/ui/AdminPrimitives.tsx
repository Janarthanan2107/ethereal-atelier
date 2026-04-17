import { type ReactNode } from "react";
import { motion } from "framer-motion";

export function PageHeader({ eyebrow, title, description, action }: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-col gap-4 border-b border-border/40 pb-8 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && <p className="label-luxury">{eyebrow}</p>}
        <h1 className="mt-2 font-display text-4xl text-foreground md:text-5xl">{title}</h1>
        {description && (
          <p className="mt-3 max-w-xl font-body text-sm text-muted-foreground md:text-base">{description}</p>
        )}
      </div>
      {action && <div className="flex shrink-0 items-center gap-3">{action}</div>}
    </div>
  );
}

export function StatCard({ label, value, sub, index = 0 }: {
  label: string; value: string | number; sub?: string; index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.4, 0, 0.2, 1] }}
      className="bg-surface-container p-6"
    >
      <p className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
      <p className="mt-3 font-display text-3xl text-foreground md:text-4xl">{value}</p>
      {sub && <p className="mt-2 font-body text-xs text-muted-foreground">{sub}</p>}
    </motion.div>
  );
}

export function Section({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <section className="mt-12">
      <div className="mb-5 flex items-end justify-between">
        <h2 className="font-display text-2xl text-foreground">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function Pill({ tone = "neutral", children }: { tone?: "success" | "warn" | "danger" | "info" | "neutral"; children: ReactNode }) {
  const map: Record<string, string> = {
    success: "bg-secondary/15 text-secondary-foreground",
    warn: "bg-gold-bright/25 text-primary",
    danger: "bg-destructive/10 text-destructive",
    info: "bg-primary/10 text-primary",
    neutral: "bg-surface-highest text-muted-foreground",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 font-body text-[0.65rem] uppercase tracking-[0.15em] ${map[tone]}`}>
      {children}
    </span>
  );
}

export function PrimaryButton({ children, onClick, type = "button", disabled }: {
  children: ReactNode; onClick?: () => void; type?: "button" | "submit"; disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center bg-primary px-6 py-3 font-body text-xs uppercase tracking-[0.15em] text-on-primary transition-opacity duration-300 hover:opacity-90 disabled:opacity-40"
    >
      {children}
    </button>
  );
}

export function GhostButton({ children, onClick, type = "button" }: { children: ReactNode; onClick?: () => void; type?: "button" | "submit" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-flex items-center justify-center px-4 py-2 font-body text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-primary"
    >
      {children}
    </button>
  );
}

export function FloatingField({
  label, value, onChange, type = "text", textarea, required, name,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  name?: string;
}) {
  const hasValue = value.length > 0;
  const Comp: "input" | "textarea" = textarea ? "textarea" : "input";
  return (
    <div className="relative">
      <Comp
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        rows={textarea ? 4 : undefined}
        placeholder=" "
        className="peer w-full border-b border-border/60 bg-transparent pb-2 pt-6 font-body text-sm text-foreground transition-colors placeholder-shown:pt-4 focus:border-gold focus:outline-none"
      />
      <label
        className={`pointer-events-none absolute left-0 transition-all duration-300 ${
          hasValue
            ? "top-0 font-body text-[0.65rem] uppercase tracking-[0.15em] text-gold"
            : "top-4 font-body text-sm text-muted-foreground peer-focus:top-0 peer-focus:text-[0.65rem] peer-focus:uppercase peer-focus:tracking-[0.15em] peer-focus:text-gold"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

export function Empty({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center bg-surface-container px-6 py-12 text-center">
      <p className="font-display text-xl text-foreground">{title}</p>
      {description && <p className="mt-2 max-w-sm font-body text-sm text-muted-foreground">{description}</p>}
    </div>
  );
}
