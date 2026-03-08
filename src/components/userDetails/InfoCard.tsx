import type { ReactNode, ComponentType } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface InfoCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

export const InfoCard = ({ title, icon, children, className }: InfoCardProps) => (
  <Card className={cn('bg-gray-900/50 border-gray-800 h-full', className)}>
    <CardHeader className='pb-3'>
      <div className='flex items-center gap-2'>
        <div className='h-5 w-5'>{icon}</div>
        <h2 className='text-lg font-semibold text-white'>{title}</h2>
      </div>
    </CardHeader>

    <CardContent>{children}</CardContent>
  </Card>
);

interface DataFieldProps {
  label: string;
  value?: string | number | null;
  icon?: ComponentType<{ className?: string }>;
  capitalize?: boolean;
  children?: ReactNode;
}

export const DataField = ({ label, value, icon: Icon, capitalize, children }: DataFieldProps) => (
  <div className='flex items-start gap-3 w-full'>
    {Icon && <Icon className='h-4 w-4 text-gray-500 mt-1' />}
    <div className='space-y-0.5 w-full'>
      <label className='text-xs text-gray-500 block'>{label}</label>
      {children ? children : <p className={cn('text-white text-sm', capitalize && 'capitalize')}>{value ?? '—'}</p>}
    </div>
  </div>
);
