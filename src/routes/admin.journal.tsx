import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Send, FileText } from "lucide-react";
import { toast } from "sonner";
import { useAdmin, type JournalPost } from "@/admin/admin-store";
import { PageHeader, PrimaryButton, GhostButton, Pill, FloatingField } from "@/admin/ui/AdminPrimitives";

export const Route = createFileRoute("/admin/journal")({
  component: JournalAdminPage,
});

function JournalAdminPage() {
  const { journal, addJournal, updateJournal, deleteJournal } = useAdmin();
  const [editing, setEditing] = useState<JournalPost | null>(null);
  const [creating, setCreating] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Editorial"
        title="Journal"
        description="The atelier's voice — stories, dispatches, and slow musings on craft."
        action={<PrimaryButton onClick={() => setCreating(true)}><Plus className="mr-2 h-3.5 w-3.5" /> New story</PrimaryButton>}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {journal.map((j, i) => (
          <motion.article
            key={j.id}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="group bg-surface-container"
          >
            <div className="aspect-[16/10] overflow-hidden bg-surface-highest">
              {j.cover ? (
                <img src={j.cover} alt={j.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground"><FileText className="h-8 w-8" /></div>
              )}
            </div>
            <div className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <Pill tone={j.status === "Published" ? "success" : "warn"}>{j.status}</Pill>
                {j.status === "Published" && (
                  <p className="font-body text-xs text-muted-foreground">
                    {new Date(j.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                )}
              </div>
              <h3 className="font-display text-xl text-foreground">{j.title}</h3>
              <p className="mt-2 line-clamp-3 font-body text-sm text-muted-foreground">{j.excerpt}</p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setEditing(j)}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 bg-primary py-2 font-body text-xs uppercase tracking-[0.15em] text-on-primary hover:opacity-90"
                >
                  <Pencil className="h-3 w-3" /> Edit
                </button>
                {j.status === "Draft" && (
                  <button
                    onClick={() => {
                      updateJournal(j.id, { status: "Published", publishedAt: new Date().toISOString() });
                      toast.success("Story published");
                    }}
                    className="inline-flex items-center gap-1.5 bg-secondary px-3 py-2 font-body text-xs uppercase tracking-[0.15em] text-secondary-foreground hover:opacity-90"
                  >
                    <Send className="h-3 w-3" /> Publish
                  </button>
                )}
                <button
                  onClick={() => {
                    if (confirm(`Delete "${j.title}"?`)) { deleteJournal(j.id); toast.success("Story removed"); }
                  }}
                  className="bg-surface-highest p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {(editing || creating) && (
          <JournalDialog
            initial={editing}
            onClose={() => { setEditing(null); setCreating(false); }}
            onSave={(data) => {
              if (editing) {
                updateJournal(editing.id, data);
                toast.success("Story updated");
              } else {
                addJournal(data);
                toast.success("Story created");
              }
              setEditing(null);
              setCreating(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function JournalDialog({
  initial, onClose, onSave,
}: {
  initial: JournalPost | null;
  onClose: () => void;
  onSave: (data: Omit<JournalPost, "id" | "createdAt">) => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [cover, setCover] = useState(initial?.cover ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [status, setStatus] = useState<JournalPost["status"]>(initial?.status ?? "Draft");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !excerpt) { toast.error("Title and excerpt are required."); return; }
    onSave({
      title, cover, excerpt, content,
      status,
      publishedAt: status === "Published" ? (initial?.publishedAt || new Date().toISOString()) : "",
    });
  };

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
        className="fixed inset-x-4 top-10 z-50 mx-auto max-h-[90vh] max-w-2xl overflow-y-auto bg-surface p-6 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:p-10"
      >
        <button onClick={onClose} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
        <p className="label-luxury">{initial ? "Edit" : "Compose"}</p>
        <h2 className="mt-2 font-display text-3xl text-foreground">{initial ? "Edit story" : "New journal entry"}</h2>

        <form onSubmit={submit} className="mt-8 space-y-6">
          <FloatingField label="Title" value={title} onChange={setTitle} required />
          <FloatingField label="Cover image URL" value={cover} onChange={setCover} />
          <FloatingField label="Excerpt" value={excerpt} onChange={setExcerpt} textarea required />
          <div>
            <label className="label-luxury">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              className="mt-2 w-full border border-border/60 bg-transparent p-4 font-body text-sm leading-relaxed text-foreground focus:border-gold focus:outline-none"
              placeholder="Write your story…"
            />
          </div>
          <div>
            <label className="label-luxury">Status</label>
            <div className="mt-2 flex gap-2">
              {(["Draft", "Published"] as const).map((s) => (
                <button
                  key={s} type="button" onClick={() => setStatus(s)}
                  className={`px-4 py-2 font-body text-xs uppercase tracking-[0.15em] ${
                    status === s ? "bg-primary text-on-primary" : "bg-surface-container text-muted-foreground"
                  }`}
                >{s}</button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <GhostButton onClick={onClose}>Cancel</GhostButton>
            <PrimaryButton type="submit">{initial ? "Save story" : "Create story"}</PrimaryButton>
          </div>
        </form>
      </motion.div>
    </>
  );
}
