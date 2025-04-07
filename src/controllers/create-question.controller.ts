import { Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PrismaService } from "src/prisma/prisma.service";

@UseGuards(AuthGuard("jwt"))
@Controller("/questions")
export class CreateQuestionController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle() {
    return "ok";
  }
}
