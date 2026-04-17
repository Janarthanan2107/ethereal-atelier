import { createFileRoute } from "@tanstack/react-router";
import AdminLayout from "@/admin/AdminLayout";
import { AdminProvider } from "@/admin/admin-store";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Atelier Admin · Megam Drapes" },
      { name: "description", content: "Megam Drapes admin dashboard" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminShell,
});

function AdminShell() {
  return (
    <AdminProvider>
      <AdminLayout />
    </AdminProvider>
  );
}
