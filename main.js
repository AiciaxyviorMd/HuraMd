import fs from 'fs';
import readline from 'readline';
import { makeInMemoryStore, PHONENUMBER_MCC } from '@whiskeysockets/baileys';
import logger from './index.js';

const data = JSON.parse(fs.readFileSync('./database/setting.json'));
let phoneNumber = data.pairingNumber;

export class Options {
  constructor () {
    this.pairingCode = !!phoneNumber || process.argv.includes('--pairing-code')
    this.useMobile = process.argv.includes('--mobile');
    this.rl = readline.createInterface({ input: process.stdin, output: process.stdout })
    this.question = (text) => new Promise((resolve) => this.rl.question(text, resolve))
    this.store = makeInMemoryStore(logger)
  };
  async pairingCode (sock) {
    if(this.pairingCode && !sock.authState.creds.registered) {
      if(this.useMobile) throw new Error("Can't use mobile code pairing because the API doesn't exist");
      if(!phoneNumber) {
        phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
        if(!Object.keys(PHONENUMBER_MCC).some(getting => phoneNumber.startsWith(getting))) {
          console.log('ketik nomor mu disini: ')
          process.exit(0)
        };
      } else {
        phoneNumber = await this.question('silahkan ketik nomor mu disini: ')
        phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
        this.rl.close()
      };
    };
  };
  async mobileCode () {
  };
};
