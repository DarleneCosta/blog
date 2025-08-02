import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const jwtSecret = process.env.JWT_SECRET_KEY;
const jwtEncodedKey = new TextEncoder().encode(jwtSecret);

const loginExpSeconds = Number(process.env.LOGIN_EXPIRATION_SECONDS) || 86400;
const loginExpStr = process.env.LOGIN_EXPIRATION_STRING || '1d';
const loginCookieName = process.env.LOGIN_COOCKIE_NAME || 'loginSession';

export async function hashPassword(password: string) {
  const hash = await bcrypt.hash(password, 10);
  const base64Hash = Buffer.from(hash).toString('base64');
  return base64Hash;
}

export async function verifyPassword(password: string, base64Hash: string) {
  if (!base64Hash || !password) {
    return false;
  }
  const decodedHash = Buffer.from(base64Hash, 'base64').toString('utf-8');
  const isValid = await bcrypt.compare(password, decodedHash);
  return isValid;
}

export async function createLoginSession(username: string) {
  const expireAt = new Date(Date.now() + loginExpSeconds * 1000);

  const loginSession = username + 'quem sabe';
  /*  jwt.sign({ username, expireAt }, jwtEncodedKey, {
    expiresIn: loginExpStr,
  });*/

  const cookieStore = await cookies();

  cookieStore.set(loginCookieName, loginSession, {
    httpOnly: true, //somente o servidor pode acessar o cookie
    expires: expireAt,
    secure: true, //somente o servidor pode acessar o cookie
    sameSite: 'strict', //somente o servidor pode acessar o cookie
    path: '/',
  });

  return { loginSession, expireAt };
}

export async function deleteLoginSession() {
  const cookieStore = await cookies();
  cookieStore.set(loginCookieName, '', { expires: new Date(0) });
  cookieStore.delete(loginCookieName);
}
