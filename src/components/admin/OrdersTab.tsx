
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const OrdersTab = () => {
  return (
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
  );
};

export default OrdersTab;
