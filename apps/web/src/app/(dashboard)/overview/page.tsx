'use client';

import { useQuery } from '@tanstack/react-query';
import { apiGet } from '@/lib/api';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export default function OverviewPage() {
  const { data: videos = [] } = useQuery({ queryKey: ['videos'], queryFn: () => apiGet<any[]>('/api/videos') });
  const { data: jobs = [] } = useQuery({ queryKey: ['jobs'], queryFn: () => apiGet<any[]>('/api/jobs') });

  const uploaded = videos.filter((v) => v.status === 'uploaded').length;
  const failed = jobs.filter((j) => j.status === 'failed').length;

  const chartData = [
    { name: 'Generated', value: videos.length },
    { name: 'Uploaded', value: uploaded },
    { name: 'Failed Jobs', value: failed }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded p-4">Total videos: {videos.length}</div>
        <div className="bg-card rounded p-4">Uploaded videos: {uploaded}</div>
        <div className="bg-card rounded p-4">Failed jobs: {failed}</div>
        <div className="bg-card rounded p-4">Next run: {process.env.NEXT_PUBLIC_SCHEDULE || 'Daily'}</div>
      </div>
      <div className="bg-card rounded p-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
