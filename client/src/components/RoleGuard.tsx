'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';
import { clearAuthForRole, getStoredUser, saveAuthSession } from '@/lib/authStorage';

interface RoleGuardProps {
  requiredRole: 'customer' | 'admin';
  children: React.ReactNode;
}

export default function RoleGuard({ requiredRole, children }: RoleGuardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let mounted = true;

    const validate = async () => {
      const storedUser = getStoredUser(requiredRole);

      if (!storedUser) {
        router.replace(requiredRole === 'admin' ? '/admin/login' : '/login');
        return;
      }

      try {
        const { data } = await authAPI.getMe();

        if (!mounted) return;

        if (data.role !== requiredRole) {
          clearAuthForRole(requiredRole);
          router.replace(requiredRole === 'admin' ? '/admin/login' : '/login');
          return;
        }

        const mergedUser = { ...data, token: storedUser.token };
        saveAuthSession(mergedUser);
        setAllowed(true);
      } catch {
        if (!mounted) return;

        clearAuthForRole(requiredRole);
        router.replace(requiredRole === 'admin' ? '/admin/login' : '/login');
        return;
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    validate();

    return () => {
      mounted = false;
    };
  }, [requiredRole, router]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (!allowed) {
    return null;
  }

  return <>{children}</>;
}
