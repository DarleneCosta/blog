export function makeRandomString(length: number = 6) {
  return Math.random().toString(36).substring(2, length);
}
