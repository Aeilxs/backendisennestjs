import * as bcrypt from 'bcrypt';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}
    async signIn(email: string, inputpsw: string) {
        const user = await this.userService.findOne(email);
        if (!user) throw new UnauthorizedException('Email ou mot de passe incorrect');
        if (!(await bcrypt.compare(inputpsw, user.password))) {
            throw new UnauthorizedException('Email ou mot de passe incorrect');
        }

        return {
            access_token: await this.jwtService.signAsync({
                user_id: user.id,
                user_email: user.email,
                user_role: user.role,
            }),
        };
    }
}
