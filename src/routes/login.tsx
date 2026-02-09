import { useState } from 'react';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import type { LoginCredentials, UserRole } from '@/api/types.ts';
import { loginUser } from '@/api/auth.ts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const Route = createFileRoute('/login')({
  component: LoginPage,
  beforeLoad: ({ context }) => {
    const { auth } = context;
    if (auth.isAuthenticated) {
      throw redirect({
        to: '/',
      });
    }
  },
});

const USERS = {
  admin: {
    username: 'emilys',
    password: 'emilyspass',
    label: 'Admin',
  },
  moderator: {
    username: 'alexanderj',
    password: 'alexanderjpass',
    label: 'Moderator',
  },
  user: {
    username: 'averyp',
    password: 'averyppass',
    label: 'User',
  },
} as const;

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');

  const form = useForm<LoginCredentials>({
    defaultValues: {
      username: USERS.admin.username,
      password: USERS.admin.password,
    },
  });

  const onSubmit = async (data: LoginCredentials) => {
    try {
      const user = await loginUser(data);
      login(user);
      navigate({ to: '/' });
    } catch {
      alert('Login failed! Please check your credentials');
    }
  };

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    const user = USERS[role];
    form.setValue('username', user.username);
    form.setValue('password', user.password);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-[50vh] gap-4'>
      <h1 className='text-2xl font-bold'>Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full max-w-sm space-y-4'>
          <div className='space-y-2'>
            <FormLabel>Select User Role</FormLabel>
            <Select value={selectedRole} onValueChange={handleRoleChange}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select a user role' />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(USERS).map(([role, data]) => (
                  <SelectItem key={role} value={role}>
                    {data.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <FormField
            control={form.control}
            name='username'
            rules={{ required: 'Username is required' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='Enter username' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            rules={{ required: 'Password is required' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='Enter password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='pt-2'>
            <Button type='submit' className='w-full'>
              Sign In
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
