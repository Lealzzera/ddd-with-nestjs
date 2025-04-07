import { Module } from "@nestjs/common";
import { CreateAccountController } from "./controllers/create-account.controller";
import { AuthenticateCotroller } from "./controllers/authenticate.controller";
import { CreateQuestionController } from "./controllers/create-question.controller";
import { FetchRecentQuestionsController } from "./controllers/fetch-recent-questions.controller";
import { DatabaseModule } from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthenticateCotroller,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
})
export class HttpModule {}
