import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";
import * as argon from "argon2";
import { PrismaService } from "../prisma/prisma.service";
import { PrismaClientKnownRequestError } from "generated/prisma/internal/prismaNamespace";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async signup(dto: AuthDto) {
        const hash = await argon.hash(dto.password);
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                },

            });

            delete (user as any).hash;    

            return user;
        } catch (error) {
            if (error instanceof
                PrismaClientKnownRequestError
            ) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken');
                }
            }
            throw error;
        }
    }

    signin() {
        return { msg: 'signin successful' };
    }

}
