'use client';

import { useEffect, useState } from 'react';
import { orderAPI } from '@/lib/api';
import { Order } from '@/types';
import Link from 'next/link';
import RoleGuard from '@/components/RoleGuard';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await orderAPI.getMyOrders();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <RoleGuard requiredRole="customer">
      <div>
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        {orders.length === 0 ? (
          <p className="text-gray-500">
            No orders yet.{' '}
            <Link href="/" className="text-indigo-600 hover:underline">
              Start shopping
            </Link>
          </p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order._id}
                href={`/order/${order._id}`}
                className="block bg-white rounded-lg shadow p-4 hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">
                      Order #{order._id.slice(-8)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-indigo-600">
                      ${order.totalPrice.toFixed(2)}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded capitalize ${
                        order.status === 'delivered'
                          ? 'bg-green-100 text-green-700'
                          : order.status === 'shipped'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </RoleGuard>
  );
}
