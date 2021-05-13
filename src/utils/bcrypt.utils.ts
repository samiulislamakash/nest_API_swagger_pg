import * as bcrypt from 'bcrypt';

const SALT_ROUNDS: number = 10;

export async function hashString(pleanText: string) {
  return await bcrypt.hash(pleanText, SALT_ROUNDS);
}

export async function compairePassword(
  plainPassword: string,
  hashPassword: string,
) {
  return await bcrypt.compare(plainPassword, hashPassword);
}
