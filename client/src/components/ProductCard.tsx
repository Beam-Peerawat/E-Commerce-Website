import Link from 'next/link';
import { Product } from '@/types';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product._id}`}
      className="group"
    >
      <div className="bg-[#F0F0F0] rounded-2xl p-4 h-64 mb-3 flex items-center justify-center overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover rounded-xl group-hover:scale-105 transition-transform"
          />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>
      
      <h3 className="font-bold text-lg text-black">{product.name}</h3>
      
      {/* Dummy Rating */}
      <div className="flex items-center gap-1 mt-1">
        <span className="text-yellow-400">★★★★☆</span>
        <span className="text-gray-500 text-sm">4.5/5</span>
      </div>
      
      <div className="mt-1 flex items-center gap-2">
        <span className="font-black text-xl text-black">
          ${product.price.toFixed(2)}
        </span>
        {/* Placeholder for discount */}
        {product.price < 200 && (
          <span className="text-gray-400 line-through text-sm">$200</span>
        )}
      </div>
    </Link>
  );
}
