
import { supabase } from '@/lib/supabase';
import { Address, CartItem, Order, ShippingMethod } from '@/types';

// Get all shipping methods
export const getShippingMethods = async (): Promise<ShippingMethod[]> => {
  const { data, error } = await supabase
    .from('shipping_methods')
    .select('*')
    .order('price');
    
  if (error) {
    console.error('Error fetching shipping methods:', error);
    throw new Error(error.message);
  }
  
  return data;
};

// Create a new order
export const createOrder = async (orderData: {
  items: CartItem[];
  total: number;
  shippingAddress: Address;
  shipping_method_id: string;
  payment_method: string;
}): Promise<Order> => {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  
  if (sessionError || !sessionData.session) {
    throw new Error('You must be logged in to create an order');
  }

  const userId = sessionData.session.user.id;
  
  // Create the order record first
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      total: orderData.total,
      shipping_address: orderData.shippingAddress,
      shipping_method_id: orderData.shipping_method_id,
      payment_method: orderData.payment_method,
      status: 'pending'
    })
    .select()
    .single();
    
  if (orderError) {
    console.error('Error creating order:', orderError);
    throw new Error(orderError.message);
  }
  
  // Insert order items
  const orderItems = orderData.items.map(item => ({
    order_id: orderData.id,
    product_id: item.id,
    quantity: item.quantity,
    price: item.price
  }));
  
  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);
    
  if (itemsError) {
    console.error('Error creating order items:', itemsError);
    // Attempt to delete the order since items failed
    await supabase.from('orders').delete().eq('id', orderData.id);
    throw new Error(itemsError.message);
  }
  
  return {
    ...orderData,
    items: orderData.items,
    createdAt: orderData.created_at,
    shippingAddress: orderData.shipping_address
  };
};

// Get user's orders
export const getUserOrders = async (): Promise<Order[]> => {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  
  if (sessionError || !sessionData.session) {
    throw new Error('You must be logged in to view orders');
  }

  const userId = sessionData.session.user.id;
  
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items:order_items(
        id,
        quantity,
        price,
        product:products(*)
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching orders:', error);
    throw new Error(error.message);
  }
  
  // Transform the data to match our Order type
  return data.map(order => {
    const items = order.order_items.map((item: any) => ({
      ...item.product,
      quantity: item.quantity,
      price: item.price
    }));
    
    return {
      id: order.id,
      user_id: order.user_id,
      items,
      total: order.total,
      status: order.status,
      createdAt: order.created_at,
      shippingAddress: order.shipping_address,
      shipping_method_id: order.shipping_method_id,
      payment_method: order.payment_method
    };
  });
};

// Get a single order by ID
export const getOrderById = async (orderId: string): Promise<Order> => {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  
  if (sessionError || !sessionData.session) {
    throw new Error('You must be logged in to view orders');
  }

  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items:order_items(
        id,
        quantity,
        price,
        product:products(*)
      )
    `)
    .eq('id', orderId)
    .single();
    
  if (error) {
    console.error('Error fetching order:', error);
    throw new Error(error.message);
  }
  
  // Transform the data to match our Order type
  const items = data.order_items.map((item: any) => ({
    ...item.product,
    quantity: item.quantity,
    price: item.price
  }));
  
  return {
    id: data.id,
    user_id: data.user_id,
    items,
    total: data.total,
    status: data.status,
    createdAt: data.created_at,
    shippingAddress: data.shipping_address,
    shipping_method_id: data.shipping_method_id,
    payment_method: data.payment_method
  };
};
