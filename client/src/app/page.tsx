'use client';

import { Suspense, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { productAPI } from '@/lib/api';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import Hero from '@/components/Hero';
import BrowseByStyle from '@/components/BrowseByStyle';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

function HomeContent({ title, sort, id }: { title: string, sort?: string, id: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await productAPI.getAll({ sort, limit: 8 });
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [sort]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="py-10" id={id}>
      <h2 className="text-4xl font-extrabold text-center text-black mb-10">{title}</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href={`/view-all?type=${id}`}
              className="inline-block border border-gray-300 px-12 py-3 rounded-full text-black hover:bg-gray-100 transition"
            >
              View All
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default function HomePage() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 500);
      }
    }
  }, []);

  return (
    <div className="w-full">
      <Hero />
      <Suspense fallback={<p className="text-center">Loading...</p>}>
        <HomeContent title="NEW ARRIVALS" sort="newest" id="new-arrivals" />
        <div className="my-10 border-t" />
        <HomeContent title="TOP SELLING" sort="top" id="top-selling" />
        <BrowseByStyle />
        <Testimonials />
        <Newsletter />
      </Suspense>
      <Footer />
    </div>
  );
}
