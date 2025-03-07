
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { ShippingMethod, Address } from '@/types';
import { getShippingMethods, createOrder } from '@/api/orders';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import { Loader2 } from 'lucide-react';

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<string | null>(null);
  const [shippingAddress, setShippingAddress] = useState<Address>({
    line1: '',
    line2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US'
  });
  const [loadingShippingMethods, setLoadingShippingMethods] = useState(true);

  useEffect(() => {
    if (items.length === 0 && !loadingShippingMethods) {
      navigate('/cart');
    }
  }, [items, navigate, loadingShippingMethods]);

  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to proceed with checkout",
        variant: "destructive"
      });
      navigate('/auth?redirect=/checkout');
    }
  }, [user, authLoading, navigate, toast]);

  useEffect(() => {
    const loadShippingMethods = async () => {
      try {
        const methods = await getShippingMethods();
        setShippingMethods(methods);
        if (methods.length > 0) {
          setSelectedShippingMethod(methods[0].id);
        }
      } catch (error) {
        console.error('Error loading shipping methods:', error);
        toast({
          title: "Error",
          description: "Failed to load shipping methods. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoadingShippingMethods(false);
      }
    };

    loadShippingMethods();
  }, [toast]);

  const handleAddressChange = (field: keyof Address, value: string) => {
    setShippingAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleShippingMethodChange = (id: string) => {
    setSelectedShippingMethod(id);
  };

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to proceed with checkout",
        variant: "destructive"
      });
      return;
    }

    if (!selectedShippingMethod) {
      toast({
        title: "Shipping Method Required",
        description: "Please select a shipping method",
        variant: "destructive"
      });
      return;
    }

    // Validate shipping address
    const requiredFields: (keyof Address)[] = ['line1', 'city', 'state', 'postalCode', 'country'];
    for (const field of requiredFields) {
      if (!shippingAddress[field]) {
        toast({
          title: "Missing Information",
          description: `Please fill in your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
          variant: "destructive"
        });
        return;
      }
    }

    setIsSubmitting(true);
    try {
      // Calculate total with shipping
      const selectedMethod = shippingMethods.find(method => method.id === selectedShippingMethod);
      const shippingCost = selectedMethod ? selectedMethod.price : 0;
      const subtotal = total;
      const tax = subtotal * 0.1; // 10% tax
      const orderTotal = subtotal + tax + shippingCost;

      // Create the order
      const order = await createOrder({
        items,
        total: orderTotal,
        shippingAddress,
        shipping_method_id: selectedShippingMethod,
        payment_method: 'card' // Mock payment method for now
      });

      // Clear the cart
      clearCart();

      // Navigate to payment page
      navigate(`/payment/${order.id}`);
    } catch (error: any) {
      console.error('Error creating order:', error);
      toast({
        title: "Checkout Failed",
        description: error.message || "Failed to complete checkout. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || loadingShippingMethods) {
    return (
      <>
        <Helmet>
          <title>Checkout - TechStore</title>
        </Helmet>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow flex items-center justify-center">
            <div className="flex flex-col items-center">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="mt-4">Loading checkout...</p>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Checkout - TechStore</title>
        <meta name="description" content="Complete your purchase" />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Checkout Form */}
              <div className="lg:col-span-2 animate-slide-up">
                <CheckoutForm 
                  shippingAddress={shippingAddress} 
                  onAddressChange={handleAddressChange}
                  shippingMethods={shippingMethods}
                  selectedShippingMethod={selectedShippingMethod}
                  onShippingMethodChange={handleShippingMethodChange}
                />
              </div>
              
              {/* Order Summary */}
              <div className="animate-slide-up">
                <OrderSummary 
                  items={items} 
                  subtotal={total}
                  shipping={shippingMethods.find(m => m.id === selectedShippingMethod)?.price || 0}
                  tax={total * 0.1} // 10% tax
                  onCheckout={handleSubmit}
                  isSubmitting={isSubmitting}
                />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Checkout;
