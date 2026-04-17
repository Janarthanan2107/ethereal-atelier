import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { products as seedProducts, type Product, type WeaveType } from "@/data/products";

/* ============= Types ============= */

export interface AdminProduct extends Product {
  stock: number;
  images: string[];
  createdAt: string;
}

export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
export type PaymentStatus = "Paid" | "Pending" | "Refunded" | "Failed";

export interface OrderLine {
  productId: string;
  title: string;
  image: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  items: OrderLine[];
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  productTitle: string;
  customerName: string;
  rating: number;
  comment: string;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: string;
}

export interface JournalPost {
  id: string;
  title: string;
  cover: string;
  content: string;
  excerpt: string;
  status: "Draft" | "Published";
  publishedAt: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalSpent: number;
  orderCount: number;
  joinedAt: string;
}

export interface ContactQuery {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  resolved: boolean;
  createdAt: string;
}

export interface BrandSettings {
  brandName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  heroBanner: string;
  featuredCollection: string;
}

export interface AdminUser {
  email: string;
  name: string;
  role: "admin";
  loginAt: string;
}

/* ============= Constants ============= */

export const ADMIN_EMAIL = "admin@megamdrapes.com";
export const ADMIN_PASSWORD = "admin123";

/* ============= Storage ============= */

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function save(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota */
  }
}

/* ============= Seed data ============= */

const seedAdminProducts: AdminProduct[] = seedProducts.map((p, i) => ({
  ...p,
  stock: [12, 3, 0, 8, 15, 2, 7, 1, 22][i % 9],
  images: [p.image],
  createdAt: new Date(Date.now() - i * 86400000 * 4).toISOString(),
}));

const seedOrders: Order[] = [
  {
    id: "MD-1042",
    customerName: "Ananya Sharma",
    customerEmail: "ananya@example.com",
    customerPhone: "+91 98765 43210",
    shippingAddress: "12 Marine Drive, Mumbai 400020",
    items: [
      { productId: seedProducts[0].id, title: seedProducts[0].title, image: seedProducts[0].image, quantity: 1, price: seedProducts[0].priceNum },
    ],
    total: seedProducts[0].priceNum,
    status: "Delivered",
    paymentStatus: "Paid",
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: "MD-1043",
    customerName: "Priya Iyer",
    customerEmail: "priya@example.com",
    customerPhone: "+91 99887 76655",
    shippingAddress: "44 Anna Salai, Chennai 600002",
    items: [
      { productId: seedProducts[1].id, title: seedProducts[1].title, image: seedProducts[1].image, quantity: 1, price: seedProducts[1].priceNum },
      { productId: seedProducts[5].id, title: seedProducts[5].title, image: seedProducts[5].image, quantity: 1, price: seedProducts[5].priceNum },
    ],
    total: seedProducts[1].priceNum + seedProducts[5].priceNum,
    status: "Shipped",
    paymentStatus: "Paid",
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: "MD-1044",
    customerName: "Rhea Kapoor",
    customerEmail: "rhea@example.com",
    customerPhone: "+91 90000 12345",
    shippingAddress: "9 Greater Kailash, New Delhi 110048",
    items: [
      { productId: seedProducts[6].id, title: seedProducts[6].title, image: seedProducts[6].image, quantity: 1, price: seedProducts[6].priceNum },
    ],
    total: seedProducts[6].priceNum,
    status: "Processing",
    paymentStatus: "Paid",
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: "MD-1045",
    customerName: "Meera Nair",
    customerEmail: "meera@example.com",
    customerPhone: "+91 80000 99887",
    shippingAddress: "21 MG Road, Bengaluru 560001",
    items: [
      { productId: seedProducts[3].id, title: seedProducts[3].title, image: seedProducts[3].image, quantity: 2, price: seedProducts[3].priceNum },
    ],
    total: seedProducts[3].priceNum * 2,
    status: "Pending",
    paymentStatus: "Pending",
    createdAt: new Date().toISOString(),
  },
  {
    id: "MD-1046",
    customerName: "Aishwarya Menon",
    customerEmail: "aish@example.com",
    customerPhone: "+91 70000 11223",
    shippingAddress: "5 Park Street, Kolkata 700016",
    items: [
      { productId: seedProducts[7].id, title: seedProducts[7].title, image: seedProducts[7].image, quantity: 1, price: seedProducts[7].priceNum },
    ],
    total: seedProducts[7].priceNum,
    status: "Delivered",
    paymentStatus: "Paid",
    createdAt: new Date(Date.now() - 9 * 86400000).toISOString(),
  },
];

