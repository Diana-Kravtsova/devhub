import { Shield, Users } from 'lucide-react';
import type { UserRole } from '@/api/types';

interface UsersHeaderProps {
  currentUser: { role: UserRole } | null;
  totalCount: number;
}

export const UsersHeader = ({ currentUser, totalCount }: UsersHeaderProps) => (
  <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
    <>
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
    </>

    <div className='flex items-center gap-3'>
      <div className='px-3 py-1 bg-gray-800/50 rounded-lg border border-gray-700'>
        <div className='flex items-center gap-2'>
          <Shield className='h-4 w-4 text-gray-400' />
          <span className='text-sm text-gray-300'>
            Total: <span className='font-bold text-white'>{totalCount}</span> users
          </span>
        </div>
      </div>
    </div>
  </div>
);
