import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/hooks/use-store";

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQuantity, cartTotal } = useStore();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-foreground/20"
            onClick={() => setCartOpen(false)}
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
              <h2 className="font-display text-xl text-foreground">Your Cart</h2>
              <button
                onClick={() => setCartOpen(false)}
                className="font-body text-xs uppercase tracking-[0.1em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                Close
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center">
                  <p className="font-display text-lg text-foreground">Your cart is empty</p>
                  <p className="mt-2 font-body text-sm text-muted-foreground">
                    Discover our handwoven saree collection
                  </p>
                  <Link
                    to="/collections"
                    onClick={() => setCartOpen(false)}
                    className="gold-link mt-6"
                  >
                    Browse Collections
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <Link
                        to="/collections/$productId"
                        params={{ productId: item.product.id }}
                        onClick={() => setCartOpen(false)}
                        className="shrink-0"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="h-24 w-20 object-cover"
                          width={80}
                          height={96}
                        />
                      </Link>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <p className="label-luxury mb-0.5">{item.product.weaveType}</p>
                          <p className="font-display text-sm text-foreground">{item.product.title}</p>
                          <p className="mt-0.5 font-body text-sm text-muted-foreground">{item.product.price}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center bg-surface-container font-body text-sm text-foreground transition-colors duration-300 hover:bg-surface-highest"
                          >
                            −
                          </button>
                          <span className="font-body text-sm text-foreground">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center bg-surface-container font-body text-sm text-foreground transition-colors duration-300 hover:bg-surface-highest"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="ml-auto font-body text-xs text-muted-foreground transition-colors duration-300 hover:text-foreground"
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

            {/* Footer */}
            {cart.length > 0 && (
              <div className="px-8 py-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-body text-sm text-muted-foreground">Subtotal</span>
                  <span className="font-display text-lg text-foreground">
                    ₹{cartTotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <button className="w-full bg-primary-container py-3.5 text-sm tracking-[0.05em] uppercase text-on-primary transition-opacity duration-400 hover:opacity-90">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
