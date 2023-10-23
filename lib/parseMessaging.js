export async function parseMessaging(sock,message) {
  const chat = message.key.remoteJid;
  const fromMe = message.key.fromMe;
  return {
    chat,
    fromMe,
    type: typeMessage(message),
    text: textDetetcting(message),
    media: objectMedia(message),
  };
};

export function typeMessage(message) {
 const type = {
   stickerMessage: 'sticker',  
   imageMessage: 'image',
   videoMessage: 'video',
   audioMessage: message?.audioMessage && message?.audioMessage.ppt ? 'vn' : 'audio'
   dokumentMessage: 'document',
   contactMessage: 'contact',
   pollCreationMessage: 'polling',
   locateMessage: 'locate',
   editedMessage: message?.edited,
 };
 for (const key in type) {
   if (message?.[objeck.keys(message)?.contextInfo?.quotedMessage)
     return 'message-reply';
   } else if(message?.[key]) {
     return type[key];
   };
 };
};

 export function textDetetcting(message) {
 return message?.conversation ||
 message?.extendedTextMessage?.text || 
 message?.imageMessage?.caption ||
 message?.videoMessage?.caption ||
 message?.editedMessage?.protocolMessage?.editedMessage?.conversation ||
 ";
};

export function objectMedia(message) {
  const mediaType = ['imageMessage', 'videoMessage', 'stickerMessage', 'audioMessage'];
 for (const type of mediaType) {
   if(message?.message?.[type]) {
     const objectkey = messeage?.messeage ? Object.keys(message?.message) : ";
     return {
       buffer: async () => await downloadMediaMessage(messeage, 'buffer'),
       mimetype: objectkey?.mimetype,
       height: objectkey?.height,
       widht +:objectkey?.widht,
       ppt: objectkey?.ppt,
       second: objectkey?.second,
     };
   };
 };
 return undefined ;
};