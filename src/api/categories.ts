
import { supabase } from '@/lib/supabase';
import { Category } from '@/types';

export const getAllCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
    
  if (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
  
  return data;
};

export const getCategoryById = async (id: string): Promise<Category> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error(`Error fetching category with id ${id}:`, error);
    throw error;
  }
  
  return data;
};

export const createCategory = async (category: Omit<Category, 'id'>): Promise<Category> => {
  const { data, error } = await supabase
    .from('categories')
    .insert([category])
    .select()
    .single();
    
  if (error) {
    console.error('Error creating category:', error);
    throw error;
  }
  
  return data;
};

export const updateCategory = async (id: string, category: Partial<Category>): Promise<Category> => {
  const { data, error } = await supabase
    .from('categories')
    .update(category)
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    console.error(`Error updating category with id ${id}:`, error);
    throw error;
  }
  
  return data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error(`Error deleting category with id ${id}:`, error);
    throw error;
  }
};
