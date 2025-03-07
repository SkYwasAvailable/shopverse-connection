
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getAllProducts } from '@/api/products';
import { getAllCategories } from '@/api/categories';
import { Product, Category } from '@/types';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  
  // Fetch products from Supabase
  const { 
    data: allProducts = [], 
    isLoading: isLoadingProducts,
    error: productsError
  } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });
  
  // Fetch categories from Supabase
  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    error: categoriesError
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  });
  
  // Filtered and sorted products
  const [products, setProducts] = useState<Product[]>([]);
  
  // Filter and sort products when filter options or data changes
  useEffect(() => {
    if (!allProducts.length) return;
    
    let filteredProducts = [...allProducts];
    
    // Filter by category
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(product => product.category_id === selectedCategory);
    }
    
    // Filter by price range
    filteredProducts = filteredProducts.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Filter by stock availability
    if (inStockOnly) {
      filteredProducts = filteredProducts.filter(product => product.inStock);
    }
    
    // Sort products
    switch (sortOrder) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Sort by featured status
        filteredProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    
    setProducts(filteredProducts);
  }, [allProducts, selectedCategory, sortOrder, priceRange, inStockOnly]);
  
  // Reset filters function
  const resetFilters = () => {
    setSelectedCategory(null);
    setSortOrder('featured');
    setPriceRange([0, 2000]);
    setInStockOnly(false);
  };
  
  // Loading state
  if (isLoadingProducts || isLoadingCategories) {
    return (
      <>
        <Helmet>
          <title>All Products - TechStore</title>
          <meta name="description" content="Browse our full collection of premium tech products." />
        </Helmet>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }
  
  // Error state
  if (productsError || categoriesError) {
    return (
      <>
        <Helmet>
          <title>All Products - TechStore</title>
          <meta name="description" content="Browse our full collection of premium tech products." />
        </Helmet>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4 mr-2" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {(productsError as Error)?.message || (categoriesError as Error)?.message || 'Failed to load products. Please try again later.'}
                </AlertDescription>
              </Alert>
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
        <title>All Products - TechStore</title>
        <meta name="description" content="Browse our full collection of premium tech products." />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">All Products</h1>
                <p className="text-gray-600">Browse our collection of premium tech products.</p>
              </div>
              
              <div className="flex items-center mt-4 md:mt-0 space-x-2">
                {/* Sort dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      Sort by
                      <ChevronDown size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSortOrder('featured')}>
                      Featured
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOrder('price-asc')}>
                      Price: Low to High
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOrder('price-desc')}>
                      Price: High to Low
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOrder('name-asc')}>
                      Name: A to Z
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOrder('name-desc')}>
                      Name: Z to A
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="md:hidden">
                      <SlidersHorizontal size={16} className="mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="py-4">
                      <div className="mb-6">
                        <h3 className="text-sm font-medium mb-4">Categories</h3>
                        <RadioGroup
                          value={selectedCategory || ''}
                          onValueChange={(value) => setSelectedCategory(value || null)}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="" id="all" />
                              <Label htmlFor="all">All Categories</Label>
                            </div>
                            {categories.map((category) => (
                              <div key={category.id} className="flex items-center space-x-2">
                                <RadioGroupItem value={category.id} id={category.id} />
                                <Label htmlFor={category.id}>{category.name}</Label>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="mb-6">
                        <h3 className="text-sm font-medium mb-4">Availability</h3>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="in-stock-mobile"
                            checked={inStockOnly}
                            onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
                          />
                          <Label htmlFor="in-stock-mobile">In Stock Only</Label>
                        </div>
                      </div>
                      
                      <Button
                        variant="outline"
                        onClick={resetFilters}
                        className="w-full mt-4"
                      >
                        Reset Filters
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Desktop Sidebar Filters */}
              <div className="hidden md:block w-64 flex-shrink-0">
                <div className="sticky top-24">
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold">Filters</h2>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={resetFilters}
                        className="h-8 px-2 text-xs"
                      >
                        <X size={14} className="mr-1" />
                        Clear
                      </Button>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-sm font-medium mb-3">Categories</h3>
                      <RadioGroup
                        value={selectedCategory || ''}
                        onValueChange={(value) => setSelectedCategory(value || null)}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="" id="all-desktop" />
                            <Label htmlFor="all-desktop">All Categories</Label>
                          </div>
                          {categories.map((category) => (
                            <div key={category.id} className="flex items-center space-x-2">
                              <RadioGroupItem value={category.id} id={`${category.id}-desktop`} />
                              <Label htmlFor={`${category.id}-desktop`}>{category.name}</Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="mb-6">
                      <h3 className="text-sm font-medium mb-3">Availability</h3>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="in-stock-desktop"
                          checked={inStockOnly}
                          onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
                        />
                        <Label htmlFor="in-stock-desktop">In Stock Only</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Product Grid */}
              <div className="flex-1">
                {products.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium mb-2">No products found</h3>
                    <p className="text-gray-600 mb-4">
                      No products match your current filter settings.
                    </p>
                    <Button onClick={resetFilters}>Clear Filters</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Products;
