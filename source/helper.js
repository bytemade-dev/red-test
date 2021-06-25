"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
const fs_1 = require("fs");
const zlib_1 = require("zlib");
const data_1 = require("./data");
class Helper {
    read(path, singleLine = false) {
        const content = fs_1.readFileSync(path);
        if (singleLine)
            return Buffer.from(content.toString('utf-8').split('\n')[0]);
        return content;
    }
    unzip(decryptedZip) {
        return new Promise((resolve, reject) => {
            zlib_1.unzip(decryptedZip, (error, buffer) => {
                if (error) {
                    reject(error.message);
                    return;
                }
                resolve(buffer.toString('utf8'));
            });
        });
    }
    validateArguments(args) {
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
        return new data_1.Data(sentence, word);
    }
}
exports.Helper = Helper;
