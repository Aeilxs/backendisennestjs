import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWT_SECRET } from 'src/constants';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>(JWT_SECRET),
                signOptions: { expiresIn: '3600s' },
                global: true,
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthGuard, RolesGuard],
})
export class AuthModule {}
