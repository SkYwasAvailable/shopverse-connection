
import { supabase } from '@/lib/supabase';
import { Product } from '@/types';

export const getAllProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories:category_id(id, name)')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
  
  return data.map(product => ({
    ...product,
    category: product.categories,
    inStock: product.in_stock
  }));
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories:category_id(id, name)')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(4);
    
  if (error) {
    console.error('Error fetching featured products:', error);
    throw error;
  }
  
  return data.map(product => ({
    ...product,
    category: product.categories,
    inStock: product.in_stock
  }));
};

export const getProductById = async (id: string): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories:category_id(id, name)')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
  
  return {
    ...data,
    category: data.categories,
    inStock: data.in_stock
  };
};

export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories:category_id(id, name)')
    .eq('category_id', categoryId)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error);
    throw error;
  }
  
  return data.map(product => ({
    ...product,
    category: product.categories,
    inStock: product.in_stock
  }));
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .insert([{
      name: product.name,
      description: product.description,
      price: product.price,
      images: product.images,
      category_id: product.category_id,
      featured: product.featured || false,
      in_stock: product.inStock
    }])
    .select()
    .single();
    
  if (error) {
    console.error('Error creating product:', error);
    throw error;
  }
  
  return {
    ...data,
    inStock: data.in_stock
  };
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
  const updates: any = { ...product };
  
  // Convert inStock to in_stock for the database
  if (product.inStock !== undefined) {
    updates.in_stock = product.inStock;
    delete updates.inStock;
  }
  
  // Remove category as it's a join
  if (updates.category) {
    delete updates.category;
  }
  
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    console.error(`Error updating product with id ${id}:`, error);
    throw error;
  }
  
  return {
    ...data,
    inStock: data.in_stock
  };
};

export const deleteProduct = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error(`Error deleting product with id ${id}:`, error);
    throw error;
  }
};
