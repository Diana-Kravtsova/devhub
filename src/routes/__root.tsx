import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Header } from '@/components/layout/Header.tsx';

const RootLayout = () => (
  <div className="min-h-screen bg-gray-950 text-gray-100">
    <Header />
    <Outlet />
    <div id="portal-root"></div>
    {import.meta.env.DEV && <TanStackRouterDevtools />}
  </div>
)

export const Route = createRootRoute({ component: RootLayout })
