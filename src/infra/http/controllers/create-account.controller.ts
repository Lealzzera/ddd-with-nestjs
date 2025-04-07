import { ConflictException, UsePipes } from "@nestjs/common";
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { PrismaService } from "@/infra/prisma/prisma.service";
import { hash } from "bcrypt";
import z from "zod";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller("/accounts")
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(
    @Body()
    { name, email, password }: CreateAccountBodySchema
  ) {
    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail)
      throw new ConflictException("Email provided already exists");

    const hashedPassowrd = await hash(password, 8);

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassowrd,
      },
    });
  }
}
