
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  
  return (
    <Card className="product-card border-0 overflow-hidden">
      <CardContent className="p-0">
        <Link to={`/products/${product.id}`} className="block img-hover-zoom">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-52 object-cover"
          />
        </Link>
        <div className="p-4">
          <Link to={`/products/${product.id}`} className="block">
            <h3 className="font-medium mb-1 hover:underline">{product.name}</h3>
          </Link>
          <p className="text-gray-600 text-sm mb-3">${product.price.toFixed(2)}</p>
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              className="w-full btn-hover-effect"
              onClick={() => addItem(product)}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
