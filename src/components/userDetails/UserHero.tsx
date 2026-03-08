import type { User } from '@/api/types.ts';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils.ts';
import { roleColors } from '@/constants/roles.ts';

export const UserHero = ({ user }: { user: User }) => (
  <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-6'>
    <div className='flex items-center gap-4'>
      <div className='relative'>
        <img src={user.image} alt={user.firstName} className='w-20 h-20 rounded-full border-4 border-gray-800' />
        <div className='absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gray-900 border-2 border-gray-800 flex items-center justify-center'>
          <Badge className={cn('h-4 w-4 p-0', roleColors[user.role])} />
        </div>
      </div>

      <div>
        <h1 className='text-3xl font-bold text-white'>
          {user.firstName} {user.lastName}
        </h1>
        <div className='flex items-center gap-3 mt-2'>
          <span className='text-gray-400'>@{user.username}</span>
          <Badge className={cn('border capitalize px-3 py-1', roleColors[user.role])}>{user.role}</Badge>
        </div>
      </div>
    </div>
  </div>
);
