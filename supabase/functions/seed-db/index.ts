
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.8.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Define categories
    const categories = [
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

    // Define products
    const products = [
      {
        name: "ProPhone 14 Pro",
        description: "The most advanced smartphone with a stunning display, powerful cameras, and all-day battery life.",
        price: 999,
        images: [
          "https://images.unsplash.com/photo-1606041011872-596597976b25?q=80&w=1974&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1691272048033-2a4751c63427?q=80&w=1972&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1592950630581-03cb41342cc5?q=80&w=1942&auto=format&fit=crop"
        ],
        category_id: "smartphones",
        featured: true,
        in_stock: true
      },
      {
        name: "UltraBook Pro",
        description: "Thin and light laptop with exceptional performance and battery life.",
        price: 1299,
        images: [
          "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
        ],
        category_id: "laptops",
        featured: true,
        in_stock: true
      },
      {
        name: "TabletPro 12",
        description: "The perfect tablet for work and play with an immersive display and powerful processor.",
        price: 799,
        images: [
          "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1915&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1527698266440-12104e498b76?q=80&w=2070&auto=format&fit=crop"
        ],
        category_id: "tablets",
        featured: true,
        in_stock: true
      },
      {
        name: "SmartWatch Series 8",
        description: "Advanced health features, fitness tracking, and connectivity in a sleek design.",
        price: 399,
        images: [
          "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1972&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop"
        ],
        category_id: "wearables",
        featured: true,
        in_stock: true
      },
      {
        name: "ProPhone 14",
        description: "Incredible performance, cameras, and battery life in a beautiful design.",
        price: 799,
        images: [
          "https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=1974&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=1972&auto=format&fit=crop"
        ],
        category_id: "smartphones",
        in_stock: true
      },
      {
        name: "UltraBook Air",
        description: "Incredibly thin and light laptop with all-day battery life.",
        price: 999,
        images: [
          "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=2068&auto=format&fit=crop"
        ],
        category_id: "laptops",
        in_stock: true
      },
      {
        name: "TabletPro Mini",
        description: "The perfect tablet for on-the-go productivity and entertainment.",
        price: 499,
        images: [
          "https://images.unsplash.com/photo-1623126908029-58cb08a2b272?q=80&w=1974&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1592434134753-a70baf7979d5?q=80&w=1974&auto=format&fit=crop"
        ],
        category_id: "tablets",
        in_stock: true
      },
      {
        name: "SmartWatch SE",
        description: "Essential features for a more active, healthy life.",
        price: 249,
        images: [
          "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1673742418427-01044d1ee423?q=80&w=1941&auto=format&fit=crop"
        ],
        category_id: "wearables",
        in_stock: true
      },
      {
        name: "ProPhone 14 Plus",
        description: "Super Retina XDR display, all-day battery life, and advanced camera system.",
        price: 899,
        images: [
          "https://images.unsplash.com/photo-1602992708529-c9fdb12905c9?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1508811160681-cbf841afdfea?q=80&w=2073&auto=format&fit=crop"
        ],
        category_id: "smartphones",
        in_stock: true
      },
      {
        name: "UltraBook Pro 16",
        description: "The ultimate professional laptop with incredible performance.",
        price: 1999,
        images: [
          "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=2068&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=2070&auto=format&fit=crop"
        ],
        category_id: "laptops",
        in_stock: true
      },
      {
        name: "Smart Earbuds Pro",
        description: "Immersive sound with active noise cancellation.",
        price: 249,
        images: [
          "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1970&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1597355283276-a77dbbbbd8d7?q=80&w=1964&auto=format&fit=crop"
        ],
        category_id: "wearables",
        in_stock: true
      },
      {
        name: "Smart Speaker",
        description: "Room-filling sound with intelligent voice assistant.",
        price: 99,
        images: [
          "https://images.unsplash.com/photo-1589003511963-9b781ef11f81?q=80&w=1964&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1557825835-8d022694ef5c?q=80&w=1974&auto=format&fit=crop"
        ],
        category_id: "wearables",
        in_stock: true
      }
    ];

    // Clear existing data
    await supabaseClient.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabaseClient.from('categories').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // Insert categories
    const { error: categoriesError } = await supabaseClient
      .from('categories')
      .insert(categories);

    if (categoriesError) {
      console.error("Error inserting categories:", categoriesError);
      throw categoriesError;
    }

    // Insert products
    const { error: productsError } = await supabaseClient
      .from('products')
      .insert(products);

    if (productsError) {
      console.error("Error inserting products:", productsError);
      throw productsError;
    }

    return new Response(
      JSON.stringify({ success: true, message: "Database seeded successfully!" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error seeding database:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
