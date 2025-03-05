
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminTabs from '@/components/admin/AdminTabs';

const Admin = () => {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard - TechStore</title>
        <meta name="description" content="Admin dashboard for TechStore" />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <AdminHeader 
              title="Admin Dashboard" 
              description="Manage your store's products and categories" 
            />
            <AdminTabs />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Admin;
