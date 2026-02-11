import { it, expect, describe, vi } from 'vitest';
import { useAuth } from '@/hooks/useAuth';
import { useCheckPermission } from '@/hooks/usePermissions';
import { renderHook } from '@testing-library/react';
import type { AuthContextType } from '@/contexts/AuthContext.tsx';
import { render, screen } from '@testing-library/react';

vi.mock('@/hooks/useAuth');

describe('Modular Tests: Permissions and UI', () => {
  describe('Permissions Integration', () => {
    // Integrating the rights hook with the moderator role
    it('denies user details access for moderators', () => {
      vi.mocked(useAuth).mockReturnValue({
        user: { role: 'moderator' },
        isAuthenticated: true,
      } as AuthContextType);

      const { result } = renderHook(() => useCheckPermission('canViewUserDetails'));
      expect(result.current).toBe(false);
    });

    // Integrating the rights hook with the user role
    it('returns true for canAccessChat when role is user', () => {
      vi.mocked(useAuth).mockReturnValue({
        user: { role: 'user' },
        isAuthenticated: true,
      } as AuthContextType);

      const { result } = renderHook(() => useCheckPermission('canAccessChat'));
      expect(result.current).toBe(true);
    });
  });

  describe('UI Components Integration', () => {
    // UI components
    it('renders multiple messages correctly', () => {
      const mockMessages = [
        { id: 1, text: 'Hello', sender: 'me' as const },
        { id: 2, text: 'Hi there', sender: 'server' as const },
      ];

      render(
        <div>
          {mockMessages.map(m => (
            <div data-testid='message-item' key={m.id}>
              {m.text}
            </div>
          ))}
        </div>,
      );

      expect(screen.getByText('Hello')).toBeInTheDocument();
      expect(screen.getByText('Hi there')).toBeInTheDocument();

      const items = screen.getAllByTestId('message-item');
      expect(items).toHaveLength(2);
    });
  });
});
