import { useAuth } from '@/hooks/useAuth';
import type { UserRole } from '@/api/types';

export const Permissions = {
  CanViewUsers: 'canViewUsers',
  CanViewUserDetails: 'canViewUserDetails',
  CanAccessChat: 'canAccessChat',
} as const;

export interface UserPermissions {
  canViewUsers: boolean;
  canViewUserDetails: boolean;
  canAccessChat: boolean;
}

const rolePermissions: Record<UserRole, UserPermissions> = {
  admin: {
    canViewUsers: true,
    canViewUserDetails: true,
    canAccessChat: true,
  },
  moderator: {
    canViewUsers: true,
    canViewUserDetails: false,
    canAccessChat: true,
  },
  user: {
    canViewUsers: false,
    canViewUserDetails: false,
    canAccessChat: true,
  },
};

export function usePermissions() {
  const { user } = useAuth();

  if (!user) {
    return {
      canViewUsers: false,
      canViewUserDetails: false,
      canAccessChat: false,
    };
  }

  return rolePermissions[user.role];
}

export function useCheckPermission(permission: keyof UserPermissions): boolean {
  const permissions = usePermissions();
  return permissions[permission];
}
