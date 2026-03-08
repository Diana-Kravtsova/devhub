import { render } from '@testing-library/react';
import { it, expect } from 'vitest';

it('Status Badge matches snapshot', () => {
  const { asFragment } = render(<span className='bg-green-500/20 text-green-500 px-2 py-1'>Online</span>);
  expect(asFragment()).toMatchSnapshot();
});

it('Chat Input matches snapshot', () => {
  const { asFragment } = render(<input placeholder='Type a message...' className='bg-slate-800 text-white' />);
  expect(asFragment()).toMatchSnapshot();
});
