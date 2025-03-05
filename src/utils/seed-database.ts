
import { supabase } from '@/lib/supabase';

export const seedDatabase = async () => {
  try {
    const { data, error } = await supabase.functions.invoke('seed-db');
    
    if (error) {
      console.error('Error seeding database:', error);
      throw error;
    }
    
    console.log('Database seeded successfully:', data);
    return data;
  } catch (error) {
    console.error('Error in seedDatabase function:', error);
    throw error;
  }
};
