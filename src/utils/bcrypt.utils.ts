import * as bcrypt from 'bcrypt';
import { ENV } from './../env';
import { toNumber } from './util.function';

const SALT_ROUNDS: number = toNumber(ENV.bcryptSoltRound);

export async function hashString(pleanText: string) {
  return await bcrypt.hash(pleanText, SALT_ROUNDS);
}

export async function compairePassword(
  plainPassword: string,
  hashPassword: string,
) {
  return await bcrypt.compare(plainPassword, hashPassword);
}
