
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { getNewArrivals } from '@/api/products';

const NewArrivals = () => {
  const { data: newArrivals = [], isLoading, error } = useQuery({
    queryKey: ['products', 'newArrivals'],
    queryFn: getNewArrivals,
  });
  
  return (
    <>
      <Helmet>
        <title>New Arrivals - TechStore</title>
        <meta name="description" content="Check out our latest tech products" />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">New Arrivals</h1>
            <p className="text-gray-600 mb-8">Explore our latest tech products and innovations</p>
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">Error loading products. Please try again later.</p>
              </div>
            ) : newArrivals.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {newArrivals.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-center py-12 text-gray-500">No new arrivals available at the moment.</p>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default NewArrivals;
