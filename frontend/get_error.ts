import { execSync } from 'child_process';
try {
  const output = execSync('npx tsc -p tsconfig.app.json --noEmit --pretty false', { encoding: 'utf-8' });
  console.log("SUCCESS");
} catch (error: any) {
  console.log("ERROR OUTPUT:");
  // Filter out the experimental warnings to just get the tsc error
  const lines = error.stdout.split('\n');
  const tscErrors = lines.filter((l: string) => l.includes('error TS'));
  console.log(tscErrors.join('\n'));
}
