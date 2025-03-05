
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, FolderOpen, Package } from 'lucide-react';
import ProductsManager from '@/components/admin/ProductsManager';
import CategoriesManager from '@/components/admin/CategoriesManager';
import { seedDatabase } from '@/utils/seed-database';
import { useToast } from '@/components/ui/use-toast';

const Admin = () => {
  const { toast } = useToast();
  
  const handleSeedDatabase = async () => {
    try {
      toast({ title: 'Seeding database...', description: 'This may take a moment.' });
      
      const result = await seedDatabase();
      
      toast({ 
        title: 'Success!', 
        description: 'Database successfully seeded with sample products and categories.' 
      });
      
      // Reload the page to refresh data
      window.location.reload();
    } catch (error) {
      toast({ 
        title: 'Error', 
        description: 'Failed to seed database. Please try again.', 
        variant: 'destructive' 
      });
    }
  };
  
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-gray-600 mt-1">Manage your store's products and categories</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button onClick={handleSeedDatabase} variant="outline" className="ml-2">
                  Seed Database
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="products" className="mt-6">
              <TabsList className="mb-8">
                <TabsTrigger value="products" className="flex items-center">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Products
                </TabsTrigger>
                <TabsTrigger value="categories" className="flex items-center">
                  <FolderOpen className="mr-2 h-4 w-4" />
                  Categories
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex items-center">
                  <Package className="mr-2 h-4 w-4" />
                  Orders
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="products">
                <ProductsManager />
              </TabsContent>
              
              <TabsContent value="categories">
                <CategoriesManager />
              </TabsContent>
              
              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Orders Management</CardTitle>
                    <CardDescription>
                      View and manage customer orders
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-8 text-gray-500">
                      Order management will be implemented soon.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Admin;
