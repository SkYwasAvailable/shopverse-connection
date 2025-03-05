
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon } from 'lucide-react';
import { getAllProducts } from '@/api/products';
import { Product } from '@/types';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchTerm });
  };
  
  const filteredProducts = products.filter((product: Product) => {
    const query = searchParams.get('q')?.toLowerCase() || '';
    if (!query) return true;
    
    return (
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      (product.category?.name && product.category.name.toLowerCase().includes(query))
    );
  });
  
  useEffect(() => {
    // Update searchTerm when URL changes
    setSearchTerm(searchParams.get('q') || '');
  }, [searchParams]);
  
  return (
    <>
      <Helmet>
        <title>Search - TechStore</title>
        <meta name="description" content="Search for products in our store" />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Search Products</h1>
            
            <form onSubmit={handleSearch} className="mb-8 flex gap-2">
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-xl"
              />
              <Button type="submit">
                <SearchIcon className="h-4 w-4 mr-2" />
                Search
              </Button>
            </form>
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            ) : searchParams.has('q') ? (
              <>
                <p className="text-lg mb-4">
                  {filteredProducts.length === 0
                    ? `No products found for "${searchParams.get('q')}"`
                    : `Found ${filteredProducts.length} product${filteredProducts.length === 1 ? '' : 's'} for "${searchParams.get('q')}"`}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            ) : (
              <p className="text-gray-500 text-center py-8">Enter a search term to find products</p>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Search;
