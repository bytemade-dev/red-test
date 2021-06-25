"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aes256gcm_1 = require("./aes256gcm");
const helper_1 = require("./helper");
const helper = new helper_1.Helper();
const parameters = helper.validateArguments(process.argv);
if (parameters == null)
    process.exit();
loadData()
    .then(content => {
    const word = getWordOnPosition(content, parameters);
    if (word === null) {
        process.exit();
    }
    printResult(content, parameters, word);
});
async function loadData() {
    const key = Buffer.from(helper.read('secret.key', true).toString('utf-8'), 'base64');
    const auth = helper.read('auth.txt');
    const iv = helper.read('iv.txt');
    const secret = helper.read('secret.enc');
    const aes256gcm = new aes256gcm_1.Aes256gcm();
    const decryptedZip = aes256gcm.decrypt(secret, key, auth, iv);
    return new Promise((resolve, reject) => {
        helper.unzip(decryptedZip)
            .then(content => resolve(content))
            .catch(error => reject(error));
    });
}
function getWordOnPosition(content, parameters) {
    const sentenceIndex = parameters.sentence - 1;
    const wordIndex = parameters.word - 1;
    const rawSentences = content.split('.');
    if (rawSentences.length < sentenceIndex) {
        console.error(`
    Bitte geben Sie eine neue Sentence Position ein, sie liegt über dem erlaubten: ${rawSentences.length - 1}
    `);
        return null;
    }
    const foundSentence = rawSentences[sentenceIndex].trim();
    const rawWords = foundSentence.split(' ');
    if (rawWords.length < wordIndex) {
        console.error(`
    Bitte geben Sie eine neue Word Position ein, sie liegt über dem erlaubten: ${rawWords.length - 1}
    `);
        return null;
    }
    let foundWord = rawWords[wordIndex];
    const removeAllSpecialChars = /\w+/.exec(rawWords[wordIndex]);
    if (removeAllSpecialChars !== null)
        foundWord = removeAllSpecialChars[0];
    return foundWord;
}
function printResult(content, parameters, word) {
    console.log(`Text: "${content}"`);
    console.log(`Parameter: sentence = ${parameters.sentence}, y = ${parameters.word}`);
    console.log(`Ergebnis: ${word}`);
}
