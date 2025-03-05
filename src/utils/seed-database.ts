
import { supabase } from '@/lib/supabase';

export const seedDatabase = async () => {
  try {
    const { data, error } = await supabase.functions.invoke('seed-db');
    
    if (error) {
      console.error('Error seeding database:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Failed to seed database:', error);
    throw error;
  }
};
