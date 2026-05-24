'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { orderAPI } from '@/lib/api';
import { Order } from '@/types';
import Link from 'next/link';
import RoleGuard from '@/components/RoleGuard';

export default function OrderSuccessPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await orderAPI.getById(id);
        setOrder(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!order) return <p className="text-center text-red-500">Order not found</p>;

  return (
    <RoleGuard requiredRole="customer">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="text-green-500 text-5xl mb-4">&#10003;</div>
          <h1 className="text-2xl font-bold mb-2">Order Placed!</h1>
          <p className="text-gray-500 mb-6">Order ID: {order._id}</p>

          <div className="text-left border-t pt-6 space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Items</h3>
              {order.orderItems.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm py-1">
                  <span>
                    {item.product?.name || 'Product'} x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total</span>
              <span className="text-indigo-600">
                ${order.totalPrice.toFixed(2)}
              </span>
            </div>
            <div>
              <span className="font-semibold">Status: </span>
              <span className="capitalize">{order.status}</span>
            </div>
            <div>
              <span className="font-semibold">Shipping Address: </span>
              <span>{order.shippingAddress}</span>
            </div>
          </div>

          <Link
            href="/orders"
            className="mt-6 inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </RoleGuard>
  );
}
