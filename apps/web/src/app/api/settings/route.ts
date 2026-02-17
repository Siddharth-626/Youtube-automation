export const dynamic = 'force-dynamic';
import { connectDB, Settings } from '@repo/database';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const settings = (await Settings.findOne()) || (await Settings.create({}));
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  await connectDB();
  const body = await request.json();
  const settings = (await Settings.findOneAndUpdate({}, body, { new: true, upsert: true })) as any;
  return NextResponse.json(settings);
}
