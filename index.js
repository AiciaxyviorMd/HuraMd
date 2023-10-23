import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import { watchFile, unwatchFile } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
console.info('[System] Starting...');

function start() {
  let args = [join(__dirname, 'main.js'), ...process.argv.slice(2)];
  let p = spawn(process.argv[0], args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'] });

  p.on('message', (data) => {
    if (data === 'reset') {
      console.info('[System] Restarting...');
      p.kill();
      start();
    }
  });

  p.on('exit', (code) => {
    if (code !== 0) start();
    watchFile(args[0], () => {
      unwatchFile(args[0]);
      start();
    });
  });
}

start();
