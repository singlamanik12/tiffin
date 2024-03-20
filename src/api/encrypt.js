import CryptoJS from "crypto-js";

function encryptPayload(data) {
  const secretKey = process.env.REACT_APP_ENCRYPT_DATA;
  const signature = CryptoJS.HmacSHA256(
    JSON.stringify(data),
    secretKey
  ).toString();

  // Encrypt the data
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secretKey
  ).toString();

  return { encText: ciphertext, signature };
}

function encryptParams(data) {
  const secretKey = process.env.REACT_APP_ENCRYPT_DATA;

  // Encrypt the data
  const ciphertext = CryptoJS.AES.encrypt(data, secretKey).toString();

  // Generate a signature for the encrypted data
  const hmac = CryptoJS.HmacSHA256(ciphertext, secretKey).toString();
  return `?data=${encodeURIComponent(
    ciphertext
  )}&signature=${encodeURIComponent(hmac)}`;
}

export { encryptPayload, encryptParams };
