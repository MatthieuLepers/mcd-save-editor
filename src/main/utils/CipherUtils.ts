import crypto from 'crypto';

export interface CipherConfig {
  key: string;
  iv: string;
}

export function cipher(cipherConfig: CipherConfig, str: string): string {
  const cipherer = crypto.createCipheriv('aes-256-cbc', cipherConfig.key, cipherConfig.iv);
  const encrypted = cipherer.update(str, 'utf8', 'base64');

  return `${encrypted}${cipherer.final('base64')}`;
}

export function decipher(cipherConfig: CipherConfig, str: string): string {
  const decipherer = crypto.createDecipheriv('aes-256-cbc', cipherConfig.key, cipherConfig.iv);
  const decrypted = decipherer.update(str, 'base64', 'utf8');

  return `${decrypted}${decipherer.final('utf8')}`;
}

const AES_KEY = Buffer.from([
  0x5C, 0xEB, 0x9D, 0x0A, 0xEB, 0xB9, 0x5A, 0xC0,
  0x27, 0x0B, 0x0A, 0xF6, 0x75, 0x3D, 0xFC, 0x0E,
  0xE3, 0xE6, 0x8B, 0xB6, 0x94, 0x79, 0x02, 0x0F,
  0x24, 0x30, 0xE2, 0xEA, 0x00, 0x2B, 0xD4, 0xC9,
]);

const AES_ALGO = 'aes-256-ecb';
const ZERO_IV = Buffer.alloc(0);
const BLOCK_SIZE = 16;

function padZeros(buffer: Buffer) {
  const padLength = BLOCK_SIZE - (buffer.length % BLOCK_SIZE);
  return padLength === 0
    ? buffer
    : Buffer.concat([buffer, Buffer.alloc(padLength, 0)]);
}

function unpadZeros(buffer: Buffer) {
  let end = buffer.length;
  while (end > 0 && buffer[end - 1] === 0) end -= 1;
  return buffer.subarray(0, end);
}

export async function decryptSaveFile(buffer: Buffer) {
  const magic1 = buffer.subarray(0, 4).toString('ascii');
  const magic2 = buffer.subarray(4, 8);

  if (magic1 !== 'D001' || !magic2.equals(Buffer.alloc(4, 0))) {
    throw new Error('File does not start with the D001 00000000 signature');
  }

  const encrypted = buffer.subarray(8);

  const decipherer = crypto.createDecipheriv(AES_ALGO, AES_KEY, ZERO_IV);
  decipherer.setAutoPadding(false);
  const decrypted = Buffer.concat([decipherer.update(encrypted), decipherer.final()]);

  return unpadZeros(decrypted);
}

export async function encryptSaveFile(buffer: Buffer) {
  const cipherer = crypto.createCipheriv(AES_ALGO, AES_KEY, ZERO_IV);
  cipherer.setAutoPadding(false);

  const encrypted = Buffer.concat([cipherer.update(padZeros(buffer)), cipherer.final()]);

  const header = Buffer.concat([
    Buffer.from('D001', 'ascii'),
    Buffer.alloc(4, 0),
  ]);

  return Buffer.concat([header, encrypted]);
}
