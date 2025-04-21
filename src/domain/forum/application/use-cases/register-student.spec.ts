import { RegisterStudentUseCase } from "./register-student";
import { InMemoryStudentsRepository } from "test/repositories/in-memory-students-respository";
import { FakeHasher } from "test/cryptography/fake-hasher";

let inMemoryStudentsRepository: InMemoryStudentsRepository;
let fakeHasher: FakeHasher;
let sut: RegisterStudentUseCase;

describe("Register Student", () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    fakeHasher = new FakeHasher();
    sut = new RegisterStudentUseCase(inMemoryStudentsRepository, fakeHasher);
  });

  it("should be able to register a new student", async () => {
    const result = await sut.execute({
      name: "Jane Doe",
      email: "jane@example.com",
      password: "123456a",
    });
    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      student: inMemoryStudentsRepository.items[0],
    });
  });

  it("should be able to hash student password", async () => {
    const result = await sut.execute({
      name: "Jane Doe",
      email: "jane@example.com",
      password: "123456a",
    });

    const hashedPassword = await fakeHasher.hash("123456a");

    expect(inMemoryStudentsRepository.items[0].password).toEqual(
      hashedPassword
    );
  });
});
