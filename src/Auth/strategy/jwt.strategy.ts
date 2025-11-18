import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

interface JwtPayload {
  sub: number | string;
  email?: string;
  // agar tokeningizda boshqa maydonlar bo'lsa shu yerga qo'shing
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly config: ConfigService) {
    const jwtSecret = config.get<string>('JWT_SECRET');

    if (!jwtSecret) {
      // Secret yo'q bo'lsa, xato tashlab ilovani to'xtatamiz
      throw new Error('JWT_SECRET is not set in environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
      // issuer, audience va boshqa opsiyalar qo'shilishi mumkin
    });
  }

  // Passport `validate` metodini chaqiradi — bu yerda payload tekshiriladi
  async validate(payload: JwtPayload) {
    if (!payload || !payload.sub) {
      // Token ichidagi ma'lumot yetarli bo'lmasa rad etamiz
      throw new UnauthorizedException('Invalid token payload');
    }

    // Oddiy holatda payloaddan kerakli maydonlarni qaytaramiz.
    // Agar DB orqali tekshirish xoxlasangiz, bu yerda PrismaService yoki UsersService ni inject qilib ishlating.
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}



// import { Injectable } from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";
// import { PassportStrategy } from "@nestjs/passport";
// import { 
//     ExtractJwt, 
//     Strategy 
// } from "passport-jwt";

// @Injectable()
// export class JwtStrategy extends PassportStrategy(
//     Strategy,
// ) {
//     constructor(config: ConfigService) {
//         super({
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//             secretOrKey: config.get('JWT_SECRET'),
//         });
//     }
// }