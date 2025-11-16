import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
    signin() {
        return {msg: 'signin successful'};
    }

    signup() {
        return {msg: 'Signup successful'};
    }
}
