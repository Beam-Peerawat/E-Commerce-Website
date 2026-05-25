'use client';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { productAPI } from '@/lib/api';
import ProductCard from '@/components/ProductCard';

function ViewAllContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    let sortValue = undefined;
    if (type === 'new-arrivals') sortValue = 'newest';
    else if (type === 'top-selling') sortValue = 'top';

    productAPI.getAll({ sort: sortValue }).then(res => setProducts(res.data));
  }, [type]);

  return (
    <div className="py-10 px-4 md:px-10">
      <h1 className="text-3xl font-bold mb-8 capitalize">{type?.replace('-', ' ')}</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p: any) => <ProductCard key={p._id} product={p} />)}
      </div>
    </div>
  );
}

export default function ViewAllPage() {
    return <Suspense><ViewAllContent /></Suspense>
}
