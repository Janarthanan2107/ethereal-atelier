import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, X, Trash2, Star } from "lucide-react";
import { toast } from "sonner";
import { useAdmin, type Review } from "@/admin/admin-store";
import { PageHeader, Pill } from "@/admin/ui/AdminPrimitives";

export const Route = createFileRoute("/admin/reviews")({
  component: ReviewsPage,
});

const FILTERS: Array<Review["status"] | "All"> = ["All", "Pending", "Approved", "Rejected"];

function ReviewsPage() {
  const { reviews, setReviewStatus, deleteReview } = useAdmin();
  const [filter, setFilter] = useState<Review["status"] | "All">("All");

  const list = filter === "All" ? reviews : reviews.filter((r) => r.status === filter);

  return (
    <>
      <PageHeader eyebrow="Voice of Patrons" title="Reviews" description="Curate the chorus of voices that surrounds each weave." />

      <div className="mb-6 flex gap-2 overflow-x-auto">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 px-4 py-2 font-body text-xs uppercase tracking-[0.15em] transition-colors ${
              filter === f ? "bg-primary text-on-primary" : "bg-surface-container text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {list.map((r, i) => (
          <motion.article
            key={r.id}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="bg-surface-container p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="label-luxury">{r.productTitle}</p>
                <p className="mt-2 font-display text-lg text-foreground">{r.customerName}</p>
                <div className="mt-1 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className={`h-3.5 w-3.5 ${idx < r.rating ? "fill-gold text-gold" : "text-border"}`} />
                  ))}
                  <span className="ml-2 font-body text-xs text-muted-foreground">
                    {new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </span>
                </div>
              </div>
              <Pill tone={r.status === "Approved" ? "success" : r.status === "Rejected" ? "danger" : "warn"}>
                {r.status}
              </Pill>
            </div>

            <p className="mt-4 font-body text-sm leading-relaxed text-foreground">{r.comment}</p>

            <div className="mt-5 flex flex-wrap gap-2 border-t border-border/40 pt-4">
              {r.status !== "Approved" && (
                <button
                  onClick={() => { setReviewStatus(r.id, "Approved"); toast.success("Review approved"); }}
                  className="inline-flex items-center gap-1.5 bg-primary px-3 py-2 font-body text-xs uppercase tracking-[0.15em] text-on-primary transition-opacity hover:opacity-90"
                >
                  <Check className="h-3 w-3" /> Approve
                </button>
              )}
              {r.status !== "Rejected" && (
                <button
                  onClick={() => { setReviewStatus(r.id, "Rejected"); toast("Review rejected"); }}
                  className="inline-flex items-center gap-1.5 bg-surface-highest px-3 py-2 font-body text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-primary"
                >
                  <X className="h-3 w-3" /> Reject
                </button>
              )}
              <button
                onClick={() => {
                  if (confirm("Delete this review?")) {
                    deleteReview(r.id);
                    toast.success("Review removed");
                  }
                }}
                className="ml-auto inline-flex items-center gap-1.5 px-3 py-2 font-body text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-destructive"
              >
                <Trash2 className="h-3 w-3" /> Delete
              </button>
            </div>
          </motion.article>
        ))}
        {list.length === 0 && (
          <p className="bg-surface-container px-6 py-12 text-center font-body text-sm text-muted-foreground">No reviews in this view.</p>
        )}
      </div>
    </>
  );
}
