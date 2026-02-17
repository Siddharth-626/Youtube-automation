'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  ['Overview', '/overview'],
  ['Videos', '/videos'],
  ['Settings', '/settings'],
  ['Logs', '/logs'],
  ['Manual Trigger', '/manual-trigger']
];

export function Sidebar() {
  const path = usePathname();
  return (
    <aside className="w-64 border-r border-zinc-800 p-4">
      <h1 className="text-xl font-bold mb-6">Shorts Factory</h1>
      <nav className="space-y-2">
        {nav.map(([label, href]) => (
          <Link
            className={`block rounded p-2 ${path === href ? 'bg-primary text-white' : 'bg-card'}`}
            href={href}
            key={href}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
