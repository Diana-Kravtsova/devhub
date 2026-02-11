import { useState } from 'react';
import type { User } from '@/api/types.ts';
import { AuthContext } from '../contexts/AuthContext';
import { logoutUser } from '@/api/auth.ts';
import { redirect } from '@tanstack/react-router';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('auth_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    logoutUser();
    redirect({ to: '/login' });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>{children}</AuthContext.Provider>
  );
}
