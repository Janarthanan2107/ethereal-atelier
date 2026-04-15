import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/hooks/use-store";

export default function WishlistDrawer() {
  const { wishlist, wishlistOpen, setWishlistOpen, toggleWishlist, addToCart } = useStore();

  return (
    <AnimatePresence>
      {wishlistOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-foreground/20"
            onClick={() => setWishlistOpen(false)}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-surface shadow-ambient"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6">
              <h2 className="font-display text-xl text-foreground">Wishlist</h2>
              <button
                onClick={() => setWishlistOpen(false)}
                className="font-body text-xs uppercase tracking-[0.1em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                Close
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8">
              {wishlist.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center">
                  <p className="font-display text-lg text-foreground">Your wishlist is empty</p>
                  <p className="mt-2 font-body text-sm text-muted-foreground">
                    Save your favourite pieces for later
                  </p>
                  <Link
                    to="/collections"
                    onClick={() => setWishlistOpen(false)}
                    className="gold-link mt-6"
                  >
                    Browse Collections
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {wishlist.map((product) => (
                    <div key={product.id} className="flex gap-4">
                      <Link
                        to="/collections/$productId"
                        params={{ productId: product.id }}
                        onClick={() => setWishlistOpen(false)}
                        className="shrink-0"
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-24 w-20 object-cover"
                          width={80}
                          height={96}
                        />
                      </Link>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <p className="label-luxury mb-0.5">{product.weaveType}</p>
                          <p className="font-display text-sm text-foreground">{product.title}</p>
                          <p className="mt-0.5 font-body text-sm text-muted-foreground">{product.price}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => {
                              addToCart(product);
                              setWishlistOpen(false);
                            }}
                            className="gold-link"
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => toggleWishlist(product)}
                            className="font-body text-xs text-muted-foreground transition-colors duration-300 hover:text-foreground"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
