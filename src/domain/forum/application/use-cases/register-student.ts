import { Injectable } from "@nestjs/common";
import { StudentsRepository } from "../repositories/students-repository";
import { Student } from "../../enterprise/entities/student";
import { Either, left, right } from "@/core/either";
import { HasheGenerator } from "../cryptography/hash-generator";
import { StudentAlreadyExistsError } from "./errors/student-already-exists-error";

interface RegisterStudentUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

type RegisterStundetUseCaseResponse = Either<
  StudentAlreadyExistsError,
  { student: Student }
>;

@Injectable()
export class RegisterStudentUseCase {
  constructor(
    private studentsRepository: StudentsRepository,
    private hashGenerator: HasheGenerator
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterStudentUseCaseRequest): Promise<RegisterStundetUseCaseResponse> {
    const studentWithSameEmail =
      await this.studentsRepository.findByEmail(email);

    if (studentWithSameEmail) return left(new StudentAlreadyExistsError(email));

    const hashedPassowrd = await this.hashGenerator.hash(password);

    const student = Student.create({ name, email, password: hashedPassowrd });

    await this.studentsRepository.create(student);

    return right({
      student,
    });
  }
}
