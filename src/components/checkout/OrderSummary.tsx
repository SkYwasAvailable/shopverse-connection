
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CartItem } from '@/types';
import { Loader2, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  onCheckout: () => void;
  isSubmitting: boolean;
}

const OrderSummary = ({ 
  items, 
  subtotal, 
  tax, 
  shipping, 
  onCheckout, 
  isSubmitting 
}: OrderSummaryProps) => {
  const total = subtotal + tax + shipping;
  
  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Items summary */}
          <div className="space-y-1">
            {items.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.name} <span className="text-gray-500">x{item.quantity}</span>
                </span>
                <span>{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          
          <Separator />
          
          {/* Calculations */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>{formatCurrency(shipping)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax (10%)</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          size="lg" 
          onClick={onCheckout}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Proceed to Payment
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderSummary;
