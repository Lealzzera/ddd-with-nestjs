import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { z } from "zod";
import { Injectable } from "@nestjs/common";
import { Env } from "../env";

const tokenPayloadSchema = z.object({
  sub: z.string().uuid(),
});

export type UserPayload = z.infer<typeof tokenPayloadSchema>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService<Env, true>) {
    const publicKey = config.get("JWT_PUBLIC_KEY", { infer: true });
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, "base64"),
      algorithms: ["RS256"],
    });
  }

  async validate(payload: UserPayload) {
    return tokenPayloadSchema.parse(payload);
  }
}
