
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Categories from '@/components/home/Categories';
import Promotions from '@/components/home/Promotions';

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
          <FeaturedProducts />
          <Categories />
          <Promotions />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
