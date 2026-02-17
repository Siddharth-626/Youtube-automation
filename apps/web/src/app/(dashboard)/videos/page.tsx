'use client';

import { useQuery } from '@tanstack/react-query';
import { apiGet } from '@/lib/api';

export default function VideosPage() {
  const { data: videos = [] } = useQuery({ queryKey: ['videos'], queryFn: () => apiGet<any[]>('/api/videos') });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Videos</h2>
      <div className="space-y-2">
        {videos.map((video) => (
          <div className="bg-card rounded p-4 flex justify-between" key={video._id}>
            <div>
              <p className="font-medium">{video.title}</p>
              <p className="text-sm text-zinc-400">Status: {video.status}</p>
            </div>
            <div className="space-x-2">
              {video.youtubeUrl && (
                <a className="text-blue-400" href={video.youtubeUrl} target="_blank">
                  YouTube
                </a>
              )}
              {video.filePath && (
                <a className="text-blue-400" href={video.filePath} download>
                  Download
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
