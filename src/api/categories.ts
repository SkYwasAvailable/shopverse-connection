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
  
  // If no categories exist, create default categories
  if (data.length === 0) {
    try {
      await createDefaultCategories();
      
      // Fetch again after creating defaults
      const { data: refreshedData, error: refreshError } = await supabase
        .from('categories')
        .select('*')
        .order('name');
        
      if (refreshError) throw refreshError;
      return refreshedData;
    } catch (err) {
      console.error('Error creating default categories:', err);
      return [];
    }
  }
  
  return data;
};

// Function to create default categories if none exist
const createDefaultCategories = async (): Promise<void> => {
  const defaultCategories = [
    {
      name: "Smartphones",
      description: "Latest smartphones with cutting-edge technology",
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=2042&auto=format&fit=crop"
    },
    {
      name: "Laptops",
      description: "Powerful laptops for work and play",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop"
    },
    {
      name: "Tablets",
      description: "Versatile tablets for creativity and entertainment",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1915&auto=format&fit=crop"
    },
    {
      name: "Wearables",
      description: "Smart wearable devices to enhance your lifestyle",
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1972&auto=format&fit=crop"
    },
    {
      name: "Audio",
      description: "Premium headphones, earbuds and speakers for immersive sound",
      image: "https://images.unsplash.com/photo-1546435770-a3e736e1937e?q=80&w=2565&auto=format&fit=crop"
    },
    {
      name: "Smart Home",
      description: "Devices to make your home smarter and more efficient",
      image: "https://images.unsplash.com/photo-1558002038-bb4237b98672?q=80&w=2670&auto=format&fit=crop"
    },
    {
      name: "Gaming",
      description: "Gaming consoles, accessories and peripherals",
      image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=2574&auto=format&fit=crop"
    },
    {
      name: "Accessories",
      description: "Essential accessories for all your tech devices",
      image: "https://images.unsplash.com/photo-1625629107715-6a3e3f2bbf06?q=80&w=2574&auto=format&fit=crop"
    }
  ];
  
  // Insert categories
  const { error } = await supabase
    .from('categories')
    .insert(defaultCategories);
    
  if (error) {
    console.error('Error inserting default categories:', error);
    throw error;
  }
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
