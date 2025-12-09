import CryptoJS from "crypto-js";

export const encryptArrayBuffer = (arrayBuffer, password) => {
  const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
  const encrypted = CryptoJS.AES.encrypt(wordArray, password).toString();
  return encrypted;
};

export const decryptToArrayBuffer = (cipherText, password) => {
  const decrypted = CryptoJS.AES.decrypt(cipherText, password);
  if (!decrypted) throw new Error("Decryption failed");

  const words = decrypted.words;
  const sigBytes = decrypted.sigBytes;

  const u8 = new Uint8Array(sigBytes);
  for (let i = 0; i < sigBytes; i++) {
    u8[i] = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
  }
  return u8.buffer;
};