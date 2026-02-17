import cron from 'node-cron';
import { AutomationEngine } from './automation-engine';

let started = false;

export function startScheduler() {
  if (started) return;
  started = true;

  const expression = process.env.UPLOAD_SCHEDULE_TIME || '0 9 * * *';
  cron.schedule(expression, async () => {
    const engine = new AutomationEngine();
    await engine.run();
  });
}
