import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { StoreProvider } from "@/hooks/use-store";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";
import { Toaster } from "@/components/ui/sonner";
import "@fontsource/noto-serif/400.css";
import "@fontsource/noto-serif/700.css";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-lg text-center">
        <p className="label-luxury">Error · 404</p>
        <h1 className="mt-4 font-display text-7xl leading-none text-foreground md:text-8xl">
          Off the loom
        </h1>
        <p className="mt-6 font-body text-base leading-relaxed text-muted-foreground">
          The thread you followed leads nowhere. The page may have been moved,
          retired, or never woven at all.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-primary px-8 py-3.5 font-body text-xs uppercase tracking-[0.15em] text-on-primary transition-opacity duration-400 hover:opacity-90"
          >
            Return home
          </Link>
          <Link
            to="/collections"
            className="font-body text-xs uppercase tracking-[0.15em] text-gold transition-opacity duration-400 hover:opacity-70"
          >
            Browse collections →
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Megam Drapes" },
      { name: "description", content: "Premium handwoven silk sarees — a curated digital atelier" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <StoreProvider>
      <Outlet />
      <CartDrawer />
      <WishlistDrawer />
      <Toaster />
    </StoreProvider>
  );
}
