'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { useStore } from '@/store/useStore';
import { useEffect, useState, useRef } from 'react';
import { authAPI } from '@/lib/api';
import api from '@/lib/api';
import { clearAuthForRole, getStoredUser, getStoredUserForPath, saveAuthSession } from '@/lib/authStorage';
import { User } from '@/types';

export default function Navbar() {
  const totalItems = useCartStore((s) => s.totalItems());
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [search, setSearch] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isAdminRoute = pathname.startsWith('/admin');

  // Search & Categories
  const { categories, setCategories, searchResults, setSearchResults } = useStore();

  useEffect(() => {
    api.get('/products/categories').then(res => setCategories(res.data));
    
    let mounted = true;
    const syncUser = async () => {
      const routeUser = getStoredUserForPath(pathname);
      const fallbackAdminUser = getStoredUser('admin');
      const storedUser = routeUser ?? fallbackAdminUser;
      if (!storedUser) return;
      try {
        const { data } = await authAPI.getMe();
        if (!mounted) return;
        if (data.role !== storedUser.role) {
          clearAuthForRole(storedUser.role);
          setUser(null);
          return;
        }
        const mergedUser = { ...data, token: storedUser.token };
        saveAuthSession(mergedUser);
        setUser(mergedUser);
      } catch {
        if (!mounted) return;
        clearAuthForRole(storedUser.role);
        setUser(null);
      }
    };
    syncUser();
    return () => { mounted = false; };
  }, [pathname]);

  // Debounced Live Search
  useEffect(() => {
    if (search.length < 2) {
      setSearchResults([]);
      setShowPreview(false);
      return;
    }
    const handler = setTimeout(async () => {
      const { data } = await api.get(`/products?search=${search}&limit=5`);
      setSearchResults(data);
      setShowPreview(true);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const handleLogout = () => {
    clearAuthForRole(pathname.startsWith('/admin') ? 'admin' : 'customer');
    setUser(null);
    router.push('/');
  };

  const handleScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `/#${id}`);
    } else {
      router.push(`/#${id}`);
    }
  };

  if (pathname === '/admin/login') return null;

  // --- Admin Navigation ---
  if (isAdminRoute) {
    return (
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="w-full px-6 h-16 flex items-center justify-between">
          <Link href="/admin/dashboard" className="text-2xl font-black text-black tracking-tighter">
            SHOP.CO<span className="text-gray-400">ADMIN</span>
          </Link>
          <div className="flex gap-8 text-sm font-bold text-gray-500">
            <Link href="/admin/dashboard" className={pathname === '/admin/dashboard' ? 'text-black' : ''}>Dashboard</Link>
            <Link href="/admin/products" className={pathname === '/admin/products' ? 'text-black' : ''}>Products</Link>
            <Link href="/admin/orders" className={pathname === '/admin/orders' ? 'text-black' : ''}>Orders</Link>
            <button onClick={handleLogout} className="text-red-500">Logout</button>
          </div>
        </div>
      </nav>
    );
  }

  // --- Customer Navigation ---
  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="bg-black text-white text-center text-xs py-2">
        Sign up and get 20% off to your first order. <Link href="/register" className="underline font-bold">Sign Up Now</Link>
      </div>

      <div className="w-full px-4 md:px-10 h-20 flex items-center justify-between gap-6">
        <Link href="/" className="text-3xl font-black text-black tracking-tighter">SHOP.CO</Link>

        {/* Categories & Special Links */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-black items-center">
            <div className="group relative">
                <button className="flex items-center gap-1 hover:text-indigo-600">
                    Shop <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                </button>
                <div className="absolute hidden group-hover:block bg-white border shadow-xl p-4 w-48 z-50 left-0">
                    {categories.map(cat => <Link key={cat} href={`/shop?category=${cat}`} className="block py-1 hover:text-indigo-600 capitalize">{cat}</Link>)}
                </div>
            </div>
            <button onClick={(e) => handleScroll(e, 'top-selling')} className="hover:text-indigo-600">Top Selling</button>
            <button onClick={(e) => handleScroll(e, 'new-arrivals')} className="hover:text-indigo-600">New Arrivals</button>
        </div>

        {/* Live Search */}
        <div className="hidden lg:flex flex-1 max-w-lg relative" ref={searchRef}>
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && router.push(`/search?q=${search}`)}
            className="w-full bg-[#F0F0F0] rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none"
          />
          <svg className="absolute left-3 top-3 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          
          {/* Search Preview */}
          {showPreview && (
            <div className="absolute top-full left-0 w-full bg-white border shadow-xl mt-2 z-50 rounded-xl overflow-hidden">
                {searchResults.length > 0 ? searchResults.map(p => (
                    <Link href={`/product/${p._id}`} key={p._id} className="flex p-3 items-center gap-3 hover:bg-gray-50" onClick={() => setShowPreview(false)}>
                        <img src={p.imageUrl} alt={p.name} className="w-12 h-12 object-cover rounded-lg" />
                        <div><p className="text-sm font-bold">{p.name}</p><p className="text-xs text-gray-500">${p.price}</p></div>
                    </Link>
                )) : <p className="p-4 text-sm text-gray-500">ไม่พบสินค้าที่คุณค้นหา</p>}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" /></svg>
            {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] h-4 w-4 rounded-full flex items-center justify-center">{totalItems}</span>}
          </Link>
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg><span className="text-sm font-medium">{user.name}</span></button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border shadow-xl rounded-xl py-2 z-50">
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">My Profile</Link>
                  <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Order History</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className='flex items-center gap-4'>
                <Link href="/login" className="text-sm font-medium">Login</Link>
                <Link href="/register" className="bg-black text-white text-sm px-6 py-2 rounded-full font-medium">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
