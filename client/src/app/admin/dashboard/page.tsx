'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { orderAPI } from '@/lib/api';
import RoleGuard from '@/components/RoleGuard';

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await orderAPI.getDashboard();
        setMetrics(data);
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
    <RoleGuard requiredRole="admin">
      <div>
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-500 text-sm">Total Orders</p>
            <p className="text-3xl font-bold">{metrics.totalOrders}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <p className="text-3xl font-bold text-indigo-600">
              ${metrics.totalRevenue.toFixed(2)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-500 text-sm">Pending Orders</p>
            <p className="text-3xl font-bold text-yellow-600">
              {metrics.pendingOrders}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Link
            href="/admin/products"
            className="flex-1 bg-indigo-600 text-white text-center py-4 rounded-lg hover:bg-indigo-700 transition"
          >
            Manage Products
          </Link>
          <Link
            href="/admin/orders"
            className="flex-1 bg-indigo-600 text-white text-center py-4 rounded-lg hover:bg-indigo-700 transition"
          >
            Manage Orders
          </Link>
        </div>
      </div>
    </RoleGuard>
  );
}
