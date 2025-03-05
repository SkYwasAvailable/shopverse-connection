
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '@/api/products';
import { getAllCategories } from '@/api/categories';
import { Product } from '@/types';
import ProductForm from '@/components/admin/ProductForm';

const ProductsManager = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const { data: products = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });
  
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  });
  
  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({ title: 'Success', description: 'Product created successfully' });
      setProductDialogOpen(false);
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error',
        description: error.message || 'Failed to create product',
        variant: 'destructive'
      });
    }
  });
  
  const updateProductMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) => 
      updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({ title: 'Success', description: 'Product updated successfully' });
      setProductDialogOpen(false);
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error',
        description: error.message || 'Failed to update product',
        variant: 'destructive'
      });
    }
  });
  
  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({ title: 'Success', description: 'Product deleted successfully' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error',
        description: error.message || 'Failed to delete product',
        variant: 'destructive'
      });
    }
  });
  
  const handleCreateOrUpdateProduct = (product: Partial<Product>) => {
    if (selectedProduct) {
      updateProductMutation.mutate({ id: selectedProduct.id, data: product });
    } else {
      createProductMutation.mutate(product as Omit<Product, 'id'>);
    }
  };
  
  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProductMutation.mutate(id);
    }
  };
  
  const openCreateDialog = () => {
    setSelectedProduct(null);
    setProductDialogOpen(true);
  };
  
  const openEditDialog = (product: Product) => {
    setSelectedProduct(product);
    setProductDialogOpen(true);
  };
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Products List</h2>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {isLoadingProducts ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
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
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.category?.name || 'Uncategorized'}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.inStock 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => openEditDialog(product)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">
                    No products found. Add your first product to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={productDialogOpen} onOpenChange={setProductDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>
              {selectedProduct ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
            <DialogDescription>
              {selectedProduct 
                ? 'Update the details of your product.' 
                : 'Add a new product to your store.'}
            </DialogDescription>
          </DialogHeader>
          
          <ProductForm 
            product={selectedProduct} 
            categories={categories}
            onSubmit={handleCreateOrUpdateProduct}
            isSubmitting={createProductMutation.isPending || updateProductMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductsManager;
