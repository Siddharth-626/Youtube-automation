export const dynamic = 'force-dynamic';
import { connectDB, Log } from '@repo/database';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const logs = await Log.find().sort({ timestamp: -1 }).limit(200).lean();
  return NextResponse.json(logs);
}
