
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '@/api/products';
import { getAllCategories } from '@/api/categories';
import { Product } from '@/types';
import ProductForm from '@/components/admin/ProductForm';
import ProductList from '@/components/admin/ProductList';

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
  
  // Mutations for product operations
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
  
  // Event handlers
  const handleCreateOrUpdateProduct = (product: Partial<Product>) => {
    const productData = { ...product };
    if (productData.category_id === 'none') {
      productData.category_id = undefined;
    }
    
    if (selectedProduct) {
      updateProductMutation.mutate({ id: selectedProduct.id, data: productData });
    } else {
      createProductMutation.mutate(productData as Omit<Product, 'id'>);
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

      <ProductList 
        products={products}
        isLoading={isLoadingProducts}
        onEditProduct={openEditDialog}
        onDeleteProduct={handleDeleteProduct}
      />

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
