import CryptoJS from 'crypto-js';

const AES_KEY = Uint8Array.from([
  0x5C, 0xEB, 0x9D, 0x0A, 0xEB, 0xB9, 0x5A, 0xC0,
  0x27, 0x0B, 0x0A, 0xF6, 0x75, 0x3D, 0xFC, 0x0E,
  0xE3, 0xE6, 0x8B, 0xB6, 0x94, 0x79, 0x02, 0x0F,
  0x24, 0x30, 0xE2, 0xEA, 0x00, 0x2B, 0xD4, 0xC9,
]);

const BLOCK_SIZE = 16;

function padZeros(bytes: Uint8Array) {
  const padLength = BLOCK_SIZE - (bytes.length % BLOCK_SIZE);
  if (padLength === 0) return bytes;
  const padded = new Uint8Array(bytes.length + padLength);
  padded.set(bytes);
  return padded;
}

function unpadZeros(bytes: Uint8Array) {
  let end = bytes.length;
  while (end > 0 && bytes[end - 1] === 0) end -= 1;
  return bytes.slice(0, end);
}

function wordArrayToUint8Array(wordArray: CryptoJS.lib.WordArray) {
  const { words, sigBytes } = wordArray;
  const u8 = new Uint8Array(sigBytes);
  for (let i = 0; i < sigBytes; i += 1) {
    u8[i] = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
  }
  return u8;
}

function uint8ArrayToWordArray(u8arr: Uint8Array) {
  const words = [] as number[];
  for (let i = 0; i < u8arr.length; i += 4) {
    words.push(
      (u8arr[i] << 24)
      | (u8arr[i + 1] << 16)
      | (u8arr[i + 2] << 8)
      | (u8arr[i + 3] || 0),
    );
  }
  return CryptoJS.lib.WordArray.create(words, u8arr.length);
}

export function isFileEncrypted(arrayBuffer: ArrayBuffer) {
  const bytes = new Uint8Array(arrayBuffer);
  const magic1 = new TextDecoder().decode(bytes.slice(0, 4));
  const magic2 = bytes.slice(4, 8);

  return magic1 === 'D001' && magic2.every((b) => b === 0);
}

export function decryptSaveFile(arrayBuffer: ArrayBuffer) {
  const bytes = new Uint8Array(arrayBuffer);

  const header = new TextDecoder().decode(bytes.slice(0, 4));
  if (header !== 'D001') throw new Error('Incorrect header or incorrect file');

  const encrypted = bytes.slice(8);
  const key = uint8ArrayToWordArray(AES_KEY);
  const ciphertext = uint8ArrayToWordArray(encrypted);

  const decrypted = CryptoJS.AES.decrypt(
    { ciphertext } as CryptoJS.lib.CipherParams,
    key,
    { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.NoPadding },
  );

  return unpadZeros(wordArrayToUint8Array(decrypted));
}

export function encryptSaveFile(decryptedBytes: Uint8Array) {
  const padded = padZeros(decryptedBytes);
  const key = uint8ArrayToWordArray(AES_KEY);
  const plaintext = uint8ArrayToWordArray(padded);

  const encrypted = CryptoJS.AES.encrypt(
    plaintext,
    key,
    { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.NoPadding },
  );

  const encryptedBytes = wordArrayToUint8Array(encrypted.ciphertext);

  // Headers "D001" + 4 zeros
  const header = new TextEncoder().encode('D001');
  const output = new Uint8Array(8 + encryptedBytes.length);
  output.set(header);
  // 4 bytes 00 00 00 00
  output.set(new Uint8Array(4), 4);
  output.set(encryptedBytes, 8);

  return output;
}
