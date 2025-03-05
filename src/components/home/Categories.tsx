
import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/data/products';
import { Card, CardContent } from '@/components/ui/card';

const Categories = () => {
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
          {categories.map((category) => (
            <Link to={`/categories/${category.id}`} key={category.id}>
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-md h-64">
                <div className="relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                    <p className="text-sm text-white/80 mt-1">{category.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
