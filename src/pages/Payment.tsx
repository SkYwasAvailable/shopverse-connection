
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/context/AuthContext';
import { getOrderById } from '@/api/orders';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, CreditCard, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Order } from '@/types';

const Payment = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to view this page",
        variant: "destructive"
      });
      navigate('/auth?redirect=/payment/' + orderId);
      return;
    }

    const fetchOrder = async () => {
      if (!orderId) return;
      
      try {
        const orderData = await getOrderById(orderId);
        setOrder(orderData);
      } catch (error: any) {
        console.error('Error fetching order:', error);
        toast({
          title: "Error",
          description: error.message || "Failed to load order details",
          variant: "destructive"
        });
        navigate('/cart');
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && user) {
      fetchOrder();
    }
  }, [orderId, user, authLoading, navigate, toast]);

  const handleProcessPayment = () => {
    setProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      navigate(`/confirmation/${orderId}`);
    }, 2000);
  };

  if (authLoading || loading) {
    return (
      <>
        <Helmet>
          <title>Payment - TechStore</title>
        </Helmet>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow flex items-center justify-center">
            <div className="flex flex-col items-center">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="mt-4">Loading payment details...</p>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Helmet>
          <title>Order Not Found - TechStore</title>
        </Helmet>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
              <p className="mb-6">We couldn't find the order you're looking for.</p>
              <Button onClick={() => navigate('/cart')}>Return to Cart</Button>
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
        <title>Complete Payment - TechStore</title>
        <meta name="description" content="Complete your payment" />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-8">Complete Your Payment</h1>
            
            <Card className="mb-8 animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShieldCheck className="mr-2 h-5 w-5 text-primary" />
                  Secure Payment
                </CardTitle>
                <CardDescription>
                  Your payment information is securely processed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border p-4 rounded-md">
                    <h3 className="font-medium mb-2">Order Summary</h3>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Order #{order.id.slice(0, 8)}</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                    </div>
                  </div>
                  
                  <div className="border p-4 rounded-md">
                    <h3 className="font-medium mb-4">Payment Method</h3>
                    <div className="flex items-center p-3 border rounded-md bg-gray-50">
                      <CreditCard className="mr-3 h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Credit Card</p>
                        <p className="text-sm text-gray-500">This is a demo payment. No actual charges will be made.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={handleProcessPayment}
                  disabled={processingPayment}
                >
                  {processingPayment ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>Pay ${order.total.toFixed(2)}</>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            <div className="text-center text-sm text-gray-500">
              <p>This is a demo store. No actual payment will be processed.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Payment;
