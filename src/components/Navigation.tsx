import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Collections", href: "/collections" as const },
  { label: "Heritage", href: "/" as const },
  { label: "Atelier", href: "/" as const },
  { label: "Journal", href: "/" as const },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

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
