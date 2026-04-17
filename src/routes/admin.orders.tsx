import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useAdmin, type Order, type OrderStatus } from "@/admin/admin-store";
import { PageHeader, Pill, GhostButton } from "@/admin/ui/AdminPrimitives";

export const Route = createFileRoute("/admin/orders")({
  component: OrdersPage,
});

const STATUSES: OrderStatus[] = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

function formatINR(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

function OrdersPage() {
  const { orders, updateOrderStatus } = useAdmin();
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "All">("All");
  const [selected, setSelected] = useState<Order | null>(null);

  const filtered = useMemo(() => {
    const list = statusFilter === "All" ? orders : orders.filter((o) => o.status === statusFilter);
    return [...list].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  }, [orders, statusFilter]);

  return (
    <>
      <PageHeader
        eyebrow="Fulfilment"
        title="Orders"
        description="Track every drape from atelier to doorstep."
      />

      <div className="mb-6 flex gap-2 overflow-x-auto">
        {(["All", ...STATUSES] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`shrink-0 px-4 py-2 font-body text-xs uppercase tracking-[0.15em] transition-colors ${
              statusFilter === s ? "bg-primary text-on-primary" : "bg-surface-container text-muted-foreground hover:text-foreground"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="bg-surface-container">
        <div className="hidden grid-cols-12 border-b border-border/40 px-5 py-3 md:grid">
          <p className="col-span-2 label-luxury">Order</p>
          <p className="col-span-3 label-luxury">Customer</p>
          <p className="col-span-2 label-luxury">Date</p>
          <p className="col-span-2 label-luxury">Total</p>
          <p className="col-span-2 label-luxury">Status</p>
          <p className="col-span-1" />
        </div>

        {filtered.map((o) => (
          <button
            key={o.id}
            onClick={() => setSelected(o)}
            className="grid w-full grid-cols-12 items-center gap-2 border-b border-border/40 px-5 py-4 text-left transition-colors last:border-b-0 hover:bg-surface-highest"
          >
            <p className="col-span-6 font-display text-base text-foreground md:col-span-2">{o.id}</p>
            <div className="col-span-6 md:col-span-3">
              <p className="font-body text-sm text-foreground">{o.customerName}</p>
              <p className="truncate font-body text-xs text-muted-foreground">{o.customerEmail}</p>
            </div>
            <p className="col-span-6 font-body text-sm text-muted-foreground md:col-span-2">
              {new Date(o.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </p>
            <p className="col-span-6 font-display text-base text-foreground md:col-span-2">{formatINR(o.total)}</p>
            <div className="col-span-12 md:col-span-2">
              <Pill tone={o.status === "Delivered" ? "success" : o.status === "Cancelled" ? "danger" : o.status === "Pending" ? "warn" : "info"}>
                {o.status}
              </Pill>
            </div>
            <p className="hidden text-right font-body text-xs text-gold md:col-span-1 md:block">→</p>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="px-5 py-8 text-center font-body text-sm text-muted-foreground">No orders match this filter.</p>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <OrderDetailDrawer
            order={selected}
            onClose={() => setSelected(null)}
            onStatusChange={(s) => {
              updateOrderStatus(selected.id, s);
              setSelected({ ...selected, status: s });
              toast.success(`Order marked as ${s}`);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function OrderDetailDrawer({
  order, onClose, onStatusChange,
}: { order: Order; onClose: () => void; onStatusChange: (s: OrderStatus) => void }) {
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="fixed inset-y-0 right-0 z-50 w-full max-w-lg overflow-y-auto bg-surface p-6 md:p-10"
      >
        <button onClick={onClose} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
          <X className="h-5 w-5" />
        </button>
        <p className="label-luxury">Order</p>
        <h2 className="mt-2 font-display text-3xl text-foreground">{order.id}</h2>
        <p className="mt-1 font-body text-sm text-muted-foreground">
          Placed {new Date(order.createdAt).toLocaleString("en-IN")}
        </p>

        <div className="mt-8">
          <p className="label-luxury">Customer</p>
          <p className="mt-2 font-display text-base text-foreground">{order.customerName}</p>
          <p className="font-body text-sm text-muted-foreground">{order.customerEmail}</p>
          <p className="font-body text-sm text-muted-foreground">{order.customerPhone}</p>
          <p className="mt-3 font-body text-sm text-foreground">{order.shippingAddress}</p>
        </div>

        <div className="mt-8">
          <p className="label-luxury mb-3">Items</p>
          {order.items.map((it, i) => (
            <div key={i} className="flex items-center gap-4 border-b border-border/40 py-3 last:border-b-0">
              <img src={it.image} alt={it.title} className="h-16 w-16 object-cover" />
              <div className="min-w-0 flex-1">
                <p className="font-display text-base text-foreground">{it.title}</p>
                <p className="font-body text-xs text-muted-foreground">Qty {it.quantity} · {formatINR(it.price)}</p>
              </div>
              <p className="font-display text-base text-foreground">{formatINR(it.price * it.quantity)}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4">
          <p className="label-luxury">Total</p>
          <p className="font-display text-2xl text-primary">{formatINR(order.total)}</p>
        </div>

        <div className="mt-8">
          <p className="label-luxury mb-3">Payment</p>
          <Pill tone={order.paymentStatus === "Paid" ? "success" : order.paymentStatus === "Pending" ? "warn" : "danger"}>
            {order.paymentStatus}
          </Pill>
        </div>

        <div className="mt-8">
          <p className="label-luxury mb-3">Update status</p>
          <div className="flex flex-wrap gap-2">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => onStatusChange(s)}
                className={`px-3 py-2 font-body text-xs uppercase tracking-[0.15em] transition-colors ${
                  order.status === s ? "bg-primary text-on-primary" : "bg-surface-container text-muted-foreground hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <GhostButton onClick={onClose}>Close</GhostButton>
        </div>
      </motion.div>
    </>
  );
}
