import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Header } from '@/components/layout/Header.tsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient } from '@tanstack/react-query';
import type { AuthContextType } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

interface MyRouterContext {
  queryClient: QueryClient;
  auth: AuthContextType;
}

interface RootSearchParams {
  permissionError?: string;
}

const RootLayout = () => {
  const { permissionError }: RootSearchParams = Route.useSearch();

  useEffect(() => {
    if (permissionError) {
      toast.error(permissionError, { position: 'top-center' });

      const url = new URL(window.location.href);
      url.searchParams.delete('permissionError');
      window.history.replaceState({}, '', url.toString());
    }
  }, [permissionError]);

  return (
    <div className='min-h-screen bg-gray-950 text-gray-100'>
      <Header />
      <main className='container mx-auto px-4 py-8'>
        <Outlet />
      </main>

      <Toaster richColors />

      <div id='portal-root'></div>

      {import.meta.env.DEV && (
        <>
          <TanStackRouterDevtools />
          <ReactQueryDevtools initialIsOpen={false} />
        </>
      )}
    </div>
  );
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootLayout,
});
