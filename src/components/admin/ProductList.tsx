
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Product } from '@/types';
import ProductListItem from './ProductListItem';
import { AlertCircle } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
}

const ProductList = ({ products, isLoading, onEditProduct, onDeleteProduct }: ProductListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length > 0 ? (
            products.map((product) => (
              <ProductListItem 
                key={product.id}
                product={product} 
                onEdit={onEditProduct}
                onDelete={onDeleteProduct}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center h-24">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <AlertCircle className="h-8 w-8 text-amber-500" />
                  <p>No products found. Add your first product to get started.</p>
                  <p className="text-sm text-gray-500">
                    Note: You must be authenticated to create products.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductList;
