import { User } from '@/types';

export type AuthRole = 'customer' | 'admin';

const CUSTOMER_KEY = 'customerUser';
const ADMIN_KEY = 'adminUser';

export const authStorageKeys = {
  customer: CUSTOMER_KEY,
  admin: ADMIN_KEY,
} as const;

export function getStorageKey(role: AuthRole) {
  return authStorageKeys[role];
}

export function saveAuthSession(user: User) {
  const currentKey = getStorageKey(user.role as AuthRole);
  localStorage.setItem(currentKey, JSON.stringify(user));
}

export function clearAuthSessions() {
  localStorage.removeItem(authStorageKeys.customer);
  localStorage.removeItem(authStorageKeys.admin);
}

export function getStoredUser(role: AuthRole): User | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const raw = localStorage.getItem(getStorageKey(role));
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as User;
    if (!parsed?.token) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function getStoredUserForPath(pathname: string): User | null {
  if (pathname.startsWith('/admin')) {
    return getStoredUser('admin');
  }

  return getStoredUser('customer');
}

export function getStoredToken(pathname?: string) {
  const currentPath = pathname || (typeof window !== 'undefined' ? window.location.pathname : '/');
  const currentUser = getStoredUserForPath(currentPath);

  if (currentUser?.token) {
    return currentUser.token;
  }

  return undefined;
}

export function clearAuthForRole(role: AuthRole) {
  localStorage.removeItem(getStorageKey(role));
}
