import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { userQueries } from '@/api/users';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowLeft, Mail, Phone, MapPin, Building, User, Shield, Hash } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const roleColors = {
  admin: 'bg-red-500/20 text-red-400 border-red-800',
  moderator: 'bg-blue-500/20 text-blue-400 border-blue-800',
  user: 'bg-green-500/20 text-green-400 border-green-800',
};

export const Route = createFileRoute('/users/$id')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) throw redirect({ to: '/login' });

    if (context.auth.user?.role !== 'admin') {
      throw redirect({
        to: '/users',
        search: { permissionError: 'Only admins can view user details' },
      });
    }
  },
  loader: ({ context, params }) => context.queryClient.ensureQueryData(userQueries.detail(params.id)),
  component: UserDetailPage,
});

function UserDetailPage() {
  const { id } = Route.useParams();
  const { data: user } = useSuspenseQuery(userQueries.detail(id));
  const { user: currentUser } = useAuth();

  return (
    <div className='p-6 max-w-6xl mx-auto space-y-6'>
      <div className='flex items-center justify-between'>
        <Link to='/users'>
          <Button variant='ghost' size='sm' className='gap-2'>
            <ArrowLeft className='h-4 w-4' />
            Back to Users
          </Button>
        </Link>

        <div className='text-sm text-gray-500'>
          User ID: <span className='font-mono text-gray-300'>{id}</span>
        </div>
      </div>

      <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-6'>
        <div className='flex items-center gap-4'>
          <div className='relative'>
            <img src={user.image} alt={user.firstName} className='w-20 h-20 rounded-full border-4 border-gray-800' />
            <div className='absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gray-900 border-2 border-gray-800 flex items-center justify-center'>
              <Badge className={`h-4 w-4 p-0 ${roleColors[user.role]}`} />
            </div>
          </div>

          <div>
            <h1 className='text-3xl font-bold text-white'>
              {user.firstName} {user.lastName}
            </h1>
            <div className='flex items-center gap-3 mt-2'>
              <span className='text-gray-400'>@{user.username}</span>
              <Badge className={`${roleColors[user.role]} border capitalize px-3 py-1`}>{user.role}</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2 space-y-6'>
          <Card className='bg-gray-900/50 border-gray-800'>
            <CardHeader className='pb-3'>
              <div className='flex items-center gap-2'>
                <User className='h-5 w-5 text-blue-400' />
                <h2 className='text-lg font-semibold text-white'>Personal Information</h2>
              </div>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-3'>
                  <div>
                    <label className='text-xs text-gray-500'>Full Name</label>
                    <p className='text-white'>
                      {user.firstName} {user.lastName}
                    </p>
                  </div>
                  <div>
                    <label className='text-xs text-gray-500'>Username</label>
                    <p className='text-white'>@{user.username}</p>
                  </div>
                  <div>
                    <label className='text-xs text-gray-500'>Gender</label>
                    <p className='text-white capitalize'>{user.gender}</p>
                  </div>
                </div>

                <div className='space-y-3'>
                  <div>
                    <label className='text-xs text-gray-500'>Birth Date</label>
                    <p className='text-white'>{new Date(user.birthDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className='text-xs text-gray-500'>Age</label>
                    <p className='text-white'>{user.age} years</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-gray-900/50 border-gray-800'>
            <CardHeader className='pb-3'>
              <div className='flex items-center gap-2'>
                <Mail className='h-5 w-5 text-green-400' />
                <h2 className='text-lg font-semibold text-white'>Contact Information</h2>
              </div>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-3'>
                  <div className='flex items-center gap-3'>
                    <Mail className='h-4 w-4 text-gray-500' />
                    <div>
                      <label className='text-xs text-gray-500'>Email</label>
                      <p className='text-white'>{user.email}</p>
                    </div>
                  </div>

                  <div className='flex items-center gap-3'>
                    <Phone className='h-4 w-4 text-gray-500' />
                    <div>
                      <label className='text-xs text-gray-500'>Phone</label>
                      <p className='text-white'>{user.phone}</p>
                    </div>
                  </div>
                </div>

                <div className='space-y-3'>
                  <div className='flex items-center gap-3'>
                    <Hash className='h-4 w-4 text-gray-500' />
                    <div>
                      <label className='text-xs text-gray-500'>User ID</label>
                      <p className='text-white font-mono'>{user.id}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='space-y-6'>
          <Card className='bg-gray-900/50 border-gray-800'>
            <CardHeader className='pb-3'>
              <div className='flex items-center gap-2'>
                <MapPin className='h-5 w-5 text-purple-400' />
                <h2 className='text-lg font-semibold text-white'>Address</h2>
              </div>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='space-y-2'>
                <div>
                  <label className='text-xs text-gray-500'>Street</label>
                  <p className='text-white'>{user.address.address}</p>
                </div>
                <div>
                  <label className='text-xs text-gray-500'>City</label>
                  <p className='text-white'>{user.address.city}</p>
                </div>
                <div className='grid grid-cols-2 gap-3'>
                  <div>
                    <label className='text-xs text-gray-500'>State</label>
                    <p className='text-white'>{user.address.state}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-gray-900/50 border-gray-800'>
            <CardHeader className='pb-3'>
              <div className='flex items-center gap-2'>
                <Building className='h-5 w-5 text-yellow-400' />
                <h2 className='text-lg font-semibold text-white'>Company</h2>
              </div>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='space-y-2'>
                <div>
                  <label className='text-xs text-gray-500'>Company Name</label>
                  <p className='text-white'>{user.company.name}</p>
                </div>
                <div>
                  <label className='text-xs text-gray-500'>Department</label>
                  <p className='text-white'>{user.company.department}</p>
                </div>
                <div>
                  <label className='text-xs text-gray-500'>Title</label>
                  <p className='text-white'>{user.company.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='bg-gray-900/50 border-gray-800'>
            <CardHeader className='pb-3'>
              <div className='flex items-center gap-2'>
                <Shield className='h-5 w-5 text-blue-400' />
                <h2 className='text-lg font-semibold text-white'>Access Information</h2>
              </div>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='space-y-2'>
                <div>
                  <label className='text-xs text-gray-500'>Role</label>
                  <Badge className={`${roleColors[user.role]} border capitalize w-full justify-center`}>
                    {user.role}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {currentUser && (
        <Card className='bg-blue-900/10 border-blue-800/50'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center'>
                  <Shield className='h-4 w-4 text-blue-400' />
                </div>
                <div>
                  <p className='text-sm font-medium text-blue-300'>
                    You are viewing this profile as <span className='capitalize'>{currentUser.role}</span>
                  </p>
                  <p className='text-xs text-gray-400'>
                    {currentUser.role === 'admin'
                      ? 'You have full access to all user information and management features.'
                      : 'Your access is limited based on your role permissions.'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
