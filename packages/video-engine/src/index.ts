import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { exec as execCb } from 'node:child_process';
import { promisify } from 'node:util';

const exec = promisify(execCb);

export async function generateVoice(script: string, voice = process.env.EDGE_TTS_VOICE || 'en-US-JennyNeural') {
  const outputDir = path.join(process.cwd(), 'artifacts');
  await mkdir(outputDir, { recursive: true });
  const filePath = path.join(outputDir, `narration-${Date.now()}.mp3`);

  await exec(`npx edge-tts --voice "${voice}" --text "${script.replace(/"/g, '\\"')}" --write-media "${filePath}"`);
  return filePath;
}

export async function fetchPexelsClips(keywords: string[]) {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) throw new Error('PEXELS_API_KEY is not set');

  const outputDir = path.join(process.cwd(), 'artifacts', 'clips');
  await mkdir(outputDir, { recursive: true });

  const clips: string[] = [];
  for (const keyword of keywords.slice(0, 5)) {
    const res = await fetch(`https://api.pexels.com/videos/search?query=${encodeURIComponent(keyword)}&orientation=portrait&per_page=1`, {
      headers: { Authorization: apiKey }
    });
    const data = await res.json();
    const url = data?.videos?.[0]?.video_files?.[0]?.link;
    if (!url) continue;

    const buffer = Buffer.from(await (await fetch(url)).arrayBuffer());
    const clipPath = path.join(outputDir, `${keyword.replace(/\s+/g, '-')}-${Date.now()}.mp4`);
    await writeFile(clipPath, buffer);
    clips.push(clipPath);
  }
  return clips;
}

export async function composeVideo(params: {
  clips: string[];
  audioPath: string;
  title: string;
}) {
  const outputDir = path.join(process.cwd(), 'artifacts');
  await mkdir(outputDir, { recursive: true });
  const listPath = path.join(outputDir, `clips-${Date.now()}.txt`);
  const outputPath = path.join(outputDir, `short-${Date.now()}.mp4`);

  await writeFile(listPath, params.clips.map((c) => `file '${c}'`).join('\n'));

  await exec(
    `ffmpeg -y -f concat -safe 0 -i "${listPath}" -i "${params.audioPath}" -vf "scale=1080:1920:force_original_aspect_ratio=cover,setsar=1" -c:v libx264 -c:a aac -shortest "${outputPath}"`
  );

  return outputPath;
}
