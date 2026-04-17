import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { useAdmin } from "@/admin/admin-store";
import { PageHeader, PrimaryButton, FloatingField } from "@/admin/ui/AdminPrimitives";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { settings, updateSettings } = useAdmin();
  const [form, setForm] = useState(settings);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
    toast.success("Settings saved");
  };

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  return (
    <>
      <PageHeader eyebrow="Atelier" title="Settings" description="Brand details, hero banner, and featured collection." />

      <form onSubmit={handleSave} className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <h2 className="font-display text-xl text-foreground">Brand</h2>
          <div className="mt-6 space-y-8 bg-surface-container p-6 md:p-8">
            <FloatingField label="Brand name" value={form.brandName} onChange={(v) => set("brandName", v)} />
            <FloatingField label="Tagline" value={form.tagline} onChange={(v) => set("tagline", v)} />
            <div className="grid gap-8 md:grid-cols-2">
              <FloatingField label="Email" value={form.email} onChange={(v) => set("email", v)} type="email" />
              <FloatingField label="Phone" value={form.phone} onChange={(v) => set("phone", v)} />
            </div>
            <FloatingField label="Address" value={form.address} onChange={(v) => set("address", v)} textarea />
          </div>

          <h2 className="mt-10 font-display text-xl text-foreground">Homepage</h2>
          <div className="mt-6 space-y-8 bg-surface-container p-6 md:p-8">
            <FloatingField label="Hero banner image URL" value={form.heroBanner} onChange={(v) => set("heroBanner", v)} />
            <FloatingField label="Featured collection name" value={form.featuredCollection} onChange={(v) => set("featuredCollection", v)} />
          </div>

          <div className="mt-8 flex justify-end">
            <PrimaryButton type="submit">Save settings</PrimaryButton>
          </div>
        </section>

        <aside>
          <h2 className="font-display text-xl text-foreground">Preview</h2>
          <div className="mt-6 bg-surface-container p-5">
            {form.heroBanner ? (
              <img src={form.heroBanner} alt="Hero banner preview" className="aspect-[4/5] w-full object-cover" />
            ) : (
              <div className="flex aspect-[4/5] items-center justify-center bg-surface-highest font-body text-xs text-muted-foreground">No banner</div>
            )}
            <p className="label-luxury mt-4">{form.featuredCollection}</p>
            <p className="mt-2 font-display text-2xl text-foreground">{form.brandName}</p>
            <p className="mt-1 font-body text-sm text-muted-foreground">{form.tagline}</p>
          </div>
        </aside>
      </form>
    </>
  );
}
