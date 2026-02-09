import { queryOptions } from '@tanstack/react-query';
import type { User, UsersResponse } from './types';

const BASE_URL = 'https://dummyjson.com/users';

export const userQueries = {
  list: () =>
    queryOptions({
      queryKey: ['users'],
      queryFn: async (): Promise<User[]> => {
        const res = await fetch(BASE_URL);
        const data: UsersResponse = await res.json();
        return data.users;
      },
    }),

  detail: (id: string) =>
    queryOptions({
      queryKey: ['users', id],
      queryFn: async (): Promise<User> => {
        const res = await fetch(`${BASE_URL}/${id}`);
        return res.json();
      },
    }),
};
