import { Link } from '@tanstack/react-router';
import { ArrowRight, Badge, Building, Mail, MapPin, Phone } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils.ts';
import type { User } from '@/api/types.ts';

const roleColors = {
  admin: 'bg-red-500/20 text-red-400 border-red-800',
  moderator: 'bg-blue-500/20 text-blue-400 border-blue-800',
  user: 'bg-green-500/20 text-green-400 border-green-800',
};

export const UserCard = ({ user }: { user: User }) => (
  <Link to='/users/$id' params={{ id: user.id.toString() }}>
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
                <Badge className={cn('h-3 w-3 p-0', roleColors[user.role])} />{' '}
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
);
