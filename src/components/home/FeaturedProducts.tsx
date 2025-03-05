
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getFeaturedProducts } from '@/api/products';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';

const FeaturedProducts = () => {
  const { data: featuredProducts = [], isLoading } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: getFeaturedProducts,
  });
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-white text-gray-800 text-xs font-semibold mb-2">
              Featured Collection
            </span>
            <h2 className="text-3xl font-bold">Our Best Sellers</h2>
          </div>
          <Button variant="ghost" className="mt-4 md:mt-0" asChild>
            <Link to="/products" className="flex items-center">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading ? (
            // Loading placeholders
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-96 bg-white animate-pulse rounded-lg shadow-sm"></div>
            ))
          ) : featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No featured products found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
