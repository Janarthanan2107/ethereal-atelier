import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FabricZoom from "@/components/FabricZoom";
import { getProductById, getSimilarProducts } from "@/data/products";

export const Route = createFileRoute("/collections/$productId")({
  component: ProductDetailPage,
  head: ({ params }) => {
    const product = getProductById(params.productId);
    return {
      meta: [
        { title: product ? `${product.title} — Megam Drapes` : "Product — Megam Drapes" },
        { name: "description", content: product?.description?.slice(0, 160) ?? "" },
        { property: "og:title", content: product ? `${product.title} — Megam Drapes` : "Product" },
        { property: "og:description", content: product?.description?.slice(0, 160) ?? "" },
      ],
    };
  },
  notFoundComponent: () => (
    <main>
      <Navigation />
      <div className="flex min-h-screen items-center justify-center bg-surface px-4 pt-20">
        <div className="text-center">
          <h1 className="font-display text-4xl text-foreground">Saree Not Found</h1>
          <p className="mt-3 font-body text-muted-foreground">This piece may no longer be available.</p>
          <Link to="/collections" className="gold-link mt-6 inline-block">Back to Collections</Link>
        </div>
      </div>
      <Footer />
    </main>
  ),
});

function ProductDetailPage() {
  const { productId } = Route.useParams();
  const product = getProductById(productId);

  if (!product) {
    throw notFound();
  }

  const similar = getSimilarProducts(product);

  return (
    <main>
      <Navigation />

      {/* Breadcrumb */}
      <section className="bg-surface px-6 pt-28 pb-4 md:px-16 md:pt-36 lg:px-[120px]">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex items-center gap-2 font-body text-xs text-muted-foreground">
            <Link to="/" className="transition-colors duration-300 hover:text-foreground">Home</Link>
            <span>/</span>
            <Link to="/collections" className="transition-colors duration-300 hover:text-foreground">Collections</Link>
            <span>/</span>
            <span className="text-foreground">{product.title}</span>
          </div>
        </div>
      </section>

      {/* Product Detail */}
      <section className="bg-surface px-6 py-12 md:px-16 md:py-20 lg:px-[120px]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
          {/* Left – Fabric Zoom Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
          >
            <FabricZoom src={product.image} alt={product.title} />
          </motion.div>

          {/* Right – Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
            className="flex flex-col justify-center"
          >
            <p className="label-luxury mb-3">{product.category}</p>
            <h1 className="font-display text-3xl tracking-[-0.02em] text-foreground md:text-4xl">
              {product.title}
            </h1>
            <p className="mt-2 font-body text-sm text-gold">{product.weaveType} Silk</p>
            <p className="mt-1 font-display text-2xl text-foreground">{product.price}</p>

            <p className="mt-6 max-w-md font-body text-base leading-[1.6] text-muted-foreground">
              {product.description}
            </p>

            {/* Details grid */}
            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5">
              {Object.entries(product.details).map(([key, value]) => (
                <div key={key}>
                  <p className="font-body text-xs uppercase tracking-[0.1em] text-muted-foreground">
                    {key === "craftTime" ? "Craft Time" : key.charAt(0).toUpperCase() + key.slice(1)}
                  </p>
                  <p className="mt-0.5 font-body text-sm text-foreground">{value}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <button className="bg-primary-container px-10 py-3.5 text-sm tracking-[0.05em] uppercase text-on-primary transition-opacity duration-400 hover:opacity-90">
                Enquire Now
              </button>
              <span className="gold-link cursor-pointer">Add to Wishlist</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Similar Products */}
      {similar.length > 0 && (
        <section className="bg-surface-container px-6 py-20 md:px-16 md:py-28 lg:px-[120px]">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-12 flex items-end justify-between md:mb-16">
              <div>
                <p className="label-luxury mb-3">You May Also Love</p>
                <h2 className="font-display text-2xl tracking-[-0.02em] text-foreground md:text-3xl">
                  Similar Pieces
                </h2>
              </div>
              <Link to="/collections" className="gold-link hidden md:inline-block">View All</Link>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              {similar.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
                >
                  <Link
                    to="/collections/$productId"
                    params={{ productId: item.id }}
                    className="group block"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        width={800}
                        height={1000}
                        className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="mt-5">
                      <p className="label-luxury mb-1.5">{item.category}</p>
                      <h3 className="font-display text-lg text-foreground">{item.title}</h3>
                      <div className="mt-1 flex items-center gap-3">
                        <span className="font-body text-sm text-muted-foreground">{item.price}</span>
                        <span className="font-body text-xs text-gold">{item.weaveType}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 text-center md:hidden">
              <Link to="/collections" className="gold-link">View All Collections</Link>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
