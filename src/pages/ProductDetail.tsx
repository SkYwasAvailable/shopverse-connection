
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, getProductsByCategory } from '@/data/products';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft, Check, Truck, Shield, RefreshCw } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { toast } from "@/components/ui/use-toast";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const product = getProductById(productId || '');
  
  if (!product) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">
            Sorry, the product you are looking for does not exist.
          </p>
          <Button onClick={() => navigate('/products')}>
            View All Products
          </Button>
        </div>
        <Footer />
      </>
    );
  }
  
  // Get related products
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);
  
  const handleAddToCart = () => {
    addItem(product, quantity);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  return (
    <>
      <Helmet>
        <title>{product.name} - TechStore</title>
        <meta name="description" content={product.description} />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Back button */}
            <Button variant="ghost" onClick={() => navigate(-1)} className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="overflow-hidden rounded-lg bg-gray-100 animate-scale-in">
                  <img
                    src={product.images[activeImageIndex]}
                    alt={product.name}
                    className="w-full h-[400px] object-contain p-4"
                  />
                </div>
                
                {/* Thumbnail Images */}
                {product.images.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto py-2">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                          activeImageIndex === index 
                            ? 'border-black' 
                            : 'border-transparent hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Product Details */}
              <div className="animate-slide-up">
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <div className="mb-4">
                  <span className="text-2xl font-medium">${product.price.toFixed(2)}</span>
                </div>
                
                <div className="mb-6">
                  <p className="text-gray-700">{product.description}</p>
                </div>
                
                {/* Stock Status */}
                <div className="flex items-center mb-6">
                  {product.inStock ? (
                    <div className="flex items-center text-green-600">
                      <Check className="h-5 w-5 mr-2" />
                      <span>In Stock</span>
                    </div>
                  ) : (
                    <div className="text-red-500">Out of Stock</div>
                  )}
                </div>
                
                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                      className="h-10 w-10 rounded-l-md rounded-r-none"
                    >
                      -
                    </Button>
                    <div className="h-10 w-16 flex items-center justify-center border-y border-input">
                      {quantity}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={increaseQuantity}
                      className="h-10 w-10 rounded-r-md rounded-l-none"
                    >
                      +
                    </Button>
                  </div>
                </div>
                
                {/* Add to Cart Button */}
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full mb-4"
                  size="lg"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                
                {/* Additional Information */}
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h3 className="text-lg font-medium mb-4">Product Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Truck className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Free Shipping</h4>
                        <p className="text-sm text-gray-600">Free standard shipping on all orders.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Shield className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">2 Year Warranty</h4>
                        <p className="text-sm text-gray-600">Full coverage for peace of mind.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <RefreshCw className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">30-Day Returns</h4>
                        <p className="text-sm text-gray-600">If you're not satisfied, return within 30 days.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className="mt-20">
                <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ProductDetail;
