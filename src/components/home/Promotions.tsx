
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Promotions = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-black to-gray-900 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-10 lg:p-16 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold mb-4">
                  Limited Time Offer
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Get 20% Off Selected Products
                </h2>
                <p className="text-white/80 mb-8 max-w-md">
                  Take advantage of our special promotion and save on our best-selling devices. Offer valid until supplies last.
                </p>
                <div>
                  <Button variant="default" size="lg" className="bg-white text-black hover:bg-white/90" asChild>
                    <Link to="/products/sale">
                      Shop Sale <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <img
                  src="https://images.unsplash.com/photo-1606041011872-596597976b25?q=80&w=1974&auto=format&fit=crop"
                  alt="Promotion"
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-100 rounded-2xl overflow-hidden">
            <div className="p-10 h-full flex flex-col justify-center">
              <span className="inline-block px-3 py-1 rounded-full bg-white text-gray-800 text-xs font-semibold mb-4">
                New Arrival
              </span>
              <h3 className="text-2xl font-bold mb-2">UltraBook Pro</h3>
              <p className="text-gray-600 mb-6">
                The thinnest, lightest laptop with extraordinary battery life.
              </p>
              <Button variant="outline" className="self-start" asChild>
                <Link to="/products/product-2">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="bg-gray-900 text-white rounded-2xl overflow-hidden">
            <div className="p-10 h-full flex flex-col justify-center">
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold mb-4">
                Best Seller
              </span>
              <h3 className="text-2xl font-bold mb-2">SmartWatch Series 8</h3>
              <p className="text-white/80 mb-6">
                Advanced health tracking in an elegant design.
              </p>
              <Button variant="outline" className="self-start text-white border-white hover:bg-white hover:text-black" asChild>
                <Link to="/products/product-4">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promotions;
