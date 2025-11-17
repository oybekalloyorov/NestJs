import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaClient) {}
    signin() {
        return {msg: 'signin successful'};
    }

    signup() {
        return {msg: 'Signup successful'};
    }
}
