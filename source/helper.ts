import {readFileSync} from 'fs';
import {unzip} from "zlib";
import {Data} from './data';

export class Helper {
  public read(path: string, singleLine = false): Buffer {
    const content = readFileSync(path);
    if (singleLine) return Buffer.from(content.toString('utf-8').split('\n')[0]);
    return content;
  }

  public unzip(decryptedZip: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      unzip(decryptedZip, (error, buffer) => {
        if (error) {
          reject(error.message);
          return;
        }
        resolve(buffer.toString('utf8'));
      })
    });
  }

  public validateArguments(args: string[]): Data | null {
    if (args.length !== 4) {
      console.error(`
  Invalid argument length.
  Example how to start the programm => 'node source/index 1 3'
  First number => sentence index (1)
  Second number => word index (3)
  `);
      return null;
    }

    const sentence = Number.parseInt(args[2]);
    const word = Number.parseInt(args[3]);

    if (Number.isNaN(sentence) || Number.isNaN(word)) {
      console.error(`
  Invalid argument. Bitte geben Sie nur Zahlen ein.
  `);

      return null;
    }

    if (sentence <= 0 || word <= 0) {
      console.error(`
  Invalid argument. Es sind nur Zahlen > 0 erlaubt.
  `);
      return null;
    }


    return new Data(sentence, word);
  }
}
