import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";
import { useAdmin, type Customer } from "@/admin/admin-store";
import { PageHeader } from "@/admin/ui/AdminPrimitives";

export const Route = createFileRoute("/admin/customers")({
  component: CustomersPage,
});

function formatINR(n: number) { return `₹${n.toLocaleString("en-IN")}`; }

function CustomersPage() {
  const { customers, orders } = useAdmin();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Customer | null>(null);

  const filtered = useMemo(() => {
    return customers.filter((c) =>
      !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [customers, search]);

  const selectedOrders = useMemo(
    () => (selected ? orders.filter((o) => o.customerEmail === selected.email) : []),
    [orders, selected]
  );

  return (
    <>
      <PageHeader eyebrow="Patrons" title="Customers" description="Those who have welcomed Megam Drapes into their stories." />

      <div className="mb-6 max-w-sm">
        <div className="relative">
          <Search className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email"
            className="w-full border-b border-border/60 bg-transparent py-3 pl-7 pr-3 font-body text-sm focus:border-gold focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-surface-container">
        <div className="hidden grid-cols-12 border-b border-border/40 px-5 py-3 md:grid">
          <p className="col-span-4 label-luxury">Customer</p>
          <p className="col-span-3 label-luxury">Phone</p>
          <p className="col-span-2 label-luxury">Orders</p>
          <p className="col-span-3 label-luxury text-right">Lifetime value</p>
        </div>
        {filtered.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelected(c)}
            className="grid w-full grid-cols-12 items-center gap-2 border-b border-border/40 px-5 py-4 text-left transition-colors last:border-b-0 hover:bg-surface-highest"
          >
            <div className="col-span-12 md:col-span-4">
              <p className="font-display text-base text-foreground">{c.name}</p>
              <p className="truncate font-body text-xs text-muted-foreground">{c.email}</p>
            </div>
            <p className="col-span-6 font-body text-sm text-muted-foreground md:col-span-3">{c.phone}</p>
            <p className="col-span-3 font-body text-sm text-foreground md:col-span-2">{c.orderCount}</p>
            <p className="col-span-3 text-right font-display text-base text-primary md:col-span-3">{formatINR(c.totalSpent)}</p>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="px-5 py-8 text-center font-body text-sm text-muted-foreground">No customers match this search.</p>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-sm" onClick={() => setSelected(null)} />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-md overflow-y-auto bg-surface p-6 md:p-10"
            >
              <button onClick={() => setSelected(null)} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
              <p className="label-luxury">Patron</p>
              <h2 className="mt-2 font-display text-3xl text-foreground">{selected.name}</h2>
              <p className="mt-1 font-body text-sm text-muted-foreground">{selected.email}</p>
              <p className="font-body text-sm text-muted-foreground">{selected.phone}</p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-surface-container p-4">
                  <p className="label-luxury">Orders</p>
                  <p className="mt-2 font-display text-2xl text-foreground">{selected.orderCount}</p>
                </div>
                <div className="bg-surface-container p-4">
                  <p className="label-luxury">Lifetime</p>
                  <p className="mt-2 font-display text-2xl text-primary">{formatINR(selected.totalSpent)}</p>
                </div>
              </div>

              <div className="mt-8">
                <p className="label-luxury mb-3">Order history</p>
                {selectedOrders.map((o) => (
                  <div key={o.id} className="border-b border-border/40 py-3 last:border-b-0">
                    <div className="flex items-center justify-between">
                      <p className="font-display text-base text-foreground">{o.id}</p>
                      <p className="font-body text-xs text-muted-foreground">{new Date(o.createdAt).toLocaleDateString("en-IN")}</p>
                    </div>
                    <p className="mt-1 font-body text-xs text-muted-foreground">{o.status} · {formatINR(o.total)}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
