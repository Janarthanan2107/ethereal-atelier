import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Package, Boxes, ShoppingBag, Star, BookText,
  Users, Mail, Settings, LogOut, Menu, X, ExternalLink,
} from "lucide-react";
import { useAdmin } from "./admin-store";

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean };
const nav: NavItem[] = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/stock", label: "Stock", icon: Boxes },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/reviews", label: "Reviews", icon: Star },
  { to: "/admin/journal", label: "Journal", icon: BookText },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/queries", label: "Enquiries", icon: Mail },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout() {
  const { user, logout } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user) {
    // Redirect via effect-free mechanism (called inside render is fine for client routing here)
    if (typeof window !== "undefined" && !location.pathname.endsWith("/login")) {
      void navigate({ to: "/admin/login" });
    }
    return null;
  }

  const handleLogout = () => {
    logout();
    void navigate({ to: "/admin/login" });
  };

  const isActive = (to: string, exact?: boolean) =>
    exact ? location.pathname === to : location.pathname === to || location.pathname.startsWith(to + "/");

  return (
    <div className="flex min-h-screen bg-surface text-foreground">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-border/40 bg-surface-container lg:block">
        <SidebarInner nav={nav} isActive={isActive} onLogout={handleLogout} userName={user.name} />
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-primary/40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-surface-container lg:hidden"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute right-3 top-3 p-2 text-muted-foreground hover:text-foreground"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
              <SidebarInner nav={nav} isActive={isActive} onLogout={handleLogout} userName={user.name} onNavigate={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border/40 bg-surface/80 px-4 py-3 backdrop-blur-xl md:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="-ml-1 rounded-md p-2 text-muted-foreground hover:bg-surface-highest lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <p className="label-luxury">Atelier · Admin</p>
          </div>
          <Link
            to="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 font-body text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-gold"
          >
            View storefront <ExternalLink className="h-3 w-3" />
          </Link>
        </header>

        <main className="min-w-0 flex-1 px-4 py-8 md:px-8 md:py-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function SidebarInner({
  nav, isActive, onLogout, userName, onNavigate,
}: {
  nav: typeof navItemsType;
  isActive: (to: string, exact?: boolean) => boolean;
  onLogout: () => void;
  userName: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border/40 px-6 py-6">
        <p className="font-display text-2xl text-primary">Megam</p>
        <p className="label-luxury mt-1">Drapes Atelier</p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-6">
        {nav.map((item) => {
          const active = isActive(item.to, item.exact);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={`group flex items-center gap-3 rounded-md px-3 py-2.5 font-body text-sm transition-colors ${
                active
                  ? "bg-primary text-on-primary"
                  : "text-muted-foreground hover:bg-surface-highest hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border/40 px-4 py-4">
        <p className="font-body text-xs text-muted-foreground">Signed in as</p>
        <p className="mt-0.5 font-display text-sm text-foreground">{userName}</p>
        <button
          onClick={onLogout}
          className="mt-3 flex w-full items-center gap-2 rounded-md px-2 py-1.5 font-body text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:bg-surface-highest hover:text-primary"
        >
          <LogOut className="h-3.5 w-3.5" /> Sign out
        </button>
      </div>
    </div>
  );
}

// Type helper
const navItemsType = nav;
