'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { productAPI } from '@/lib/api';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/types';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await productAPI.getById(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!product) return <p className="text-center text-red-500">Product not found</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-80 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover rounded-lg"
            />
          ) : (
            <span>No Image</span>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-500 mt-2">{product.description}</p>
          <p className="text-3xl text-indigo-600 font-bold mt-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="mt-2">
            Category: <span className="font-medium">{product.category}</span>
          </p>
          <p className="mt-1">
            Stock:{' '}
            <span
              className={
                product.stock > 0 ? 'text-green-600' : 'text-red-600'
              }
            >
              {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
            </span>
          </p>
          <button
            onClick={() => addItem(product)}
            disabled={product.stock === 0}
            className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
