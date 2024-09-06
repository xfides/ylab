function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateUniqueId(prefix: string = '') {
  return prefix + '-' + Math.random().toString(16).slice(2)
}

function validateEmail(email: string) {
  const re = /^[^@]+@[^@]+\.[^@]+$/;

  return re.test(String(email).toLowerCase());
}

function validateStrLength(str: string = '', givenLength: number = 0) {
  return str.length >= givenLength
}

function createValidatePasswordFnByLength(length: number = 0) {
  return function (password: string = '') {
    return validateStrLength(password, length);
  }
}

async function digestMessage(message: string) {
  // encode as (utf-8) Uint8Array
  const msgUint8 = new TextEncoder().encode(message);

  // hash the message
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8);

  // convert buffer to byte array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string
  return hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sleepRandomMs(
  start: number = 0,
  end: number = 0
): Promise<void> {
  const ms = randomIntFromInterval(start, end)

  return new Promise(resolve => setTimeout(resolve, ms));
}

function shallowEqualArrays(arrA: unknown[], arrB: unknown[]): boolean {
  if (arrA === arrB) {
    return true;
  }
  if (!arrA || !arrB) {
    return false;
  }
  const len = arrA.length;
  if (arrB.length !== len) {
    return false;
  }
  for (let i = 0; i < len; i++) {
    if (arrA[i] !== arrB[i]) {
      return false;
    }
  }
  return true;
}

export {
  digestMessage,
  sleepRandomMs,
  generateUniqueId,
  validateEmail,
  createValidatePasswordFnByLength,
  shallowEqualArrays
}

