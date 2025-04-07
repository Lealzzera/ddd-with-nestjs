import { AppModule } from "@/infra/app.module";
import { PrismaService } from "@/infra/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { hash } from "bcrypt";
import request from "supertest";

describe("Authenticate (E2E)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test("[POST] /sessions", async () => {
    const passwordHashed = await hash("1234567890", 8);
    await prisma.user.create({
      data: {
        name: "John Doe",
        email: "johndoe@acme.com",
        password: passwordHashed.toString(),
      },
    });
    const response = await request(app.getHttpServer()).post("/sessions").send({
      email: "johndoe@acme.com",
      password: "1234567890",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      access_token: expect.any(String),
    });
  });
});
