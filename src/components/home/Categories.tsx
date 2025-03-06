
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '@/api/categories';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const Categories = () => {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  });

  // Check if we need to show the admin button to add categories
  const showAdminButton = categories.length === 0;

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-semibold mb-3">
            Explore Our Collection
          </span>
          <h2 className="text-3xl font-bold mb-4">Shop Categories</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of products organized by category to find exactly what you're looking for.
          </p>
        </div>
        
        {isLoading ? (
          // Loading placeholders
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
            ))}
          </div>
        ) : categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link to={`/categories/${category.id}`} key={category.id}>
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg h-64 group">
                  <div className="relative h-full">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
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
                        <p className="text-sm text-white/90 mt-1 line-clamp-2">{category.description}</p>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-6">No categories found. Add some categories to get started.</p>
            {showAdminButton && (
              <Link to="/admin">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Categories in Admin Panel
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
