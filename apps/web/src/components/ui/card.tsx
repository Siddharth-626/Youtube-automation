import { ReactNode } from 'react';

export function Card({ children }: { children: ReactNode }) {
  return <div className="bg-card rounded p-4">{children}</div>;
}
