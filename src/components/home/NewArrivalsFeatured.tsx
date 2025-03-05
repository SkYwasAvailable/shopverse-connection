
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { getAllProducts } from '@/api/products';
import { Product } from '@/types';

const NewArrivalsFeatured = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });
  
  const featuredProducts = products.filter((product: Product) => product.featured).slice(0, 4);
  
  const newArrivals = [...products]
    .sort((a: Product, b: Product) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    })
    .slice(0, 4);
  
  if (isLoading) {
    return (
      <div className="py-16 max-w-7xl mx-auto">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }
  
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Featured Products */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Button variant="outline" asChild>
              <Link to="/featured">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">No featured products available.</p>
            )}
          </div>
        </div>
        
        {/* New Arrivals */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">New Arrivals</h2>
            <Button variant="outline" asChild>
              <Link to="/new-arrivals">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.length > 0 ? (
              newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">No new arrivals available.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsFeatured;
