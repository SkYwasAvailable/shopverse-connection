
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background shape */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gray-100 rounded-full opacity-70 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left content */}
          <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
            <div className="animate-slide-up">
              <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-semibold mb-4">
                New Collection
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Technology designed for everyone
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Discover our latest collection of premium devices designed to enhance your everyday experiences.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="rounded-full" asChild>
                  <Link to="/products">
                    Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full" asChild>
                  <Link to="/products/featured">
                    Featured Products
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Right content - Product image */}
          <div className="lg:w-1/2 animate-scale-in">
            <div className="relative">
              <div className="absolute inset-0 -m-10 md:-m-16 bg-gradient-to-tr from-gray-100 to-gray-50 rounded-full blur-xl opacity-70"></div>
              <img
                src="https://images.unsplash.com/photo-1606041011872-596597976b25?q=80&w=1974&auto=format&fit=crop"
                alt="Featured Product"
                className="relative z-10 w-full h-auto object-cover rounded-lg mx-auto drop-shadow-lg"
              />
              <div className="absolute top-1/3 left-0 -translate-x-1/3 bg-white/80 backdrop-blur-sm border border-gray-100 p-4 rounded-lg shadow-lg max-w-xs animate-fade-in opacity-90 hidden md:block">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">ProPhone 14 Pro</h4>
                    <p className="text-gray-500 text-xs">Starting at $999</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
