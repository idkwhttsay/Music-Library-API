import { hash, compare } from 'bcrypt';

export class HashService {
  static async hash(data: string): Promise<string> {
    return hash(data, parseInt(process.env.CRYPT_SALT));
  }

  static async compare(data: string, hash: string): Promise<boolean> {
    return compare(data, hash);
  }
}
