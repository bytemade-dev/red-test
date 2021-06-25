"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aes256gcm = void 0;
const crypto_1 = require("crypto");
class Aes256gcm {
    decrypt(enc, key, iv, authTag) {
        const decipher = crypto_1.createDecipheriv('aes-256-gcm', key, iv);
        decipher.setAuthTag(authTag);
        let str = decipher.update(enc, 'base64', 'utf8');
        str += decipher.final('utf8');
        return str;
    }
}
exports.Aes256gcm = Aes256gcm;
