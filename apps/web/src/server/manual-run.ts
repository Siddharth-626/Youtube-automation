import { AutomationEngine } from './automation-engine';

new AutomationEngine()
  .run()
  .then(() => {
    console.log('Automation completed');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
