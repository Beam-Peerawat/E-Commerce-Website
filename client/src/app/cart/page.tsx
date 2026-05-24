'use client';

import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import RoleGuard from '@/components/RoleGuard';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();

  return (
    <RoleGuard requiredRole="customer">
      {items.length === 0 ? (
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <Link href="/" className="text-indigo-600 hover:underline">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.product._id}
                className="bg-white rounded-lg shadow p-4 flex items-center gap-4"
              >
                <div className="h-20 w-20 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs shrink-0">
                  {item.product.imageUrl ? (
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="h-full w-full object-cover rounded"
                    />
                  ) : (
                    'No Image'
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-indigo-600 font-bold">
                    ${item.product.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product._id,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.product._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <p className="text-xl font-bold">
              Total: <span className="text-indigo-600">${totalPrice().toFixed(2)}</span>
            </p>
            <Link
              href="/checkout"
              className="mt-4 inline-block w-full text-center bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </RoleGuard>
  );
}
