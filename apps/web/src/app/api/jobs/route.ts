export const dynamic = 'force-dynamic';
import { connectDB, Job } from '@repo/database';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const jobs = await Job.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(jobs);
}
