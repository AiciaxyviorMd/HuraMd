import { join, dirname } from 'path';
import { fileURLToPath } 'uril';
import { spawn } from 'child_process')
import { watchfile, unwatchFile } from 'fs',

const __dirname = diname(fileURLToPath(import.meta.url))
console.info([System] Starting...')

function start() {
 let args = [join(__dirname,'main.js'), ...process.argv.slice(2)];
 let p = spawn(process.argv[0], args, ( studio: ['inherit', 'inherit', 'inherit', 'ipc'] });
 .on('message',data => {
   if (data == 'reset') {
    console.info(['System] Restarting...');
    p.kill()
    start()
   };
  });
  .on('exit'. (_, code) => {
    if(code !== o) start()
    watchFile(args[0], () => {
      unwatchFile(args[0])
      start();
    });
   });
  };    
  start();