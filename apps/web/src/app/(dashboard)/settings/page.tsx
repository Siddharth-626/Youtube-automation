'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiGet, apiPut } from '@/lib/api';
import { useState } from 'react';

export default function SettingsPage() {
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ['settings'], queryFn: () => apiGet<any>('/api/settings') });
  const [form, setForm] = useState<any>(null);

  const mutation = useMutation({
    mutationFn: (payload: any) => apiPut('/api/settings', payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['settings'] })
  });

  const values = form || data;
  if (!values) return null;

  return (
    <div className="space-y-4 max-w-xl">
      <h2 className="text-2xl font-semibold">Automation Settings</h2>
      {['nichePrompt', 'scheduleTime', 'voice'].map((field) => (
        <input
          key={field}
          className="w-full p-2 rounded bg-card"
          value={values[field] || ''}
          onChange={(e) => setForm({ ...values, [field]: e.target.value })}
          placeholder={field}
        />
      ))}
      {['videosPerDay', 'duration'].map((field) => (
        <input
          key={field}
          className="w-full p-2 rounded bg-card"
          type="number"
          value={values[field] || 0}
          onChange={(e) => setForm({ ...values, [field]: Number(e.target.value) })}
          placeholder={field}
        />
      ))}
      <button className="bg-primary px-4 py-2 rounded" onClick={() => mutation.mutate(values)}>
        Save
      </button>
    </div>
  );
}
