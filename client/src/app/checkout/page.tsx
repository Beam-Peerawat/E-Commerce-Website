'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { orderAPI } from '@/lib/api';
import RoleGuard from '@/components/RoleGuard';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <RoleGuard requiredRole="customer">
        <p className="text-center text-gray-500">Your cart is empty.</p>
      </RoleGuard>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const orderItems = items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      }));
      const { data } = await orderAPI.create({
        orderItems,
        shippingAddress: address,
        totalPrice: totalPrice(),
      });
      clearCart();
      router.push(`/order/${data._id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Checkout failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <RoleGuard requiredRole="customer">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="font-semibold mb-4">Order Summary</h2>
          {items.map((item) => (
            <div key={item.product._id} className="flex justify-between py-2 border-b">
              <span>
                {item.product.name} x {item.quantity}
              </span>
              <span className="font-medium">
                ${(item.product.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="flex justify-between py-2 font-bold text-lg">
            <span>Total</span>
            <span className="text-indigo-600">${totalPrice().toFixed(2)}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
          <h2 className="font-semibold mb-4">Shipping Address</h2>
          <textarea
            placeholder="Enter your shipping address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            rows={3}
            required
          />
          <button
            type="submit"
            disabled={submitting}
            className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400"
          >
            {submitting ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>
      </div>
    </RoleGuard>
  );
}
