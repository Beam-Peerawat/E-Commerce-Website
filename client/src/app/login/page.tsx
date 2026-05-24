'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authAPI } from '@/lib/api';
import { saveAuthSession } from '@/lib/authStorage';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await authAPI.login(form);

      if (!data?.role || !['customer', 'admin'].includes(data.role)) {
        setError('Invalid account role.');
        return;
      }

      saveAuthSession(data);

      if (data.role === 'admin') {
        router.push('/admin/dashboard');
        return;
      }

      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
        <h1 className="text-4xl font-black text-black mb-2 tracking-tighter">Sign In</h1>
        <p className="text-gray-500 mb-8">Welcome back to SHOP.CO</p>
        
        {error && <p className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-xl">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-[#F0F0F0] rounded-full px-6 py-3.5 focus:outline-none focus:ring-2 focus:ring-black border border-transparent transition"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full bg-[#F0F0F0] rounded-full px-6 py-3.5 focus:outline-none focus:ring-2 focus:ring-black border border-transparent transition"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3.5 rounded-full font-bold hover:scale-[1.02] transition-transform disabled:opacity-70"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <p className="mt-8 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link href="/register" className="text-black font-bold hover:underline">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}
