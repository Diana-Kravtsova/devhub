import { Card, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export const PermissionsInfo = () => (
  <Card className='bg-blue-900/10 border-blue-800/50'>
    <CardContent className='p-4'>
      <div className='flex items-start gap-3'>
        <Shield className='h-5 w-5 text-blue-400 mt-0.5' />
        <div className='space-y-1'>
          <p className='text-sm font-medium text-blue-300'>Role Permissions Information</p>
          <div className='text-xs text-gray-400 space-y-1'>
            <p>
              • <span className='text-red-400 font-medium'>Admins</span> can view all user details
            </p>
            <p>
              • <span className='text-blue-400 font-medium'>Moderators</span> can view users list only
            </p>
            <p>
              • <span className='text-green-400 font-medium'>Users</span> cannot access this page
            </p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);
