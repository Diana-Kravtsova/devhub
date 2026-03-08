import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UserDetailHeaderProps {
  id: string;
}

export const UserDetailHeader = ({ id }: UserDetailHeaderProps) => (
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
);
