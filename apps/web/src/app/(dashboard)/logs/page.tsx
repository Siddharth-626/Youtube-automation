'use client';

import { useQuery } from '@tanstack/react-query';
import { apiGet } from '@/lib/api';

export default function LogsPage() {
  const { data: logs = [] } = useQuery({ queryKey: ['logs'], queryFn: () => apiGet<any[]>('/api/logs') });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Logs</h2>
      <div className="space-y-2">
        {logs.map((log) => (
          <div className="bg-card p-3 rounded" key={log._id}>
            <div className="text-sm text-zinc-400">{new Date(log.timestamp).toLocaleString()}</div>
            <div>{log.level.toUpperCase()}: {log.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
