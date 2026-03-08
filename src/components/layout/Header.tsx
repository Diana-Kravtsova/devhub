import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Home, Users, MessageSquare, Info, Menu, X, Rocket, LogOut, LogIn } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { usePermissions } from '@/hooks/usePermissions';
import { Permissions } from '@/hooks/usePermissions';

const allNavItems = [
  {
    path: '/',
    label: 'Dashboard',
    icon: Home,
    requiredPermission: null,
  },
  {
    path: '/users',
    label: 'Users',
    icon: Users,
    requiredPermission: Permissions.CanViewUsers,
  },
  {
    path: '/chat',
    label: 'Chat',
    icon: MessageSquare,
    requiredPermission: Permissions.CanAccessChat,
  },
  {
    path: '/space',
    label: 'Space',
    icon: Rocket,
    requiredPermission: null,
  },
  {
    path: '/about',
    label: 'About',
    icon: Info,
    requiredPermission: null,
  },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const permissions = usePermissions();

  const getFilteredNavItems = () => {
    return allNavItems.filter(item => {
      if (!item.requiredPermission) return true;

      return permissions[item.requiredPermission];
    });
  };

  const filteredNavItems = getFilteredNavItems();

  return (
    <header className='bg-gray-900 text-white border-b border-gray-800'>
      <div className='container mx-auto px-4 py-3'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <div className='flex items-center space-x-3'>
            <div className='p-2 bg-blue-600 rounded-lg'>
              <Users className='h-6 w-6' />
            </div>
            <div>
              <h1 className='text-xl font-bold'>DevHub</h1>
              <p className='text-sm text-gray-400'>
                {user ? `${user.firstName}'s Dashboard` : 'User Management Dashboard'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-1'>
            {filteredNavItems.map(item => (
              <Button
                key={item.path}
                asChild
                variant='ghost'
                size='sm'
                className='text-gray-300 hover:text-white hover:bg-gray-800 [&.active]:bg-gray-800 [&.active]:text-white'
              >
                <Link to={item.path} className='flex items-center gap-2'>
                  <item.icon className='h-4 w-4' />
                  <span>{item.label}</span>
                </Link>
              </Button>
            ))}
          </nav>

          {/* User Info */}
          <div className='hidden md:flex items-center space-x-3'>
            {user ? (
              <div className='flex items-center gap-3'>
                <div className='flex items-center gap-2 px-3 py-1 bg-gray-800/50 rounded-lg'>
                  <div className='flex items-center gap-2'>
                    <img
                      src={user.image}
                      alt={user.firstName}
                      className='w-6 h-6 rounded-full border border-gray-700'
                    />
                    <span className='text-sm text-gray-300'>{user.firstName}</span>
                  </div>
                  <div className='h-4 w-px bg-gray-700' />
                  <span className='text-xs px-2 py-0.5 bg-blue-900/30 text-blue-400 rounded capitalize'>
                    {user.role}
                  </span>
                </div>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={logout}
                  className='text-gray-300 hover:text-white hover:bg-gray-800'
                >
                  <LogOut className='h-4 w-4' />
                </Button>
              </div>
            ) : (
              <Button
                variant='ghost'
                size='sm'
                className='text-gray-300 hover:text-white hover:bg-gray-800 border-gray-700'
              >
                <Link to='/login' className='flex items-center gap-2'>
                  <LogIn className='h-4 w-4' />
                  <span>Log In</span>
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden text-gray-300 hover:text-white hover:bg-gray-800'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className='md:hidden mt-4 pb-3 border-t border-gray-800 pt-3'>
            <nav className='flex flex-col space-y-2'>
              {filteredNavItems.map(item => (
                <Button
                  key={item.path}
                  asChild
                  variant='ghost'
                  className='justify-start text-gray-300 hover:text-white hover:bg-gray-800'
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link to={item.path} className='flex items-center gap-3'>
                    <item.icon className='h-4 w-4' />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              ))}
              {/* User Info - Mobile */}
              {user && (
                <div className='pt-3 border-t border-gray-800 mt-2'>
                  <div className='px-3 py-2 bg-gray-800/30 rounded-lg'>
                    <div className='flex items-center justify-between mb-2'>
                      <div className='flex items-center gap-2'>
                        <img
                          src={user.image}
                          alt={user.firstName}
                          className='w-8 h-8 rounded-full border border-gray-700'
                        />
                        <div>
                          <p className='text-sm font-medium'>
                            {user.firstName} {user.lastName}
                          </p>
                          <p className='text-xs text-gray-400'>@{user.username}</p>
                        </div>
                      </div>
                      <span className='text-xs px-2 py-0.5 bg-blue-900/30 text-blue-400 rounded capitalize'>
                        {user.role}
                      </span>
                    </div>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className='w-full mt-2'
                    >
                      <LogOut className='h-4 w-4 mr-2' />
                      Sign Out
                    </Button>
                  </div>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
