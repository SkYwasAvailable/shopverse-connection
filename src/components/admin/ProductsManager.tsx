
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Info } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '@/api/products';
import { getAllCategories } from '@/api/categories';
import { Product } from '@/types';
import ProductForm from '@/components/admin/ProductForm';
import ProductList from '@/components/admin/ProductList';
import { supabase } from '@/lib/supabase';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const ProductsManager = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
      
      // Set up auth state listener
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          setIsAuthenticated(!!session);
        }
      );
      
      return () => {
        authListener.subscription.unsubscribe();
      };
    };
    
    checkAuth();
  }, []);
  
  // Fetch products and categories
  const { 
    data: products = [], 
    isLoading: isLoadingProducts, 
    error: productsError 
  } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });
  
  const { 
    data: categories = [],
    isLoading: isLoadingCategories 
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  });
  
  // Create product mutation
  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({ title: 'Success', description: 'Product created successfully' });
      setProductDialogOpen(false);
    },
    onError: (error: any) => {
      console.error('Error creating product:', error);
      toast({ 
        title: 'Error',
        description: error.message || 'Failed to create product. Please ensure you are logged in.',
        variant: 'destructive'
      });
    }
  });
  
  // Update product mutation
  const updateProductMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) => 
      updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({ title: 'Success', description: 'Product updated successfully' });
      setProductDialogOpen(false);
    },
    onError: (error: any) => {
      console.error('Error updating product:', error);
      toast({ 
        title: 'Error',
        description: error.message || 'Failed to update product. Please ensure you are logged in.',
        variant: 'destructive'
      });
    }
  });
  
  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({ title: 'Success', description: 'Product deleted successfully' });
    },
    onError: (error: any) => {
      console.error('Error deleting product:', error);
      toast({ 
        title: 'Error',
        description: error.message || 'Failed to delete product. Please ensure you are logged in.',
        variant: 'destructive'
      });
    }
  });
  
  // Event handlers
  const handleCreateOrUpdateProduct = (product: Partial<Product>) => {
    if (!isAuthenticated) {
      toast({ 
        title: 'Authentication Required',
        description: 'You must be logged in to perform this action.',
        variant: 'destructive'
      });
      return;
    }
    
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
    if (!isAuthenticated) {
      toast({ 
        title: 'Authentication Required',
        description: 'You must be logged in to perform this action.',
        variant: 'destructive'
      });
      return;
    }
    
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProductMutation.mutate(id);
    }
  };
  
  const openCreateDialog = () => {
    if (!isAuthenticated) {
      toast({ 
        title: 'Authentication Required',
        description: 'You must be logged in to create products.',
        variant: 'destructive'
      });
      return;
    }
    
    setSelectedProduct(null);
    setProductDialogOpen(true);
  };
  
  const openEditDialog = (product: Product) => {
    if (!isAuthenticated) {
      toast({ 
        title: 'Authentication Required',
        description: 'You must be logged in to edit products.',
        variant: 'destructive'
      });
      return;
    }
    
    setSelectedProduct(product);
    setProductDialogOpen(true);
  };
  
  // If still checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  
  return (
    <>
      {!isAuthenticated && (
        <Alert className="mb-6" variant="warning">
          <Info className="h-4 w-4" />
          <AlertTitle>Authentication Required</AlertTitle>
          <AlertDescription>
            Please login to create, edit, or delete products.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Products List</h2>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {productsError && (
        <Alert className="mb-6" variant="destructive">
          <AlertTitle>Error loading products</AlertTitle>
          <AlertDescription>
            {(productsError as Error).message || 'An error occurred while loading products.'}
          </AlertDescription>
        </Alert>
      )}

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
