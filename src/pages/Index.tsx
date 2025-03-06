
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Categories from '@/components/home/Categories';
import Promotions from '@/components/home/Promotions';
import NewArrivalsFeatured from '@/components/home/NewArrivalsFeatured';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>TechStore - Premium Tech Products</title>
        <meta name="description" content="Premium tech products with exceptional design and performance." />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-16">
          <Hero />
          <div className="py-8"></div> {/* Added spacing */}
          <Categories />
          <div className="py-6"></div> {/* Added spacing */}
          <FeaturedProducts />
          <div className="py-8"></div> {/* Added spacing */}
          <NewArrivalsFeatured />
          <div className="py-6"></div> {/* Added spacing */}
          <Promotions />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
