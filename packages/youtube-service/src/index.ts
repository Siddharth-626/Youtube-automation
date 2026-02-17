import { createReadStream } from 'node:fs';
import { google } from 'googleapis';

export async function uploadShort(params: {
  filePath: string;
  title: string;
  description: string;
  tags: string[];
}) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.YOUTUBE_CLIENT_ID,
    process.env.YOUTUBE_CLIENT_SECRET
  );

  oauth2Client.setCredentials({ refresh_token: process.env.YOUTUBE_REFRESH_TOKEN });
  const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

  const response = await youtube.videos.insert({
    part: ['snippet', 'status'],
    requestBody: {
      snippet: {
        title: params.title,
        description: params.description,
        tags: params.tags,
        categoryId: '24'
      },
      status: { privacyStatus: 'public' }
    },
    media: { body: createReadStream(params.filePath) }
  });

  return `https://youtube.com/watch?v=${response.data.id}`;
}
