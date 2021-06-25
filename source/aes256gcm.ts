import {createDecipheriv} from 'crypto';

export class Aes256gcm {
  public decrypt(enc: Buffer, key: Buffer, iv: Buffer, authTag: Buffer): string {
    const decipher = createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);
    let str = decipher.update(enc, 'base64', 'utf8');
    str += decipher.final('utf8');
    return str;
  }
}
