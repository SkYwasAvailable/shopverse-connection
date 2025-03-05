
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingBag, FolderOpen, Package } from 'lucide-react';
import ProductsManager from '@/components/admin/ProductsManager';
import CategoriesManager from '@/components/admin/CategoriesManager';
import OrdersTab from '@/components/admin/OrdersTab';

const AdminTabs = () => {
  return (
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
        <OrdersTab />
      </TabsContent>
    </Tabs>
  );
};

export default AdminTabs;
