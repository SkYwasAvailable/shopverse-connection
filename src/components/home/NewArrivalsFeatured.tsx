
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { getFeaturedProducts, getNewArrivals, getBestSellers } from '@/api/products';

const NewArrivalsFeatured = () => {
  // Get featured products
  const { 
    data: featuredProducts = [], 
    isLoading: isFeaturedLoading 
  } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: getFeaturedProducts,
  });
  
  // Get best sellers
  const {
    data: bestSellers = [],
    isLoading: isBestSellersLoading
  } = useQuery({
    queryKey: ['products', 'bestSellers'],
    queryFn: getBestSellers,
  });
  
  // Get new arrivals
  const {
    data: newArrivals = [],
    isLoading: isNewArrivalsLoading
  } = useQuery({
    queryKey: ['products', 'newArrivals'],
    queryFn: getNewArrivals,
  });
  
  const isLoading = isFeaturedLoading || isBestSellersLoading || isNewArrivalsLoading;
  
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
    <section className="py-24 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Best Sellers */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-white text-gray-800 text-xs font-semibold mb-2">
                Customer Favorites
              </span>
              <h2 className="text-2xl font-bold">Best Sellers</h2>
              <p className="mt-2 text-gray-600 max-w-xl">
                Our most popular products based on sales. Updated daily.
              </p>
            </div>
            <Button variant="outline" asChild className="mt-4 md:mt-0">
              <Link to="/products">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.length > 0 ? (
              bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 py-12">No best sellers available yet.</p>
            )}
          </div>
        </div>
        
        {/* Featured Products */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-white text-gray-800 text-xs font-semibold mb-2">
                Premium Selection
              </span>
              <h2 className="text-2xl font-bold">Featured Products</h2>
              <p className="mt-2 text-gray-600 max-w-xl">
                Our handpicked selection of premium tech products that stand out from the rest.
              </p>
            </div>
            <Button variant="outline" asChild className="mt-4 md:mt-0">
              <Link to="/featured">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 py-12">No featured products available yet.</p>
            )}
          </div>
        </div>
        
        {/* New Arrivals */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-white text-gray-800 text-xs font-semibold mb-2">
                Just Arrived
              </span>
              <h2 className="text-2xl font-bold">New Arrivals</h2>
              <p className="mt-2 text-gray-600 max-w-xl">
                The latest additions to our tech collection, fresh off the production line.
              </p>
            </div>
            <Button variant="outline" asChild className="mt-4 md:mt-0">
              <Link to="/new-arrivals">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.length > 0 ? (
              newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 py-12">No new arrivals available yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsFeatured;
