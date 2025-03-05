
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Cart = () => {
  const { items, total, removeItem, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Shopping Cart - TechStore</title>
          <meta name="description" content="Review your selected items in your shopping cart." />
        </Helmet>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow flex items-center justify-center pt-16">
            <div className="max-w-lg mx-auto px-4 py-16 text-center">
              <ShoppingBag className="h-16 w-16 mx-auto mb-6 text-gray-300" />
              <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button size="lg" asChild>
                <Link to="/products">
                  Continue Shopping
                </Link>
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
        <title>Shopping Cart - TechStore</title>
        <meta name="description" content="Review your selected items in your shopping cart." />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Cart Items */}
              <div className="lg:col-span-2 animate-slide-up">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <ul className="divide-y divide-gray-200">
                    {items.map((item) => (
                      <li key={item.id} className="p-6">
                        <div className="flex flex-col sm:flex-row">
                          {/* Product Image */}
                          <div className="w-full sm:w-24 h-24 flex-shrink-0 mb-4 sm:mb-0">
                            <img
                              src={item.images[0]}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          
                          {/* Product Details */}
                          <div className="flex-1 sm:ml-6">
                            <div className="flex flex-col sm:flex-row sm:justify-between">
                              <div>
                                <h3 className="text-lg font-medium">
                                  <Link to={`/products/${item.id}`} className="hover:underline">
                                    {item.name}
                                  </Link>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                  ${item.price.toFixed(2)}
                                </p>
                              </div>
                              
                              <div className="mt-4 sm:mt-0">
                                <p className="text-lg font-medium">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between mt-4">
                              {/* Quantity Selector */}
                              <div className="flex items-center">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="h-8 w-8 rounded-l-md rounded-r-none"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <div className="h-8 w-12 flex items-center justify-center border-y border-input text-sm">
                                  {item.quantity}
                                </div>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="h-8 w-8 rounded-r-md rounded-l-none"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              
                              {/* Remove Button */}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="p-6 bg-gray-50 rounded-b-lg">
                    <div className="flex justify-between items-center">
                      <Button
                        variant="ghost"
                        onClick={() => navigate('/products')}
                      >
                        Continue Shopping
                      </Button>
                      <Button
                        variant="outline"
                        onClick={clearCart}
                      >
                        Clear Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="animate-slide-up">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
                  <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax</span>
                      <span>${(total * 0.1).toFixed(2)}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${(total * 1.1).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button
                    className="w-full mt-6"
                    size="lg"
                    onClick={handleCheckout}
                  >
                    Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  
                  <div className="mt-6 text-xs text-gray-500 text-center">
                    <p>Secure checkout powered by Stripe</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Cart;
