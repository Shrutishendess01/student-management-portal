import CryptoJS from "crypto-js";

export const hashData = (data: string): string => {
  return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
};
