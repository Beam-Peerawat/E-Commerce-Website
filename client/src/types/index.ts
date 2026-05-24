export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  token: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  product: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  user: { _id: string; name: string; email: string };
  orderItems: {
    product: Product;
    quantity: number;
    price: number;
  }[];
  shippingAddress: string;
  totalPrice: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  createdAt: string;
}
