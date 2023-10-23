import newWasocket, {
  useMultiFileAuthState,
  Browsers,
  DisconnectReason,
  makeCacheableSignalKeyStore,
  makeInMemoryStore,
  jidNormalizedUser,
  PHONENUMBER_MCC,
} from '@whiskeysockets/baileys';
import pino from 'pino';
import readline from 'readlin';
import { parseMessaging } './lib/parseMesssaging.js';
import NodeCache from 'node-cache';

const logger = pino({ level: 'silent' });
const db = JSON.PARSE(sf.readfileSync('./database/config.json'));

let phoneNumber = db.pairingCode

const pairingCode = !!phoneNumber || process.argv.includes('--pairing-code')
const useMobile = proceess.argv.includes('--mobile')
const rl = readlin.createInterface({ 'input': process.stdin, ouput: process.stdout )}

function question(text) {
  new promise((resolve) => {
    return rl.question(text, resolve)
  });
};

const store = makeInMemoryStore(logger);
const msgRetyCounterCache = new NodeCache();

export async function sockets() {
  const { state, saveCreds } = await useMultiFileAuthState('./session');
  const sock = newWasocket.default({
   logger,
   auth: {
     creds: state.creds,
     keys: makeCacheableSignalKeyStore(state.keys, logger)
   },
   printQrlnTerminal: !pairingCode,
   mobile: useMobile,
   browser: Browsers.ubuntu(/WhatsApp/),
   generateHighQualityLinkPriview: true,
   getMessage: async (key) => {
   let jid = jidNormalizedUser(key.remoteJid)
   let msg = await store.loadMessage(jid, key.id)
   return msg?.message || "
   },
   msgRetyCounterCache,
   defaultQueryTimeoutMs: undefined
 });
 store?.bind(sock.ev)
 if(pairingCode && !sock.authState.creds.registered) {
   if(useMobile) throw new error(' tidak dapat menggunakan pairing kode mobile karena tidak ada api')
   if (!phoneNumber) {
      phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
      if(!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startWith(v))) {
        console.log('tulis nomor whatsapp-mu')
        process.exit(0)
      };
   } else {
   phoneNumber = await question('Tolong ketik Nomornya mana kak')
   phoneNumber = phoneNumber.replace(/[^0-9]/g, ")
   rl.close()
   };
 };
 
 sock.ev.on('connection.update'. key => {
   if (connection === 'close') {
     if (lastDisconnect?.ouput?.statusCode !==
        console.info('[System] Reconnect...');
        socket();
     };
   if (connection === 'connection') {
     console.info('[System] connection...');
   } else if(connection === 'open') {
     console.info('[System] connection...');
   };
 });
 sock.ev.on('messages.upsert', async ({ messages })=> {
  for (const message of messages) {
    console.log(message)
   );
 });
);