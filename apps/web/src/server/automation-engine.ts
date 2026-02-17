import { extractKeywords, generateScript, generateTopic } from '@repo/ai-services';
import { connectDB, Job, Settings, Video } from '@repo/database';
import { composeVideo, fetchPexelsClips, generateVoice } from '@repo/video-engine';
import { uploadShort } from '@repo/youtube-service';
import { logMessage } from './logger';

export class AutomationEngine {
  async run() {
    await connectDB();
    const settings = (await Settings.findOne()) || (await Settings.create({}));
    const job = await Job.create({ status: 'running', startedAt: new Date(), logs: [] });

    try {
      await logMessage('Job started', 'info', job.id);
      const topic = await generateTopic(settings.nichePrompt);
      const script = await generateScript(topic);
      const audioPath = await generateVoice(script, settings.voice);
      const keywords = await extractKeywords(script);
      const clips = await fetchPexelsClips(keywords);

      const filePath = await composeVideo({ clips, audioPath, title: topic });
      const youtubeUrl = await uploadShort({
        filePath,
        title: topic,
        description: script,
        tags: keywords
      });

      const video = await Video.create({
        title: topic,
        script,
        status: 'uploaded',
        filePath,
        youtubeUrl,
        duration: settings.duration
      });

      job.status = 'completed';
      job.completedAt = new Date();
      job.logs.push(`Video generated: ${video.id}`);
      await job.save();
      await logMessage('Job completed', 'info', job.id);

      return { job, video };
    } catch (error) {
      job.status = 'failed';
      job.errorMessage = error instanceof Error ? error.message : 'Unknown error';
      job.completedAt = new Date();
      await job.save();
      await logMessage(job.errorMessage, 'error', job.id);
      throw error;
    }
  }
}
