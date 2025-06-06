import { IHashProvider } from '@/users/domain/providers/hash-provider'
import { compare, hash } from 'bcryptjs'

export class BcryptjsHashProvider implements IHashProvider {
  async generateHash(payload: string): Promise<string> {
    return hash(payload, 6)
  }

  async compareHash(payload: string, hash: string): Promise<boolean> {
    return compare(payload, hash)
  }
}
