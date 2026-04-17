import { createFileRoute, Link } from "@tanstack/react-router";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar,
} from "recharts";
import { useAdmin } from "@/admin/admin-store";
import { PageHeader, StatCard, Section, Pill } from "@/admin/ui/AdminPrimitives";

export const Route = createFileRoute("/admin/")({
  component: DashboardOverview,
});

function formatINR(n: number) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)}L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

function DashboardOverview() {
  const { products, orders, reviews, queries } = useAdmin();

  const totalRevenue = orders
    .filter((o) => o.paymentStatus === "Paid")
    .reduce((s, o) => s + o.total, 0);
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 3).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;
  const pendingReviews = reviews.filter((r) => r.status === "Pending").length;
  const openQueries = queries.filter((q) => !q.resolved).length;

  // Sales chart — last 7 days
  const salesData = (() => {
    const now = new Date();
    const buckets: { day: string; revenue: number; orders: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const dayOrders = orders.filter((o) => o.createdAt.slice(0, 10) === key);
      buckets.push({
        day: d.toLocaleDateString("en-IN", { weekday: "short" }),
        revenue: dayOrders.reduce((s, o) => s + (o.paymentStatus === "Paid" ? o.total : 0), 0),
        orders: dayOrders.length,
      });
    }
    return buckets;
  })();

  // Top products
  const topProducts = (() => {
    const map = new Map<string, { title: string; units: number; revenue: number }>();
    for (const o of orders) {
      for (const item of o.items) {
        const e = map.get(item.productId) ?? { title: item.title, units: 0, revenue: 0 };
        e.units += item.quantity;
        e.revenue += item.quantity * item.price;
        map.set(item.productId, e);
      }
    }
    return Array.from(map.values()).sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  })();

  const recentOrders = [...orders]
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, 5);

  return (
    <>
      <PageHeader
        eyebrow="Dashboard"
        title="Overview"
        description="A pulse on your atelier — orders, inventory, and customer voices, all in one place."
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        <StatCard index={0} label="Total Revenue" value={formatINR(totalRevenue)} sub={`${orders.length} orders all-time`} />
        <StatCard index={1} label="Total Orders" value={orders.length} sub={`${orders.filter((o) => o.status === "Pending").length} pending`} />
        <StatCard index={2} label="Total Products" value={products.length} sub={`${products.filter((p) => p.stock > 0).length} in stock`} />
        <StatCard index={3} label="Stock Alerts" value={lowStock + outOfStock} sub={`${outOfStock} out · ${lowStock} low`} />
      </div>

      <Section
        title="Sales — Last 7 Days"
        action={
          <p className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Revenue · Orders
          </p>
        }
      >
        <div className="bg-surface-container p-4 md:p-8">
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.88 0.015 95)" />
                <XAxis dataKey="day" stroke="oklch(0.45 0.04 15)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.45 0.04 15)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => formatINR(v)} />
                <Tooltip
                  contentStyle={{ background: "oklch(0.97 0.015 95)", border: "1px solid oklch(0.88 0.015 95)", borderRadius: 0 }}
                  formatter={(v: number) => formatINR(v)}
                />
                <Line type="monotone" dataKey="revenue" stroke="oklch(0.2 0.08 15)" strokeWidth={2} dot={{ fill: "oklch(0.55 0.12 85)", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Section>

      <div className="mt-12 grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="mb-5 flex items-end justify-between">
            <h2 className="font-display text-2xl text-foreground">Recent Orders</h2>
            <Link to="/admin/orders" className="font-body text-xs uppercase tracking-[0.15em] text-gold transition-opacity hover:opacity-70">
              View all →
            </Link>
          </div>
          <div className="bg-surface-container">
            {recentOrders.map((o) => (
              <Link
                key={o.id}
                to="/admin/orders"
                className="flex items-center justify-between border-b border-border/40 px-5 py-4 last:border-b-0 transition-colors hover:bg-surface-highest"
              >
                <div className="min-w-0">
                  <p className="font-display text-base text-foreground">{o.customerName}</p>
                  <p className="mt-0.5 truncate font-body text-xs text-muted-foreground">
                    {o.id} · {o.items.length} item{o.items.length > 1 ? "s" : ""} · {new Date(o.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <Pill tone={o.status === "Delivered" ? "success" : o.status === "Pending" ? "warn" : "info"}>{o.status}</Pill>
                  <span className="hidden font-display text-base text-foreground sm:inline">{formatINR(o.total)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="mb-5">
            <h2 className="font-display text-2xl text-foreground">Top Pieces</h2>
          </div>
          <div className="bg-surface-container p-4">
            <div className="h-[260px] w-full">
              <ResponsiveContainer>
                <BarChart data={topProducts} layout="vertical" margin={{ left: 10, right: 20 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="title" type="category" stroke="oklch(0.45 0.04 15)" fontSize={11} width={120} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ background: "oklch(0.97 0.015 95)", border: "1px solid oklch(0.88 0.015 95)", borderRadius: 0 }}
                    formatter={(v: number) => formatINR(v)}
                  />
                  <Bar dataKey="revenue" fill="oklch(0.55 0.12 85)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-surface-container p-5">
              <p className="label-luxury">Reviews queue</p>
              <p className="mt-2 font-display text-2xl text-foreground">{pendingReviews}</p>
              <Link to="/admin/reviews" className="mt-2 inline-block font-body text-xs uppercase tracking-[0.15em] text-gold">Moderate →</Link>
            </div>
            <div className="bg-surface-container p-5">
              <p className="label-luxury">Open enquiries</p>
              <p className="mt-2 font-display text-2xl text-foreground">{openQueries}</p>
              <Link to="/admin/queries" className="mt-2 inline-block font-body text-xs uppercase tracking-[0.15em] text-gold">Respond →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
