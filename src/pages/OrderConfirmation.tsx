
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/context/AuthContext';
import { getOrderById } from '@/api/orders';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, TruckIcon, PackageOpen } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Order } from '@/types';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const OrderConfirmation = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to view this page",
        variant: "destructive"
      });
      navigate('/auth?redirect=/confirmation/' + orderId);
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
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && user) {
      fetchOrder();
    }
  }, [orderId, user, authLoading, navigate, toast]);

  if (authLoading || loading) {
    return (
      <>
        <Helmet>
          <title>Order Confirmation - TechStore</title>
        </Helmet>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow flex items-center justify-center">
            <div className="flex flex-col items-center">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="mt-4">Loading order details...</p>
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
              <Button asChild>
                <Link to="/">Return to Home</Link>
              </Button>
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
        <title>Order Confirmation - TechStore</title>
        <meta name="description" content="Your order has been confirmed" />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
            <div className="text-center mb-10">
              <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
              <p className="text-gray-600">
                Thank you for your purchase. Your order has been received.
              </p>
              <p className="font-medium mt-2">
                Order #{order.id.slice(0, 8)}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-up">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PackageOpen className="mr-2 h-5 w-5" />
                    Order Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="divide-y">
                    {order.items.map((item) => (
                      <li key={item.id} className="py-3 flex justify-between">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p>${item.price.toFixed(2)}</p>
                          <p className="text-sm text-gray-500">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${(order.total * 0.9).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>${(order.total * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-medium mt-2">
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TruckIcon className="mr-2 h-5 w-5" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-1">Shipping Address</h3>
                      <address className="not-italic text-sm text-gray-600">
                        <p>{order.shippingAddress.line1}</p>
                        {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
                        <p>
                          {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                        </p>
                        <p>{order.shippingAddress.country}</p>
                      </address>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-1">Status</h3>
                      <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm inline-flex items-center">
                        <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                        Processing
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-1">Estimated Delivery</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-10 text-center animate-slide-up">
              <Button asChild size="lg">
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default OrderConfirmation;
