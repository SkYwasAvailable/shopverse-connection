
import React from 'react';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, Star, Award, Zap } from 'lucide-react';
import { Product } from '@/types';
import { Badge } from '@/components/ui/badge';

interface ProductListItemProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductListItem = ({ product, onEdit, onDelete }: ProductListItemProps) => {
  return (
    <TableRow key={product.id}>
      <TableCell className="font-medium">{product.name}</TableCell>
      <TableCell>${product.price.toFixed(2)}</TableCell>
      <TableCell>{product.category?.name || 'Uncategorized'}</TableCell>
      <TableCell>
        <div className="flex flex-col space-y-1">
          <div className="flex flex-wrap gap-1">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              product.inStock 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
            
            {product.isFeatured && (
              <Badge variant="secondary" className="flex items-center">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
            
            {product.isBestSeller && (
              <Badge variant="secondary" className="flex items-center">
                <Award className="h-3 w-3 mr-1" />
                Best Seller
              </Badge>
            )}
            
            {product.isNewArrival && (
              <Badge variant="secondary" className="flex items-center">
                <Zap className="h-3 w-3 mr-1" />
                New Arrival
              </Badge>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(product)}
            aria-label={`Edit ${product.name}`}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onDelete(product.id)}
            aria-label={`Delete ${product.name}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ProductListItem;
