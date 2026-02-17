export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { AutomationEngine } from '@/server/automation-engine';

export async function POST() {
  try {
    const engine = new AutomationEngine();
    const result = await engine.run();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
