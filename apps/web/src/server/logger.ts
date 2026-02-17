import { Log } from '@repo/database';

export async function logMessage(message: string, level: 'info' | 'warn' | 'error' = 'info', jobId?: string) {
  await Log.create({ message, level, jobId });
}
