import { it, expect, describe } from 'vitest';

const getMessageClass = (sender: 'me' | 'server') =>
  sender === 'me' ? 'bg-blue-600 rounded-tr-none' : 'bg-slate-800 text-slate-100';

describe('Message Logic', () => {
  it('should return blue styles for "me"', () => {
    expect(getMessageClass('me')).toContain('bg-blue-600');
  });

  it('should return slate styles for "server"', () => {
    expect(getMessageClass('server')).toContain('text-slate-100');
  });
});
