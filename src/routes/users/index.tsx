import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { userQueries } from '@/api/users';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { ArrowRight, Badge, Building, Mail, MapPin, Phone, Shield, UserIcon, Users } from 'lucide-react';

export const Route = createFileRoute('/users/')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) throw redirect({ to: '/login' });

    if (context.auth.user?.role === 'user') {
      throw redirect({
        to: '/',
        search: { permissionError: 'Only admins and moderators can view users list' },
      });
    }
  },
  loader: ({ context }) => context.queryClient.ensureQueryData(userQueries.list()),
  component: UsersPage,
});

const roleColors = {
  admin: 'bg-red-500/20 text-red-400 border-red-800',
  moderator: 'bg-blue-500/20 text-blue-400 border-blue-800',
  user: 'bg-green-500/20 text-green-400 border-green-800',
};

function UsersPage() {
  const { data: users } = useSuspenseQuery(userQueries.list());
  const { user: currentUser } = useAuth();

  return (
    <div className='p-6 space-y-8'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div>
          <h1 className='text-3xl font-bold text-white mb-2 flex items-center gap-3'>
            <div className='p-2 bg-blue-600/20 rounded-lg'>
              <Users className='h-8 w-8 text-blue-400' />
            </div>
            User Management
          </h1>
          <p className='text-gray-400'>
            Manage and view all registered users in the system
            {currentUser && (
              <span className='ml-2 text-sm text-blue-400'>
                (Logged in as <span className='font-bold capitalize'>{currentUser.role}</span>)
              </span>
            )}
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <div className='px-3 py-1 bg-gray-800/50 rounded-lg border border-gray-700'>
            <div className='flex items-center gap-2'>
              <Shield className='h-4 w-4 text-gray-400' />
              <span className='text-sm text-gray-300'>
                Total: <span className='font-bold text-white'>{users.length}</span> users
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='p-4 bg-gray-900/50 rounded-lg border border-gray-800'>
          <div className='flex items-center justify-between'>
            <div>
              <div className='text-2xl font-bold text-red-400'>{users.filter(u => u.role === 'admin').length}</div>
              <div className='text-sm text-gray-400'>Admins</div>
            </div>
            <Shield className='h-8 w-8 text-red-400/40' />
          </div>
        </div>

        <div className='p-4 bg-gray-900/50 rounded-lg border border-gray-800'>
          <div className='flex items-center justify-between'>
            <div>
              <div className='text-2xl font-bold text-blue-400'>{users.filter(u => u.role === 'moderator').length}</div>
              <div className='text-sm text-gray-400'>Moderators</div>
            </div>
            <Shield className='h-8 w-8 text-blue-400/40' />
          </div>
        </div>

        <div className='p-4 bg-gray-900/50 rounded-lg border border-gray-800'>
          <div className='flex items-center justify-between'>
            <div>
              <div className='text-2xl font-bold text-green-400'>{users.filter(u => u.role === 'user').length}</div>
              <div className='text-sm text-gray-400'>Users</div>
            </div>
            <UserIcon className='h-8 w-8 text-green-400/40' />
          </div>
        </div>
      </div>

      <div>
        <h2 className='text-xl font-semibold text-white mb-4 flex items-center gap-2'>
          All Users
          <span className='text-sm text-gray-400 font-normal'>({users.length} total)</span>
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {users.map(user => (
            <Link key={user.id} to='/users/$id' params={{ id: user.id.toString() }}>
              <Card className='bg-gray-900/50 border-gray-800 hover:border-gray-600 hover:bg-gray-800/30 transition-all duration-300 cursor-pointer group'>
                <CardHeader className='pb-3'>
                  <div className='flex items-start justify-between'>
                    <div className='flex items-center gap-3'>
                      <div className='relative'>
                        <img
                          src={user.image}
                          alt={user.firstName}
                          className='w-12 h-12 rounded-full border-2 border-gray-700 group-hover:border-blue-500 transition-colors'
                        />
                        <div className='absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center'>
                          <Badge className={`h-3 w-3 p-0 ${roleColors[user.role]}`} />
                        </div>
                      </div>
                      <div>
                        <h3 className='font-semibold text-white group-hover:text-blue-400 transition-colors'>
                          {user.firstName} {user.lastName}
                        </h3>
                        <p className='text-sm text-gray-400'>@{user.username}</p>
                      </div>
                    </div>
                    <ArrowRight className='h-4 w-4 text-gray-500 group-hover:text-blue-400 transition-colors' />
                  </div>
                </CardHeader>

                <CardContent className='pt-0 space-y-3'>
                  <div className='flex items-center justify-between'>
                    <Badge className={`${roleColors[user.role]} border capitalize`}>{user.role}</Badge>
                    <span className='text-xs text-gray-500'>ID: {user.id}</span>
                  </div>

                  <div className='space-y-2'>
                    <div className='flex items-center gap-2 text-sm'>
                      <Mail className='h-3 w-3 text-gray-500' />
                      <span className='text-gray-300 truncate'>{user.email}</span>
                    </div>

                    <div className='flex items-center gap-2 text-sm'>
                      <Phone className='h-3 w-3 text-gray-500' />
                      <span className='text-gray-300'>{user.phone}</span>
                    </div>
                  </div>

                  <div className='flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-800'>
                    <div className='flex items-center gap-1'>
                      <Building className='h-3 w-3' />
                      <span>{user.company.name}</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <MapPin className='h-3 w-3' />
                      <span>{user.address.city}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <Card className='bg-blue-900/10 border-blue-800/50'>
        <CardContent className='p-4'>
          <div className='flex items-start gap-3'>
            <Shield className='h-5 w-5 text-blue-400 mt-0.5' />
            <div className='space-y-1'>
              <p className='text-sm font-medium text-blue-300'>Role Permissions Information</p>
              <p className='text-xs text-gray-400'>
                • <span className='text-red-400'>Admins</span> can view all user details
                <br />• <span className='text-blue-400'>Moderators</span> can view users list only
                <br />• <span className='text-green-400'>Users</span> cannot access this page
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
