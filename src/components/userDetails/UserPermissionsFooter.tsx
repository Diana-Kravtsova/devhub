import { Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { UserRole } from '@/api/types';

interface UserPermissionsFooterProps {
  currentUser: {
    role: UserRole;
  };
}

export const UserPermissionsFooter = ({ currentUser }: UserPermissionsFooterProps) => {
  const isAdmin = currentUser.role === 'admin';

  return (
    <Card className='bg-blue-900/10 border-blue-800/50'>
      <CardContent className='p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center'>
              <Shield className='h-4 w-4 text-blue-400' />
            </div>

            <div className='space-y-0.5'>
              <p className='text-sm font-medium text-blue-300'>
                You are viewing this profile as <span className='capitalize'>{currentUser.role}</span>
              </p>
              <p className='text-xs text-gray-400'>
                {isAdmin
                  ? 'You have full access to all user information and management features.'
                  : 'Your access is limited based on your role permissions.'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
