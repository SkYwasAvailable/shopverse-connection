
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { getAllCategories, createCategory, updateCategory, deleteCategory } from '@/api/categories';
import { Category } from '@/types';

const CategoriesManager = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  });
  
  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({ title: 'Success', description: 'Category created successfully' });
      setCategoryDialogOpen(false);
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error',
        description: error.message || 'Failed to create category',
        variant: 'destructive'
      });
    }
  });
  
  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Category> }) => 
      updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({ title: 'Success', description: 'Category updated successfully' });
      setCategoryDialogOpen(false);
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error',
        description: error.message || 'Failed to update category',
        variant: 'destructive'
      });
    }
  });
  
  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({ title: 'Success', description: 'Category deleted successfully' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error',
        description: error.message || 'Failed to delete category',
        variant: 'destructive'
      });
    }
  });
  
  const handleCreateOrUpdateCategory = (category: Partial<Category>) => {
    if (selectedCategory) {
      updateCategoryMutation.mutate({ id: selectedCategory.id, data: category });
    } else {
      createCategoryMutation.mutate(category as Omit<Category, 'id'>);
    }
  };
  
  const handleDeleteCategory = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      deleteCategoryMutation.mutate(id);
    }
  };
  
  const openCreateDialog = () => {
    setSelectedCategory(null);
    setCategoryDialogOpen(true);
  };
  
  const openEditDialog = (category: Category) => {
    setSelectedCategory(category);
    setCategoryDialogOpen(true);
  };
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Categories List</h2>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell className="max-w-md truncate">
                      {category.description || 'No description'}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => openEditDialog(category)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center h-24">
                    No categories found. Add your first category to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>
              {selectedCategory ? 'Edit Category' : 'Add New Category'}
            </DialogTitle>
            <DialogDescription>
              {selectedCategory 
                ? 'Update the details of your category.' 
                : 'Add a new category to your store.'}
            </DialogDescription>
          </DialogHeader>
          
          <CategoryForm 
            category={selectedCategory} 
            onSubmit={handleCreateOrUpdateCategory}
            isSubmitting={createCategoryMutation.isPending || updateCategoryMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

interface CategoryFormProps {
  category: Category | null;
  onSubmit: (category: Partial<Category>) => void;
  isSubmitting: boolean;
}

const CategoryForm = ({ category, onSubmit, isSubmitting }: CategoryFormProps) => {
  const [name, setName] = useState(category?.name || '');
  const [description, setDescription] = useState(category?.description || '');
  const [image, setImage] = useState(category?.image || '');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) {
      alert('Please enter a category name');
      return;
    }
    
    const categoryData: Partial<Category> = {
      name,
      description: description || undefined,
      image: image || undefined,
    };
    
    onSubmit(categoryData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name *</Label>
        <Input 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <Input 
          id="image" 
          value={image} 
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://example.com/category-image.jpg"
        />
      </div>
      
      <DialogFooter>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : (category ? 'Update Category' : 'Create Category')}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default CategoriesManager;
