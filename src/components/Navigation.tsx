import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/hooks/use-store";

const navLinks = [
  { label: "Collections", href: "/collections" as const },
  { label: "Heritage", href: "/heritage" as const },
  { label: "Atelier", href: "/atelier" as const },
  { label: "Journal", href: "/journal" as const },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, wishlist, setCartOpen, setWishlistOpen } = useStore();

  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto flex items-center justify-between px-8 py-5 md:px-16 lg:px-[120px]">
        {/* Logo */}
        <Link to="/" className="font-display text-xl tracking-tight text-foreground md:text-2xl">
          Megam Drapes
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link key={link.label} to={link.href} className="gold-link">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Icons + Mobile toggle */}
        <div className="flex items-center gap-5">
          {/* Wishlist icon */}
          <button
            onClick={() => setWishlistOpen(true)}
            className="relative transition-opacity duration-300 hover:opacity-70"
            aria-label="Open wishlist"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center bg-gold-bright font-body text-[10px] text-foreground">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart icon */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative transition-opacity duration-300 hover:opacity-70"
            aria-label="Open cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center bg-gold-bright font-body text-[10px] text-foreground">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 md:hidden"
            aria-label="Toggle menu"
          >
            <span className={`block h-px w-6 bg-foreground transition-transform duration-400 ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`block h-px w-6 bg-foreground transition-opacity duration-400 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-foreground transition-transform duration-400 ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="glass-nav overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-6 px-8 py-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="gold-link text-base"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
