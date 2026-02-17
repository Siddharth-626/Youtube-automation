import { ReactNode } from 'react';
import { Sidebar } from './sidebar';

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
