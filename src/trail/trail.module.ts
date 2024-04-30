import { Module } from '@nestjs/common';
import { TrailService } from './trail.service';
import { TrailController } from './trail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trail } from './trail.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/auth/roles.guard';

@Module({
    imports: [TypeOrmModule.forFeature([Trail])],
    providers: [TrailService, AuthGuard, JwtService],
    controllers: [TrailController],
    exports: [TrailService],
})
export class TrailModule {}
