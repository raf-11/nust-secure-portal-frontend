import CryptoJS from "crypto-js";

export const encryptText = (plainText, masterPassword) => {
  return CryptoJS.AES.encrypt(plainText, masterPassword).toString();
};

export const decryptText = (cipherText, masterPassword) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, masterPassword);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  if (!decrypted) {
    throw new Error("Decryption failed");
  }
  return decrypted;
};