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
