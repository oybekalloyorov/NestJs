import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import type { User } from '@prisma/client';
import { GetUser } from '../Auth/decorator';
import { JwtGuard } from '../Auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    @Get('me')
    getMe(
        @GetUser() user: User, 
        // @GetUser('email') email: string
    ) {
        // console.log({
        //     email,
        // });
        return user;
    }

    
    @Patch()
    editUser() {
    }
}
