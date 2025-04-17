import { HashComparer } from "@/domain/forum/application/cryptography/hash-comparer";
import { HasheGenerator } from "@/domain/forum/application/cryptography/hash-generator";

export class FakeHasher implements HasheGenerator, HashComparer {
  async hash(plain: string): Promise<string> {
    return plain.concat("-hashed");
  }
  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat("-hashed") === hash;
  }
}
