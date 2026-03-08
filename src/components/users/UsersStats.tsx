import type { User } from '@/api/types.ts';
import { Shield, UserIcon } from 'lucide-react';
import { cn } from '@/lib/utils.ts';

export const UsersStats = ({ users }: { users: User[] }) => {
  const stats = [
    { label: 'Admins', count: users.filter(u => u.role === 'admin').length, color: 'text-red-400', Icon: Shield },
    {
      label: 'Moderators',
      count: users.filter(u => u.role === 'moderator').length,
      color: 'text-blue-400',
      Icon: Shield,
    },
    { label: 'Users', count: users.filter(u => u.role === 'user').length, color: 'text-green-400', Icon: UserIcon },
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
      {stats.map(({ label, count, color, Icon }) => (
        <div key={label} className='p-4 bg-gray-900/50 rounded-lg border border-gray-800'>
          <div className='flex items-center justify-between'>
            <div>
              <div className={cn('text-2xl font-bold', color)}>{count}</div>
              <div className='text-sm text-gray-400'>{label}</div>
            </div>
            <Icon className={cn('h-8 w-8 opacity-40', color)} />
          </div>
        </div>
      ))}
    </div>
  );
};
