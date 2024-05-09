import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './auth.dtos';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';
import { UserRole } from 'src/types';
import { Authorize } from './authorize.decorator';
import { JwtRequest } from 'src/types';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signin(@Body() dto: SignInDto) {
        console.log(dto);
        return this.authService.signIn(dto.email, dto.password);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Authorize([UserRole.USER, UserRole.ADMIN])
    @Get('profile')
    getProfile(@Request() req: JwtRequest) {
        return req.user;
    }
}
