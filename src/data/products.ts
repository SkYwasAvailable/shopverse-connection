
import { Product, Category } from '@/types';

export const categories: Category[] = [
  {
    id: "smartphones",
    name: "Smartphones",
    description: "Latest smartphones with cutting-edge technology",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=2042&auto=format&fit=crop"
  },
  {
    id: "laptops",
    name: "Laptops",
    description: "Powerful laptops for work and play",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop"
  },
  {
    id: "tablets",
    name: "Tablets",
    description: "Versatile tablets for creativity and entertainment",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1915&auto=format&fit=crop"
  },
  {
    id: "wearables",
    name: "Wearables",
    description: "Smart wearable devices to enhance your lifestyle",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1972&auto=format&fit=crop"
  }
];

export const products: Product[] = [
  {
    id: "product-1",
    name: "ProPhone 14 Pro",
    description: "The most advanced smartphone with a stunning display, powerful cameras, and all-day battery life.",
    price: 999,
    images: [
      "https://images.unsplash.com/photo-1606041011872-596597976b25?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1691272048033-2a4751c63427?q=80&w=1972&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592950630581-03cb41342cc5?q=80&w=1942&auto=format&fit=crop"
    ],
    category_id: "smartphones",
    category: categories.find(cat => cat.id === "smartphones"),
    featured: true,
    inStock: true
  },
  {
    id: "product-2",
    name: "UltraBook Pro",
    description: "Thin and light laptop with exceptional performance and battery life.",
    price: 1299,
    images: [
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
    ],
    category_id: "laptops",
    category: categories.find(cat => cat.id === "laptops"),
    featured: true,
    inStock: true
  },
  {
    id: "product-3",
    name: "TabletPro 12",
    description: "The perfect tablet for work and play with an immersive display and powerful processor.",
    price: 799,
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1915&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1527698266440-12104e498b76?q=80&w=2070&auto=format&fit=crop"
    ],
    category_id: "tablets",
    category: categories.find(cat => cat.id === "tablets"),
    featured: true,
    inStock: true
  },
  {
    id: "product-4",
    name: "SmartWatch Series 8",
    description: "Advanced health features, fitness tracking, and connectivity in a sleek design.",
    price: 399,
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1972&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop"
    ],
    category_id: "wearables",
    category: categories.find(cat => cat.id === "wearables"),
    featured: true,
    inStock: true
  },
  {
    id: "product-5",
    name: "ProPhone 14",
    description: "Incredible performance, cameras, and battery life in a beautiful design.",
    price: 799,
    images: [
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=1972&auto=format&fit=crop"
    ],
    category_id: "smartphones",
    category: categories.find(cat => cat.id === "smartphones"),
    inStock: true
  },
  {
    id: "product-6",
    name: "UltraBook Air",
    description: "Incredibly thin and light laptop with all-day battery life.",
    price: 999,
    images: [
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=2068&auto=format&fit=crop"
    ],
    category_id: "laptops",
    category: categories.find(cat => cat.id === "laptops"),
    inStock: true
  },
  {
    id: "product-7",
    name: "TabletPro Mini",
    description: "The perfect tablet for on-the-go productivity and entertainment.",
    price: 499,
    images: [
      "https://images.unsplash.com/photo-1623126908029-58cb08a2b272?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592434134753-a70baf7979d5?q=80&w=1974&auto=format&fit=crop"
    ],
    category_id: "tablets",
    category: categories.find(cat => cat.id === "tablets"),
    inStock: true
  },
  {
    id: "product-8",
    name: "SmartWatch SE",
    description: "Essential features for a more active, healthy life.",
    price: 249,
    images: [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1673742418427-01044d1ee423?q=80&w=1941&auto=format&fit=crop"
    ],
    category_id: "wearables",
    category: categories.find(cat => cat.id === "wearables"),
    inStock: true
  },
  {
    id: "product-9",
    name: "ProPhone 14 Plus",
    description: "Super Retina XDR display, all-day battery life, and advanced camera system.",
    price: 899,
    images: [
      "https://images.unsplash.com/photo-1602992708529-c9fdb12905c9?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508811160681-cbf841afdfea?q=80&w=2073&auto=format&fit=crop"
    ],
    category_id: "smartphones",
    category: categories.find(cat => cat.id === "smartphones"),
    inStock: true
  },
  {
    id: "product-10",
    name: "UltraBook Pro 16",
    description: "The ultimate professional laptop with incredible performance.",
    price: 1999,
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=2068&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=2070&auto=format&fit=crop"
    ],
    category_id: "laptops",
    category: categories.find(cat => cat.id === "laptops"),
    inStock: true
  },
  {
    id: "product-11",
    name: "Smart Earbuds Pro",
    description: "Immersive sound with active noise cancellation.",
    price: 249,
    images: [
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1970&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1597355283276-a77dbbbbd8d7?q=80&w=1964&auto=format&fit=crop"
    ],
    category_id: "wearables",
    category: categories.find(cat => cat.id === "wearables"),
    inStock: true
  },
  {
    id: "product-12",
    name: "Smart Speaker",
    description: "Room-filling sound with intelligent voice assistant.",
    price: 99,
    images: [
      "https://images.unsplash.com/photo-1589003511963-9b781ef11f81?q=80&w=1964&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1557825835-8d022694ef5c?q=80&w=1974&auto=format&fit=crop"
    ],
    category_id: "wearables",
    category: categories.find(cat => cat.id === "wearables"),
    inStock: true
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category_id === categoryId);
};

export const getAllProducts = (): Product[] => {
  return products;
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};
