import { InMemoryStudentsRepository } from "test/repositories/in-memory-students-respository";
import { FakeHasher } from "test/cryptography/fake-hasher";
import { FakeEncrypter } from "test/cryptography/fake-encrypter";
import { AuthenticateStudent } from "./authenticate-student";
import { makeStudent } from "test/factories/make-student";

let inMemoryStudentsRepository: InMemoryStudentsRepository;
let fakeHasher: FakeHasher;
let fakeEncrypter: FakeEncrypter;

let sut: AuthenticateStudent;

describe("Authenticate Student", () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    fakeHasher = new FakeHasher();
    fakeEncrypter = new FakeEncrypter();

    sut = new AuthenticateStudent(
      inMemoryStudentsRepository,
      fakeHasher,
      fakeEncrypter
    );
  });

  it("should be able to authenticate a student", async () => {
    const student = makeStudent({
      email: "jane@example.com",
      password: await fakeHasher.hash("123456"),
    });

    inMemoryStudentsRepository.items.push(student);

    const result = await sut.execute({
      email: "jane@example.com",
      password: "123456",
    });

    console.log(result);
    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual(
      expect.objectContaining({ accessToken: expect.any(String) })
    );
  });
});
