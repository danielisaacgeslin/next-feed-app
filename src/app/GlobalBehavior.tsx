'use client';

import { usePostListener } from '@/lib/usePostListener';

export const GlobalBehavior = ({ children }: { children: React.ReactNode }) => {
  usePostListener();

  return children;
};
