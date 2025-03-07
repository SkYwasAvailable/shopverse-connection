
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Address, ShippingMethod } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface CheckoutFormProps {
  shippingAddress: Address;
  onAddressChange: (field: keyof Address, value: string) => void;
  shippingMethods: ShippingMethod[];
  selectedShippingMethod: string | null;
  onShippingMethodChange: (id: string) => void;
}

const CheckoutForm = ({
  shippingAddress,
  onAddressChange,
  shippingMethods,
  selectedShippingMethod,
  onShippingMethodChange
}: CheckoutFormProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="line1">Address Line 1</Label>
              <Input
                id="line1"
                value={shippingAddress.line1}
                onChange={(e) => onAddressChange('line1', e.target.value)}
                placeholder="123 Main St"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="line2">Address Line 2 (Optional)</Label>
              <Input
                id="line2"
                value={shippingAddress.line2 || ''}
                onChange={(e) => onAddressChange('line2', e.target.value)}
                placeholder="Apt, Suite, Unit, etc."
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={shippingAddress.city}
                  onChange={(e) => onAddressChange('city', e.target.value)}
                  placeholder="City"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={shippingAddress.state}
                  onChange={(e) => onAddressChange('state', e.target.value)}
                  placeholder="State"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  value={shippingAddress.postalCode}
                  onChange={(e) => onAddressChange('postalCode', e.target.value)}
                  placeholder="Postal Code"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <select
                  id="country"
                  value={shippingAddress.country}
                  onChange={(e) => onAddressChange('country', e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="JP">Japan</option>
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Shipping Method</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={selectedShippingMethod || undefined} 
            onValueChange={onShippingMethodChange}
            className="space-y-3"
          >
            {shippingMethods.map((method) => (
              <div 
                key={method.id} 
                className={`flex items-center justify-between border rounded-lg p-4 ${
                  selectedShippingMethod === method.id ? 'border-primary bg-primary/5' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center">
                  <RadioGroupItem value={method.id} id={method.id} />
                  <div className="ml-3">
                    <Label htmlFor={method.id} className="font-medium cursor-pointer">
                      {method.name}
                    </Label>
                    <p className="text-sm text-gray-500">{method.description}</p>
                    <p className="text-xs text-gray-500">{method.estimated_days}</p>
                  </div>
                </div>
                <div className="font-medium">
                  {formatCurrency(method.price)}
                </div>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutForm;
