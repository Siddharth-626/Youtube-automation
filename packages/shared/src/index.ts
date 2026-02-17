export type VideoStatus = 'pending' | 'rendering' | 'uploaded' | 'failed';
export type JobStatus = 'queued' | 'running' | 'completed' | 'failed';

export interface AutomationSettings {
  nichePrompt: string;
  videosPerDay: number;
  scheduleTime: string;
  voice: string;
  duration: number;
}

export interface PipelineResult {
  title: string;
  script: string;
  audioPath: string;
  clips: string[];
  filePath: string;
  youtubeUrl?: string;
}