const seedReviews: Review[] = [
  {
    id: "rv-001",
    productId: seedProducts[0].id,
    productTitle: seedProducts[0].title,
    customerName: "Ananya Sharma",
    rating: 5,
    comment: "Exquisite craftsmanship. The zari work is breathtaking — felt like wearing a piece of history.",
    status: "Approved",
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: "rv-002",
    productId: seedProducts[1].id,
    productTitle: seedProducts[1].title,
    customerName: "Priya Iyer",
    rating: 5,
    comment: "Drape, weight, lustre — everything is perfect. Worth every rupee.",
    status: "Pending",
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: "rv-003",
    productId: seedProducts[3].id,
    productTitle: seedProducts[3].title,
    customerName: "Anonymous",
    rating: 1,
    comment: "spam link visit cheapsite.xyz",
    status: "Pending",
    createdAt: new Date(Date.now() - 0.5 * 86400000).toISOString(),
  },
];

const seedJournal: JournalPost[] = [
  {
    id: "jr-001",
    title: "The Loom That Time Forgot",
    cover: seedProducts[2].image,
    excerpt: "Inside a Varanasi atelier where Banarasi silks have been woven on the same family loom for six generations.",
    content:
      "In the narrow lanes of Varanasi, behind a wooden door painted indigo, sits a loom that has been threading gold for over a hundred years...",
    status: "Published",
    publishedAt: new Date(Date.now() - 6 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
  },
  {
    id: "jr-002",
    title: "Bridal Drapes — Seven Ways",
    cover: seedProducts[4].image,
    excerpt: "Reimagining the heirloom Kanjeevaram for the modern bride.",
    content: "From the classic Nivi to the architectural Ulta Pallu, here are seven drapes every bride should know...",
    status: "Draft",
    publishedAt: "",
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
];

const seedQueries: ContactQuery[] = [
  {
    id: "q-001",
    name: "Devika Rao",
    email: "devika@example.com",
    subject: "Custom Bridal Order",
    message: "Hello — I'm getting married in November and would love a custom Kanjeevaram in dusty rose. Could we set up a consultation?",
    resolved: false,
    createdAt: new Date(Date.now() - 0.3 * 86400000).toISOString(),
  },
  {
    id: "q-002",
    name: "Karan Mehta",
    email: "karan@example.com",
    subject: "Shipping to Singapore",
    message: "Do you ship to Singapore? Looking at the Midnight Banarasi.",
    resolved: true,
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
  },
];

const seedSettings: BrandSettings = {
  brandName: "Megam Drapes",
  tagline: "A digital atelier of handwoven silk",
  email: "atelier@megamdrapes.com",
  phone: "+91 98765 43210",
  address: "Heritage House, T. Nagar, Chennai 600017",
  heroBanner: seedProducts[0].image,
  featuredCollection: "Bridal Heritage 2025",
};

/* ============= Context ============= */

interface AdminState {
  // auth
  user: AdminUser | null;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  // products
  products: AdminProduct[];
  addProduct: (p: Omit<AdminProduct, "id" | "createdAt">) => void;
  updateProduct: (id: string, p: Partial<AdminProduct>) => void;
  deleteProduct: (id: string) => void;
  bulkUpdateStock: (updates: Array<{ id: string; stock: number }>) => void;
  // orders
  orders: Order[];
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  // reviews
  reviews: Review[];
  setReviewStatus: (id: string, status: Review["status"]) => void;
  deleteReview: (id: string) => void;
  // journal
  journal: JournalPost[];
  addJournal: (p: Omit<JournalPost, "id" | "createdAt">) => void;
  updateJournal: (id: string, p: Partial<JournalPost>) => void;
  deleteJournal: (id: string) => void;
  // customers (derived from orders)
  customers: Customer[];
  // queries
  queries: ContactQuery[];
  resolveQuery: (id: string, resolved: boolean) => void;
  deleteQuery: (id: string) => void;
  // settings
  settings: BrandSettings;
  updateSettings: (s: Partial<BrandSettings>) => void;
}

const AdminContext = createContext<AdminState | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [products, setProducts] = useState<AdminProduct[]>(seedAdminProducts);
  const [orders, setOrders] = useState<Order[]>(seedOrders);
  const [reviews, setReviews] = useState<Review[]>(seedReviews);
  const [journal, setJournal] = useState<JournalPost[]>(seedJournal);
  const [queries, setQueries] = useState<ContactQuery[]>(seedQueries);
  const [settings, setSettings] = useState<BrandSettings>(seedSettings);

  useEffect(() => {
    setUser(load<AdminUser | null>("md_admin_user", null));
    setProducts(load<AdminProduct[]>("md_admin_products", seedAdminProducts));
    setOrders(load<Order[]>("md_admin_orders", seedOrders));
    setReviews(load<Review[]>("md_admin_reviews", seedReviews));
    setJournal(load<JournalPost[]>("md_admin_journal", seedJournal));
    setQueries(load<ContactQuery[]>("md_admin_queries", seedQueries));
    setSettings(load<BrandSettings>("md_admin_settings", seedSettings));
    setHydrated(true);
  }, []);

  useEffect(() => { if (hydrated) save("md_admin_user", user); }, [user, hydrated]);
  useEffect(() => { if (hydrated) save("md_admin_products", products); }, [products, hydrated]);
  useEffect(() => { if (hydrated) save("md_admin_orders", orders); }, [orders, hydrated]);
  useEffect(() => { if (hydrated) save("md_admin_reviews", reviews); }, [reviews, hydrated]);
  useEffect(() => { if (hydrated) save("md_admin_journal", journal); }, [journal, hydrated]);
  useEffect(() => { if (hydrated) save("md_admin_queries", queries); }, [queries, hydrated]);
  useEffect(() => { if (hydrated) save("md_admin_settings", settings); }, [settings, hydrated]);

  const login = useCallback((email: string, password: string) => {
    if (email.trim().toLowerCase() !== ADMIN_EMAIL) {
      return { ok: false, error: "This email is not authorised for admin access." };
    }
    if (password !== ADMIN_PASSWORD) {
      return { ok: false, error: "Incorrect password." };
    }
    setUser({
      email: ADMIN_EMAIL,
      name: "Atelier Admin",
      role: "admin",
      loginAt: new Date().toISOString(),
    });
    return { ok: true };
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const addProduct: AdminState["addProduct"] = useCallback((p) => {
    const id = `prod-${Date.now()}`;
    setProducts((prev) => [{ ...p, id, createdAt: new Date().toISOString() }, ...prev]);
  }, []);

  const updateProduct: AdminState["updateProduct"] = useCallback((id, patch) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const bulkUpdateStock: AdminState["bulkUpdateStock"] = useCallback((updates) => {
    setProducts((prev) =>
      prev.map((p) => {
        const u = updates.find((x) => x.id === p.id);
        return u ? { ...p, stock: u.stock } : p;
      })
    );
  }, []);

  const updateOrderStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }, []);

  const setReviewStatus = useCallback((id: string, status: Review["status"]) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }, []);

  const deleteReview = useCallback((id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const addJournal: AdminState["addJournal"] = useCallback((p) => {
    const id = `jr-${Date.now()}`;
    setJournal((prev) => [{ ...p, id, createdAt: new Date().toISOString() }, ...prev]);
  }, []);
  const updateJournal: AdminState["updateJournal"] = useCallback((id, patch) => {
    setJournal((prev) => prev.map((j) => (j.id === id ? { ...j, ...patch } : j)));
  }, []);
  const deleteJournal = useCallback((id: string) => {
    setJournal((prev) => prev.filter((j) => j.id !== id));
  }, []);

  const resolveQuery = useCallback((id: string, resolved: boolean) => {
    setQueries((prev) => prev.map((q) => (q.id === id ? { ...q, resolved } : q)));
  }, []);
  const deleteQuery = useCallback((id: string) => {
    setQueries((prev) => prev.filter((q) => q.id !== id));
  }, []);

  const updateSettings: AdminState["updateSettings"] = useCallback((patch) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  // Derive customers from orders
  const customers: Customer[] = (() => {
    const map = new Map<string, Customer>();
    for (const o of orders) {
      const existing = map.get(o.customerEmail);
      if (existing) {
        existing.orderCount += 1;
        existing.totalSpent += o.total;
      } else {
        map.set(o.customerEmail, {
          id: o.customerEmail,
          name: o.customerName,
          email: o.customerEmail,
          phone: o.customerPhone,
          totalSpent: o.total,
          orderCount: 1,
          joinedAt: o.createdAt,
        });
      }
    }
    return Array.from(map.values()).sort((a, b) => b.totalSpent - a.totalSpent);
  })();

  return (
    <AdminContext.Provider
      value={{
        user, login, logout,
        products, addProduct, updateProduct, deleteProduct, bulkUpdateStock,
        orders, updateOrderStatus,
        reviews, setReviewStatus, deleteReview,
        journal, addJournal, updateJournal, deleteJournal,
        customers,
        queries, resolveQuery, deleteQuery,
        settings, updateSettings,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}

export type { Product, WeaveType };
