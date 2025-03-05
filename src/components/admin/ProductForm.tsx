
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product, Category } from '@/types';

interface ProductFormProps {
  product: Product | null;
  categories: Category[];
  onSubmit: (product: Partial<Product>) => void;
  isSubmitting: boolean;
}

const ProductForm = ({ product, categories, onSubmit, isSubmitting }: ProductFormProps) => {
  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState(product?.price.toString() || '');
  const [images, setImages] = useState(product?.images?.join('\n') || '');
  const [categoryId, setCategoryId] = useState(product?.category_id || '');
  const [inStock, setInStock] = useState(product?.inStock ?? true);
  const [featured, setFeatured] = useState(product?.featured ?? false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !description || !price || !images) {
      alert('Please fill in all required fields');
      return;
    }
    
    const productData: Partial<Product> = {
      name,
      description,
      price: parseFloat(price),
      images: images.split('\n').filter(url => url.trim() !== ''),
      category_id: categoryId || undefined,
      inStock,
      featured,
    };
    
    onSubmit(productData);
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
        <Label htmlFor="description">Description *</Label>
        <Textarea 
          id="description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price *</Label>
          <Input 
            id="price" 
            type="number"
            step="0.01"
            min="0"
            value={price} 
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">None</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="images">Images (one URL per line) *</Label>
        <Textarea 
          id="images" 
          value={images} 
          onChange={(e) => setImages(e.target.value)}
          rows={3}
          placeholder="https://example.com/image1.jpg"
          required
        />
        <p className="text-xs text-gray-500">
          Enter one image URL per line. The first image will be used as the main product image.
        </p>
      </div>
      
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
        <div className="flex items-center space-x-2">
          <Switch 
            id="inStock" 
            checked={inStock}
            onCheckedChange={setInStock}
          />
          <Label htmlFor="inStock">In Stock</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="featured" 
            checked={featured}
            onCheckedChange={setFeatured}
          />
          <Label htmlFor="featured">Featured Product</Label>
        </div>
      </div>
      
      <DialogFooter>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : (product ? 'Update Product' : 'Create Product')}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default ProductForm;
