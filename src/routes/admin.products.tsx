import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, Plus, X, Search } from "lucide-react";
import { toast } from "sonner";
import { useAdmin, type AdminProduct, type WeaveType } from "@/admin/admin-store";
import { PageHeader, PrimaryButton, GhostButton, Pill, FloatingField, Empty } from "@/admin/ui/AdminPrimitives";

export const Route = createFileRoute("/admin/products")({
  component: ProductsPage,
});

const WEAVE_OPTIONS: WeaveType[] = ["Banarasi", "Kanjeevaram", "Pattu"];
const CATEGORIES = ["BRIDAL COLLECTION", "HERITAGE WEAVES", "FESTIVE EDIT", "SIGNATURE COLLECTION", "EVERYDAY LUXURY"];

function ProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useAdmin();
  const [editing, setEditing] = useState<AdminProduct | null>(null);
  const [creating, setCreating] = useState(false);
  const [search, setSearch] = useState("");
  const [weaveFilter, setWeaveFilter] = useState<WeaveType | "All">("All");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
      const matchWeave = weaveFilter === "All" || p.weaveType === weaveFilter;
      return matchSearch && matchWeave;
    });
  }, [products, search, weaveFilter]);

  return (
    <>
      <PageHeader
        eyebrow="Catalogue"
        title="Products"
        description="Curate your atelier — add, edit, and steward each handwoven piece."
        action={
          <PrimaryButton onClick={() => setCreating(true)}>
            <Plus className="mr-2 h-3.5 w-3.5" /> New Product
          </PrimaryButton>
        }
      />

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or category"
            className="w-full border-b border-border/60 bg-transparent py-3 pl-7 pr-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {(["All", ...WEAVE_OPTIONS] as const).map((w) => (
            <button
              key={w}
              onClick={() => setWeaveFilter(w)}
              className={`shrink-0 px-4 py-2 font-body text-xs uppercase tracking-[0.15em] transition-colors ${
                weaveFilter === w ? "bg-primary text-on-primary" : "bg-surface-container text-muted-foreground hover:text-foreground"
              }`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <Empty title="No pieces found" description="Adjust filters or add a new product to begin." />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="group bg-surface-container"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-surface-highest">
                <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute left-3 top-3">
                  {p.stock === 0 ? <Pill tone="danger">Out of stock</Pill> : p.stock <= 3 ? <Pill tone="warn">Low · {p.stock}</Pill> : <Pill tone="success">{p.stock} in stock</Pill>}
                </div>
              </div>
              <div className="p-5">
                <p className="label-luxury">{p.weaveType}</p>
                <h3 className="mt-2 font-display text-lg text-foreground">{p.title}</h3>
                <p className="mt-1 font-body text-xs text-muted-foreground">{p.category}</p>
                <p className="mt-3 font-display text-base text-primary">{p.price}</p>
                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => setEditing(p)}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 bg-primary py-2 font-body text-xs uppercase tracking-[0.15em] text-on-primary transition-opacity hover:opacity-90"
                  >
                    <Pencil className="h-3 w-3" /> Edit
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete "${p.title}"?`)) {
                        deleteProduct(p.id);
                        toast.success("Product removed");
                      }
                    }}
                    className="inline-flex items-center justify-center bg-surface-highest p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {(editing || creating) && (
          <ProductDialog
            initial={editing}
            onClose={() => { setEditing(null); setCreating(false); }}
            onSave={(data) => {
              if (editing) {
                updateProduct(editing.id, data);
                toast.success("Product updated");
              } else {
                addProduct(data);
                toast.success("Product added");
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

function ProductDialog({
  initial, onClose, onSave,
}: {
  initial: AdminProduct | null;
  onClose: () => void;
  onSave: (data: Omit<AdminProduct, "id" | "createdAt">) => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [weaveType, setWeaveType] = useState<WeaveType>(initial?.weaveType ?? "Banarasi");
  const [category, setCategory] = useState(initial?.category ?? CATEGORIES[0]);
  const [priceNum, setPriceNum] = useState(initial?.priceNum.toString() ?? "");
  const [stock, setStock] = useState(initial?.stock.toString() ?? "0");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [imagesText, setImagesText] = useState((initial?.images ?? [initial?.image ?? ""]).join("\n"));
  const [fabric, setFabric] = useState(initial?.details.fabric ?? "Pure Mulberry Silk");
  const [origin, setOrigin] = useState(initial?.details.origin ?? "");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const images = imagesText.split("\n").map((s) => s.trim()).filter(Boolean);
    const priceNumber = Number(priceNum);
    const stockNumber = Number(stock);
    if (!title || isNaN(priceNumber) || priceNumber <= 0 || images.length === 0) {
      toast.error("Please complete title, price, and at least one image URL.");
      return;
    }
    onSave({
      title,
      weaveType,
      category,
      price: `₹${priceNumber.toLocaleString("en-IN")}`,
      priceNum: priceNumber,
      image: images[0],
      images,
      stock: Math.max(0, stockNumber),
      description,
      details: {
        fabric,
        length: initial?.details.length ?? "6.3 meters",
        width: initial?.details.width ?? "47 inches",
        weight: initial?.details.weight ?? "850 grams",
        origin: origin || "India",
        craftTime: initial?.details.craftTime ?? "30 days",
      },
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-sm" onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="fixed inset-x-4 top-10 z-50 mx-auto max-h-[90vh] max-w-2xl overflow-y-auto bg-surface p-6 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:p-10"
      >
        <button onClick={onClose} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
          <X className="h-5 w-5" />
        </button>
        <p className="label-luxury">{initial ? "Edit" : "Create"}</p>
        <h2 className="mt-2 font-display text-3xl text-foreground">{initial ? initial.title : "New Product"}</h2>

        <form onSubmit={submit} className="mt-8 space-y-6">
          <FloatingField label="Title" value={title} onChange={setTitle} required />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="label-luxury">Weave</label>
              <select value={weaveType} onChange={(e) => setWeaveType(e.target.value as WeaveType)} className="mt-2 w-full border-b border-border/60 bg-transparent py-2 font-body text-sm focus:border-gold focus:outline-none">
                {WEAVE_OPTIONS.map((w) => <option key={w}>{w}</option>)}
              </select>
            </div>
            <div>
              <label className="label-luxury">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-2 w-full border-b border-border/60 bg-transparent py-2 font-body text-sm focus:border-gold focus:outline-none">
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <FloatingField label="Price (₹)" value={priceNum} onChange={setPriceNum} type="number" required />
            <FloatingField label="Stock Quantity" value={stock} onChange={setStock} type="number" required />
          </div>
          <FloatingField label="Description" value={description} onChange={setDescription} textarea />
          <div className="grid grid-cols-2 gap-6">
            <FloatingField label="Fabric" value={fabric} onChange={setFabric} />
            <FloatingField label="Origin" value={origin} onChange={setOrigin} />
          </div>
          <div>
            <label className="label-luxury">Image URLs (one per line)</label>
            <textarea
              value={imagesText}
              onChange={(e) => setImagesText(e.target.value)}
              rows={3}
              className="mt-2 w-full border-b border-border/60 bg-transparent py-2 font-body text-xs text-foreground focus:border-gold focus:outline-none"
              placeholder="https://..."
            />
            <p className="mt-1 font-body text-xs text-muted-foreground">First image is the primary.</p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <GhostButton onClick={onClose}>Cancel</GhostButton>
            <PrimaryButton type="submit">{initial ? "Save changes" : "Create product"}</PrimaryButton>
          </div>
        </form>
      </motion.div>
    </>
  );
}
