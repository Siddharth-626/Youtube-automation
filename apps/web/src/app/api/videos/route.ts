export const dynamic = 'force-dynamic';
import { connectDB, Video } from '@repo/database';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const videos = await Video.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(videos);
}
