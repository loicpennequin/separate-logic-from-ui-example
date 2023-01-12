import crypto from 'crypto';
import bcrypt from 'bcrypt';

export const randomHash = () => crypto.randomBytes(10).toString('hex');

export const comparePassword = (password: string, hash: string) =>
  bcrypt.compare(password, hash);
