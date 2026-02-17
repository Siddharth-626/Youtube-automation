'use client';

import { useMutation } from '@tanstack/react-query';
import { apiPost } from '@/lib/api';

export default function ManualTriggerPage() {
  const mutation = useMutation({ mutationFn: () => apiPost('/api/automation/run') });
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Manual Trigger</h2>
      <button className="bg-primary px-4 py-2 rounded" onClick={() => mutation.mutate()}>
        Generate Video Now
      </button>
      {mutation.isPending && <p>Running...</p>}
      {mutation.isSuccess && <p>Job completed.</p>}
      {mutation.isError && <p className="text-red-500">Job failed.</p>}
    </div>
  );
}
