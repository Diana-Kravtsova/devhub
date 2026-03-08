import { createFileRoute, redirect } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { userQueries } from '@/api/users';
import { useAuth } from '@/hooks/useAuth';
import { UserCard } from '@/components/users/UserCard.tsx';
import { UsersStats } from '@/components/users/UsersStats.tsx';
import { UsersHeader } from '@/components/users/UsersHeader.tsx';
import { PermissionsInfo } from '@/components/users/PermissionsInfo.tsx';

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

function UsersPage() {
  const { data: users } = useSuspenseQuery(userQueries.list());
  const { user: currentUser } = useAuth();

  return (
    <div className='p-6 space-y-8'>
      <UsersHeader currentUser={currentUser} totalCount={users.length} />

      <UsersStats users={users} />

      <>
        <h2 className='text-xl font-semibold text-white mb-4 flex items-center gap-2'>
          All Users
          <span className='text-sm text-gray-400 font-normal'>({users.length} total)</span>
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {users.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </>

      <PermissionsInfo />
    </div>
  );
}
