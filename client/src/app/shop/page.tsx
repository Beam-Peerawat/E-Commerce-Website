'use client';

import { Suspense, useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { productAPI } from '@/lib/api';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';

function ShopContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        filter: searchParams.get('filter') || undefined,
        sort: searchParams.get('sort') || undefined,
        category: searchParams.get('category') || undefined,
        search: searchParams.get('search') || undefined,
      };
      
      const { data } = await productAPI.getAll(params);
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="py-10 px-4 md:px-10">
      <h1 className="text-3xl font-bold mb-8">Shop</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">ไม่พบสินค้าในหมวดหมู่นี้</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<p className="text-center py-10">Loading...</p>}>
      <ShopContent />
    </Suspense>
  );
}
