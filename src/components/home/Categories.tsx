
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '@/api/categories';
import { Card, CardContent } from '@/components/ui/card';

const Categories = () => {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  });

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-semibold mb-2">
            Browse By Category
          </span>
          <h2 className="text-3xl font-bold">Shop Categories</h2>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Explore our wide range of products organized by category to find exactly what you're looking for.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            // Loading placeholders
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
            ))
          ) : categories.length > 0 ? (
            categories.map((category) => (
              <Link to={`/categories/${category.id}`} key={category.id}>
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-md h-64">
                  <div className="relative h-full">
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
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No categories found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Categories;
