export async function parseMessaging(sock, message) {
  const chat = message.key.remoteJid;
  const fromMe = message.key.fromMe;
  return {
    chat,
    fromMe,
    type: typeMessage(message),
    text: textDetecting(message),
    media: objectMedia(message),
  };
}

export function typeMessage(message) {
  const type = {
    stickerMessage: 'sticker',
    imageMessage: 'image',
    videoMessage: 'video',
    audioMessage: message?.audioMessage && message?.audioMessage.ptt ? 'vn' : 'audio',
    documentMessage: 'document',
    contactMessage: 'contact',
    pollCreationMessage: 'polling',
    locateMessage: 'locate',
    editedMessage: message?.edited,
  };

  for (const key in type) {
    if (message?.message[key]) {
      return type[key];
    }
  }

  if (message?.message?.contextInfo?.quotedMessage) {
    return 'message-reply';
  }

  return 'unknown';
}

export function textDetecting(message) {
  return (
    message?.conversation ||
    message?.extendedTextMessage?.text ||
    message?.imageMessage?.caption ||
    message?.videoMessage?.caption ||
    message?.editedMessage?.protocolMessage?.editedMessage?.conversation ||
    ''
  );
}

export function objectMedia(message) {
  const mediaType = ['imageMessage', 'videoMessage', 'stickerMessage', 'audioMessage'];

  for (const type of mediaType) {
    if (message?.message?.[type]) {
      const objectKey = message?.message[type];
      return {
        buffer: async () => await downloadMediaMessage(objectKey, 'buffer'),
        mimetype: objectKey?.mimetype,
        height: objectKey?.height,
        width: objectKey?.width,
        ptt: objectKey?.ptt,
        second: objectKey?.seconds,
      };
    }
  }

  return undefined;
  }
