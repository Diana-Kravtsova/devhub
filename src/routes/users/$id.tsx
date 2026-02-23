import { createFileRoute, redirect } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { userQueries } from '@/api/users';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Building, User as UserIcon, Shield, Hash } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { UserDetailHeader } from '@/components/userDetails/UserDetailHeader.tsx';
import { UserHero } from '@/components/userDetails/UserHero.tsx';
import { UserPermissionsFooter } from '@/components/userDetails/UserPermissionsFooter.tsx';
import { DataField, InfoCard } from '@/components/userDetails/InfoCard.tsx';
import { roleColors } from '@/constants/roles.ts';
import type { User } from '@/api/types.ts';
import { cn } from '@/lib/utils.ts';

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
      <UserDetailHeader id={id} />

      <UserHero user={user} />

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 items-start'>
        <div className='lg:col-span-2 space-y-6'>
          <PersonalSection user={user} />
          <ContactSection user={user} />
        </div>

        <div className='space-y-6'>
          <AddressSection user={user} />
          <CompanySection user={user} />
          <AccessSection user={user} />
        </div>
      </div>

      {currentUser && <UserPermissionsFooter currentUser={currentUser} />}
    </div>
  );
}

const PersonalSection = ({ user }: { user: User }) => (
  <InfoCard title='Personal Information' icon={<UserIcon className='h-5 w-5 text-blue-400' />}>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      <DataField label='Full Name' value={`${user.firstName} ${user.lastName}`} />
      <DataField label='Username' value={`@${user.username}`} />
      <DataField label='Gender' value={user.gender} capitalize />
      <DataField label='Age' value={`${user.age} years`} />
    </div>
  </InfoCard>
);

const ContactSection = ({ user }: { user: User }) => (
  <InfoCard title='Contact Information' icon={<Mail className='h-5 w-5 text-green-400' />}>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      <DataField label='Email' value={user.email} icon={Mail} />
      <DataField label='Phone' value={user.phone} icon={Phone} />
      <DataField label='User ID' value={user.id} icon={Hash} />
    </div>
  </InfoCard>
);

const AddressSection = ({ user }: { user: User }) => (
  <InfoCard title='Address' icon={<MapPin className='h-5 w-5 text-purple-400' />}>
    <div className='space-y-4'>
      <DataField label='Street' value={user.address.address} />
      <DataField label='City' value={user.address.city} />
      <DataField label='State' value={user.address.state} />
    </div>
  </InfoCard>
);

const CompanySection = ({ user }: { user: User }) => (
  <InfoCard title='Company' icon={<Building className='h-5 w-5 text-yellow-400' />}>
    <div className='space-y-4'>
      <DataField label='Company Name' value={user.company.name} />
      <DataField label='Department' value={user.company.department} />
      <DataField label='Title' value={user.company.title} />
    </div>
  </InfoCard>
);

const AccessSection = ({ user }: { user: User }) => (
  <InfoCard title='Access Information' icon={<Shield className='h-5 w-5 text-blue-400' />}>
    <DataField label='Role' icon={Shield}>
      <Badge className={cn('border capitalize w-full justify-center mt-1', roleColors[user.role])}>{user.role}</Badge>
    </DataField>
  </InfoCard>
);
