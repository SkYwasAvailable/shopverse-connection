
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { getAllCategories } from '@/api/categories';
import { getProductsByCategory, getAllProducts } from '@/api/products';
import { Category } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Categories = () => {
  const { categoryId } = useParams<{ categoryId?: string }>();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  
  // Fetch all categories
  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  });
  
  // Fetch products based on selected category
  const { data: products = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products', categoryId],
    queryFn: () => categoryId ? getProductsByCategory(categoryId) : getAllProducts(),
    enabled: categories.length > 0 || !categoryId,
  });
  
  // Find selected category from fetched categories when categoryId changes
  React.useEffect(() => {
    if (categoryId && categories.length) {
      const category = categories.find(c => c.id === categoryId) || null;
      setSelectedCategory(category);
    } else {
      setSelectedCategory(null);
    }
  }, [categoryId, categories]);
  
  return (
    <>
      <Helmet>
        <title>
          {selectedCategory 
            ? `${selectedCategory.name} - TechStore` 
            : 'All Categories - TechStore'}
        </title>
        <meta 
          name="description" 
          content={selectedCategory?.description || 'Browse products by category at TechStore'} 
        />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-24 px-4 pb-16">
          <div className="max-w-7xl mx-auto">
            {/* Category Header */}
            {selectedCategory ? (
              <div className="mb-8">
                <Link to="/categories">
                  <Button variant="ghost" className="mb-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to All Categories
                  </Button>
                </Link>
                <h1 className="text-3xl font-bold mb-2">{selectedCategory.name}</h1>
                {selectedCategory.description && (
                  <p className="text-gray-600 max-w-3xl">{selectedCategory.description}</p>
                )}
              </div>
            ) : (
              <div className="text-center mb-12">
                <h1 className="text-3xl font-bold mb-2">Browse by Category</h1>
                <p className="text-gray-600 max-w-xl mx-auto">
                  Explore our wide range of products organized by category to find exactly what you're looking for.
                </p>
              </div>
            )}

            {/* Show category tiles if no category is selected */}
            {!selectedCategory && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {isLoadingCategories ? (
                  // Placeholder loading skeletons
                  Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
                  ))
                ) : (
                  categories.map((category) => (
                    <Link 
                      to={`/categories/${category.id}`} 
                      key={category.id}
                      className="block"
                    >
                      <div className="group relative h-64 overflow-hidden rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                        {category.image ? (
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">No image</span>
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                          <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                          {category.description && (
                            <p className="text-sm text-white/80 mt-1">{category.description}</p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            )}

            {/* Show products if a category is selected */}
            {selectedCategory && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {isLoadingProducts ? (
                  // Placeholder loading skeletons
                  Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-lg"></div>
                  ))
                ) : products.length > 0 ? (
                  products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-16">
                    <h3 className="text-lg font-medium">No products found</h3>
                    <p className="text-gray-500 mt-2">
                      There are no products in this category yet.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Categories;
