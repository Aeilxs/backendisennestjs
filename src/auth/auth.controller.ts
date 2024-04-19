import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './auth.dtos';
import { AuthGuard } from './auth.guard';
import { AuthRequest } from 'src/types';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signin(@Body() dto: SignInDto) {
        return this.authService.signIn(dto.email, dto.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req: AuthRequest) {
        return req.user;
    }
}
