# AI YouTube Shorts Automation System

Production-ready monorepo for generating, rendering, and uploading YouTube Shorts automatically with analytics dashboard.

## Stack
- Next.js 14 App Router + TypeScript + TailwindCSS
- MongoDB + Mongoose
- OpenAI, Edge TTS, Pexels, YouTube Data API v3
- FFmpeg + Remotion template
- Node Cron scheduler

## Monorepo Structure
```
/apps
  /web                # frontend dashboard + API routes
/packages
  /ai-services        # topic/script/keyword generation
  /database           # mongoose connection + models
  /video-engine       # voice, clips, ffmpeg composition, remotion template
  /youtube-service    # YouTube upload service
  /shared             # shared types
```

## Environment Variables
Copy `.env.example` to `.env` and fill values:

- `OPENAI_API_KEY`
- `PEXELS_API_KEY`
- `YOUTUBE_CLIENT_ID`
- `YOUTUBE_CLIENT_SECRET`
- `YOUTUBE_REFRESH_TOKEN`
- `MONGODB_URI`
- `EDGE_TTS_VOICE`
- `UPLOAD_SCHEDULE_TIME`
- `VIDEOS_PER_DAY`

## Run
```bash
npm install
npm run dev
```

## Build & Start
```bash
npm run build
npm run start
```

## Manual generation command
```bash
npm run generate-video
```

## API Routes
- `POST /api/automation/run`
- `GET /api/videos`
- `GET /api/jobs`
- `GET /api/logs`
- `GET /api/settings`
- `PUT /api/settings`

## Dashboard Pages
- Overview
- Videos
- Automation Settings
- Logs
- Manual Trigger

## Scheduler
Run `npm run scheduler -w apps/web` to start the daily cron worker using `UPLOAD_SCHEDULE_TIME`.

## Docker
```bash
docker compose up --build
```
Includes services:
- app
- mongodb
- ffmpeg

## Notes
- Secrets are environment-driven (no hardcoded keys).
- Failed jobs are stored with error logs in MongoDB.
- You can extend retries by wrapping `AutomationEngine.run()` with a retry helper.
