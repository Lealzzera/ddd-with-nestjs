import { Encrypter } from "@/domain/forum/application/cryptography/encrypter";

export class fakeEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload);
  }
}
