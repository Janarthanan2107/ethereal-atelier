import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, RotateCcw, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useAdmin } from "@/admin/admin-store";
import { PageHeader, Pill } from "@/admin/ui/AdminPrimitives";

export const Route = createFileRoute("/admin/queries")({
  component: QueriesPage,
});

function QueriesPage() {
  const { queries, resolveQuery, deleteQuery } = useAdmin();
  const [filter, setFilter] = useState<"All" | "Open" | "Resolved">("All");

  const list = queries
    .filter((q) => filter === "All" || (filter === "Open" ? !q.resolved : q.resolved))
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

  return (
    <>
      <PageHeader eyebrow="Correspondence" title="Enquiries" description="Messages received through the contact form." />

      <div className="mb-6 flex gap-2">
        {(["All", "Open", "Resolved"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 font-body text-xs uppercase tracking-[0.15em] transition-colors ${
              filter === f ? "bg-primary text-on-primary" : "bg-surface-container text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {list.map((q, i) => (
          <motion.article
            key={q.id}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="bg-surface-container p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="label-luxury">{q.subject}</p>
                <p className="mt-2 font-display text-lg text-foreground">{q.name}</p>
                <p className="font-body text-xs text-muted-foreground">
                  {q.email} · {new Date(q.createdAt).toLocaleString("en-IN")}
                </p>
              </div>
              <Pill tone={q.resolved ? "success" : "warn"}>{q.resolved ? "Resolved" : "Open"}</Pill>
            </div>

            <p className="mt-4 font-body text-sm leading-relaxed text-foreground">{q.message}</p>

            <div className="mt-5 flex flex-wrap gap-2 border-t border-border/40 pt-4">
              {!q.resolved ? (
                <button
                  onClick={() => { resolveQuery(q.id, true); toast.success("Marked as resolved"); }}
                  className="inline-flex items-center gap-1.5 bg-primary px-3 py-2 font-body text-xs uppercase tracking-[0.15em] text-on-primary hover:opacity-90"
                >
                  <Check className="h-3 w-3" /> Mark resolved
                </button>
              ) : (
                <button
                  onClick={() => { resolveQuery(q.id, false); toast("Reopened"); }}
                  className="inline-flex items-center gap-1.5 bg-surface-highest px-3 py-2 font-body text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-primary"
                >
                  <RotateCcw className="h-3 w-3" /> Reopen
                </button>
              )}
              <a
                href={`mailto:${q.email}?subject=Re: ${encodeURIComponent(q.subject)}`}
                className="inline-flex items-center px-3 py-2 font-body text-xs uppercase tracking-[0.15em] text-gold transition-opacity hover:opacity-70"
              >
                Reply by email →
              </a>
              <button
                onClick={() => {
                  if (confirm("Delete this enquiry?")) { deleteQuery(q.id); toast.success("Enquiry removed"); }
                }}
                className="ml-auto inline-flex items-center gap-1.5 px-3 py-2 font-body text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-3 w-3" /> Delete
              </button>
            </div>
          </motion.article>
        ))}
        {list.length === 0 && (
          <p className="bg-surface-container px-6 py-12 text-center font-body text-sm text-muted-foreground">No enquiries here.</p>
        )}
      </div>
    </>
  );
}
