import { createFileRoute } from "@tanstack/react-router";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturedCollection from "@/components/FeaturedCollection";
import EditorialSection from "@/components/EditorialSection";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Megam Drapes — Premium Handwoven Silk Sarees" },
      { name: "description", content: "Discover India's finest handwoven silk sarees at Megam Drapes. A curated atelier of Banarasi, Kanjeevaram, and heritage weaves crafted by master artisans." },
      { property: "og:title", content: "Megam Drapes — Premium Handwoven Silk Sarees" },
      { property: "og:description", content: "A curated atelier of India's finest handwoven silk sarees — where heritage meets modern elegance." },
    ],
  }),
});

function Index() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <FeaturedCollection />
      <EditorialSection />
      <Footer />
    </main>
  );
}
