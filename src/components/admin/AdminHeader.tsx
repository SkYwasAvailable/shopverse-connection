
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { seedDatabase } from '@/utils/seed-database';

interface AdminHeaderProps {
  title: string;
  description: string;
}

const AdminHeader = ({ title, description }: AdminHeaderProps) => {
  const { toast } = useToast();
  
  const handleSeedDatabase = async () => {
    try {
      toast({ title: 'Seeding database...', description: 'This may take a moment.' });
      
      const result = await seedDatabase();
      
      toast({ 
        title: 'Success!', 
        description: 'Database successfully seeded with sample products and categories.' 
      });
      
      // Reload the page to refresh data
      window.location.reload();
    } catch (error) {
      toast({ 
        title: 'Error', 
        description: 'Failed to seed database. Please try again.', 
        variant: 'destructive' 
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
      <div className="mt-4 md:mt-0">
        <Button onClick={handleSeedDatabase} variant="outline" className="ml-2">
          Seed Database
        </Button>
      </div>
    </div>
  );
};

export default AdminHeader;
