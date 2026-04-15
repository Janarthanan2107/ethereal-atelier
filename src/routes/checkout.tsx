import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/hooks/use-store";
import { motion } from "framer-motion";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Megam Drapes" },
      { name: "description", content: "Complete your order for handwoven luxury sarees." },
    ],
  }),
  component: CheckoutPage,
});

function FloatingInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div className="relative">
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="peer w-full border-b border-border bg-transparent pb-2 pt-5 font-body text-sm text-foreground outline-none transition-colors duration-300 focus:border-gold"
      />
      <label
        htmlFor={name}
        className={`pointer-events-none absolute left-0 font-body text-muted-foreground transition-all duration-300 ${
          isActive
            ? "top-0 text-[0.65rem] uppercase tracking-[0.12em] text-gold"
            : "top-5 text-sm"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

function CheckoutPage() {
  const { cart, cartTotal, cartCount } = useStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const update = (field: string) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (cart.length === 0 && !submitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6">
        <p className="font-display text-2xl text-foreground">Your cart is empty</p>
        <p className="mt-3 font-body text-sm text-muted-foreground">
          Add some beautiful sarees before checking out
        </p>
        <Link to="/collections" className="gold-link mt-8">
          Browse Collections
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
      >
        <div className="label-luxury mb-4">Order Confirmed</div>
        <h1 className="font-display text-3xl text-foreground md:text-4xl">Thank You</h1>
        <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-muted-foreground">
          Your order for {cartCount} {cartCount === 1 ? "piece" : "pieces"} has been placed.
          We will send a confirmation to {form.email}.
        </p>
        <Link to="/collections" className="gold-link mt-10">
          Continue Shopping
        </Link>
      </motion.div>
    );
  }

  const shipping = cartTotal >= 25000 ? 0 : 500;
  const total = cartTotal + shipping;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-5xl px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="label-luxury mb-3">Checkout</div>
          <h1 className="font-display text-3xl text-foreground md:text-4xl">
            Complete Your Order
          </h1>
        </motion.div>

        <div className="mt-14 grid gap-16 lg:grid-cols-[1fr_360px]">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="label-luxury mb-8">Shipping Details</p>
            <div className="grid gap-8 sm:grid-cols-2">
              <FloatingInput label="First Name" name="firstName" value={form.firstName} onChange={update("firstName")} />
              <FloatingInput label="Last Name" name="lastName" value={form.lastName} onChange={update("lastName")} />
            </div>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <FloatingInput label="Email" name="email" type="email" value={form.email} onChange={update("email")} />
              <FloatingInput label="Phone" name="phone" type="tel" value={form.phone} onChange={update("phone")} />
            </div>
            <div className="mt-8">
              <FloatingInput label="Address" name="address" value={form.address} onChange={update("address")} />
            </div>
            <div className="mt-8 grid gap-8 sm:grid-cols-3">
              <FloatingInput label="City" name="city" value={form.city} onChange={update("city")} />
              <FloatingInput label="State" name="state" value={form.state} onChange={update("state")} />
              <FloatingInput label="Pincode" name="pincode" value={form.pincode} onChange={update("pincode")} />
            </div>

            <button
              type="submit"
              className="mt-14 w-full bg-primary-container py-4 text-sm uppercase tracking-[0.08em] text-on-primary transition-opacity duration-400 hover:opacity-90 sm:w-auto sm:px-16"
            >
              Place Order — ₹{total.toLocaleString("en-IN")}
            </button>
          </motion.form>

          {/* Order Summary */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="label-luxury mb-8">Order Summary</p>
            <div className="flex flex-col gap-5">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="h-20 w-16 object-cover"
                    width={64}
                    height={80}
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="font-display text-sm text-foreground">{item.product.title}</p>
                      <p className="mt-0.5 font-body text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-body text-sm text-foreground">
                      ₹{(item.product.priceNum * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-3 border-t border-border pt-6">
              <div className="flex justify-between font-body text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">₹{cartTotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between font-body text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-foreground">
                  {shipping === 0 ? "Complimentary" : `₹${shipping.toLocaleString("en-IN")}`}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-border">
                <span className="font-body text-sm text-muted-foreground">Total</span>
                <span className="font-display text-lg text-foreground">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
