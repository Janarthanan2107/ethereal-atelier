import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { AdminProvider, useAdmin, ADMIN_EMAIL } from "@/admin/admin-store";
import { FloatingField, PrimaryButton } from "@/admin/ui/AdminPrimitives";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Sign in · Atelier Admin" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: () => (
    <AdminProvider>
      <LoginPage />
    </AdminProvider>
  ),
});

function LoginPage() {
  const { login, user } = useAdmin();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (user) {
    if (typeof window !== "undefined") void navigate({ to: "/admin" });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const result = login(email, password);
    setSubmitting(false);
    if (!result.ok) {
      toast.error(result.error ?? "Sign in failed");
      return;
    }
    toast.success("Welcome back to the atelier");
    void navigate({ to: "/admin" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-md"
      >
        <div className="mb-10 text-center">
          <p className="label-luxury">Atelier · Private</p>
          <h1 className="mt-3 font-display text-4xl text-primary md:text-5xl">Admin Sign In</h1>
          <p className="mt-3 font-body text-sm text-muted-foreground">
            Restricted to authorised stewards of the atelier.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-surface-container p-8 md:p-10">
          <FloatingField label="Email Address" value={email} onChange={setEmail} type="email" required name="email" />
          <FloatingField label="Password" value={password} onChange={setPassword} type="password" required name="password" />

          <PrimaryButton type="submit" disabled={submitting}>
            {submitting ? "Signing in…" : "Enter atelier"}
          </PrimaryButton>

          <div className="border-t border-border/60 pt-5 text-center">
            <p className="font-body text-[0.7rem] uppercase tracking-[0.15em] text-muted-foreground">
              Demo credentials
            </p>
            <p className="mt-2 font-body text-xs text-foreground">{ADMIN_EMAIL}</p>
            <p className="font-body text-xs text-foreground">admin123</p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
