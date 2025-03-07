
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
    inStock: product.in_stock,
    isFeatured: product.featured,
    isBestSeller: product.is_best_seller,
    isNewArrival: product.is_new_arrival
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
    inStock: product.in_stock,
    isFeatured: product.featured,
    isBestSeller: product.is_best_seller,
    isNewArrival: product.is_new_arrival
  }));
};

export const getNewArrivals = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories:category_id(id, name)')
    .eq('is_new_arrival', true)
    .order('created_at', { ascending: false })
    .limit(4);
    
  if (error) {
    console.error('Error fetching new arrivals:', error);
    throw error;
  }
  
  return data.map(product => ({
    ...product,
    category: product.categories,
    inStock: product.in_stock,
    isFeatured: product.featured,
    isBestSeller: product.is_best_seller,
    isNewArrival: product.is_new_arrival
  }));
};

export const getBestSellers = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories:category_id(id, name)')
    .eq('is_best_seller', true)
    .order('created_at', { ascending: false })
    .limit(4);
    
  if (error) {
    console.error('Error fetching best sellers:', error);
    throw error;
  }
  
  return data.map(product => ({
    ...product,
    category: product.categories,
    inStock: product.in_stock,
    isFeatured: product.featured,
    isBestSeller: product.is_best_seller,
    isNewArrival: product.is_new_arrival
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
    inStock: data.in_stock,
    isFeatured: data.featured,
    isBestSeller: data.is_best_seller,
    isNewArrival: data.is_new_arrival
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
    inStock: product.in_stock,
    isFeatured: product.featured,
    isBestSeller: product.is_best_seller,
    isNewArrival: product.is_new_arrival
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
      category_id: product.category_id === 'none' ? null : product.category_id,
      featured: product.isFeatured || false,
      is_best_seller: product.isBestSeller || false,
      is_new_arrival: product.isNewArrival || false,
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
    inStock: data.in_stock,
    isFeatured: data.featured,
    isBestSeller: data.is_best_seller,
    isNewArrival: data.is_new_arrival
  };
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
  const updates: any = { ...product };
  
  // Convert fields for the database
  if (product.inStock !== undefined) {
    updates.in_stock = product.inStock;
    delete updates.inStock;
  }
  
  if (product.isFeatured !== undefined) {
    updates.featured = product.isFeatured;
    delete updates.isFeatured;
  }
  
  if (product.isBestSeller !== undefined) {
    updates.is_best_seller = product.isBestSeller;
    delete updates.isBestSeller;
  }
  
  if (product.isNewArrival !== undefined) {
    updates.is_new_arrival = product.isNewArrival;
    delete updates.isNewArrival;
  }
  
  // Remove category as it's a join
  if (updates.category) {
    delete updates.category;
  }
  
  // Handle none category
  if (updates.category_id === 'none') {
    updates.category_id = null;
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
    inStock: data.in_stock,
    isFeatured: data.featured,
    isBestSeller: data.is_best_seller,
    isNewArrival: data.is_new_arrival
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
