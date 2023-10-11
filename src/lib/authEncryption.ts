import "server-only";
import CryptoJS from "crypto-js";
import crypto from "crypto";

const aesKey = crypto.randomBytes(32);
const base64EncodedKey = aesKey.toString("base64");

export const encrypt = (value: string) => {
  return CryptoJS.AES.encrypt(value, base64EncodedKey).toString();
};

export const decrypt = (value: any) => {
  const bytes = CryptoJS.AES.decrypt(value, base64EncodedKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
