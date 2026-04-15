import sareeTexture1 from "@/assets/saree-texture-1.jpg";
import sareeTexture2 from "@/assets/saree-texture-2.jpg";
import sareeTexture3 from "@/assets/saree-texture-3.jpg";
import sareeNavy from "@/assets/saree-navy-banarasi.jpg";
import sareePink from "@/assets/saree-pink-kanjeevaram.jpg";
import sareeTeal from "@/assets/saree-teal-pattu.jpg";
import sareeIvory from "@/assets/saree-ivory-banarasi.jpg";
import sareeRed from "@/assets/saree-red-kanjeevaram.jpg";
import sareeMustard from "@/assets/saree-mustard-pattu.jpg";

export type WeaveType = "Banarasi" | "Kanjeevaram" | "Pattu";

export interface Product {
  id: string;
  title: string;
  weaveType: WeaveType;
  price: string;
  priceNum: number;
  category: string;
  image: string;
  description: string;
  details: {
    fabric: string;
    length: string;
    width: string;
    weight: string;
    origin: string;
    craftTime: string;
  };
}

export const products: Product[] = [
  {
    id: "banarasi-crimson",
    title: "Banarasi Crimson",
    weaveType: "Banarasi",
    price: "₹45,000",
    priceNum: 45000,
    category: "BRIDAL COLLECTION",
    image: sareeTexture1,
    description:
      "A resplendent crimson Banarasi silk saree adorned with intricate gold zari work. The elaborate lotus and floral motifs are handwoven by master artisans of Varanasi, making each piece a unique heirloom.",
    details: {
      fabric: "Pure Mulberry Silk",
      length: "6.3 meters",
      width: "47 inches",
      weight: "850 grams",
      origin: "Varanasi, Uttar Pradesh",
      craftTime: "30–45 days",
    },
  },
  {
    id: "royal-kanjeevaram",
    title: "Royal Kanjeevaram",
    weaveType: "Kanjeevaram",
    price: "₹62,000",
    priceNum: 62000,
    category: "HERITAGE WEAVES",
    image: sareeTexture2,
    description:
      "A majestic royal purple Kanjeevaram silk saree with a rich gold border featuring temple motifs. Woven in the ancient traditions of Kanchipuram, this saree represents the pinnacle of South Indian silk artistry.",
    details: {
      fabric: "Pure Kanjeevaram Silk",
      length: "6.2 meters",
      width: "48 inches",
      weight: "920 grams",
      origin: "Kanchipuram, Tamil Nadu",
      craftTime: "25–35 days",
    },
  },
  {
    id: "emerald-pattu",
    title: "Emerald Pattu",
    weaveType: "Pattu",
    price: "₹38,000",
    priceNum: 38000,
    category: "FESTIVE EDIT",
    image: sareeTexture3,
    description:
      "An enchanting emerald green Pattu silk saree with delicate gold paisley motifs and a broad zari border. Perfect for festive occasions, this piece embodies the timeless elegance of traditional silk weaving.",
    details: {
      fabric: "Pure Pattu Silk",
      length: "6.3 meters",
      width: "46 inches",
      weight: "780 grams",
      origin: "Dharmavaram, Andhra Pradesh",
      craftTime: "20–30 days",
    },
  },
  {
    id: "midnight-banarasi",
    title: "Midnight Banarasi",
    weaveType: "Banarasi",
    price: "₹52,000",
    priceNum: 52000,
    category: "SIGNATURE COLLECTION",
    image: sareeNavy,
    description:
      "A stunning deep navy Banarasi silk saree featuring elaborate gold brocade work with floral jaal patterns. The richly embellished pallu makes this an extraordinary piece for special celebrations.",
    details: {
      fabric: "Pure Katan Silk",
      length: "6.3 meters",
      width: "47 inches",
      weight: "900 grams",
      origin: "Varanasi, Uttar Pradesh",
      craftTime: "35–45 days",
    },
  },
  {
    id: "temple-pink-kanjeevaram",
    title: "Temple Pink Kanjeevaram",
    weaveType: "Kanjeevaram",
    price: "₹58,000",
    priceNum: 58000,
    category: "BRIDAL COLLECTION",
    image: sareePink,
    description:
      "A vibrant magenta pink Kanjeevaram silk with traditional temple border motifs in pure gold zari. This bridal masterpiece showcases the legendary weaving traditions of Kanchipuram.",
    details: {
      fabric: "Pure Kanjeevaram Silk",
      length: "6.2 meters",
      width: "48 inches",
      weight: "950 grams",
      origin: "Kanchipuram, Tamil Nadu",
      craftTime: "30–40 days",
    },
  },
  {
    id: "teal-pattu-paisley",
    title: "Teal Pattu Paisley",
    weaveType: "Pattu",
    price: "₹35,000",
    priceNum: 35000,
    category: "FESTIVE EDIT",
    image: sareeTeal,
    description:
      "An elegant teal green Pattu silk saree with handwoven gold paisley motifs scattered across the body. The classic gold border adds a touch of regal sophistication.",
    details: {
      fabric: "Pure Pattu Silk",
      length: "6.3 meters",
      width: "46 inches",
      weight: "750 grams",
      origin: "Dharmavaram, Andhra Pradesh",
      craftTime: "18–25 days",
    },
  },
  {
    id: "ivory-floral-banarasi",
    title: "Ivory Floral Banarasi",
    weaveType: "Banarasi",
    price: "₹68,000",
    priceNum: 68000,
    category: "BRIDAL COLLECTION",
    image: sareeIvory,
    description:
      "A breathtaking ivory Banarasi silk saree with multicolored floral meenakari work and a rich gold border. This exquisite bridal saree is a masterpiece of Varanasi's finest weaving tradition.",
    details: {
      fabric: "Pure Katan Silk with Meenakari",
      length: "6.3 meters",
      width: "47 inches",
      weight: "880 grams",
      origin: "Varanasi, Uttar Pradesh",
      craftTime: "40–60 days",
    },
  },
  {
    id: "maroon-peacock-kanjeevaram",
    title: "Maroon Peacock Kanjeevaram",
    weaveType: "Kanjeevaram",
    price: "₹72,000",
    priceNum: 72000,
    category: "HERITAGE WEAVES",
    image: sareeRed,
    description:
      "A regal deep maroon Kanjeevaram silk featuring stunning peacock motifs and an elaborate temple border in pure gold zari. This heritage piece represents the zenith of South Indian weaving mastery.",
    details: {
      fabric: "Pure Kanjeevaram Silk",
      length: "6.2 meters",
      width: "48 inches",
      weight: "980 grams",
      origin: "Kanchipuram, Tamil Nadu",
      craftTime: "35–50 days",
    },
  },
  {
    id: "mustard-classic-pattu",
    title: "Mustard Classic Pattu",
    weaveType: "Pattu",
    price: "₹32,000",
    priceNum: 32000,
    category: "EVERYDAY LUXURY",
    image: sareeMustard,
    description:
      "A warm mustard yellow Pattu silk saree with a rich maroon and gold contrast border. Its understated elegance makes it perfect for both festive occasions and refined everyday wear.",
    details: {
      fabric: "Pure Pattu Silk",
      length: "6.3 meters",
      width: "46 inches",
      weight: "720 grams",
      origin: "Dharmavaram, Andhra Pradesh",
      craftTime: "15–22 days",
    },
  },
];

export const weaveTypes: WeaveType[] = ["Banarasi", "Kanjeevaram", "Pattu"];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getSimilarProducts(product: Product, count = 3): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.weaveType === product.weaveType)
    .slice(0, count)
    .concat(
      products
        .filter((p) => p.id !== product.id && p.weaveType !== product.weaveType)
        .slice(0, count)
    )
    .slice(0, count);
}
