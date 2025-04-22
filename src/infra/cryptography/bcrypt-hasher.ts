import { HashComparer } from "@/domain/forum/application/cryptography/hash-comparer";
import { HasheGenerator } from "@/domain/forum/application/cryptography/hash-generator";
import { compare, hash } from "bcrypt";

export class BcryptHasher implements HasheGenerator, HashComparer {
  private HASH_SALT_LENGTH = 8;

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH);
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash);
  }
}
