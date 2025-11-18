import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { 
    ExtractJwt, 
    Strategy 
} from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    'jwt',
) {
    constructor(
        private readonly config: ConfigService, 
        private prisma: PrismaService) {
        const jwtSecret = config.get('JWT_SECRET');

        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not set in environment variables');
        }
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret,
            // secretOrKey: config.get('JWT_SECRET'),
        });
    }

    async validate(payload: {
        sub: number;
        email: string;
    }) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.sub,
            },
        });

        // console.log({payload}); 
        delete (user as any).hash;
        return user;
    }
}
